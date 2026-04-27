import React, { useState } from "react";

function Login() {
  const [form, setForm] = useState({ identifier: "", password: "", remember: false });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid rgba(15,23,42,0.08)",
    marginBottom: 12,
    fontSize: 14,
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!form.identifier.trim() || !form.password.trim()) {
      setError("Please enter your email or username and password.");
      return;
    }
    // Simulate authentication success
    setSuccess("Welcome back — redirecting to your dashboard...");
    console.log("Login payload:", { identifier: form.identifier, remember: form.remember });
    setForm((s) => ({ ...s, password: "" }));
  };

  return (
    <div className="container">
      <div style={{ maxWidth: 480, margin: "48px auto", padding: 28 }} className="card">
        <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 8 }}>
          <div
            aria-hidden
            style={{
              width: 52,
              height: 52,
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 700,
              background: "linear-gradient(135deg,#ff6b6b,#7c4dff)",
              boxShadow: "0 8px 24px rgba(124,77,255,0.12)",
            }}
          >
            EH
          </div>

          <div>
            <h1 style={{ margin: 0, fontSize: 20 }}>EventHub</h1>
            <div style={{ fontSize: 13, color: "#4b5563" }}>Curating unforgettable experiences</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} aria-label="EventHub login form">
          <label htmlFor="identifier" style={{ fontSize: 13, display: "block", marginBottom: 6, color: "#374151" }}>
            Email or username
          </label>
          <input
            id="identifier"
            name="identifier"
            value={form.identifier}
            onChange={handleChange}
            style={inputStyle}
            placeholder="you@provider.com or your-username"
            autoComplete="username"
          />

          <label htmlFor="password" style={{ fontSize: 13, display: "block", marginBottom: 6, color: "#374151" }}>
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            style={inputStyle}
            placeholder="Enter your password"
            autoComplete="current-password"
          />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
              <input
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={handleChange}
                style={{ width: 16, height: 16 }}
              />
              <span style={{ color: "#6b7280" }}>Keep me signed in</span>
            </label>

            <a href="#forgot" style={{ fontSize: 13, color: "#4f46e5", textDecoration: "none" }}>
              Forgot password?
            </a>
          </div>

          {error && <div style={{ color: "#b91c1c", marginBottom: 12 }}>{error}</div>}
          {success && <div style={{ color: "#065f46", marginBottom: 12 }}>{success}</div>}

          <div style={{ display: "flex", gap: 12 }}>
            <button type="submit" style={{ flex: 1, background: "#4f46e5", color: "#fff", border: "none", padding: "10px 12px", borderRadius: 8, cursor: "pointer", fontWeight: 600 }}>
              Sign in
            </button>
            <button
              type="button"
              onClick={() => setForm({ identifier: "", password: "", remember: false })}
              style={{ flex: 1, background: "transparent", border: "1px solid rgba(15,23,42,0.06)", padding: "10px 12px", borderRadius: 8, cursor: "pointer" }}
            >
              Reset
            </button>
          </div>

          <div style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: "#6b7280" }}>
            Or continue with
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            <button
              type="button"
              style={{
                flex: 1,
                background: "#fff",
                border: "1px solid rgba(15,23,42,0.06)",
                boxShadow: "0 6px 18px rgba(2,6,23,0.06)",
                padding: "8px 10px",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              Google
            </button>
            <button
              type="button"
              style={{
                flex: 1,
                background: "#fff",
                border: "1px solid rgba(15,23,42,0.06)",
                boxShadow: "0 6px 18px rgba(2,6,23,0.06)",
                padding: "8px 10px",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              Apple
            </button>
          </div>

          <div style={{ textAlign: "center", marginTop: 18, fontSize: 13 }}>
            <span style={{ color: "#6b7280" }}>Don’t have an account?</span>{" "}
            <a href="#register" style={{ color: "#4f46e5", fontWeight: 600 }}>
              Create account
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;