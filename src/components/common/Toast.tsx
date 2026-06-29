"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

type ToastCtx = { show: (message: string) => void };

const Ctx = createContext<ToastCtx | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);

  const show = useCallback((msg: string) => setMessage(msg), []);

  useEffect(() => {
    if (message === null) return;
    const t = setTimeout(() => setMessage(null), 2400);
    return () => clearTimeout(t);
  }, [message]);

  return (
    <Ctx.Provider value={{ show }}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
        {message !== null && (
          <div className="pointer-events-auto rounded-[var(--radius-btn)] bg-ink px-4 py-2.5 text-[13px] text-white shadow-sm">
            {message}
          </div>
        )}
      </div>
    </Ctx.Provider>
  );
}

export function useToast(): ToastCtx {
  const ctx = useContext(Ctx);
  if (!ctx) return { show: () => {} };
  return ctx;
}
