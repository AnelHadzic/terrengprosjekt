"use client";
import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState<string | null>(null);

  const testDatabaseConnection = async () => {
    try {
      const response = await fetch("/api/test-db");
      if (response.ok) {
        setResult("Database operation successful");
      } else {
        setResult("Database operation failed");
      }
    } catch (error) {
      console.error("Client-side request error:", error);
      setResult("Database operation failed");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Test Database Connection</h1>
      <button onClick={testDatabaseConnection}>Test Connection</button>
      {result && <p>{result}</p>}
    </main>
  );
}
