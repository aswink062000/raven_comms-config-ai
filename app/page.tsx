"use client";

import { useState, useEffect } from "react";

import {
  Copy,
  FileJson,
  Moon,
  Sparkles,
  Sun,
  Wand2,
  CheckCircle2,
  BrainCircuit,
  Download,
  History,
  AlertTriangle,
  Code2,
  Eye,
  ShieldCheck,
  XCircle,
  List,
  ExternalLink,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useTheme } from "next-themes";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";

import { Card } from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Skeleton } from "@/components/ui/skeleton";

import { Badge } from "@/components/ui/badge";

import { JsonViewer } from "@/components/ui/json-viewer";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { LoadingAnimation, SkeletonLoader } from "@/components/ui/loading-animation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Home() {
  const { theme, setTheme } =
    useTheme();

  const [mounted, setMounted] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [showError, setShowError] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [locale, setLocale] =useState("en_US");

  const [channel, setChannel] =useState("EMAIL");

  const [ffId, setFfId] =
    useState("FFASK001");

 const [payload, setPayload] =
  useState("");

const [validation, setValidation] =
  useState<any>(null);

  const [aiInfo, setAiInfo] =
    useState<any>(null);

  const [payloadHistory, setPayloadHistory] =
    useState<any[]>([]);

  const [showHistory, setShowHistory] =
    useState(false);

  const [copied, setCopied] =
    useState(false);

  const [parsedPayload, setParsedPayload] =
    useState<any>(null);

  const [viewMode, setViewMode] =
    useState<"formatted" | "raw">("formatted");

  const [schemaValidation, setSchemaValidation] =
    useState<any>(null);

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load history from session storage on mount
  useEffect(() => {
    const savedHistory = sessionStorage.getItem("payloadHistory");
    if (savedHistory) {
      setPayloadHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Parse payload when it changes
  useEffect(() => {
    if (payload) {
      try {
        const parsed = JSON.parse(payload);
        setParsedPayload(parsed);
        
        // Perform schema validation
        validatePayloadSchema(parsed);
      } catch (error) {
        setParsedPayload(null);
        setSchemaValidation(null);
      }
    } else {
      setParsedPayload(null);
      setSchemaValidation(null);
    }
  }, [payload]);

  const generatePayload =
    async () => {
      if (!ffId) {
        setErrorMessage("FF ID is required before generating payload.");
        setShowError(true);
        return;
      }

      setLoading(true);
      setErrorMessage("");

      try {
        const response = await fetch(
          "/api/generate",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

          body: JSON.stringify({
          ffId,
          locale,
          channel,
          }),
          }
        );

        const data =
          await response.json();

        if (!response.ok) {
          setErrorMessage(data.error || "Failed to generate payload");
          setShowError(true);
          return;
        }

        const payloadString = JSON.stringify(
          data.payload,
          null,
          2
        );

        setPayload(payloadString);

        setValidation(data.validation);

        const newAiInfo = {
          ffId,

          event:
            data?.payload?.event?.id ||
            "Unknown",

          locale:
            data?.payload?.template
              ?.locale?.[0],

          channel:
            data?.payload?.channel?.[0],

          recipientSchema:
            data?.payload?.recipient
              ?.schema,

          variables: Object.keys(
            data?.payload?.event
              ?.params || {}
          ),

          confidence: "98%",

          aiSummary:
            "AI successfully mapped template variables and generated required payload parameters.",

          timestamp: new Date().toISOString(),
        };

        setAiInfo(newAiInfo);

        // Add to history
        const historyEntry = {
          ffId,
          locale,
          channel,
          timestamp: new Date().toISOString(),
          payload: data.payload,
        };

        const updatedHistory = [historyEntry, ...payloadHistory].slice(0, 10);
        setPayloadHistory(updatedHistory);
        sessionStorage.setItem("payloadHistory", JSON.stringify(updatedHistory));

      } catch (error) {
        setErrorMessage("Network error: Failed to connect to the server");
        setShowError(true);
      } finally {
        setLoading(false);
      }
    };

  const copyPayload =
    async () => {
      await navigator.clipboard.writeText(
        payload
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

  const downloadPayload = () => {
    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `payload_${ffId}_${new Date().getTime()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const loadFromHistory = (entry: any) => {
    setFfId(entry.ffId);
    setLocale(entry.locale);
    setChannel(entry.channel);
    setPayload(JSON.stringify(entry.payload, null, 2));
    setShowHistory(false);
  };

  const validatePayloadSchema = (payloadData: any) => {
    const errors: Array<{ field: string; message: string }> = [];

    // Check required top-level fields
    const requiredFields = ["event", "recipient", "channel", "template", "addresses"];
    requiredFields.forEach((field) => {
      if (!payloadData[field]) {
        errors.push({
          field,
          message: `Missing required field: ${field}`,
        });
      }
    });

    // Validate event structure
    if (payloadData.event) {
      if (!payloadData.event.id) {
        errors.push({ field: "event.id", message: "Event ID is required" });
      }
      if (!payloadData.event.params) {
        errors.push({ field: "event.params", message: "Event params are required" });
      }
    }

    // Validate recipient structure
    if (payloadData.recipient) {
      if (!payloadData.recipient.schema) {
        errors.push({ field: "recipient.schema", message: "Recipient schema is required" });
      }
      if (!payloadData.recipient.id) {
        errors.push({ field: "recipient.id", message: "Recipient ID is required" });
      }
    }

    // Validate channel
    if (payloadData.channel && !Array.isArray(payloadData.channel)) {
      errors.push({ field: "channel", message: "Channel must be an array" });
    }

    // Validate addresses
    if (payloadData.addresses) {
      if (!Array.isArray(payloadData.addresses)) {
        errors.push({ field: "addresses", message: "Addresses must be an array" });
      } else if (payloadData.addresses.length === 0) {
        errors.push({ field: "addresses", message: "At least one address is required" });
      }
    }

    setSchemaValidation({
      valid: errors.length === 0,
      errors,
      timestamp: new Date().toISOString(),
    });
  };

  // Available templates data
  const templates = [
    { ffId: "FFASK001", channel: "EMAIL", locale: "en_US", event: "ATM Fee Reversal", badge: "EMAIL" },
    { ffId: "FFASK002", channel: "EMAIL", locale: "en_IN", event: "Payment Confirmation", badge: "EMAIL" },
    { ffId: "FFASK003", channel: "SMS", locale: "en_US", event: "Card Activation", badge: "SMS" },
    { ffId: "FFASK004", channel: "EMAIL", locale: "en_US", event: "Account Upgrade", badge: "EMAIL" },
    { ffId: "FFASK005", channel: "EMAIL", locale: "en_IN", event: "Loan Approval", badge: "EMAIL" },
    { ffId: "FFASK006", channel: "PUSH", locale: "en_US", event: "Statement Ready", badge: "PUSH" },
    { ffId: "FFASK007", channel: "LETTER", locale: "en_US", event: "Account Closure", badge: "LETTER" },
    { ffId: "FFASK008", channel: "LETTER", locale: "en_IN", event: "Welcome Letter", badge: "LETTER" },
    { ffId: "FFASK009", channel: "SMS", locale: "en_US", event: "Low Balance Alert", badge: "SMS" },
    { ffId: "FFASK010", channel: "SMS", locale: "en_IN", event: "Balance Alert", badge: "SMS" },
    { ffId: "FFASK011", channel: "PUSH", locale: "en_US", event: "Fraud Alert", badge: "PUSH" },
    { ffId: "FFASK012", channel: "PUSH", locale: "en_IN", event: "Fraud Alert", badge: "PUSH" },
  ];

  const loadTemplate = (template: any) => {
    setFfId(template.ffId);
    setLocale(template.locale);
    setChannel(template.channel);
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="w-full lg:w-72 bg-blue-900 text-white border-b lg:border-r lg:border-b-0 flex flex-col">
          <div className="flex items-center justify-between p-3 lg:p-5 border-b border-blue-800">
            <div>
              <h1 className="font-bold text-lg lg:text-xl leading-tight">
                Enterprise
              </h1>

              <p className="text-xs lg:text-sm text-blue-100">
                Communication Platform
              </p>
            </div>

            <Button
              size="icon"
              variant="ghost"
              className="text-white hover:bg-blue-800"
              onClick={() =>
                setTheme(
                  theme === "dark"
                    ? "light"
                    : "dark"
                )
              }
            >
              {mounted ? (
                theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )
              ) : (
                <div className="h-5 w-5" />
              )}
            </Button>
          </div>

          <div className="p-2 lg:p-3 space-y-2 lg:space-y-3 overflow-y-auto">
            <div className="flex items-center gap-2 lg:gap-3 rounded-xl bg-blue-800 px-3 lg:px-4 py-3 lg:py-4">
              <FileJson className="h-4 w-4 lg:h-5 lg:w-5" />

              <span className="font-medium text-sm lg:text-base">
                Generate Payload
              </span>
            </div>

            {payloadHistory.length > 0 && (
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="w-full flex items-center gap-2 lg:gap-3 rounded-xl bg-blue-800/50 hover:bg-blue-800 px-3 lg:px-4 py-2 lg:py-3 transition-colors"
              >
                <History className="h-4 w-4 lg:h-5 lg:w-5" />
                <span className="font-medium text-sm lg:text-base">
                  History ({payloadHistory.length})
                </span>
              </button>
            )}

            {showHistory && (
              <div className="rounded-xl bg-blue-950/60 p-2 lg:p-3 border border-blue-800 max-h-48 lg:max-h-64 overflow-y-auto">
                <div className="space-y-2">
                  {payloadHistory.map((entry, idx) => (
                    <button
                      key={idx}
                      onClick={() => loadFromHistory(entry)}
                      className="w-full text-left p-2 lg:p-3 rounded-lg bg-blue-900/50 hover:bg-blue-900 transition-colors"
                    >
                      <div className="text-xs lg:text-sm font-medium">{entry.ffId}</div>
                      <div className="text-xs text-blue-200">
                        {entry.channel} • {entry.locale}
                      </div>
                      <div className="text-xs text-blue-300 mt-1">
                        {new Date(entry.timestamp).toLocaleString()}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-xl bg-blue-950/40 p-3 lg:p-4 border border-blue-800">
              <div className="flex items-center gap-2 mb-2 lg:mb-3">
                <BrainCircuit className="h-4 w-4 lg:h-5 lg:w-5 text-cyan-400" />

                <h3 className="font-semibold text-sm lg:text-base">
                  AI Engine
                </h3>
              </div>

              <div className="space-y-1 lg:space-y-2 text-xs lg:text-sm text-blue-100">
                <p>
                  ✔ FF Mapping Engine
                </p>

                <p>
                  ✔ Event Resolver
                </p>

                <p>
                  ✔ Template Resolver
                </p>

                <p>
                  ✔ Variable Detection
                </p>

                <p>
                  ✔ Payload Generator
                </p>

                <p>
                  ✔ Schema Validation (AJV)
                </p>
              </div>
            </div>

            {/* Validation Status */}
            {schemaValidation && (
              <div className={`rounded-xl p-3 lg:p-4 border ${
                schemaValidation.valid
                  ? "bg-green-900/30 border-green-700"
                  : "bg-red-900/30 border-red-700"
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  {schemaValidation.valid ? (
                    <ShieldCheck className="h-4 w-4 lg:h-5 lg:w-5 text-green-400" />
                  ) : (
                    <XCircle className="h-4 w-4 lg:h-5 lg:w-5 text-red-400" />
                  )}
                  <h3 className="font-semibold text-sm lg:text-base">
                    {schemaValidation.valid ? "Valid Payload" : "Validation Issues"}
                  </h3>
                </div>
                <p className="text-xs text-blue-100">
                  {schemaValidation.valid
                    ? "All schema requirements met"
                    : `${schemaValidation.errors.length} validation error(s) found`}
                </p>
              </div>
            )}
          </div>

          <div className="mt-auto p-3 lg:p-4 border-t border-blue-800">
            <div className="text-xs text-blue-200">
              Enterprise Payload AI v1.0
            </div>
          </div>
        </aside>

        {/* Main */}
        <section className="flex-1 overflow-auto p-3 lg:p-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
            {/* Left */}
            <div className="space-y-4 lg:space-y-6">
              {/* Generator */}
              <Card className="p-4 lg:p-6 rounded-2xl shadow-sm">
                <div className="space-y-4 lg:space-y-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 lg:h-6 lg:w-6 text-blue-600" />

                      <h2 className="text-xl lg:text-2xl font-bold">
                        AI Payload Generator
                      </h2>
                    </div>

                    <p className="text-muted-foreground text-xs lg:text-sm mt-2">
                      Generate enterprise
                      communication payloads
                      using FF ID
                    </p>

                    {/* Quick Templates Link */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline mt-2">
                          <List className="h-3 w-3" />
                          View all available templates
                          <ExternalLink className="h-3 w-3" />
                        </button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <List className="h-5 w-5" />
                            Available Templates
                          </DialogTitle>
                          <DialogDescription>
                            Click any template to load it into the generator
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="mt-4">
                          <div className="rounded-lg border overflow-hidden">
                            <table className="w-full text-sm">
                              <thead className="bg-muted">
                                <tr>
                                  <th className="text-left p-3 font-semibold">FF ID</th>
                                  <th className="text-left p-3 font-semibold">Channel</th>
                                  <th className="text-left p-3 font-semibold">Locale</th>
                                  <th className="text-left p-3 font-semibold">Event</th>
                                  <th className="text-center p-3 font-semibold">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {templates.map((template, idx) => (
                                  <tr 
                                    key={idx} 
                                    className="border-t hover:bg-muted/50 transition-colors"
                                  >
                                    <td className="p-3 font-mono font-semibold text-blue-600 dark:text-blue-400">
                                      {template.ffId}
                                    </td>
                                    <td className="p-3">
                                      <Badge 
                                        variant={
                                          template.badge === "EMAIL" ? "default" :
                                          template.badge === "SMS" ? "secondary" :
                                          template.badge === "PUSH" ? "outline" :
                                          "destructive"
                                        }
                                        className="text-xs"
                                      >
                                        {template.badge}
                                      </Badge>
                                    </td>
                                    <td className="p-3 font-mono text-xs">
                                      {template.locale}
                                    </td>
                                    <td className="p-3 text-xs">
                                      {template.event}
                                    </td>
                                    <td className="p-3 text-center">
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => {
                                          loadTemplate(template);
                                          document.querySelector('[data-state="open"]')?.querySelector('button')?.click();
                                        }}
                                        className="h-8 text-xs gap-1"
                                      >
                                        Load
                                        <ExternalLink className="h-3 w-3" />
                                      </Button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>

                          {/* Channel Legend */}
                          <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                            <p className="text-xs font-semibold mb-2">Channel Types:</p>
                            <div className="flex flex-wrap gap-3 text-xs">
                              <div className="flex items-center gap-1">
                                <Badge variant="default" className="text-xs">EMAIL</Badge>
                                <span className="text-muted-foreground">- Detailed communications</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Badge variant="secondary" className="text-xs">SMS</Badge>
                                <span className="text-muted-foreground">- Quick alerts</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Badge variant="outline" className="text-xs">PUSH</Badge>
                                <span className="text-muted-foreground">- App notifications</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Badge variant="destructive" className="text-xs">LETTER</Badge>
                                <span className="text-muted-foreground">- Formal documents</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  {/* Important Note */}
                  <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 lg:p-4">
                    <div className="flex gap-2 lg:gap-3">
                      <AlertTriangle className="h-4 w-4 lg:h-5 lg:w-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="text-xs lg:text-sm font-semibold text-amber-900 dark:text-amber-100">
                          Important: AI-Generated Sample Data
                        </p>
                        <p className="text-xs text-amber-800 dark:text-amber-200">
                          Account numbers and personal information in generated payloads are AI-created masked samples (e.g., XXXX1234). 
                          Please replace with proper account numbers & varaianle if required before using.
                        </p>
                      </div>
                    </div>
                  </div>

                 <div className="space-y-2">
  <Label>FF ID</Label>

  <Input
    value={ffId}
    onChange={(e) =>
      setFfId(e.target.value)
    }
    placeholder="Enter FF ID"
    className="h-11"
  />
</div>

<div className="space-y-2">
  <Label>Locale</Label>

  <Input
    value={locale}
    onChange={(e) =>
      setLocale(e.target.value)
    }
    placeholder="en_US"
    className="h-11"
  />
</div>

<div className="space-y-2">
  <Label>Channel</Label>

  <Select
    value={channel}
    onValueChange={setChannel}
  >
    <SelectTrigger className="h-11">
      <SelectValue />
    </SelectTrigger>

    <SelectContent>
      <SelectItem value="EMAIL">
        EMAIL
      </SelectItem>

      <SelectItem value="SMS">
        SMS
      </SelectItem>

      <SelectItem value="PUSH">
        PUSH
      </SelectItem>

      <SelectItem value="LETTER">
        LETTER
      </SelectItem>
    </SelectContent>
  </Select>
</div>

                  <Button
                    className="w-full h-10 lg:h-11 gap-2 text-sm lg:text-base"
                    onClick={
                      generatePayload
                    }
                    disabled={loading}
                  >
                    <Wand2 className="h-4 w-4" />

                    {loading
                      ? "AI Generating Payload..."
                      : "Generate Payload"}
                  </Button>
                </div>
              </Card>

              {/* AI Analysis */}
              <Card className="p-4 lg:p-6 rounded-2xl shadow-sm">
                <div className="flex items-center gap-2 mb-4 lg:mb-5">
                  <BrainCircuit className="h-4 w-4 lg:h-5 lg:w-5 text-violet-600" />

                  <h2 className="text-lg lg:text-xl font-bold">
                    AI Analysis
                  </h2>
                </div>

                {loading ? (
                  <SkeletonLoader />
                ) : aiInfo ? (
                  <div className="space-y-4 lg:space-y-5">
                    <div className="grid grid-cols-2 gap-3 lg:gap-4">
                      <div>
                        <p className="text-xs lg:text-sm text-muted-foreground">
                          Event
                        </p>

                        <p className="font-semibold text-sm lg:text-base">
                          {aiInfo.event}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs lg:text-sm text-muted-foreground">
                          Locale
                        </p>

                        <p className="font-semibold text-sm lg:text-base">
                          {
                            aiInfo.locale
                          }
                        </p>
                      </div>

                      <div>
                        <p className="text-xs lg:text-sm text-muted-foreground">
                          Channel
                        </p>

                        <p className="font-semibold text-sm lg:text-base">
                          {
                            aiInfo.channel
                          }
                        </p>
                      </div>

                      <div>
                        <p className="text-xs lg:text-sm text-muted-foreground">
                          Recipient
                        </p>

                        <p className="font-semibold text-sm lg:text-base">
                          {
                            aiInfo.recipientSchema
                          }
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs lg:text-sm text-muted-foreground mb-2 lg:mb-3">
                        Detected Variables
                      </p>

                      <div className="flex flex-wrap gap-1.5 lg:gap-2">
                        {aiInfo.variables.map(
                          (
                            variable: string
                          ) => (
                            <Badge
                              key={
                                variable
                              }
                              className="gap-1 text-xs"
                            >
                              <CheckCircle2 className="h-3 w-3" />

                              {variable}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-muted-foreground text-xs lg:text-sm">
                    AI analysis will
                    appear here after
                    payload generation
                  </div>
                )}
              </Card>

              <Card className="p-4 lg:p-6 rounded-2xl shadow-sm">
  <div className="flex items-center gap-2 mb-4 lg:mb-5">
    <CheckCircle2 className="h-4 w-4 lg:h-5 lg:w-5 text-green-600" />

    <h2 className="text-lg lg:text-xl font-bold">
      Required Parameters
    </h2>
  </div>

  {validation ? (
    <div className="space-y-2 lg:space-y-3">
      {validation.requiredParams.map(
        (param: string) => {
          const exists =
            validation.generatedParams.includes(
              param
            );

          return (
            <div
              key={param}
              className="flex items-center justify-between border rounded-lg px-3 lg:px-4 py-2 lg:py-3"
            >
              <span className="font-medium text-sm lg:text-base">
                {param}
              </span>

              <Badge
                variant={
                  exists
                    ? "default"
                    : "destructive"
                }
                className="text-xs"
              >
                {exists
                  ? "Generated"
                  : "Missing"}
              </Badge>
            </div>
          );
        }
      )}
    </div>
  ) : (
    <div className="text-xs lg:text-sm text-muted-foreground">
      Required event parameters
      will appear here
    </div>
  )}
</Card>
            </div>

            {/* Right */}
            <Card className="p-4 lg:p-6 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between mb-4 lg:mb-5">
                <div>
                  <h2 className="text-xl lg:text-2xl font-bold">
                    Generated Payload
                  </h2>

                  <p className="text-muted-foreground text-xs lg:text-sm mt-1">
                    Enterprise JSON payload
                    preview
                  </p>
                </div>

                {payload && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={copyPayload}
                      title={copied ? "Copied!" : "Copy to clipboard"}
                    >
                      {copied ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={downloadPayload}
                      title="Download as JSON"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Schema Validation Status */}
              {schemaValidation && payload && (
                <div className={`mb-4 rounded-lg p-3 border ${
                  schemaValidation.valid
                    ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800"
                    : "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800"
                }`}>
                  <div className="flex items-center gap-2">
                    {schemaValidation.valid ? (
                      <>
                        <ShieldCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
                        <span className="text-sm font-semibold text-green-900 dark:text-green-100">
                          Schema Validation Passed
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                        <span className="text-sm font-semibold text-red-900 dark:text-red-100">
                          Schema Validation Failed ({schemaValidation.errors.length} errors)
                        </span>
                      </>
                    )}
                  </div>
                  {!schemaValidation.valid && (
                    <div className="mt-2 space-y-1">
                      {schemaValidation.errors.map((error: any, idx: number) => (
                        <div key={idx} className="text-xs text-red-800 dark:text-red-200">
                          • <span className="font-medium">{error.field}</span>: {error.message}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {loading ? (
                <LoadingAnimation message="AI Generating Payload..." />
              ) : payload ? (
                <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "formatted" | "raw")} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="formatted" className="gap-2">
                      <Eye className="h-4 w-4" />
                      Formatted View
                    </TabsTrigger>
                    <TabsTrigger value="raw" className="gap-2">
                      <Code2 className="h-4 w-4" />
                      Raw JSON
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="formatted" className="mt-0">
                    <div className="bg-muted rounded-xl p-3 lg:p-5 overflow-auto h-[400px] lg:h-[600px] text-xs lg:text-sm">
                      {parsedPayload ? (
                        <JsonViewer data={parsedPayload} isRoot={true} defaultExpanded={true} />
                      ) : (
                        <div className="text-muted-foreground text-sm">
                          Invalid JSON format
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="raw" className="mt-0">
                    <pre className="bg-muted rounded-xl p-3 lg:p-5 overflow-auto text-xs lg:text-sm h-[400px] lg:h-[600px] font-mono">
                      {payload}
                    </pre>
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="bg-muted rounded-xl p-3 lg:p-5 h-[400px] lg:h-[600px] flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <FileJson className="h-10 w-10 lg:h-12 lg:w-12 mx-auto mb-3 opacity-50" />
                    <p className="text-xs lg:text-sm">Generated payload will appear here...</p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </section>
      </div>

      {/* Error Dialog */}
      <AlertDialog open={showError}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {errorMessage.includes("Network") ? "Connection Error" : "Validation Error"}
            </AlertDialogTitle>

            <AlertDialogDescription>
              {errorMessage || "An unexpected error occurred."}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                setShowError(false);
                setErrorMessage("");
              }}
            >
              Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}