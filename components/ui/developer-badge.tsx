"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { Code2, X, Mail, Coffee, Sparkles, Link, Gift } from "lucide-react";

export function DeveloperBadge() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const constraintsRef = useRef(null);

  // Initialize position on mount (bottom-right corner)
  useEffect(() => {
    setPosition({
      x: window.innerWidth - 100,
      y: window.innerHeight - 100,
    });
  }, []);

  const handleDragEnd = (event: any, info: PanInfo) => {
    setIsDragging(false);
    setPosition({
      x: position.x + info.offset.x,
      y: position.y + info.offset.y,
    });
  };

  const handleClick = () => {
    if (!isDragging) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <>
      {/* Main Floating Button */}
      <motion.div
        ref={constraintsRef}
        className="fixed inset-0 pointer-events-none z-50"
      >
        <motion.div
          drag
          dragMomentum={false}
          dragElastic={0}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          onClick={handleClick}
          className="absolute pointer-events-auto cursor-move"
          style={{
            x: position.x,
            y: position.y,
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Glow Effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 blur-xl opacity-50"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Main Button */}
          <motion.div
            className="relative w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 shadow-2xl flex items-center justify-center"
            animate={{
              rotate: isExpanded ? 180 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Animated Border */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />

            {/* Icon */}
            <motion.div
              animate={{ rotate: isExpanded ? -180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isExpanded ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Code2 className="w-6 h-6 text-white" />
              )}
            </motion.div>

            {/* Sparkle Effects */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  top: "50%",
                  left: "50%",
                }}
                animate={{
                  x: [0, Math.cos((i * 120 * Math.PI) / 180) * 40],
                  y: [0, Math.sin((i * 120 * Math.PI) / 180) * 40],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              >
                <Sparkles className="w-3 h-3 text-yellow-300" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Expanded Card */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.3, type: "spring", bounce: 0.4 }}
              className="absolute pointer-events-auto"
              style={{
                x: position.x - 200,
                y: position.y - 280,
              }}
            >
              <div className="w-64 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden backdrop-blur-xl bg-opacity-95 dark:bg-opacity-95">
                {/* Header with Gradient */}
                <div className="relative h-24 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 overflow-hidden">
                  {/* Animated Background Pattern */}
                  <motion.div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, white 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }}
                    animate={{
                      backgroundPosition: ["0px 0px", "20px 20px"],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  {/* Profile Section */}
                  <div className="relative flex flex-col items-center justify-center h-full">
                    <motion.div
                      className="w-16 h-16 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-lg border-4 border-white dark:border-gray-700"
                      animate={{
                        boxShadow: [
                          "0 0 0 0 rgba(255,255,255,0.4)",
                          "0 0 0 10px rgba(255,255,255,0)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <span className="text-2xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        AK
                      </span>
                    </motion.div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Name and Title */}
                  <div className="text-center space-y-1">
                    <motion.h3
                      className="text-xl font-bold text-gray-900 dark:text-white"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      ASWIN K
                    </motion.h3>
                    <motion.p
                      className="text-sm text-gray-600 dark:text-gray-400 flex items-center justify-center gap-1"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Code2 className="w-4 h-4" />
                      Full Stack Developer
                    </motion.p>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />

                  {/* Stats */}
                  <motion.div
                    className="grid grid-cols-3 gap-2 text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-2">
                      <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        1.0
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Version
                      </div>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-950/30 rounded-lg p-2">
                      <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                        2026
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Year
                      </div>
                    </div>
                    <div className="bg-pink-50 dark:bg-pink-950/30 rounded-lg p-2">
                      <div className="text-lg font-bold text-pink-600 dark:text-pink-400">
                        AMEX
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Client
                      </div>
                    </div>
                  </motion.div>

                  {/* Social Links */}
                  <motion.div
                    className="flex justify-center gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {[
                      { icon: Code2, color: "hover:bg-gray-700", label: "Code" },
                      { icon: Link, color: "hover:bg-blue-600", label: "Connect" },


                    ].map((social, index) => (
                      <motion.button
                        key={index}
                        className={`w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center transition-colors ${social.color} hover:text-white`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        title={social.label}
                      >
                        <social.icon className="w-4 h-4" />
                      </motion.button>
                    ))}
                  </motion.div>

                  {/* Footer Message */}
                  <motion.div
                    className="text-center text-xs text-gray-500 dark:text-gray-400 italic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    "Built with ❤️ and ☕"
                  </motion.div>
                </div>
              </div>

              {/* Pointer Arrow */}
              <motion.div
                className="absolute bottom-0 right-12 w-0 h-0"
                style={{
                  borderLeft: "12px solid transparent",
                  borderRight: "12px solid transparent",
                  borderTop: "12px solid white",
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
