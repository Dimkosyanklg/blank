import { FormEvent, useState } from "react";

type GithubModelsResponse = {
  model?: string;
  reply?: string;
  message?: string;
};

export default function App() {
  const [prompt, setPrompt] = useState("Hello, how are you?");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [result, setResult] = useState("");
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus("");
    setResult("");

    try {
      const response = await fetch(`${apiBaseUrl}/github-models/test`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = (await response.json()) as GithubModelsResponse;

      if (!response.ok) {
        setStatus(`error (HTTP ${response.status})`);
        setResult(data.message || "Неизвестная ошибка от BFF");
        return;
      }

      setStatus("ok");
      setResult(`Модель: ${data.model}\nОтвет: ${data.reply}`);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "unknown error";
      setStatus("error");
      setResult(`Ошибка запроса к BFF: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <h1>React + Node BFF</h1>
      <p>
        API Base URL: <code>{apiBaseUrl}</code>
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="Введите prompt"
          style={{ width: "100%", maxWidth: 520 }}
        />
        <div style={{ marginTop: 8 }}>
          <button type="submit" disabled={loading}>
            {loading ? "Отправка..." : "Отправить в GitHub Models"}
          </button>
        </div>
      </form>
      <p>
        Статус запроса: <strong>{status || "—"}</strong>
      </p>
      <pre style={{ whiteSpace: "pre-wrap" }}>{result}</pre>
    </main>
  );
}
