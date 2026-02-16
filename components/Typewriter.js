'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * Types out text character by character with a blinking cursor.
 * @param {string} text - Full text to type
 * @param {number} speed - Ms per character (default 80)
 * @param {number} startDelay - Ms before starting (default 0)
 * @param {boolean} loop - Restart from beginning after a pause (default false)
 * @param {number} loopDelay - Ms to wait before restarting when loop is true (default 2000)
 */
export function Typewriter({ text, speed = 80, startDelay = 0, loop = false, loopDelay = 2000, className = '', cursorChar = '|' }) {
  const [display, setDisplay] = useState('');
  const [started, setStarted] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    if (!text) return;

    const startTimer = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(startTimer);
  }, [text, startDelay]);

  useEffect(() => {
    if (!started || !text) return;

    let i = 0;
    let timeoutId;

    const type = () => {
      if (i <= text.length) {
        setDisplay(text.slice(0, i));
        i++;
        timeoutId = setTimeout(type, speed);
      } else if (loop) {
        timeoutId = setTimeout(() => {
          i = 0;
          type();
        }, loopDelay);
      }
    };

    type();
    return () => clearTimeout(timeoutId);
  }, [started, text, speed, loop, loopDelay]);

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={className}>
      {display}
      <motion.span
        animate={{ opacity: cursorVisible ? 1 : 0 }}
        transition={{ duration: 0.1 }}
        className="text-accent font-mono inline-block ml-0.5"
        aria-hidden
      >
        {cursorChar}
      </motion.span>
    </span>
  );
}
