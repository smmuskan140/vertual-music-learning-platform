"use client";

import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Music, Send, Camera, Sparkles, Check, ChevronRight, Image as ImageIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { INSTRUMENTS, API_CONFIG } from "@/config/api";

interface Message {
  role: "ai" | "user";
  text: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: "Hello! I'm Gemini Banana Pro. Let's create your 3D music tutor. First, upload an image or describe the person you want as your avatar!" },
  ]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(1); // 1: Avatar Creation, 2: Image Validation, 3: Instrument Selection, 4: Ready
  const [avatarImage, setAvatarImage] = useState<string | null>(null);
  const [selectedInstrument, setSelectedInstrument] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    const newMessages: Message[] = [...messages, { role: "user", text: userMessage }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      if (step === 1) {
        // Initial Avatar Prompt
        const response = await fetch(API_CONFIG.CHAT_API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            message: `User wants an avatar with this description: "${userMessage}". Acknowledge and tell them you are generating it.`,
            history: messages.map(m => ({ role: m.role === 'ai' ? 'model' : 'user', parts: [{ text: m.text }] }))
          }),
        });
        
        const data = await response.json();
        if (data.error) throw new Error(data.error);

        setMessages(prev => [...prev, { role: "ai", text: data.text || "Great description! Generating your avatar now..." }]);
        
        // Trigger Avatar Generation
        const genResponse = await fetch(API_CONFIG.AVATAR_API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: userMessage }),
        });
        
        const genData = await genResponse.json();
        if (genData.imageUrl) {
          setAvatarImage(genData.imageUrl);
          setMessages(prev => [...prev, { role: "ai", text: "Here is your generated avatar! Does it look good, or would you like changes?" }]);
          setStep(2);
        }
      } else {
        // General Chat during other steps
        const response = await fetch(API_CONFIG.CHAT_API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            message: userMessage,
            history: messages.map(m => ({ role: m.role === 'ai' ? 'model' : 'user', parts: [{ text: m.text }] }))
          }),
        });
        
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        
        setMessages(prev => [...prev, { role: "ai", text: data.text }]);
        
        if (step === 2 && (userMessage.toLowerCase().includes("good") || userMessage.toLowerCase().includes("yes") || userMessage.toLowerCase().includes("looks"))) {
           setMessages(prev => [...prev, { role: "ai", text: "Perfect! Now, please select the instrument you want to learn." }]);
           setStep(3);
        }
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: "ai", text: "I'm having trouble connecting to my brain right now. Please make sure the API keys are configured." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInstrumentSelect = (id: string, name: string) => {
    setSelectedInstrument(name);
    const newMsg: Message = { role: "user", text: `I want to learn the ${name}.` };
    setMessages((prev) => [...prev, newMsg]);
    
    // Auto-respond for instrument
    setTimeout(() => {
      setMessages((prev) => [...prev, { 
        role: "ai", 
        text: `Excellent choice! The ${name} is a beautiful instrument. We're now generating your 3D character environment. Click the button on the right to start your session!` 
      }]);
      setStep(4);
    }, 1000);
  };

  return (
    <main className="h-screen flex flex-col bg-stone-50 dark:bg-stone-950 font-[var(--font-geist-sans)]">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-6 flex flex-col md:flex-row gap-6 overflow-hidden">
        {/* Chat Area */}
        <Card className="flex-1 flex flex-col border-none shadow-xl bg-white dark:bg-stone-900 overflow-hidden">
          <CardHeader className="border-b bg-orange-50/50 dark:bg-orange-500/10 py-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-2 rounded-full">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <CardTitle className="text-lg">Gemini Banana Pro</CardTitle>
            </div>
          </CardHeader>
          
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.role === "user" 
                      ? "bg-primary text-white rounded-tr-none" 
                      : "bg-muted text-foreground rounded-tl-none border border-orange-100"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted p-3 rounded-2xl rounded-tl-none border border-orange-100 flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span className="text-sm text-muted-foreground">Gemini is thinking...</span>
                  </div>
                </div>
              )}
              
              {step === 2 && avatarImage && (
                <div className="flex justify-start">
                  <div className="bg-muted p-2 rounded-2xl border border-orange-100 max-w-[80%]">
                    <img src={avatarImage} alt="Generated Avatar" className="rounded-xl w-64 h-64 object-cover mb-2" />
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-primary" onClick={() => {
                        setStep(3);
                        setMessages(prev => [...prev, { role: "ai", text: "Perfect! Now, please select the instrument you want to learn." }]);
                      }}>Looks Good!</Button>
                      <Button size="sm" variant="outline" onClick={() => setStep(1)}>Change Features</Button>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {INSTRUMENTS.map((inst) => (
                    <Card 
                      key={inst.id} 
                      className={`cursor-pointer hover:border-primary transition-all overflow-hidden ${selectedInstrument === inst.name ? 'border-primary ring-2 ring-primary/20' : ''}`}
                      onClick={() => handleInstrumentSelect(inst.id, inst.name)}
                    >
                      <div className="aspect-square bg-stone-100 flex items-center justify-center relative">
                        <Music className="h-10 w-10 text-stone-300" />
                        <span className="absolute bottom-2 left-2 text-xs font-bold bg-white/80 px-2 py-1 rounded">{inst.name}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>

          <div className="p-4 border-t bg-stone-50/50">
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="shrink-0 rounded-full border-orange-200">
                <ImageIcon className="h-5 w-5 text-primary" />
              </Button>
              <Input 
                placeholder={step === 3 ? "Select an instrument above..." : "Describe your avatar..."} 
                value={input}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && handleSend()}
                disabled={step === 3 || step === 4 || isLoading}
                className="rounded-full border-orange-200 focus-visible:ring-primary"
              />
              <Button 
                size="icon" 
                className="rounded-full bg-primary h-10 w-10 shrink-0" 
                onClick={handleSend} 
                disabled={step === 3 || step === 4 || isLoading || !input.trim()}
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </Card>

        {/* Live Status Sidebar (Visible as user configures) */}
        <div className="w-full md:w-80 space-y-6 overflow-y-auto">
          <Card className="border-orange-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Active Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step > 1 ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-primary'}`}>
                  {step > 1 ? <Check className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </div>
                <div>
                  <p className="text-sm font-bold">Avatar Creation</p>
                  <p className="text-xs text-muted-foreground">{step > 1 ? "Generated & Validated" : "Waiting for prompt..."}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step > 3 ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-primary opacity-50'}`}>
                  {step > 3 ? <Check className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </div>
                <div>
                  <p className="text-sm font-bold">Instrument Selection</p>
                  <p className="text-xs text-muted-foreground">{selectedInstrument || "Choose your instrument"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {step === 4 && (
            <Link href="/ar" className="w-full">
              <Button size="lg" className="w-full h-16 text-lg font-bold bg-primary hover:bg-primary/90 text-white shadow-lg animate-pulse">
                <Camera className="mr-2 h-6 w-6" />
                GENERATE IN AR
              </Button>
            </Link>
          )}

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-none">
            <CardContent className="p-6">
              <h3 className="font-bold mb-2">Tips for Gemini</h3>
              <p className="text-sm opacity-90">Explain details like clothing style, hair color, or even specific musician traits for the best avatar result!</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
