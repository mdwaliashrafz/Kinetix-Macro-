import React, { useState } from 'react';
import { DailyTargets } from '../types';
import { soundFx } from '../utils/audio';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  targets: DailyTargets;
  onUpdateTargets: (targets: DailyTargets) => void;
  onResetData: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  targets,
  onUpdateTargets,
  onResetData,
}) => {
  const [calories, setCalories] = useState(targets.calories);
  const [protein, setProtein] = useState(targets.protein);
  const [carbs, setCarbs] = useState(targets.carbs);
  const [fat, setFat] = useState(targets.fat);
  const [waterMl, setWaterMl] = useState(targets.waterMl);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playLogSuccess();
    onUpdateTargets({
      calories: Number(calories) || 2400,
      protein: Number(protein) || 180,
      carbs: Number(carbs) || 240,
      fat: Number(fat) || 65,
      waterMl: Number(waterMl) || 3200,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm rounded-2xl bg-[#181c21] border border-[#262a30] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#262a30]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#10f984]">
              tune
            </span>
            <span className="font-['Outfit'] font-semibold text-sm text-[#e0e2ea]">
              Metabolic Engine & Targets
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

        <form onSubmit={handleSave} className="p-4 flex flex-col gap-3.5 overflow-y-auto no-scrollbar">
          {/* Athlete Bio Card */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#101419] border border-[#262a30]">
            <img
              alt="Athlete Profile"
              className="w-12 h-12 rounded-full object-cover ring-2 ring-[#10f984]/40"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuoGiy28qVE78X1WN4aFaQ_r2RwHvBoTKVrnTesprVD0A_3YZGBtZey5H2E7uOwcuFNzeQic9R1jccP3tbS4GOBRsv4LG6tqlvKijr8HfWB3xCfmPlXbwEXWoJF6FqKjvspH-4BY4shm6IExqMkdiJBHGp1nUlQKjIMhNQTtze8_4Fem1U3UFL2ast_68tJwpn73NwEtcXeqsB4uGaN-x9i2TH7vSRB2k4iUYvIRoU591lDBq-ooc"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80';
              }}
            />
            <div className="flex flex-col min-w-0">
              <span className="font-['Outfit'] font-bold text-sm text-[#e0e2ea]">
                Alex Rivers, CSCS
              </span>
              <span className="font-['JetBrains_Mono'] text-[11px] text-[#10f984]">
                Target: Lean Hypertrophy & Bio-Power
              </span>
              <div className="flex items-center gap-2 text-[10px] font-['JetBrains_Mono'] text-[#849585] mt-0.5">
                <span>81.5 kg</span>
                <span>•</span>
                <span>12.4% BF</span>
                <span>•</span>
                <span>BMR 1,840 kcal</span>
              </div>
            </div>
          </div>

          {/* Daily Goals */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[10px] font-['JetBrains_Mono'] uppercase tracking-wider text-[#849585]">
              Daily Caloric & Macro Ledger Goals
            </span>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-['Outfit'] font-semibold text-[#e0e2ea]">
                  Daily Energy Target
                </span>
                <span className="font-['JetBrains_Mono'] font-bold text-[#10f984]">
                  {calories} kcal
                </span>
              </div>
              <input
                type="number"
                min="1200"
                max="6000"
                step="50"
                value={calories}
                onChange={(e) => setCalories(Number(e.target.value))}
                className="w-full bg-[#101419] border border-[#262a30] rounded-xl px-3 py-2 text-xs text-[#e0e2ea] font-['JetBrains_Mono'] focus:outline-none focus:border-[#10f984]"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="bg-[#101419] p-2.5 rounded-xl border border-[#262a30]">
                <label className="block text-[9px] font-['JetBrains_Mono'] text-[#00daf3] uppercase font-bold mb-1">
                  Protein Goal
                </label>
                <div className="flex items-baseline gap-1">
                  <input
                    type="number"
                    min="30"
                    max="400"
                    value={protein}
                    onChange={(e) => setProtein(Number(e.target.value))}
                    className="w-full bg-transparent font-['JetBrains_Mono'] text-sm font-bold text-[#e0e2ea] focus:outline-none"
                  />
                  <span className="text-[10px] font-['JetBrains_Mono'] text-[#849585]">g</span>
                </div>
              </div>

              <div className="bg-[#101419] p-2.5 rounded-xl border border-[#262a30]">
                <label className="block text-[9px] font-['JetBrains_Mono'] text-[#10f984] uppercase font-bold mb-1">
                  Carbs Goal
                </label>
                <div className="flex items-baseline gap-1">
                  <input
                    type="number"
                    min="30"
                    max="600"
                    value={carbs}
                    onChange={(e) => setCarbs(Number(e.target.value))}
                    className="w-full bg-transparent font-['JetBrains_Mono'] text-sm font-bold text-[#e0e2ea] focus:outline-none"
                  />
                  <span className="text-[10px] font-['JetBrains_Mono'] text-[#849585]">g</span>
                </div>
              </div>

              <div className="bg-[#101419] p-2.5 rounded-xl border border-[#262a30]">
                <label className="block text-[9px] font-['JetBrains_Mono'] text-[#ffb0c9] uppercase font-bold mb-1">
                  Fats Goal
                </label>
                <div className="flex items-baseline gap-1">
                  <input
                    type="number"
                    min="20"
                    max="200"
                    value={fat}
                    onChange={(e) => setFat(Number(e.target.value))}
                    className="w-full bg-transparent font-['JetBrains_Mono'] text-sm font-bold text-[#e0e2ea] focus:outline-none"
                  />
                  <span className="text-[10px] font-['JetBrains_Mono'] text-[#849585]">g</span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-['Outfit'] font-semibold text-[#e0e2ea]">
                  Hydration Target (ml)
                </span>
                <span className="font-['JetBrains_Mono'] font-bold text-[#00daf3]">
                  {waterMl} ml
                </span>
              </div>
              <input
                type="number"
                min="1000"
                max="8000"
                step="100"
                value={waterMl}
                onChange={(e) => setWaterMl(Number(e.target.value))}
                className="w-full bg-[#101419] border border-[#262a30] rounded-xl px-3 py-2 text-xs text-[#e0e2ea] font-['JetBrains_Mono'] focus:outline-none focus:border-[#00daf3]"
              />
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#10f984] text-[#003919] font-['Outfit'] font-bold text-xs hover:bg-[#61ff98] transition-all shadow-[0_0_12px_rgba(16,249,132,0.4)] cursor-pointer"
            >
              Apply Metabolic Targets
            </button>
            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                if (window.confirm('Reset all logged meals back to demo state?')) {
                  onResetData();
                  onClose();
                }
              }}
              className="w-full py-2 rounded-xl bg-[#262a30] text-[#849585] hover:text-[#ffb0c9] hover:bg-[#31353b] font-['JetBrains_Mono'] text-[11px] transition-colors cursor-pointer"
            >
              Reset to Mockup Baseline
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
