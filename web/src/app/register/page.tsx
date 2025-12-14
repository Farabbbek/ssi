"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"ADMIN" | "DEVELOPER">("DEVELOPER");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Registration failed");
      setMessage("Registered successfully. You can now log in.");
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Register</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          className="w-full border rounded px-3 py-2 bg-white text-black placeholder-gray-500"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="w-full border rounded px-3 py-2 bg-white text-black placeholder-gray-500"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full border rounded px-3 py-2 bg-white text-black placeholder-gray-500"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select
          className="w-full border rounded px-3 py-2 bg-white text-black"
          value={role}
          onChange={(e) => setRole(e.target.value as any)}
        >
          <option value="DEVELOPER">DEVELOPER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        <button
          type="submit"
          className="w-full bg-black text-white rounded py-2"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      {message && <p className="text-green-600 mt-3">{message}</p>}
      {error && <p className="text-red-600 mt-3">{error}</p>}
    </div>
  );
}
