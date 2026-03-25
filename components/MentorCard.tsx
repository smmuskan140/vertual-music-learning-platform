<<<<<<< HEAD
"use client";

type MentorCardProps = {
  name: string;
  personality: string;
  intro: string;
  instrument: "Guitar" | "Piano";
  idolImage?: string | null;
};

export default function MentorCard({ name, personality, intro, instrument, idolImage }: MentorCardProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">{name}</h2>
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">{instrument} Mentor</span>
      </div>
      <div className="relative mb-4 h-64 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/10" />
        {idolImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={idolImage} alt="Mentor avatar" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-400">Mentor Avatar</div>
        )}
        <div className="absolute bottom-3 right-3 rounded-full bg-white/85 px-3 py-1 text-xs font-medium text-slate-700 shadow">
          {instrument === "Guitar" ? "Holding Guitar" : "Holding Keyboard"}
        </div>
      </div>
      <p className="mb-2 text-sm text-slate-600">{personality}</p>
      <p className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">{intro}</p>
    </section>
=======
'use client';

import { useEffect, useState } from 'react';

type MentorProps = {
  name: string;
  personality: string;
  intro: string;
  environment: string;
  reactions: string[];
  avatarDesc: string;
  roomBase64: string;
  currentReaction: string | null;
  onReactionChange: (reaction: string) => void;
};

export default function MentorCard({
  name, personality, intro, environment, reactions, avatarDesc, roomBase64, currentReaction, onReactionChange
}: MentorProps) {
  const [expression, setExpression] = useState<'idle' | 'happy' | 'nod'>('idle');

  useEffect(() => {
    if (currentReaction) {
      setExpression('happy');
      onReactionChange(currentReaction);
      const timer = setTimeout(() => {
        setExpression('idle');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentReaction]);

  return (
    <div className="relative h-[500px] overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900/20 to-slate-900/50 shadow-2xl ring-1 ring-slate-200/50">
      {/* Environment Background */}
      <div 
        className="absolute inset-0 h-full w-full bg-cover bg-center blur-sm brightness-75"
        style={{ backgroundImage: `url(data:image/jpeg;base64,${roomBase64})` }}
      />
      
      {/* Environment Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
      <div className="absolute left-8 top-12 h-16 w-16 rounded-full bg-amber-400/30 blur-xl" />
      <div className="absolute bottom-12 right-16 h-24 w-24 rounded-full bg-indigo-400/20 blur-xl animate-pulse" />

      {/* Mentor Character - 3D-like layered */}
      <div className="relative mx-8 mt-16 flex h-80 max-w-sm items-end justify-center">
        {/* Main Avatar */}
        <div className="group relative h-80 w-64 animate-float">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-slate-200/20 shadow-2xl ring-2 ring-white/50" />
          <img 
            src={`data:image/jpeg;base64,${roomBase64}`} // placeholder - replace with AI image gen if added
            alt={name}
            className="h-full w-full rounded-2xl object-cover shadow-2xl ring-4 ring-white/60 transition-all hover:brightness-110 group-hover:scale-105"
          />
          
          {/* Instrument overlay */}
          <div className="absolute -bottom-4 left-1/2 h-20 w-32 -translate-x-1/2 rounded-xl bg-gradient-to-r from-yellow-400/80 to-orange-400/80 shadow-xl">
            <div className="flex h-full items-center justify-center text-2xl">
              {avatarDesc.includes('guitar') ? '🎸' : '🎹'}
            </div>
          </div>
          
          {/* Expression overlay */}
          <div className={`absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 rounded-full p-2 transition-all ${
            expression === 'happy' ? 'scale-110 bg-yellow-400/90 shadow-lg' : 
            expression === 'nod' ? 'animate-nod bg-indigo-400/80' : 
            'bg-slate-300/50'
          }`}>
            <span className="text-xl">
              {expression === 'happy' ? '😊' : expression === 'nod' ? '🙂' : '😐'}
            </span>
          </div>
        </div>
      </div>

      {/* Name & Personality */}
      <div className="absolute bottom-6 left-1/2 mx-[-50%] w-[90%] text-center">
        <h2 className="text-2xl font-bold text-white drop-shadow-lg">{name}</h2>
        <p className="text-sm text-slate-200">{personality}</p>
      </div>

      {/* Speech Bubble */}
      {currentReaction && (
        <div className="speech-bubble absolute left-8 top-1/4 w-64 rounded-2xl bg-white/95 p-4 shadow-2xl ring-2 ring-white/50 backdrop-blur-sm">
          <p className="text-sm font-semibold text-slate-900">{currentReaction}</p>
        </div>
      )}

      {/* Intro text at bottom */}
      <div className="absolute bottom-4 w-full text-center">
        <p className="text-xs text-white/80 drop-shadow">{intro}</p>
      </div>

      {/* Environment label */}
      <div className="absolute right-4 top-4 rounded-lg bg-slate-900/80 px-3 py-1 text-xs text-white backdrop-blur-sm">
        {environment.split(' ')[0]}
      </div>
    </div>
>>>>>>> 38018597 (feat: initial commit)
  );
}
