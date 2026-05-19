"use client";

import { motion } from "framer-motion";
import { Sparkles, Zap, Brain, CheckCircle2 } from "lucide-react";

interface LoadingAnimationProps {
  message?: string;
}

export function LoadingAnimation({ message = "AI Generating Payload..." }: LoadingAnimationProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-6">
      {/* Animated Icon Circle */}
      <div className="relative">
        {/* Outer rotating ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-blue-200 dark:border-blue-800"
          style={{ width: 120, height: 120 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Middle pulsing ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-blue-400 dark:border-blue-600"
          style={{ width: 120, height: 120 }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Inner circle with icon */}
        <motion.div
          className="relative flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700"
          style={{ width: 120, height: 120 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <Brain className="h-12 w-12 text-white" />
          </motion.div>
        </motion.div>

        {/* Orbiting particles */}
        {[0, 120, 240].map((angle, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{
              width: 16,
              height: 16,
              left: "50%",
              top: "50%",
              marginLeft: -8,
              marginTop: -8,
            }}
            animate={{
              rotate: [angle, angle + 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
              delay: index * 0.3,
            }}
          >
            <motion.div
              className="absolute bg-yellow-400 dark:bg-yellow-300 rounded-full"
              style={{
                width: 8,
                height: 8,
                left: 70,
                top: 0,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Loading Text */}
      <motion.div
        className="text-center space-y-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-xl font-semibold text-foreground">{message}</h3>
        <motion.div
          className="flex items-center justify-center gap-1 text-muted-foreground"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-sm">Processing</span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
          >
            .
          </motion.span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          >
            .
          </motion.span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
          >
            .
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Progress Steps */}
      <div className="w-full max-w-md space-y-3">
        {[
          { icon: Sparkles, label: "Analyzing FF Metadata", delay: 0 },
          { icon: Zap, label: "Generating Parameters", delay: 0.3 },
          { icon: Brain, label: "AI Processing", delay: 0.6 },
          { icon: CheckCircle2, label: "Validating Payload", delay: 0.9 },
        ].map((step, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-3 px-4 py-2 rounded-lg bg-muted/50"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: step.delay }}
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: step.delay,
              }}
            >
              <step.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </motion.div>
            <span className="text-sm text-muted-foreground">{step.label}</span>
            <motion.div
              className="ml-auto flex gap-1"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: step.delay,
              }}
            >
              {[0, 1, 2].map((dot) => (
                <motion.div
                  key={dot}
                  className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: step.delay + dot * 0.2,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Shimmer Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
        }}
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

// Compact loading spinner for smaller spaces
export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 dark:border-t-blue-400 rounded-full`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );
}

// Skeleton loader with shimmer effect
export function SkeletonLoader() {
  return (
    <div className="space-y-3 animate-pulse">
      {[...Array(7)].map((_, i) => (
        <motion.div
          key={i}
          className="h-5 bg-muted rounded relative overflow-hidden"
          style={{ width: `${100 - i * 5}%` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ["-100%", "200%"] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.1,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
