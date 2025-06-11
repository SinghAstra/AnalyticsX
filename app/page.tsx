"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function TestPage() {
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
    <div className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">
        GitHub Repository Chat - Day 1 Test
      </h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Repository Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="GitHub repository URL"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
            />
            <Button onClick={handleAnalyze} disabled={analyzing}>
              {analyzing ? "Analyzing..." : "Analyze Repository"}
            </Button>
            {analyzeResult && (
              <div className="p-4  rounded">
                <pre>{JSON.stringify(analyzeResult, null, 2)}</pre>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Question Classification & Chat</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Ask a question about the repository"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={3}
            />
            <Button onClick={handleChat} disabled={chatting}>
              {chatting ? "Processing..." : "Ask Question"}
            </Button>
            {chatResult && (
              <div className="p-4  rounded">
                <pre>{JSON.stringify(chatResult, null, 2)}</pre>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Test Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button
                variant="outline"
                onClick={() => setQuestion("What does this repo do?")}
              >
                Overview Question
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  setQuestion("What functionality is implemented in this repo?")
                }
              >
                Functionality Question
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  setQuestion("How is authentication implemented?")
                }
              >
                Implementation Question
              </Button>
              <Button
                variant="outline"
                onClick={() => setQuestion("What does package.json do?")}
              >
                File Analysis Question
              </Button>
              <Button
                variant="outline"
                onClick={() => setQuestion("Where is the API code located?")}
              >
                Code Location Question
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
