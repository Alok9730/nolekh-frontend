import { useState, useEffect, useRef } from "react";
import axios from "../api/axios";
import LoadingSpinner from "./LoadingSpinner";
import { Mic, BadgePlus } from "lucide-react";
import toast from "react-hot-toast";
import ManuallyDataEntry from "./ManuallyDataEntry";


const AI_LIMIT = 5;
const WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const STORAGE_KEY = "ai_voice_timestamps";

function canMakeAiCall() {
  const now = Date.now();
  const stored = localStorage.getItem(STORAGE_KEY);
  const timestamps = stored ? JSON.parse(stored) : [];

  // keep only calls within last 5 minutes
  const recentCalls = timestamps.filter(
    (time) => now - time < WINDOW_MS
  );

  if (recentCalls.length >= AI_LIMIT) {
    return false;
  }

  recentCalls.push(now);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recentCalls));
  return true;
}

function AiVoice({ customerId, monthName, onDataAdded }) {
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [showManualModal, setShowManualModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [AiInput, setAiInput] = useState("");
  const recognitionRef = useRef(null);


  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Voice feature not supported in this browser!");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onend = () => {
      setShowVoiceModal(false);
    };

    recognition.onresult = (event) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + " ";
        }
      }
      setAiInput(finalTranscript.trim());
    };

    recognitionRef.current = recognition;
  }, []);


  useEffect(() => {
    if (AiInput) {
      const sendToAI = async () => {
        try {
          setLoading(true);
          const res = await axios.post(`/shop/shopkeeper/DataEntry`, {
            customerId,
            monthName,
            transcript: AiInput,
          });

          if (res) {
            toast.success("Data added successfully ✅");
            await onDataAdded();
          }
        } catch (err) {
          toast.error(
            err?.response?.data?.message || "Failed to add data"
          );
        } finally {
          setLoading(false);
        }
      };

      sendToAI();
    }
  }, [AiInput]);

  const handleAiVoice = () => {
    if (!canMakeAiCall()) {
      toast.error("Too many AI requests. Please wait 5 minutes.");
      return;
    }

    if (recognitionRef.current) {
      recognitionRef.current.start();
      setShowVoiceModal(true);
    }
  };

  const stopVoice = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setShowVoiceModal(false);
  };


  const handleManualSubmit = async ({ product, qty, rate }) => {
    try {
      setLoading(true);
      await axios.post(`/shop/shopkeeper/DataEntryManual`, {
        customerId,
        monthName,
        product,
        qty,
        rate,
      });

      toast.success("Product added successfully ✅");
      await onDataAdded();
      setShowManualModal(false);
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Error adding product"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="flex justify-end gap-3 mb-4">
        <button
          onClick={handleAiVoice}
          className="bg-[#66FCF1] hover:bg-[#4dd9d1] py-3 px-3 rounded-2xl transition-all duration-200 transform hover:scale-105 hover:shadow-xl active:scale-95 hover:ring-2 hover:ring-[#3bbcb3]/60 text-black font-bold"
        >
          <Mic size="20" />
        </button>

        <button
          onClick={() => setShowManualModal(true)}
          className="bg-[#66FCF1] hover:bg-[#4dd9d1] py-3 px-3 rounded-2xl transition-all duration-200 transform hover:scale-105 hover:shadow-xl active:scale-95 hover:ring-2 hover:ring-[#3bbcb3]/60 text-black font-bold"
        >
          <BadgePlus size="20" />
        </button>
      </div>

      {showVoiceModal && (
        <div
          onClick={stopVoice}
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/60 cursor-pointer"
        >
          <div className="text-center p-10 bg-white/10 border border-white/20 rounded-3xl shadow-2xl">
            <div className="text-white text-2xl font-bold mb-4 animate-pulse">
              Listening... Tap anywhere to stop.
            </div>
            <Mic size={60} className="text-[#66FCF1] animate-bounce" />
          </div>
        </div>
      )}

      {showManualModal && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <ManuallyDataEntry
            onClose={() => setShowManualModal(false)}
            handleSubmit={handleManualSubmit}
          />
        </div>
      )}
    </div>
  );
}

export default AiVoice;
