'use client';

import React, { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';

export default function CounterApresiasi() {
  const [skor, setSkor] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const handleApresiasi = () => {
    setSkor((prev) => prev + 1);
    setIsLiked(true);
    setTimeout(() => setIsLiked(false), 500);
  };

  return (
    <div className="inline-flex items-center gap-3 bg-white/90 dark:bg-gray-800/90 px-4 py-2 rounded-2xl border border-gray-200/80 dark:border-gray-700 shadow-md backdrop-blur-sm transition-all hover:shadow-lg">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-200">
        <Heart
          className={`w-4 h-4 transition-transform duration-300 ${
            isLiked
              ? 'scale-130 text-rose-500 fill-rose-500'
              : 'text-rose-500 dark:text-rose-400'
          }`}
        />
        <span>Appreciation:</span>
      </div>

      <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 min-w-[1.75rem] text-center text-sm">
        {skor}
      </span>

      <button
        type="button"
        onClick={handleApresiasi}
        className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-xs rounded-xl shadow-sm transition-all duration-200"
      >
        <Sparkles className="w-3 h-3" />
        + Give Appreciation
      </button>
    </div>
  );
}
