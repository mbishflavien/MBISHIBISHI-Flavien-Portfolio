import React from 'react';
import { cn } from '@/lib/utils';

export const FastCSSBackground = ({ isDarkMode }: { isDarkMode: boolean }) => {
  return (
    <div
      className={cn(
        "fixed inset-0 -z-50 overflow-hidden pointer-events-none transition-colors duration-700",
        isDarkMode ? "bg-[#0a0a0f]" : "bg-slate-50"
      )}
    >
      {/* Dynamic ambient gradient orbs using CSS animations */}
      <div
        className={cn(
          "absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-40 animate-pulse transition-colors duration-1000",
          isDarkMode ? "bg-purple-900/50" : "bg-purple-200"
        )}
      />
      <div
        className={cn(
          "absolute top-1/3 -right-32 w-[32rem] h-[32rem] rounded-full blur-3xl opacity-30 animate-pulse transition-colors duration-1000",
          isDarkMode ? "bg-blue-900/40" : "bg-blue-200"
        )}
        style={{ animationDelay: '2s' }}
      />
      <div
        className={cn(
          "absolute -bottom-32 left-1/4 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-25 animate-pulse transition-colors duration-1000",
          isDarkMode ? "bg-emerald-900/40" : "bg-emerald-100"
        )}
        style={{ animationDelay: '4s' }}
      />

      {/* Subtle grid pattern overlay */}
      <div
        className={cn(
          "absolute inset-0 opacity-[0.03] transition-opacity duration-700",
          isDarkMode ? "bg-[radial-gradient(#fff_1px,transparent_1px)]" : "bg-[radial-gradient(#000_1px,transparent_1px)]"
        )}
        style={{ backgroundSize: '24px 24px' }}
      />

      <div
        className={cn(
          "absolute inset-0 transition-colors duration-700",
          isDarkMode ? "bg-black/20" : "bg-white/30"
        )}
      />
    </div>
  );
};
export default FastCSSBackground;
