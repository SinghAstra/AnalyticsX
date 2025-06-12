"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function HomePage() {
  const [repoUrl, setRepoUrl] = useState("https://github.com/vercel/next.js");
  const [question, setQuestion] = useState("What does this repo do?");
  const [analyzing, setAnalyzing] = useState(false);
  const [chatting, setChatting] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [analyzeResult, setAnalyzeResult] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [chatResult, setChatResult] = useState<any>(null);

  const handleAnalyze = async () => {
    setAnalyzing(true);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoUrl }),
      });
      const result = await response.json();
      setAnalyzeResult(result);
    } catch (error) {
      console.error("Analyze error:", error);
      setAnalyzeResult({
        status: "error",
        message: "Failed to analyze repository",
      });
    }
    setAnalyzing(false);
  };

  const handleChat = async () => {
    setChatting(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoUrl, question }),
      });
      const result = await response.json();
      setChatResult(result);
    } catch (error) {
      console.error("Chat error:", error);
      setChatResult({ error: "Failed to process question" });
    }
    setChatting(false);
  };

  return (
    <div className=" flex flex-col items-center gap-4 ">
      <div className="flex gap-2 w-full m-4">
        <div className="space-y-2 w-[50%] bg-muted/10 px-3 py-2 border rounded h-fit">
          <h1>Repository Analysis</h1>
          <div className="flex gap-2">
            <Input
              placeholder="GitHub repository URL"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              className="flex-1"
            />
            <Button
              variant={"outline"}
              onClick={handleAnalyze}
              disabled={analyzing}
              className="rounded"
            >
              {analyzing ? "Analyzing..." : "Analyze Repository"}
            </Button>
          </div>
          {analyzeResult && (
            <div className="p-4 border rounded">
              <pre>{JSON.stringify(analyzeResult, null, 2)}</pre>
            </div>
          )}

          <div className="space-y-2 w-full flex flex-col border rounded px-3 bg-muted/10 py-2 max-w-2xl mx-auto">
            <Button
              variant="outline"
              className="bg-transparent"
              onClick={() => setQuestion("What does this repo do?")}
            >
              Overview Question
            </Button>
            <Button
              variant="outline"
              className="bg-transparent"
              onClick={() =>
                setQuestion("What functionality is implemented in this repo?")
              }
            >
              Functionality Question
            </Button>
            <Button
              variant="outline"
              className="bg-transparent"
              onClick={() => setQuestion("How is authentication implemented?")}
            >
              Implementation Question
            </Button>
            <Button
              variant="outline"
              className="bg-transparent"
              onClick={() => setQuestion("What does package.json do?")}
            >
              File Analysis Question
            </Button>
            <Button
              variant="outline"
              className="bg-transparent"
              onClick={() => setQuestion("Where is the API code located?")}
            >
              Code Location Question
            </Button>
          </div>
        </div>

        <div className="space-y-2 w-[50%] bg-muted/10 px-3 py-2 border rounded">
          <h1>Question Classification & Chat</h1>
          <div className="flex gap-2">
            <Textarea
              placeholder="Ask a question about the repository"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={3}
              className="resize-none"
            />
            <Button
              variant={"outline"}
              onClick={handleChat}
              disabled={chatting}
              className="rounded"
            >
              {chatting ? "Processing..." : "Ask Question"}
            </Button>
          </div>

          {chatResult && (
            <div className="p-4 border rounded">
              <pre>
                <div className="overflow-x-auto w-full">
                  {JSON.stringify(chatResult, null, 2)}
                </div>
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
