import { useEffect, useState } from "react";

type HealthResponse = {
  status?: string;
};

export default function App() {
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    async function fetchHealth() {
      try {
        const response = await fetch(`${apiBaseUrl}/health`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = (await response.json()) as HealthResponse;
        setStatus(data.status || "ok");
        setMessage("BFF доступен");
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "unknown error";
        setStatus("error");
        setMessage(`Ошибка запроса к BFF: ${errorMessage}`);
      }
    }

    fetchHealth();
  }, []);

  return (
    <main>
      <h1>React + Go BFF</h1>
      <p>
        API Base URL: <code>{apiBaseUrl}</code>
      </p>
      <p>
        Статус API: <strong>{status}</strong>
      </p>
      <p>{message}</p>
    </main>
  );
}
