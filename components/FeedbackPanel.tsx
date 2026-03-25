<<<<<<< HEAD
"use client";

type FeedbackPanelProps = {
=======
'use client';

type FeedbackProps = {
>>>>>>> 38018597 (feat: initial commit)
  feedback: string;
  tip: string;
  score: number;
  xp: number;
<<<<<<< HEAD
};

export default function FeedbackPanel({ feedback, tip, score, xp }: FeedbackPanelProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-slate-900">Live Feedback</h3>
      <div className="mb-4 grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">Score</p>
          <p className="text-2xl font-bold text-slate-900">{score}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">XP</p>
          <p className="text-2xl font-bold text-indigo-700">{xp}</p>
        </div>
      </div>
      <p className="mb-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">{feedback}</p>
      <p className="text-sm text-slate-600">
        <span className="font-medium text-slate-800">Tip:</span> {tip}
      </p>
    </section>
=======
  streak: number;
  tier: 'perfect' | 'good' | 'try-again';
};

const tierColors = {
  perfect: 'from-emerald-500 to-emerald-600',
  good: 'from-indigo-500 to-indigo-600',
  'try-again': 'from-orange-500 to-orange-600',
};

export default function FeedbackPanel({ 
  feedback, 
  tip, 
  score, 
  xp, 
  streak, 
  tier 
}: FeedbackProps) {
  return (
    <div className="space-y-6 rounded-3xl bg-white p-8 shadow-2xl ring-1 ring-slate-200">
      <h3 className="text-2xl font-bold text-slate-900">Live Feedback</h3>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="group relative rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 p-6 shadow-sm transition-all hover:shadow-lg">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Score</p>
          <p className="text-4xl font-black text-slate-900">{Math.round(score)}</p>
          <div className={`absolute inset-0 -m-1 rounded-2xl bg-gradient-to-r ${tierColors[tier]} blur opacity-20 transition-all group-hover:opacity-30`} />
        </div>
        
        <div className="rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 shadow-sm">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">XP</p>
          <p className="text-4xl font-black text-indigo-700">+{xp}</p>
          <p className="text-sm font-semibold text-indigo-600">Total: {xp * streak}</p>
        </div>
        
        <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 shadow-sm">
          <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wide">Streak</p>
          <p className="text-4xl font-black text-emerald-700">{streak}</p>
          <p className="text-xs text-emerald-600">Sessions in a row</p>
        </div>
      </div>

      {/* Feedback */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100 p-6 shadow-sm">
        <p className="text-xl font-semibold text-slate-900">{feedback}</p>
        <p className="mt-2 text-lg text-slate-600">Tip: <span className="font-semibold text-slate-800">{tip}</span></p>
      </div>

      {/* Tier Badge */}
      <div className={`rounded-2xl p-4 text-center font-bold text-white shadow-xl ring-1 ring-white/20 ${tierColors[tier]} ${tier === 'perfect' ? 'scale-105 shadow-emerald-500/25' : ''}`}>
        {tier.toUpperCase()}!
      </div>
    </div>
>>>>>>> 38018597 (feat: initial commit)
  );
}
