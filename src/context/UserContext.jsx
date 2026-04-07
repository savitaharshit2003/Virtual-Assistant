// src/context/UserContext.jsx
import React, { createContext, useEffect, useRef, useState } from "react";
import { run } from "../gemini";

export const datacontext = createContext();

function UserContext({ children }) {
  const recognizing = useRef(false);
  const lastCallTime = useRef(0);
  const recognitionRef = useRef(null);

  const [mode, setMode] = useState("idle");
  const [prompt, setPrompt] = useState("");

  function speak(text) {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "hi-IN";
    utter.rate = 1;
    utter.onstart = () => setMode("speaking");
    utter.onend = () => setMode("idle");
    window.speechSynthesis.speak(utter);
  }

  async function aiResponse(userText) {
    const now = Date.now();
    if (now - lastCallTime.current < 5000) return;
    lastCallTime.current = now;

    const cleanText = userText.replace(/\*/g, "").replace(/google/gi, "Ishu");

    try {
      const text = await run(
        `Reply in maximum 20 words. Be fast and clear.\nUser: ${cleanText}`
      );
      setPrompt(text);
      speak(cleanText + '\n' + text);
    } catch (err) {
      if (err.message?.includes("429")) {
        setPrompt("Aivon is resting. Try again in 30 seconds🙂");
        setMode("idle");
        return;
      }
      console.error(err);
    }
  }

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;

    recognition.onstart = () => {
      recognizing.current = true;
      setMode("listening");
    };

    recognition.onend = () => {
      recognizing.current = false;
    };

    recognition.onresult = (e) => {
      recognition.stop();
      const last = e.results.length - 1;
      const transcript = e.results[last][0].transcript;
      setPrompt(transcript);
      aiResponse(transcript);
    };

    recognitionRef.current = recognition;
  }, []);

  function startListening() {
    if (!recognizing.current && recognitionRef.current) {
      recognitionRef.current.start();
    }
  }

  return (
    <datacontext.Provider value={{ startListening, mode, prompt }}>
      {children}
    </datacontext.Provider>
  );
}

export default UserContext;
