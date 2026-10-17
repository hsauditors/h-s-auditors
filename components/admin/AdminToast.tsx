'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  type: 'success' | 'error' | 'info';
  text: string;
}

interface AdminToastProps {
  message: ToastMessage | null;
  onClose: () => void;
  duration?: number; // ms, default 3800
}

export function AdminToast({
  message,
  onClose,
  duration = 3800,
}: AdminToastProps) {
  const [visible, setVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!message) {
      setVisible(false);
      return;
    }

    setVisible(true);

    if (isPaused) return;

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 250); // allow exit animation to complete
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, onClose, isPaused]);

  if (!message || !visible) return null;

  const isSuccess = message.type === 'success';
  const isError = message.type === 'error';

  return (
    <div
      role="status"
      aria-live="polite"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="fixed top-5 right-5 z-[9999] max-w-sm sm:max-w-md w-[calc(100%-2.5rem)] pointer-events-auto transition-all duration-200 animate-toast-in"
    >
      <div className="relative overflow-hidden bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_14px_40px_rgba(15,23,42,0.14),0_2px_8px_rgba(15,23,42,0.04)] border border-slate-100 p-3.5 sm:p-4 flex items-start gap-3">
        {/* Status Icon */}
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
            isSuccess
              ? 'bg-emerald-50 text-emerald-600 border border-emerald-100/80'
              : isError
              ? 'bg-rose-50 text-rose-600 border border-rose-100/80'
              : 'bg-blue-50 text-blue-600 border border-blue-100/80'
          }`}
        >
          {isSuccess ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 stroke-[2.2]" />
          ) : isError ? (
            <AlertCircle className="w-5 h-5 text-rose-600 stroke-[2.2]" />
          ) : (
            <Info className="w-5 h-5 text-blue-600 stroke-[2.2]" />
          )}
        </div>

        {/* Text Content */}
        <div className="flex-1 min-w-0 pr-1">
          <p className="text-[11px] font-bold tracking-wide uppercase text-slate-400">
            {isSuccess ? 'Success' : isError ? 'Error' : 'Notice'}
          </p>
          <p className="text-xs sm:text-[13px] font-semibold text-slate-800 leading-snug mt-0.5 break-words">
            {message.text}
          </p>
        </div>

        {/* Dismiss Button */}
        <button
          type="button"
          onClick={() => {
            setVisible(false);
            setTimeout(onClose, 200);
          }}
          className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1.5 rounded-lg transition-colors flex-shrink-0 -mr-1 -mt-1"
          title="Dismiss notification"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Animated Duration Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-slate-100 overflow-hidden">
          <div
            className={`h-full ${
              isSuccess ? 'bg-emerald-500' : isError ? 'bg-rose-500' : 'bg-blue-500'
            }`}
            style={{
              animation: `toastProgress ${duration}ms linear forwards`,
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
          />
        </div>
      </div>
    </div>
  );
}
