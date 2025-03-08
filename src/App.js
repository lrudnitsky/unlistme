import React, { useState } from "react";
import "./App.css"; // Ensure the CSS is applied

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading indicator

    try {
      const res = await fetch("http://localhost:4000/find-my-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, linkedin }),
      });

      const data = await res.json();
      setResponse(data.message);
    } catch (error) {
      setResponse("Failed to fetch data. Please try again.");
    }

    setLoading(false); // Hide loading indicator
  };

  return (
    <div className="container">
      <h1>🔍 UnlistMe.io - Find My Data</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Your LinkedIn URL"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Find My Data"}
        </button>
      </form>
      {response && (
        <div className="response">
          <p>{response}</p>
          <a
            href={`mailto:support@data-broker.com?subject=Opt-Out Request&body=Hello, I want to opt out of your database. My details: Name - ${name}, Email - ${email}, LinkedIn - ${linkedin}`}
            className="opt-out-button"
          >
            Request Opt-Out
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
