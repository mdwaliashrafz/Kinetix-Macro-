import React, { useState, useEffect } from 'react';
import { MealType, LoggedItem } from '../types';
import { soundFx } from '../utils/audio';

interface VoiceInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddParsedMeal: (item: Partial<LoggedItem>) => void;
  currentMeal: MealType;
}

export const VoiceInputModal: React.FC<VoiceInputModalProps> = ({
  isOpen,
  onClose,
  onAddParsedMeal,
  currentMeal,
}) => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<MealType>(currentMeal);
  const [parsedPreview, setParsedPreview] = useState<{
    name: string;
    grams: number;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  } | null>(null);

  useEffect(() => {
    setSelectedMeal(currentMeal);
  }, [currentMeal]);

  useEffect(() => {
    if (isOpen) {
      setTranscript('');
      setParsedPreview(null);
      setIsListening(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Simple heuristic natural language parser for nutritional logging
  const parseVoiceQuery = (text: string) => {
    const lower = text.toLowerCase();
    let name = text.trim();
    let grams = 150;
    let calories = 250;
    let protein = 25;
    let carbs = 20;
    let fat = 8;

    // Detect grams
    const gramMatch = lower.match(/(\d+)\s*(g|grams|gram)/);
    if (gramMatch) {
      grams = parseInt(gramMatch[1], 10);
    }

    if (lower.includes('chicken') || lower.includes('breast')) {
      name = 'Pan-Seared Chicken Breast';
      calories = Math.round((297 / 180) * grams);
      protein = Math.round((54 / 180) * grams);
      carbs = 0;
      fat = Math.round((6.5 / 180) * grams);
    } else if (lower.includes('yogurt')) {
      name = 'Greek Yogurt 0%';
      calories = Math.round((130 / 200) * grams);
      protein = Math.round((22 / 200) * grams);
      carbs = Math.round((8 / 200) * grams);
      fat = 0;
    } else if (lower.includes('oats') || lower.includes('oatmeal')) {
      name = 'Organic Rolled Oats';
      calories = Math.round((189 / 50) * grams);
      protein = Math.round((6 / 50) * grams);
      carbs = Math.round((34 / 50) * grams);
      fat = Math.round((3 / 50) * grams);
    } else if (lower.includes('avocado')) {
      name = 'Hass Avocado';
      calories = Math.round((120 / 75) * grams);
      protein = Math.round((1.5 / 75) * grams);
      carbs = Math.round((6 / 75) * grams);
      fat = Math.round((11 / 75) * grams);
    } else if (lower.includes('sweet potato')) {
      name = 'Baked Sweet Potato';
      calories = Math.round((135 / 150) * grams);
      protein = Math.round((3 / 150) * grams);
      carbs = Math.round((31 / 150) * grams);
      fat = Math.round((0.2 / 150) * grams);
    } else if (lower.includes('steak') || lower.includes('beef')) {
      name = 'Grass-Fed Steak';
      calories = Math.round((340 / 180) * grams);
      protein = Math.round((48 / 180) * grams);
      carbs = 0;
      fat = Math.round((16 / 180) * grams);
    } else if (lower.includes('salmon')) {
      name = 'Wild Salmon Fillet';
      calories = Math.round((340 / 170) * grams);
      protein = Math.round((36 / 170) * grams);
      carbs = 0;
      fat = Math.round((20 / 170) * grams);
    } else if (lower.includes('egg')) {
      name = 'Pasture-Raised Eggs';
      grams = 150;
      calories = 215;
      protein = 18;
      carbs = 1.5;
      fat = 15;
    } else {
      // Default estimation
      name = text.replace(/(\d+)\s*(g|grams|gram)/g, '').trim() || 'Custom Bio-Meal';
      calories = Math.round(grams * 1.6);
      protein = Math.round(grams * 0.15);
      carbs = Math.round(grams * 0.18);
      fat = Math.round(grams * 0.05);
    }

    setParsedPreview({ name, grams, calories, protein, carbs, fat });
  };

  const handleStartSpeech = () => {
    soundFx.playClick();
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        setIsListening(true);

        recognition.onresult = (event: any) => {
          const speechResult = event.results[0][0].transcript;
          setTranscript(speechResult);
          parseVoiceQuery(speechResult);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
        return;
      } catch {
        // Fallback below
      }
    }

    // If browser speech recognition is unavailable or blocked, trigger simulated voice pulse
    setIsListening(true);
    setTimeout(() => {
      const sample = '200g Greek yogurt with 50g blueberries';
      setTranscript(sample);
      parseVoiceQuery(sample);
      setIsListening(false);
      soundFx.playScannerBeep();
    }, 1500);
  };

  const handleSelectSample = (sample: string) => {
    soundFx.playClick();
    setTranscript(sample);
    parseVoiceQuery(sample);
  };

  const handleConfirmAdd = () => {
    if (parsedPreview) {
      soundFx.playLogSuccess();
      onAddParsedMeal({
        name: parsedPreview.name,
        grams: parsedPreview.grams,
        calories: parsedPreview.calories,
        protein: parsedPreview.protein,
        carbs: parsedPreview.carbs,
        fat: parsedPreview.fat,
        mealType: selectedMeal,
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm rounded-2xl bg-[#181c21] border border-[#262a30] shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#262a30]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00daf3]">mic</span>
            <span className="font-['Outfit'] font-semibold text-sm text-[#e0e2ea]">
              Voice Bio-Acoustic Logger
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#849585] hover:text-[#e0e2ea] hover:bg-[#262a30] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Voice Trigger Pulse Area */}
        <div className="p-6 flex flex-col items-center justify-center bg-[#101419] gap-3 border-b border-[#262a30]">
          <button
            type="button"
            onClick={handleStartSpeech}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
              isListening
                ? 'bg-[#00daf3] text-[#00363d] ring-8 ring-[#00daf3]/30 scale-110 shadow-[0_0_24px_#00daf3]'
                : 'bg-[#262a30] text-[#00daf3] hover:bg-[#31353b]'
            }`}
          >
            <span className="material-symbols-outlined text-[32px]">
              {isListening ? 'graphic_eq' : 'mic'}
            </span>
          </button>
          <span className="text-xs font-['Outfit'] text-[#e0e2ea]">
            {isListening ? 'Listening for macros...' : 'Tap to speak meal intake'}
          </span>

          <input
            type="text"
            placeholder="Or type natural input (e.g. 180g chicken breast)..."
            value={transcript}
            onChange={(e) => {
              setTranscript(e.target.value);
              if (e.target.value) parseVoiceQuery(e.target.value);
            }}
            className="w-full mt-2 bg-[#181c21] border border-[#262a30] rounded-xl px-3 py-2 text-xs text-[#e0e2ea] font-['JetBrains_Mono'] focus:outline-none focus:border-[#00daf3]"
          />
        </div>

        {/* Preview of Parsed Nutrition */}
        <div className="p-4 flex flex-col gap-3">
          {parsedPreview ? (
            <div className="flex flex-col gap-3 bg-[#1c2025] p-3 rounded-xl border border-[#10f984]/30">
              <div className="flex items-center justify-between">
                <span className="font-['Outfit'] font-semibold text-xs text-[#e0e2ea]">
                  {parsedPreview.name}
                </span>
                <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#10f984]">
                  {parsedPreview.calories} kcal
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-['JetBrains_Mono'] text-[#849585]">
                <span>{parsedPreview.grams}g</span>
                <span>•</span>
                <span className="text-[#00daf3]">P {parsedPreview.protein}g</span>
                <span className="text-[#10f984]">C {parsedPreview.carbs}g</span>
                <span className="text-[#ffb0c9]">F {parsedPreview.fat}g</span>
              </div>

              {/* Meal assignment */}
              <div className="flex items-center justify-between text-[11px] pt-2 border-t border-[#262a30]">
                <span className="text-[#849585]">Log to:</span>
                <div className="flex gap-1">
                  {(['breakfast', 'lunch', 'dinner', 'snacks'] as MealType[]).map((meal) => (
                    <button
                      key={meal}
                      type="button"
                      onClick={() => setSelectedMeal(meal)}
                      className={`px-2 py-0.5 rounded text-[10px] font-['JetBrains_Mono'] uppercase cursor-pointer ${
                        selectedMeal === meal
                          ? 'bg-[#10f984] text-[#003919] font-bold'
                          : 'bg-[#262a30] text-[#849585]'
                      }`}
                    >
                      {meal}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handleConfirmAdd}
                className="w-full mt-1 py-2.5 rounded-xl bg-[#10f984] text-[#003919] font-bold text-xs hover:bg-[#61ff98] transition-colors shadow-[0_0_12px_rgba(16,249,132,0.4)] cursor-pointer"
              >
                Confirm & Log to Ledger
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-['JetBrains_Mono'] uppercase tracking-wider text-[#849585]">
                Spoken Telemetry Examples:
              </span>
              {[
                '200g Greek yogurt with 50g blueberries',
                '180g pan-seared chicken breast',
                '200g sweet potato with half avocado',
                '3 pasture eggs with jasmine rice',
              ].map((example) => (
                <button
                  key={example}
                  type="button"
                  onClick={() => handleSelectSample(example)}
                  className="p-2 rounded-lg bg-[#262a30] hover:bg-[#31353b] text-left text-xs text-[#b9cbb9] border border-[#3b4b3d]/30 flex items-center justify-between cursor-pointer"
                >
                  <span className="truncate">"{example}"</span>
                  <span className="material-symbols-outlined text-[#00daf3] text-[16px]">
                    arrow_forward
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
