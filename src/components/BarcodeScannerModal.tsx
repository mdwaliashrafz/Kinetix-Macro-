import React, { useState, useEffect } from 'react';
import { FoodItem, MealType } from '../types';
import { BARCODE_SAMPLE_LOOKUPS, INITIAL_FOOD_DATABASE } from '../data/initialData';
import { soundFx } from '../utils/audio';

interface BarcodeScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFoodDetected: (food: FoodItem, mealType: MealType) => void;
  targetMeal: MealType;
}

export const BarcodeScannerModal: React.FC<BarcodeScannerModalProps> = ({
  isOpen,
  onClose,
  onFoodDetected,
  targetMeal,
}) => {
  const [manualCode, setManualCode] = useState('');
  const [selectedMeal, setSelectedMeal] = useState<MealType>(targetMeal);
  const [detectedFood, setDetectedFood] = useState<FoodItem | null>(null);
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    setSelectedMeal(targetMeal);
  }, [targetMeal]);

  useEffect(() => {
    if (isOpen) {
      setDetectedFood(null);
      setIsScanning(true);
      setManualCode('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSimulateScan = (barcode: string) => {
    soundFx.playScannerBeep();
    const foundFood = INITIAL_FOOD_DATABASE.find(f => f.barcode === barcode) ||
      (BARCODE_SAMPLE_LOOKUPS[barcode] ? {
        id: `custom-scan-${barcode}`,
        name: BARCODE_SAMPLE_LOOKUPS[barcode].name || 'Scanned Item',
        defaultGrams: BARCODE_SAMPLE_LOOKUPS[barcode].defaultGrams || 100,
        calories: BARCODE_SAMPLE_LOOKUPS[barcode].calories || 200,
        protein: BARCODE_SAMPLE_LOOKUPS[barcode].protein || 20,
        carbs: BARCODE_SAMPLE_LOOKUPS[barcode].carbs || 10,
        fat: BARCODE_SAMPLE_LOOKUPS[barcode].fat || 5,
        tag: BARCODE_SAMPLE_LOOKUPS[barcode].tag || 'VERIFIED',
        category: (BARCODE_SAMPLE_LOOKUPS[barcode].category as any) || 'protein',
        verified: true,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&auto=format&fit=crop&q=80',
        barcode,
      } as FoodItem : null);

    if (foundFood) {
      setDetectedFood(foundFood);
      setIsScanning(false);
    }
  };

  const handleConfirmLog = () => {
    if (detectedFood) {
      soundFx.playLogSuccess();
      onFoodDetected(detectedFood, selectedMeal);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm rounded-2xl bg-[#181c21] border border-[#262a30] shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#262a30]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00daf3]">
              barcode_scanner
            </span>
            <span className="font-['Outfit'] font-semibold text-sm text-[#e0e2ea]">
              Laser Barcode Telemetry
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

        {/* Viewfinder Area */}
        <div className="relative bg-[#0a0e13] h-60 flex flex-col items-center justify-center overflow-hidden border-b border-[#262a30]">
          {/* Viewfinder crosshairs */}
          <div className="relative w-48 h-36 border-2 border-dashed border-[#00daf3]/60 rounded-xl flex items-center justify-center">
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#10f984]" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#10f984]" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#10f984]" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#10f984]" />

            {/* Scanning neon laser animation */}
            {isScanning && (
              <div className="absolute left-0 right-0 h-0.5 bg-[#00daf3] shadow-[0_0_12px_#00daf3] animate-[bounce_2s_infinite]" />
            )}

            {!detectedFood ? (
              <span className="text-[11px] font-['JetBrains_Mono'] text-[#849585] text-center px-4">
                Align barcode within optical matrix
              </span>
            ) : (
              <div className="flex flex-col items-center gap-1 text-center p-2 bg-[#181c21]/95 rounded-lg border border-[#10f984]/40 animate-in zoom-in-95">
                <span className="material-symbols-outlined text-[#10f984] text-[28px]">
                  check_circle
                </span>
                <span className="font-['Outfit'] font-semibold text-xs text-[#e0e2ea]">
                  {detectedFood.name}
                </span>
                <span className="font-['JetBrains_Mono'] text-[10px] text-[#10f984]">
                  {detectedFood.calories} kcal · P: {detectedFood.protein}g
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Content & Actions */}
        <div className="p-4 flex flex-col gap-3">
          {detectedFood ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs text-[#849585]">
                <span>Target Meal:</span>
                <div className="flex gap-1">
                  {(['breakfast', 'lunch', 'dinner', 'snacks'] as MealType[]).map((meal) => (
                    <button
                      key={meal}
                      type="button"
                      onClick={() => setSelectedMeal(meal)}
                      className={`px-2 py-1 rounded text-[10px] font-['JetBrains_Mono'] uppercase transition-colors cursor-pointer ${
                        selectedMeal === meal
                          ? 'bg-[#10f984] text-[#003919] font-bold'
                          : 'bg-[#262a30] text-[#849585] hover:text-[#e0e2ea]'
                      }`}
                    >
                      {meal}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setDetectedFood(null);
                    setIsScanning(true);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-[#262a30] text-[#e0e2ea] text-xs font-semibold hover:bg-[#31353b] transition-colors cursor-pointer"
                >
                  Rescan
                </button>
                <button
                  type="button"
                  onClick={handleConfirmLog}
                  className="flex-1 py-2.5 rounded-xl bg-[#10f984] text-[#003919] text-xs font-bold hover:bg-[#61ff98] transition-colors shadow-[0_0_12px_rgba(16,249,132,0.4)] cursor-pointer"
                >
                  Log to Ledger
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5">
              <span className="text-[10px] font-['JetBrains_Mono'] uppercase tracking-wider text-[#849585]">
                Quick Test Optical Targets:
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { name: 'Chicken Breast', code: '011110002341' },
                  { name: 'Greek Yogurt', code: '028400041238' },
                  { name: 'Rolled Oats', code: '052100018902' },
                  { name: 'Whey Isolate', code: '099182736450' },
                ].map((sample) => (
                  <button
                    key={sample.code}
                    type="button"
                    onClick={() => handleSimulateScan(sample.code)}
                    className="p-2 rounded-lg bg-[#262a30] hover:bg-[#31353b] text-left text-[11px] text-[#e0e2ea] border border-[#3b4b3d]/30 transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span className="truncate">{sample.name}</span>
                    <span className="material-symbols-outlined text-[#00daf3] text-[14px]">
                      qr_code_scanner
                    </span>
                  </button>
                ))}
              </div>

              <div className="pt-2 border-t border-[#262a30] flex gap-2">
                <input
                  type="text"
                  placeholder="Enter 12-digit barcode..."
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  className="flex-1 bg-[#101419] border border-[#262a30] rounded-lg px-2.5 py-1.5 text-xs text-[#e0e2ea] font-['JetBrains_Mono'] focus:outline-none focus:border-[#00daf3]"
                />
                <button
                  type="button"
                  onClick={() => handleSimulateScan(manualCode)}
                  disabled={!manualCode.trim()}
                  className="px-3 py-1.5 rounded-lg bg-[#00daf3] text-[#00363d] font-bold text-xs hover:bg-[#9cf0ff] disabled:opacity-40 transition-colors cursor-pointer"
                >
                  Lookup
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
