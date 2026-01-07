// apps/web/src/portal/pages/BettyChat.tsx
import BettyFloatinWidget from "../components/BettyFloatingWidget";
import { useEffect } from "react";

export default function BettyChat() {
  useEffect(() => {
    document.title = "Betty - Project Coordinator";
  }, []);

  // Auto-load customer from parent window (optional)
  const customer = (window.opener as any)?.customerData;

  return (
    <div className="h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-md w-full">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-5 text-center">
          <h1 className="text-2xl font-bold">
            Betty - Your Project Coordinator
          </h1>
          <p className="text-sm opacity-90">Simpex Repipe & Plumbing</p>
        </div>
        <div className="h-[600px]">
          <BettyWidget customer={customer || null} />
        </div>
      </div>
    </div>
  );
}
