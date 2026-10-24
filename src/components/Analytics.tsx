import React, { useState } from 'react';
import { DailyTargets, LoggedItem } from '../types';

interface AnalyticsProps {
  loggedItems: LoggedItem[];
  targets: DailyTargets;
}

export const Analytics: React.FC<AnalyticsProps> = ({ loggedItems, targets }) => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d'>('7d');

  // Sample weekly historical data
  const weekData = [
    { day: 'Sun', date: 'Oct 18', calories: 2350, protein: 178, adherence: 98 },
    { day: 'Mon', date: 'Oct 19', calories: 2420, protein: 185, adherence: 99 },
    { day: 'Tue', date: 'Oct 20', calories: 2280, protein: 172, adherence: 95 },
    { day: 'Wed', date: 'Oct 21', calories: 2450, protein: 188, adherence: 97 },
    { day: 'Thu', date: 'Oct 22', calories: 2390, protein: 180, adherence: 100 },
    { day: 'Fri', date: 'Oct 23', calories: 2310, protein: 175, adherence: 96 },
    { day: 'Sat', date: 'Oct 24', calories: 2150, protein: 176, adherence: 92 },
  ];

  const maxCal = 2800;

  return (
    <div className="flex flex-col w-full gap-y-4 pb-6 animate-in fade-in duration-200">
      {/* Header telemetry switch */}
      <div className="flex items-center justify-between px-1">
        <div>
          <span className="font-['JetBrains_Mono'] text-[10px] uppercase font-semibold text-[#849585] tracking-wider block">
            Bio-Performance Telemetry
          </span>
          <h2 className="font-['Outfit'] font-bold text-lg text-[#e0e2ea]">
            Metabolic Intelligence
          </h2>
        </div>
        <div className="flex bg-[#181c21] p-1 rounded-xl border border-[#262a30]">
          <button
            type="button"
            onClick={() => setTimeRange('7d')}
            className={`px-3 py-1 rounded-lg text-xs font-['JetBrains_Mono'] transition-colors cursor-pointer ${
              timeRange === '7d'
                ? 'bg-[#10f984] text-[#003919] font-bold'
                : 'text-[#849585] hover:text-[#e0e2ea]'
            }`}
          >
            7 Days
          </button>
          <button
            type="button"
            onClick={() => setTimeRange('30d')}
            className={`px-3 py-1 rounded-lg text-xs font-['JetBrains_Mono'] transition-colors cursor-pointer ${
              timeRange === '30d'
                ? 'bg-[#10f984] text-[#003919] font-bold'
                : 'text-[#849585] hover:text-[#e0e2ea]'
            }`}
          >
            30 Days
          </button>
        </div>
      </div>

      {/* 7-Day Caloric Intake Bar Telemetry */}
      <div className="w-full bg-[#181c21] rounded-2xl p-4 border border-[#262a30] shadow-md flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="font-['Outfit'] font-semibold text-xs text-[#e0e2ea]">
            Caloric Intake vs Target ({targets.calories} kcal)
          </span>
          <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#10f984]">
            Avg: 2,335 kcal
          </span>
        </div>

        {/* Chart Viewport */}
        <div className="relative h-44 flex items-end justify-between gap-2 pt-6 pb-2 border-b border-[#262a30]">
          {/* Target line */}
          <div
            className="absolute left-0 right-0 border-t-2 border-dashed border-[#10f984]/40 z-10 pointer-events-none"
            style={{ bottom: `${(targets.calories / maxCal) * 100}%` }}
          >
            <span className="absolute right-0 -top-4 font-['JetBrains_Mono'] text-[9px] text-[#10f984] bg-[#181c21] px-1 rounded">
              Target {targets.calories}
            </span>
          </div>

          {weekData.map((d, idx) => {
            const heightPct = (d.calories / maxCal) * 100;
            const isToday = idx === weekData.length - 1;
            return (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity font-['JetBrains_Mono'] text-[9px] text-[#10f984] absolute -top-1">
                  {d.calories}
                </span>
                <div className="w-full max-w-[28px] bg-[#262a30] rounded-t-lg h-full flex items-end overflow-hidden">
                  <div
                    className={`w-full rounded-t-lg transition-all duration-500 ${
                      isToday
                        ? 'bg-gradient-to-t from-[#00daf3] to-[#10f984] shadow-[0_0_8px_rgba(16,249,132,0.5)]'
                        : 'bg-[#10f984]/70 group-hover:bg-[#10f984]'
                    }`}
                    style={{ height: `${heightPct}%` }}
                  />
                </div>
                <span className={`font-['JetBrains_Mono'] text-[10px] ${
                  isToday ? 'text-[#10f984] font-bold' : 'text-[#849585]'
                }`}>
                  {d.day}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between text-[11px] font-['JetBrains_Mono'] text-[#849585]">
          <span>Weekly Target Adherence: <strong className="text-[#10f984]">97.4%</strong></span>
          <span>Metabolic Deficit: -1,850 kcal/wk</span>
        </div>
      </div>

      {/* Macro Ratio Vector Breakdown */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-[#181c21] p-3 rounded-xl border border-[#262a30] flex flex-col gap-1">
          <span className="font-['JetBrains_Mono'] text-[10px] uppercase text-[#00daf3] font-bold">
            Protein Rate
          </span>
          <span className="font-['Outfit'] text-lg font-bold text-[#e0e2ea]">
            178g <span className="text-xs text-[#849585] font-normal">/day</span>
          </span>
          <span className="text-[10px] font-['JetBrains_Mono'] text-[#10f984]">
            98.8% Goal met
          </span>
        </div>

        <div className="bg-[#181c21] p-3 rounded-xl border border-[#262a30] flex flex-col gap-1">
          <span className="font-['JetBrains_Mono'] text-[10px] uppercase text-[#10f984] font-bold">
            Carb Flux
          </span>
          <span className="font-['Outfit'] text-lg font-bold text-[#e0e2ea]">
            234g <span className="text-xs text-[#849585] font-normal">/day</span>
          </span>
          <span className="text-[10px] font-['JetBrains_Mono'] text-[#849585]">
            Optimal glycogen
          </span>
        </div>

        <div className="bg-[#181c21] p-3 rounded-xl border border-[#262a30] flex flex-col gap-1">
          <span className="font-['JetBrains_Mono'] text-[10px] uppercase text-[#ffb0c9] font-bold">
            Lipid Ratio
          </span>
          <span className="font-['Outfit'] text-lg font-bold text-[#e0e2ea]">
            58g <span className="text-xs text-[#849585] font-normal">/day</span>
          </span>
          <span className="text-[10px] font-['JetBrains_Mono'] text-[#849585]">
            Hormone support
          </span>
        </div>
      </div>

      {/* Intermittent Fasting Telemetry Window */}
      <div className="w-full bg-[#181c21] rounded-2xl p-4 border border-[#262a30] flex flex-col gap-2.5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00daf3] text-[20px]">
              timer
            </span>
            <span className="font-['Outfit'] font-semibold text-xs text-[#e0e2ea]">
              Fasting Metabolic Window (16:8 Protocol)
            </span>
          </div>
          <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#10f984] bg-[#10f984]/10 px-2 py-0.5 rounded-full border border-[#10f984]/20">
            Active Fast
          </span>
        </div>

        <div className="flex items-baseline justify-between pt-1">
          <span className="font-['Outfit'] text-2xl font-bold text-[#e0e2ea]">
            14h 32m
          </span>
          <span className="font-['JetBrains_Mono'] text-xs text-[#849585]">
            Target: 16h 00m (1h 28m left)
          </span>
        </div>

        <div className="w-full h-2 bg-[#262a30] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#00daf3] to-[#10f984] rounded-full transition-all duration-500 [filter:drop-shadow(0_0_6px_rgba(16,249,132,0.5))]"
            style={{ width: `${(14.5 / 16) * 100}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[10px] font-['JetBrains_Mono'] text-[#849585]">
          <span>Last Fuel: 8:15 PM</span>
          <span>Fast Concludes: 12:15 PM</span>
        </div>
      </div>

      {/* Micronutrients & Minerals Spectrum */}
      <div className="w-full bg-[#181c21] rounded-2xl p-4 border border-[#262a30] flex flex-col gap-2.5">
        <span className="font-['Outfit'] font-semibold text-xs text-[#e0e2ea]">
          Key Performance Micronutrients & Electrolytes
        </span>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {[
            { name: 'Dietary Fiber', val: '38g', target: '35g', status: 'Optimal' },
            { name: 'Sodium', val: '2,800mg', target: '3,000mg', status: 'Balanced' },
            { name: 'Potassium', val: '3,900mg', target: '4,000mg', status: 'Optimal' },
            { name: 'Magnesium', val: '440mg', target: '420mg', status: 'Surplus' },
          ].map((micro) => (
            <div key={micro.name} className="p-2.5 rounded-xl bg-[#1c2025] border border-[#262a30] flex flex-col gap-0.5">
              <span className="text-[10px] font-['JetBrains_Mono'] text-[#849585]">{micro.name}</span>
              <div className="flex items-baseline justify-between">
                <span className="font-['JetBrains_Mono'] font-bold text-[#e0e2ea]">{micro.val}</span>
                <span className="text-[9px] font-['JetBrains_Mono'] text-[#10f984] font-semibold">{micro.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
