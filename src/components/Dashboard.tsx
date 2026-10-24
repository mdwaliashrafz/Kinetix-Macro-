import React from 'react';
import { LoggedItem, DailyTargets, MealType } from '../types';
import { soundFx } from '../utils/audio';

interface DashboardProps {
  loggedItems: LoggedItem[];
  targets: DailyTargets;
  waterIntake: number;
  onAddWater: (amount: number) => void;
  onDeleteLoggedItem: (id: string) => void;
  onNavigateToLog: (meal: MealType) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  loggedItems,
  targets,
  waterIntake,
  onAddWater,
  onDeleteLoggedItem,
  onNavigateToLog,
}) => {
  // Aggregate consumed macros
  const consumed = loggedItems.reduce(
    (acc, item) => ({
      calories: acc.calories + item.calories,
      protein: acc.protein + item.protein,
      carbs: acc.carbs + item.carbs,
      fat: acc.fat + item.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const remainingKcal = Math.max(0, targets.calories - consumed.calories);
  const kcalPercent = Math.min(100, Math.round((consumed.calories / targets.calories) * 100));

  // Circular gauge circumference
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (kcalPercent / 100) * circumference;

  const meals: { key: MealType; label: string; icon: string; time: string }[] = [
    { key: 'breakfast', label: 'Breakfast', icon: 'wb_twilight', time: '08:00 AM' },
    { key: 'lunch', label: 'Lunch', icon: 'wb_sunny', time: '12:30 PM' },
    { key: 'dinner', label: 'Dinner', icon: 'nights_stay', time: '07:00 PM' },
    { key: 'snacks', label: 'Snacks & Intra-Fuel', icon: 'bolt', time: 'Continuous' },
  ];

  return (
    <div className="flex flex-col w-full gap-y-4 pb-6 animate-in fade-in duration-200">
      {/* Hero Circular Telemetry Console */}
      <div className="w-full bg-[#181c21] rounded-2xl p-4 border border-[#262a30] relative overflow-hidden shadow-lg">
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#10f984]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10f984]" />
            <span className="font-['JetBrains_Mono'] text-[10px] font-semibold uppercase text-[#b9cbb9] tracking-wider">
              Metabolic Equilibrium Telemetry
            </span>
          </div>
          <span className="font-['JetBrains_Mono'] text-[11px] text-[#10f984] bg-[#10f984]/10 px-2 py-0.5 rounded-full border border-[#10f984]/20">
            {kcalPercent}% of Target
          </span>
        </div>

        <div className="flex items-center justify-between gap-4 my-2">
          {/* Radial Ring */}
          <div className="relative w-36 h-36 flex items-center justify-center flex-shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="stroke-[#262a30]"
                strokeWidth="12"
                fill="transparent"
              />
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="stroke-[#10f984] transition-all duration-700 ease-out"
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                style={{ filter: 'drop-shadow(0 0 6px rgba(16,249,132,0.6))' }}
              />
            </svg>
            <div className="absolute flex flex-col items-center text-center">
              <span className="font-['Outfit'] text-[24px] font-bold text-[#e0e2ea] tabular-nums leading-none">
                {consumed.calories}
              </span>
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#849585] mt-0.5">
                of {targets.calories} kcal
              </span>
            </div>
          </div>

          {/* Quick Metrics Breakdown */}
          <div className="flex-1 flex flex-col gap-2">
            <div className="bg-[#1c2025] p-2 rounded-xl border border-[#262a30]">
              <div className="flex justify-between items-center text-[10px] font-['JetBrains_Mono']">
                <span className="text-[#00daf3]">PROTEIN</span>
                <span className="text-[#e0e2ea] font-bold">{Math.round(consumed.protein)} / {targets.protein}g</span>
              </div>
              <div className="w-full bg-[#262a30] h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="bg-[#00daf3] h-full rounded-full transition-all duration-500 shadow-[0_0_4px_#00daf3]"
                  style={{ width: `${Math.min(100, (consumed.protein / targets.protein) * 100)}%` }}
                />
              </div>
            </div>

            <div className="bg-[#1c2025] p-2 rounded-xl border border-[#262a30]">
              <div className="flex justify-between items-center text-[10px] font-['JetBrains_Mono']">
                <span className="text-[#10f984]">CARBS</span>
                <span className="text-[#e0e2ea] font-bold">{Math.round(consumed.carbs)} / {targets.carbs}g</span>
              </div>
              <div className="w-full bg-[#262a30] h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="bg-[#10f984] h-full rounded-full transition-all duration-500 shadow-[0_0_4px_#10f984]"
                  style={{ width: `${Math.min(100, (consumed.carbs / targets.carbs) * 100)}%` }}
                />
              </div>
            </div>

            <div className="bg-[#1c2025] p-2 rounded-xl border border-[#262a30]">
              <div className="flex justify-between items-center text-[10px] font-['JetBrains_Mono']">
                <span className="text-[#ffb0c9]">FATS</span>
                <span className="text-[#e0e2ea] font-bold">{Math.round(consumed.fat)} / {targets.fat}g</span>
              </div>
              <div className="w-full bg-[#262a30] h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="bg-[#ffb0c9] h-full rounded-full transition-all duration-500 shadow-[0_0_4px_#ffb0c9]"
                  style={{ width: `${Math.min(100, (consumed.fat / targets.fat) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Micro status ticker */}
        <div className="mt-2 pt-2 border-t border-[#262a30] flex items-center justify-between text-[11px] font-['JetBrains_Mono'] text-[#849585]">
          <span>Net Energy Deficit: <strong className="text-[#10f984]">-{remainingKcal} kcal</strong></span>
          <span>Basal Burn: 1,840 kcal</span>
        </div>
      </div>

      {/* Hydration Vector Console */}
      <div className="w-full bg-[#181c21] rounded-2xl p-3.5 border border-[#262a30] flex flex-col gap-2 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00daf3] text-[20px]">
              water_drop
            </span>
            <span className="font-['Outfit'] font-semibold text-xs text-[#e0e2ea]">
              Hydration Matrix
            </span>
          </div>
          <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#00daf3]">
            {waterIntake} <span className="text-[#849585] font-normal">/ {targets.waterMl} ml</span>
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-[#262a30] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#00daf3] to-[#9cf0ff] rounded-full transition-all duration-500 [filter:drop-shadow(0_0_4px_rgba(0,227,253,0.6))]"
            style={{ width: `${Math.min(100, (waterIntake / targets.waterMl) * 100)}%` }}
          />
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="font-['JetBrains_Mono'] text-[10px] text-[#849585]">
            Target: {Math.round((waterIntake / targets.waterMl) * 100)}% fulfilled
          </span>
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                onAddWater(250);
              }}
              className="px-2.5 py-1 rounded-lg bg-[#262a30] hover:bg-[#31353b] text-[#00daf3] font-['JetBrains_Mono'] text-[11px] font-semibold transition-colors cursor-pointer"
            >
              +250ml
            </button>
            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                onAddWater(500);
              }}
              className="px-2.5 py-1 rounded-lg bg-[#00daf3]/15 text-[#00daf3] hover:bg-[#00daf3]/25 font-['JetBrains_Mono'] text-[11px] font-semibold border border-[#00daf3]/30 transition-colors cursor-pointer"
            >
              +500ml
            </button>
          </div>
        </div>
      </div>

      {/* Target Ledger Meal Stream */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <span className="font-['JetBrains_Mono'] text-[10px] uppercase font-semibold text-[#849585] tracking-wider">
            Today's Logged Ledger
          </span>
          <span className="font-['JetBrains_Mono'] text-[11px] text-[#10f984]">
            {loggedItems.length} items logged
          </span>
        </div>

        {meals.map((meal) => {
          const items = loggedItems.filter((i) => i.mealType === meal.key);
          const mealCalories = items.reduce((sum, i) => sum + i.calories, 0);
          const mealProtein = Math.round(items.reduce((sum, i) => sum + i.protein, 0));

          return (
            <div
              key={meal.key}
              className="rounded-xl bg-[#181c21] border border-[#262a30] p-3 flex flex-col gap-2 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#10f984] text-[18px]">
                    {meal.icon}
                  </span>
                  <span className="font-['Outfit'] font-bold text-sm text-[#e0e2ea]">
                    {meal.label}
                  </span>
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#849585]">
                    {meal.time}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#e0e2ea]">
                    {mealCalories} <span className="text-[10px] text-[#849585]">kcal</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      soundFx.playClick();
                      onNavigateToLog(meal.key);
                    }}
                    title={`Log items to ${meal.label}`}
                    className="w-7 h-7 rounded-lg bg-[#262a30] hover:bg-[#10f984] hover:text-[#003919] text-[#10f984] flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                  </button>
                </div>
              </div>

              {/* Items List */}
              {items.length === 0 ? (
                <div className="text-[11px] font-['JetBrains_Mono'] text-[#849585] py-1 text-center bg-[#101419]/60 rounded-lg">
                  No items logged yet for {meal.label.toLowerCase()}
                </div>
              ) : (
                <div className="flex flex-col gap-1.5 pt-1">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-[#1c2025] hover:bg-[#262a30] transition-colors"
                    >
                      <div className="flex flex-col min-w-0 pr-2">
                        <span className="font-['Outfit'] text-xs font-semibold text-[#e0e2ea] truncate">
                          {item.name}
                        </span>
                        <div className="flex items-center gap-1.5 text-[10px] font-['JetBrains_Mono'] text-[#849585]">
                          <span>{item.grams}g</span>
                          <span>•</span>
                          <span className="text-[#00daf3]">P {item.protein}g</span>
                          <span className="text-[#10f984]">C {item.carbs}g</span>
                          <span className="text-[#ffb0c9]">F {item.fat}g</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#e0e2ea]">
                          {item.calories} kcal
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            soundFx.playClick();
                            onDeleteLoggedItem(item.id);
                          }}
                          title="Remove item"
                          className="w-6 h-6 rounded flex items-center justify-center text-[#849585] hover:text-[#ffb0c9] hover:bg-[#31353b] transition-colors cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-end text-[10px] font-['JetBrains_Mono'] text-[#849585] px-1">
                    Protein subtotal: <strong className="text-[#00daf3] ml-1">{mealProtein}g</strong>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
