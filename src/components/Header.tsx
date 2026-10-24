import React, { useState, useRef, useEffect } from 'react';
import { soundFx } from '../utils/audio';

interface HeaderProps {
  currentDate: string;
  onSelectDate: (date: string) => void;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentDate,
  onSelectDate,
  onOpenProfile,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const datePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(e.target as Node)) {
        setShowDatePicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDateDisplay = (dateString: string) => {
    if (dateString === '2026-10-24') return 'Today, Oct 24';
    if (dateString === '2026-10-23') return 'Yesterday, Oct 23';
    if (dateString === '2026-10-25') return 'Tomorrow, Oct 25';
    
    // Parse custom date
    try {
      const [year, month, day] = dateString.split('-').map(Number);
      const d = new Date(year, month - 1, day);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return dateString;
    }
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const state = soundFx.toggleSound();
    setSoundOn(state);
    if (state) soundFx.playClick();
  };

  return (
    <header className="fixed top-0 w-full z-40 bg-[#0a0e13]/90 backdrop-blur-xl pt-safe border-b border-[#1c2025] shadow-[0_1px_12px_rgba(0,0,0,0.5)]">
      <div className="max-w-md mx-auto h-16 px-4 flex items-center justify-between gap-2">
        {/* Brand Zone */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-[#181c21] border border-[#262a30] flex items-center justify-center p-1 overflow-hidden shadow-inner flex-shrink-0">
            <img
              alt="Kinetix Macro Logo"
              className="w-full h-full object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6OY-ezv6JgnTNkXxuIouhmtXv8MGMy9L0sTjSqB28mwRljmnjPt79sTh9zmdAGXzrMVXPomufx5WDUfL99CDlqLVi9ucoMf8Q0KoguvFNSpxQkEoZJLmnwh2DMuZQzpCYahmiZ-82RxYtC3JXnc6azGzJzl6NCsROgQTYgdugqh7nWIa5liXgVzV_0o3W1zVRPIQP6rW7qr0qNC0D56xEe-n7oP0WuwpmgMEKEAcq_FFKcMPmDXQ"
              onError={(e) => {
                // High-precision SVG glyph fallback
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <span className="font-['Outfit'] text-[20px] font-bold tracking-tight text-[#e0e2ea] truncate">
            Kinetix
          </span>
        </div>

        {/* Center: Interactive Date Picker Selector */}
        <div className="relative" ref={datePickerRef}>
          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              setShowDatePicker(!showDatePicker);
            }}
            aria-expanded={showDatePicker}
            aria-label="Select date"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#262a30]/70 hover:bg-[#31353b] border border-[#3b4b3d]/40 transition-colors backdrop-blur-md min-h-[44px] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[#00e477] text-[18px]">
              calendar_today
            </span>
            <span className="font-['JetBrains_Mono'] text-[12px] font-medium text-[#e0e2ea] whitespace-nowrap">
              {formatDateDisplay(currentDate)}
            </span>
            <span className="material-symbols-outlined text-[#849585] text-[16px] transition-transform duration-200">
              {showDatePicker ? 'expand_less' : 'expand_more'}
            </span>
          </button>

          {/* Date Picker Dropdown Popover */}
          {showDatePicker && (
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-56 p-2 rounded-xl bg-[#181c21] border border-[#262a30] shadow-2xl z-50 backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-150">
              <div className="text-[10px] font-['JetBrains_Mono'] uppercase tracking-wider text-[#849585] px-2.5 py-1">
                Telemetry Date
              </div>
              <div className="flex flex-col gap-1 mt-1">
                {[
                  { label: 'Yesterday', date: '2026-10-23', sub: 'Oct 23' },
                  { label: 'Today', date: '2026-10-24', sub: 'Oct 24 (Live)' },
                  { label: 'Tomorrow', date: '2026-10-25', sub: 'Oct 25' },
                ].map((item) => (
                  <button
                    key={item.date}
                    type="button"
                    onClick={() => {
                      soundFx.playClick();
                      onSelectDate(item.date);
                      setShowDatePicker(false);
                    }}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-left text-xs transition-colors cursor-pointer ${
                      currentDate === item.date
                        ? 'bg-[#10f984]/15 text-[#10f984] font-semibold border border-[#10f984]/30'
                        : 'text-[#e0e2ea] hover:bg-[#262a30]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="font-['JetBrains_Mono'] text-[10px] text-[#849585]">
                      {item.sub}
                    </span>
                  </button>
                ))}

                <div className="pt-2 border-t border-[#262a30] mt-1 px-1">
                  <label className="block text-[10px] font-['JetBrains_Mono'] text-[#849585] mb-1">
                    Custom Date:
                  </label>
                  <input
                    type="date"
                    value={currentDate}
                    onChange={(e) => {
                      if (e.target.value) {
                        onSelectDate(e.target.value);
                        setShowDatePicker(false);
                      }
                    }}
                    className="w-full bg-[#1c2025] text-xs text-[#e0e2ea] px-2 py-1.5 rounded border border-[#3b4b3d] focus:outline-none focus:border-[#10f984]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Zone: Sound Toggle + Profile Avatar */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={toggleSound}
            title={soundOn ? 'Sound Effects Active' : 'Sound Effects Muted'}
            aria-label="Toggle bio-telemetry sounds"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#849585] hover:text-[#10f984] hover:bg-[#1c2025] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">
              {soundOn ? 'volume_up' : 'volume_off'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              onOpenProfile();
            }}
            title="Bio-Targets & Metabolic Settings"
            aria-label="Open profile and target goals"
            className="w-9 h-9 rounded-full relative flex items-center justify-center p-0.5 ring-2 ring-[#10f984]/40 hover:ring-[#10f984] active:scale-95 transition-all cursor-pointer"
          >
            <img
              alt="Athlete Profile"
              className="w-full h-full rounded-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuoGiy28qVE78X1WN4aFaQ_r2RwHvBoTKVrnTesprVD0A_3YZGBtZey5H2E7uOwcuFNzeQic9R1jccP3tbS4GOBRsv4LG6tqlvKijr8HfWB3xCfmPlXbwEXWoJF6FqKjvspH-4BY4shm6IExqMkdiJBHGp1nUlQKjIMhNQTtze8_4Fem1U3UFL2ast_68tJwpn73NwEtcXeqsB4uGaN-x9i2TH7vSRB2k4iUYvIRoU591lDBq-ooc"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80';
              }}
            />
            {/* Active bio-beacon indicator */}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#10f984] border-2 border-[#101419]" />
          </button>
        </div>
      </div>
    </header>
  );
};
