"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface JsonViewerProps {
  data: any;
  name?: string;
  isRoot?: boolean;
  defaultExpanded?: boolean;
}

export function JsonViewer({
  data,
  name,
  isRoot = false,
  defaultExpanded = true,
}: JsonViewerProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const isObject = typeof data === "object" && data !== null && !Array.isArray(data);
  const isArray = Array.isArray(data);
  const isPrimitive = !isObject && !isArray;

  const getValueColor = (value: any) => {
    if (value === null) return "text-gray-500";
    if (typeof value === "string") return "text-green-600 dark:text-green-400";
    if (typeof value === "number") return "text-blue-600 dark:text-blue-400";
    if (typeof value === "boolean") return "text-purple-600 dark:text-purple-400";
    return "text-foreground";
  };

  const formatValue = (value: any) => {
    if (value === null) return "null";
    if (typeof value === "string") return `"${value}"`;
    return String(value);
  };

  if (isPrimitive) {
    return (
      <div className="flex items-start gap-2 py-0.5">
        {name && (
          <span className="text-blue-700 dark:text-blue-300 font-medium">
            "{name}":
          </span>
        )}
        <span className={getValueColor(data)}>{formatValue(data)}</span>
      </div>
    );
  }

  const entries = isObject ? Object.entries(data) : data.map((item: any, idx: number) => [idx, item]);
  const isEmpty = entries.length === 0;
  const bracket = isArray ? ["[", "]"] : ["{", "}"];

  return (
    <div className="font-mono text-sm">
      <div className="flex items-start gap-1">
        {!isEmpty && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="hover:bg-muted rounded p-0.5 transition-colors flex-shrink-0"
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        )}
        {isEmpty && <span className="w-5" />}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            {name && (
              <span className="text-blue-700 dark:text-blue-300 font-medium">
                "{name}":
              </span>
            )}
            <span className="text-gray-600 dark:text-gray-400">
              {bracket[0]}
              {!isExpanded && !isEmpty && (
                <span className="text-muted-foreground mx-1">
                  {entries.length} {isArray ? "items" : "properties"}
                </span>
              )}
              {!isExpanded && bracket[1]}
            </span>
          </div>

          {isExpanded && (
            <div className="ml-4 border-l-2 border-gray-200 dark:border-gray-700 pl-3 mt-1">
              {entries.map(([key, value]: [string | number, any]) => (
                <JsonViewer
                  key={String(key)}
                  name={isArray ? undefined : String(key)}
                  data={value}
                  defaultExpanded={isRoot}
                />
              ))}
            </div>
          )}

          {isExpanded && (
            <span className="text-gray-600 dark:text-gray-400">{bracket[1]}</span>
          )}
        </div>
      </div>
    </div>
  );
}
