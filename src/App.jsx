import React, { useContext } from "react";
import "./App.css";
import va from "./assets/image/ai.png";
import { CiMicrophoneOn } from "react-icons/ci";
import { datacontext } from "./context/UserContext";
import speakimg from "./assets/image/speak.gif";
import aiVoice from "./assets/image/aiVoice.gif";

function App() {
  const { startListening, mode, prompt } = useContext(datacontext);

  return (
    <div className="main">
      <img src={va} alt="AI" id="aivon" />
      <span>I'm Aivon, your personal AI assistant</span>

      {mode === "idle" && (
        <button onClick={startListening}>
          Click here <CiMicrophoneOn />
        </button>
      )}

      {mode === "listening" && (
        <div className="response">
          <img src={speakimg} id="speak" />
          <p>{prompt || "Listening..."}</p>
        </div>
      )}

      {mode === "speaking" && (
        <div className="response">
          <img src={aiVoice} id="aigif" />
          <p>{prompt}</p>
        </div>
      )}
    </div>
  );
}

export default App;