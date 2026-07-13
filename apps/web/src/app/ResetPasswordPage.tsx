export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: ["L3_INTEGRATION"],
};

import React, { useState } from "react";
import axios from "axios";

export default function ResetPasswordPage() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token") || "";
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/password-reset/reset", { token, password });
      setMessage("Password reset successful. Redirecting...");
      setTimeout(() => (window.location.href = "/portal"), 1200);
    } catch {
      setMessage("Invalid or expired token.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleReset}
        className="bg-white p-8 rounded-xl shadow w-96"
      >
        <h2 className="text-xl font-semibold mb-4">Set Your New Password</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password"
          className="w-full border p-2 mb-3 rounded"
        />
        <button className="w-full bg-green-600 text-white py-2 rounded">
          Update Password
        </button>
        <p className="text-sm mt-3 text-gray-600">{message}</p>
      </form>
    </div>
  );
}
