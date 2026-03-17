"use client";

import { useState } from "react";

export function AdminLoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("Enter credentials");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus("Signing in...");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const result = (await response.json()) as { ok: boolean; error?: string };

      if (!response.ok || !result.ok) {
        throw new Error(result.error ?? "Login failed");
      }

      window.location.href = "/admin";
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="adminLoginStage">
      <div className="adminLoginDecor adminLoginDecorOne" />
      <div className="adminLoginDecor adminLoginDecorTwo" />
      <div className="adminLoginDecor adminLoginDecorThree" />
      <div className="adminLoginWave adminLoginWaveLeft" />
      <div className="adminLoginWave adminLoginWaveBottom" />
      <div className="adminLoginScribble adminLoginScribbleOne" />
      <div className="adminLoginScribble adminLoginScribbleTwo" />

      <div className="adminLoginCardWrap">
        <div className="adminLoginMark" aria-hidden="true">
          <span className="adminLoginMarkBar top" />
          <span className="adminLoginMarkBar bottom" />
        </div>

        <form className="adminLoginForm adminLoginGlass" onSubmit={handleSubmit}>
          <p className="adminLoginLogo">Your logo</p>
          <h1 className="adminLoginHeading">Login</h1>
          <p className="adminLoginText">
            First pass browser Basic Auth, then sign in with the admin user for this project.
          </p>

          <label className="adminLoginField">
            <span>Username</span>
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="admin"
            />
          </label>

          <label className="adminLoginField">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
            />
          </label>

          <div className="adminLoginMeta">
            <span>Protected access</span>
            <span>Local CMS</span>
          </div>

          <button type="submit" className="adminLoginSubmit" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>

          <p className="adminLoginStatus">{status}</p>
        </form>
      </div>
    </section>
  );
}
