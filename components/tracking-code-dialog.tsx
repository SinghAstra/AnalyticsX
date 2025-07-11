"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Project } from "@prisma/client";
import { Check, Code, Copy } from "lucide-react";
import { useState } from "react";
import Dialog from "./componentX/dialog";
import { useToastContext } from "./providers/toast";

interface TrackingCodeDialogProps {
  project: Project;
}

export function TrackingCodeDialog({ project }: TrackingCodeDialogProps) {
  const [copied, setCopied] = useState(false);
  const [isTrackingCodeDialogOpen, setIsTrackingCodeDialogOpen] =
    useState(false);
  const { setToastMessage } = useToastContext();

  const trackingCode = `<!-- Analytics Tracking Code for ${project.name} -->
<script>
  (function() {
    var script = document.createElement('script');
    script.src = '${
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    }/api/track.js?id=${project.trackingId}';
    script.async = true;
    document.head.appendChild(script);
  })();
</script>`;

  const copyCode = () => {
    navigator.clipboard.writeText(trackingCode);
    setCopied(true);
    setToastMessage("Tracking code copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Button
        variant="outline"
        className="rounded bg-muted/50 hover:bg-muted/60"
        onClick={() => setIsTrackingCodeDialogOpen(true)}
      >
        <Code className="w-4 h-4 mr-1" />
        Get Tracking Code
      </Button>
      <Dialog
        isDialogVisible={isTrackingCodeDialogOpen}
        setIsDialogVisible={setIsTrackingCodeDialogOpen}
      >
        <div className="px-3 py-2 bg-muted/20">
          <h2 className="text-xl">Tracking Code</h2>
          <p className="text-sm text-muted-foreground">
            Add this code to your website&apos;s HTML to start tracking
            analytics.
          </p>
          <div className="space-y-4 mt-4">
            <div className="bg-muted/40 p-2 rounded border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">
                  HTML Code
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyCode}
                  className="text-muted-foreground/60 hover:text-muted-foreground/80"
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <pre className="text-sm text-foreground overflow-x-auto">
                <code>{trackingCode}</code>
              </pre>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-foreground">
                Installation Instructions:
              </h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                <li>Copy the tracking code above</li>
                <li>
                  Paste it in your website&apos;s HTML, just before the closing{" "}
                  {"</body>"} tag
                </li>
                <li>Deploy your website</li>
                <li>Analytics will start appearing within a few minutes</li>
              </ol>
            </div>

            <div className="bg-yellow-900/20 border border-yellow-800 px-3 py-2 rounded">
              <p className="text-sm text-yellow-200">
                <strong>Note:</strong> Make sure to add this code to every page
                you want to track. For single-page applications, the tracking
                will automatically handle route changes.
              </p>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
