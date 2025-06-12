"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Code2,
  Eye,
  FileText,
  GitBranch,
  Loader2,
  MessageSquare,
  Search,
  Settings,
  Star,
  Zap,
} from "lucide-react";
import { useState } from "react";

interface AnalyzeResult {
  status: string;
  cached: boolean;
  message: string;
  data?: {
    repository: {
      owner: string;
      name: string;
      description: string;
      language: string;
      stars: number;
    };
    fileCount: number;
    topLevelStructure: string[];
    hasReadme: boolean;
    hasPackageJson: boolean;
  };
}

interface ChatResult {
  answer: string;
  sources: string[];
  questionType: string;
  error?: string;
}

export default function HomePage() {
  const [repoUrl, setRepoUrl] = useState("https://github.com/vercel/next.js");
  const [question, setQuestion] = useState("What does this repo do?");
  const [analyzing, setAnalyzing] = useState(false);
  const [chatting, setChatting] = useState(false);
  const [analyzeResult, setAnalyzeResult] = useState<AnalyzeResult | null>(
    null
  );
  const [chatResult, setChatResult] = useState<ChatResult | null>(null);

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
        cached: false,
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
      setChatResult({
        answer: "",
        sources: [],
        questionType: "",
        error: "Failed to process question",
      });
    }
    setChatting(false);
  };

  const questionTypes = [
    {
      icon: <Eye className="w-4 h-4" />,
      label: "Overview",
      question: "What does this repo do?",
      description: "Get a high-level overview",
    },
    {
      icon: <Zap className="w-4 h-4" />,
      label: "Functionality",
      question: "What functionality is implemented in this repo?",
      description: "Explore features and capabilities",
    },
    {
      icon: <Code2 className="w-4 h-4" />,
      label: "Implementation",
      question: "How is authentication implemented?",
      description: "Deep dive into code details",
    },
    {
      icon: <FileText className="w-4 h-4" />,
      label: "File Analysis",
      question: "What does package.json do?",
      description: "Analyze specific files",
    },
    {
      icon: <Search className="w-4 h-4" />,
      label: "Code Location",
      question: "Where is the API code located?",
      description: "Find specific code locations",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <GitBranch className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                GitHub Repository Chat
              </h1>
            </div>
            <Badge variant="secondary" className="ml-auto">
              AI-Powered Analysis
            </Badge>
          </div>
          <p className="text-muted-foreground mt-2">
            Analyze any GitHub repository and ask questions about its code,
            structure, and functionality
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Repository Analysis Section */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Repository Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* URL Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Repository URL</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="https://github.com/owner/repo"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleAnalyze}
                    disabled={analyzing}
                    className="shrink-0"
                  >
                    {analyzing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      "Analyze"
                    )}
                  </Button>
                </div>
              </div>

              {/* Analysis Results */}
              {analyzeResult && (
                <div className="space-y-4">
                  <Separator />

                  {analyzeResult.status === "success" && analyzeResult.data ? (
                    <div className="space-y-4">
                      {/* Repository Info */}
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {analyzeResult.data.repository.owner}/
                            {analyzeResult.data.repository.name}
                          </h3>
                          <p className="text-muted-foreground text-sm mt-1">
                            {analyzeResult.data.repository.description ||
                              "No description available"}
                          </p>
                        </div>
                        {analyzeResult.cached && (
                          <Badge variant="outline" className="shrink-0">
                            Cached
                          </Badge>
                        )}
                      </div>

                      {/* Repository Stats */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span>
                            {analyzeResult.data.repository.stars.toLocaleString()}{" "}
                            stars
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Code2 className="w-4 h-4 text-blue-500" />
                          <span>
                            {analyzeResult.data.repository.language ||
                              "Multiple"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <FileText className="w-4 h-4 text-green-500" />
                          <span>{analyzeResult.data.fileCount} files</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Settings className="w-4 h-4 text-purple-500" />
                          <span>
                            {analyzeResult.data.hasPackageJson
                              ? "Has package.json"
                              : "No package.json"}
                          </span>
                        </div>
                      </div>

                      {/* Top Level Structure */}
                      <div>
                        <h4 className="font-medium mb-2">
                          Top-level structure:
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {analyzeResult.data.topLevelStructure
                            .slice(0, 8)
                            .map((item, i) => (
                              <Badge
                                key={i}
                                variant="secondary"
                                className="text-xs"
                              >
                                {item}
                              </Badge>
                            ))}
                          {analyzeResult.data.topLevelStructure.length > 8 && (
                            <Badge variant="outline" className="text-xs">
                              +{analyzeResult.data.topLevelStructure.length - 8}{" "}
                              more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-destructive text-sm">
                      {analyzeResult.message}
                    </div>
                  )}
                </div>
              )}

              {/* Quick Questions */}
              <div className="space-y-3">
                <Separator />
                <h4 className="font-medium">Quick Questions</h4>
                <div className="grid gap-2">
                  {questionTypes.map((type, i) => (
                    <Button
                      key={i}
                      variant="ghost"
                      className="justify-start h-auto p-3 text-left"
                      onClick={() => setQuestion(type.question)}
                    >
                      <div className="flex items-start gap-3 w-full">
                        <div className="shrink-0 mt-0.5">{type.icon}</div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium">{type.label}</div>
                          <div className="text-xs text-muted-foreground">
                            {type.description}
                          </div>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chat Section */}
          <Card className="flex flex-col h-[800px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Ask Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col space-y-4">
              {/* Question Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Question</label>
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Ask anything about the repository..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    rows={3}
                    className="resize-none flex-1"
                  />
                  <Button
                    onClick={handleChat}
                    disabled={chatting}
                    className="shrink-0 self-end"
                  >
                    {chatting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Ask"
                    )}
                  </Button>
                </div>
              </div>

              {/* Chat Response */}
              {chatResult && (
                <div className="flex-1 flex flex-col space-y-4">
                  <Separator />

                  {chatResult.error ? (
                    <div className="text-destructive text-sm">
                      {chatResult.error}
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col space-y-4">
                      {/* Question Type Badge */}
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          {chatResult.questionType}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          Question classified as{" "}
                          {chatResult.questionType.toLowerCase()}
                        </span>
                      </div>

                      {/* Answer */}
                      <div className="flex-1 flex flex-col">
                        <h4 className="font-medium mb-2">Answer</h4>
                        <ScrollArea className="flex-1 border rounded-lg p-4 bg-muted/20">
                          <div className="whitespace-pre-wrap text-sm leading-relaxed">
                            {chatResult.answer}
                          </div>
                        </ScrollArea>
                      </div>

                      {/* Sources */}
                      {chatResult.sources && chatResult.sources.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2">Sources</h4>
                          <ScrollArea className="max-h-32 border rounded-lg p-3 bg-muted/20">
                            <div className="space-y-1">
                              {chatResult.sources.map(
                                (source: string, i: number) => (
                                  <div
                                    key={i}
                                    className="flex items-center gap-2 text-sm"
                                  >
                                    <FileText className="w-3 h-3 text-muted-foreground shrink-0" />
                                    <span className="font-mono text-xs">
                                      {source}
                                    </span>
                                  </div>
                                )
                              )}
                            </div>
                          </ScrollArea>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Empty State */}
              {!chatResult && (
                <div className="flex-1 flex items-center justify-center text-center">
                  <div className="space-y-2">
                    <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto" />
                    <p className="text-muted-foreground">
                      Ask a question about the repository to get started
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
