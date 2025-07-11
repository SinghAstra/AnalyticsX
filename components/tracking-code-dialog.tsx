"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { useToastContext } from "./providers/toast";

interface TrackingCodeDialogProps {
  children: React.ReactNode;
  project: {
    trackingId: string;
    name: string;
    domain: string;
  };
}

export function TrackingCodeDialog({
  children,
  project,
}: TrackingCodeDialogProps) {
  const [copied, setCopied] = useState(false);
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
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle>Tracking Code</DialogTitle>
          <DialogDescription className="text-gray-400">
            Add this code to your website&apos;s HTML to start tracking
            analytics.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-300">
                HTML Code
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={copyCode}
                className="text-gray-400 hover:text-white"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <pre className="text-sm text-gray-300 overflow-x-auto">
              <code>{trackingCode}</code>
            </pre>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-white">
              Installation Instructions:
            </h4>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-400">
              <li>Copy the tracking code above</li>
              <li>
                Paste it in your website&apos;s HTML, just before the closing{" "}
                {"</body>"} tag
              </li>
              <li>Deploy your website</li>
              <li>Analytics will start appearing within a few minutes</li>
            </ol>
          </div>

          <div className="bg-yellow-900/20 border border-yellow-800 p-3 rounded-lg">
            <p className="text-sm text-yellow-200">
              <strong>Note:</strong> Make sure to add this code to every page
              you want to track. For single-page applications, the tracking will
              automatically handle route changes.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
