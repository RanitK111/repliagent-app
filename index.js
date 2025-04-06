// pages/index.js
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch("/api/generate-reply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    setReply(data.reply);
    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#1e40af", fontSize: "2rem" }}>REPLIAGENT</h1>
      <p style={{ fontStyle: "italic", color: "#4b5563" }}>
        Your AI DM Assistant for Realtors
      </p>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Paste your lead's message here..."
        rows="5"
        style={{ width: "100%", marginTop: "1rem", padding: "1rem" }}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          marginTop: "1rem",
          padding: "0.75rem 1.5rem",
          backgroundColor: "#1e40af",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {loading ? "Generating..." : "Generate Reply"}
      </button>

      {reply && (
        <div
          style={{
            marginTop: "2rem",
            padding: "1rem",
            backgroundColor: "#f3f4f6",
            borderRadius: "5px",
          }}
        >
          <strong>AI Reply:</strong>
          <p>{reply}</p>
        </div>
      )}
    </div>
  );
}
