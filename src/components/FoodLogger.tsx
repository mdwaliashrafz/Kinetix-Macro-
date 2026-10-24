import React, { useState, useMemo } from 'react';
import { FoodItem, MealType, LoggedItem, DailyTargets } from '../types';
import { soundFx } from '../utils/audio';

interface FoodLoggerProps {
  foods: FoodItem[];
  loggedItems: LoggedItem[];
  targets: DailyTargets;
  selectedMeal: MealType;
  onSelectMeal: (meal: MealType) => void;
  onQuickAddFood: (food: FoodItem) => void;
  onOpenFoodDetail: (food: FoodItem) => void;
  onOpenBarcodeScanner: () => void;
  onOpenVoiceModal: () => void;
  onOpenCustomFoodModal: () => void;
  activeToast: string | null;
}

export const FoodLogger: React.FC<FoodLoggerProps> = ({
  foods,
  loggedItems,
  targets,
  selectedMeal,
  onSelectMeal,
  onQuickAddFood,
  onOpenFoodDetail,
  onOpenBarcodeScanner,
  onOpenVoiceModal,
  onOpenCustomFoodModal,
  activeToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'recent' | 'frequent' | 'favorites' | 'custom'>('all');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  // Compute live consumption totals
  const consumed = useMemo(() => {
    return loggedItems.reduce(
      (acc, item) => ({
        calories: acc.calories + item.calories,
        protein: acc.protein + item.protein,
        carbs: acc.carbs + item.carbs,
        fat: acc.fat + item.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  }, [loggedItems]);

  const remainingKcal = Math.max(0, targets.calories - consumed.calories);
  const remainingProtein = Math.max(0, Math.round(targets.protein - consumed.protein));
  const remainingCarbs = Math.max(0, Math.round(targets.carbs - consumed.carbs));
  const remainingFat = Math.max(0, Math.round(targets.fat - consumed.fat));

  // Compute macro percentage ratios for multi-segment bar
  const totalMacroGrams = (remainingProtein * 4) + (remainingCarbs * 4) + (remainingFat * 9) || 1;
  const proteinPct = Math.round(((remainingProtein * 4) / totalMacroGrams) * 100);
  const carbsPct = Math.round(((remainingCarbs * 4) / totalMacroGrams) * 100);
  const fatsPct = Math.max(0, 100 - proteinPct - carbsPct);

  // Meal timing descriptor
  const mealWindowText: Record<MealType, string> = {
    breakfast: '7:30 AM Window',
    lunch: '12:30 PM Window',
    dinner: '7:00 PM Window',
    snacks: 'Anytime Window',
  };

  // Filter foods based on filter chip & search query
  const filteredFoods = useMemo(() => {
    let result = [...foods];

    // Filter chip logic
    if (activeFilter === 'favorites') {
      result = result.filter((f) => f.isFavorite);
    } else if (activeFilter === 'frequent') {
      result = result.filter((f) => (f.frequency || 0) >= 10);
    } else if (activeFilter === 'custom') {
      result = result.filter((f) => f.category === 'custom');
    } else if (activeFilter === 'recent') {
      // Items that match logged items
      const loggedNames = new Set(loggedItems.map((i) => i.name.toLowerCase()));
      result = result.filter((f) => loggedNames.has(f.name.toLowerCase()));
      if (result.length === 0) {
        result = foods.slice(0, 4);
      }
    }

    // Search query logic
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.tag?.toLowerCase().includes(q) ||
          f.secondaryTag?.toLowerCase().includes(q) ||
          f.brand?.toLowerCase().includes(q)
      );
    }

    return result;
  }, [foods, activeFilter, searchQuery, loggedItems]);

  const handleQuickAddClick = (e: React.MouseEvent, food: FoodItem) => {
    e.stopPropagation();
    soundFx.playLogSuccess();
    setRecentlyAddedId(food.id);
    onQuickAddFood(food);

    setTimeout(() => {
      setRecentlyAddedId((prev) => (prev === food.id ? null : prev));
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full gap-y-4 pb-6">
      {/* Floating Feedback Toast */}
      {activeToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#31353b] text-[#61ff98] shadow-2xl border border-[#10f984]/30 [filter:drop-shadow(0_0_12px_rgba(16,249,132,0.4))] animate-in fade-in slide-in-from-top-3 duration-200">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          <span className="font-['Outfit'] text-xs font-semibold">{activeToast}</span>
        </div>
      )}

      {/* Interactive Search Section */}
      <div className="relative w-full">
        <div className="relative flex items-center bg-[#181c21] rounded-xl px-3 py-2.5 shadow-sm border border-[#262a30] transition-all duration-200 focus-within:bg-[#1c2025] focus-within:border-[#10f984]/40">
          <span className="material-symbols-outlined text-[#849585] text-[22px] mr-2 transition-colors duration-150">
            search
          </span>
          <input
            className="w-full bg-transparent text-[#e0e2ea] placeholder:text-[#849585] font-['Outfit'] text-[14px] focus:outline-none min-w-0 pr-2"
            id="food-search-input"
            placeholder="Search 1.2M+ foods, brands, restaurants..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="mr-1 text-[#849585] hover:text-[#e0e2ea] p-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">cancel</span>
            </button>
          )}

          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              aria-label="Scan barcode"
              title="Scan Barcode"
              onClick={() => {
                soundFx.playClick();
                onOpenBarcodeScanner();
              }}
              className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#262a30] text-[#10f984] hover:bg-[#31353b] active:scale-95 transition-all duration-150 [filter:drop-shadow(0_0_6px_rgba(16,249,132,0.4))] cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">barcode_scanner</span>
            </button>
            <button
              aria-label="Voice input"
              title="Voice Bio-Logger"
              onClick={() => {
                soundFx.playClick();
                onOpenVoiceModal();
              }}
              className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#262a30] text-[#00daf3] hover:bg-[#31353b] active:scale-95 transition-all duration-150 [filter:drop-shadow(0_0_6px_rgba(0,227,253,0.35))] cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">mic</span>
            </button>
          </div>
        </div>
      </div>

      {/* Live Metabolic Telemetry Banner (Dynamic Budget Drawer) */}
      <div className="w-full bg-[#181c21] rounded-xl p-3.5 relative overflow-hidden border border-[#262a30] shadow-md">
        <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-[#10f984]/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10f984] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10f984]" />
            </span>
            <span className="font-['JetBrains_Mono'] text-[10px] font-semibold uppercase text-[#b9cbb9] tracking-wider">
              Remaining Target
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span
              className="font-['Outfit'] text-[24px] font-bold text-[#61ff98] tabular-nums [filter:drop-shadow(0_0_8px_rgba(16,249,132,0.5))]"
              id="calorie-budget"
            >
              {remainingKcal}
            </span>
            <span className="font-['JetBrains_Mono'] text-[12px] text-[#b9cbb9]">kcal</span>
          </div>
        </div>

        {/* Multi-Segment Macro Vector Visualizer */}
        <div className="w-full h-1.5 bg-[#31353b] rounded-full overflow-hidden flex gap-0.5 mb-2.5">
          <div
            className="h-full bg-[#00daf3] transition-all duration-500 rounded-l-full [filter:drop-shadow(0_0_4px_rgba(0,227,253,0.6))]"
            style={{ width: `${proteinPct}%` }}
            title={`Protein: ${remainingProtein}g left`}
          />
          <div
            className="h-full bg-[#10f984] transition-all duration-500 [filter:drop-shadow(0_0_4px_rgba(16,249,132,0.6))]"
            style={{ width: `${carbsPct}%` }}
            title={`Carbs: ${remainingCarbs}g left`}
          />
          <div
            className="h-full bg-[#ffb0c9] transition-all duration-500 rounded-r-full [filter:drop-shadow(0_0_4px_rgba(255,176,201,0.6))]"
            style={{ width: `${fatsPct}%` }}
            title={`Fats: ${remainingFat}g left`}
          />
        </div>

        {/* Macro Micro-Tags */}
        <div className="grid grid-cols-3 gap-2 pt-0.5">
          <div className="flex flex-col bg-[#1c2025] rounded-lg px-2.5 py-1.5 border border-[#262a30]">
            <div className="flex items-center justify-between">
              <span className="font-['JetBrains_Mono'] text-[10px] font-semibold text-[#9cf0ff]">
                PROTEIN
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00daf3]" />
            </div>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-['JetBrains_Mono'] text-[13px] text-[#e0e2ea] font-semibold tabular-nums">
                {remainingProtein}
              </span>
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#849585]">g left</span>
            </div>
          </div>

          <div className="flex flex-col bg-[#1c2025] rounded-lg px-2.5 py-1.5 border border-[#262a30]">
            <div className="flex items-center justify-between">
              <span className="font-['JetBrains_Mono'] text-[10px] font-semibold text-[#61ff98]">
                CARBS
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#10f984]" />
            </div>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-['JetBrains_Mono'] text-[13px] text-[#e0e2ea] font-semibold tabular-nums">
                {remainingCarbs}
              </span>
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#849585]">g left</span>
            </div>
          </div>

          <div className="flex flex-col bg-[#1c2025] rounded-lg px-2.5 py-1.5 border border-[#262a30]">
            <div className="flex items-center justify-between">
              <span className="font-['JetBrains_Mono'] text-[10px] font-semibold text-[#ffb0c9]">
                FATS
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffb0c9]" />
            </div>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-['JetBrains_Mono'] text-[13px] text-[#e0e2ea] font-semibold tabular-nums">
                {remainingFat}
              </span>
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#849585]">g left</span>
            </div>
          </div>
        </div>
      </div>

      {/* Meal Category Switcher Segment (Target Ledger) */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between px-1">
          <span className="font-['JetBrains_Mono'] text-[10px] uppercase font-semibold text-[#849585] tracking-wider">
            Target Ledger
          </span>
          <span className="font-['JetBrains_Mono'] text-[12px] text-[#00e477]">
            {mealWindowText[selectedMeal]}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-1.5 p-1 bg-[#181c21] rounded-xl border border-[#262a30]">
          {(['breakfast', 'lunch', 'dinner', 'snacks'] as MealType[]).map((meal) => {
            const isActive = selectedMeal === meal;
            const count = loggedItems.filter((i) => i.mealType === meal).length;
            return (
              <button
                key={meal}
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  onSelectMeal(meal);
                }}
                className={`meal-tab-btn py-2 px-1 text-center rounded-lg font-['Outfit'] text-[14px] transition-all duration-150 cursor-pointer flex items-center justify-center gap-1 ${
                  isActive
                    ? 'active font-semibold bg-[#262a30] text-[#10f984] shadow-sm [filter:drop-shadow(0_0_6px_rgba(16,249,132,0.25))]'
                    : 'text-[#849585] hover:text-[#e0e2ea]'
                }`}
              >
                <span className="capitalize">{meal}</span>
                {count > 0 && (
                  <span className={`text-[9px] font-['JetBrains_Mono'] px-1 py-0.2 rounded-full ${
                    isActive ? 'bg-[#10f984]/20 text-[#10f984]' : 'bg-[#262a30] text-[#849585]'
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter Horizon Chips (Scrollable) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 -mx-4 px-4">
        {[
          { id: 'all', label: 'All' },
          { id: 'recent', label: 'Recent' },
          { id: 'frequent', label: 'Frequent' },
          { id: 'favorites', label: 'Favorites' },
          { id: 'custom', label: 'Custom' },
        ].map((chip) => {
          const isActive = activeFilter === chip.id;
          return (
            <button
              key={chip.id}
              type="button"
              onClick={() => {
                soundFx.playClick();
                setActiveFilter(chip.id as any);
              }}
              className={`filter-chip flex-shrink-0 h-7 px-3.5 rounded-full font-['JetBrains_Mono'] text-[12px] font-medium active:scale-95 transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'bg-[#10f984] text-[#003919] font-bold shadow-sm'
                  : 'bg-[#181c21] text-[#b9cbb9] hover:text-[#e0e2ea] border border-[#262a30]'
              }`}
            >
              {chip.label}
            </button>
          );
        })}
      </div>

      {/* Food Database Feed List */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between px-1">
          <span className="font-['JetBrains_Mono'] text-[10px] uppercase font-semibold text-[#849585] tracking-wider">
            Fast Recall
          </span>
          <span className="font-['JetBrains_Mono'] text-[12px] text-[#849585]">
            {filteredFoods.length} {filteredFoods.length === 1 ? 'item' : 'items'} ready
          </span>
        </div>

        {filteredFoods.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center bg-[#181c21] rounded-xl border border-[#262a30]">
            <span className="material-symbols-outlined text-[36px] text-[#849585] mb-2">
              search_off
            </span>
            <p className="font-['Outfit'] text-sm font-semibold text-[#e0e2ea]">
              No matching bio-nutrients found
            </p>
            <p className="font-['JetBrains_Mono'] text-xs text-[#849585] mt-1">
              Try a different keyword or create a custom entry.
            </p>
            <button
              type="button"
              onClick={onOpenCustomFoodModal}
              className="mt-3 px-3 py-1.5 rounded-lg bg-[#10f984] text-[#003919] text-xs font-bold font-['Outfit'] cursor-pointer"
            >
              Create "{searchQuery || 'Custom Food'}"
            </button>
          </div>
        ) : (
          filteredFoods.map((food) => {
            const isJustAdded = recentlyAddedId === food.id;

            return (
              <div
                key={food.id}
                onClick={() => {
                  soundFx.playClick();
                  onOpenFoodDetail(food);
                }}
                className="food-item group relative flex items-center justify-between p-3 rounded-xl bg-[#181c21] hover:bg-[#1c2025] border border-[#262a30] transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-start gap-3 min-w-0 pr-2">
                  <div className="w-12 h-12 rounded-lg bg-[#262a30] flex-shrink-0 overflow-hidden relative border border-[#3b4b3d]/30">
                    <img
                      className="w-full h-full object-cover"
                      alt={food.name}
                      src={food.image}
                      onError={(e) => {
                        e.currentTarget.src =
                          'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&auto=format&fit=crop&q=80';
                      }}
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-['Outfit'] text-[14px] font-semibold text-[#e0e2ea] truncate">
                        {food.name}
                      </span>
                      {food.verified && (
                        <span
                          className="inline-flex items-center text-[#10f984]"
                          title="Verified Database Entry"
                        >
                          <span
                            className="material-symbols-outlined text-[15px]"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            verified
                          </span>
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="font-['JetBrains_Mono'] text-[12px] text-[#849585]">
                        {food.defaultGrams}g
                      </span>
                      <span className="text-[#849585] text-[12px]">•</span>
                      <span className="font-['JetBrains_Mono'] text-[12px] font-semibold text-[#e0e2ea]">
                        {food.calories} kcal
                      </span>
                      {food.tag && (
                        <span className="px-1.5 py-0.2 rounded bg-[#00daf3]/15 text-[#00daf3] font-['JetBrains_Mono'] text-[10px] font-semibold uppercase tracking-wider">
                          {food.tag}
                        </span>
                      )}
                      {food.secondaryTag && (
                        <span className="px-1.5 py-0.2 rounded bg-[#10f984]/15 text-[#10f984] font-['JetBrains_Mono'] text-[10px] font-semibold uppercase tracking-wider">
                          {food.secondaryTag}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                      <span className="px-2 py-0.5 rounded-md bg-[#00daf3]/10 text-[#9cf0ff] font-['JetBrains_Mono'] text-[11px] font-medium">
                        P {food.protein}g
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-[#262a30] text-[#849585] font-['JetBrains_Mono'] text-[11px]">
                        C {food.carbs}g
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-[#ffb0c9]/10 text-[#ffb0c9] font-['JetBrains_Mono'] text-[11px]">
                        F {food.fat}g
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Add Button */}
                <button
                  aria-label={`Add ${food.name}`}
                  type="button"
                  onClick={(e) => handleQuickAddClick(e, food)}
                  className={`quick-add-btn flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-150 cursor-pointer ${
                    isJustAdded
                      ? 'bg-[#10f984] text-[#003919] scale-95 shadow-[0_0_12px_rgba(16,249,132,0.6)]'
                      : food.category === 'protein'
                      ? 'bg-[#10f984] text-[#003919] hover:bg-[#61ff98] active:scale-90 [filter:drop-shadow(0_0_8px_rgba(16,249,132,0.45))]'
                      : 'bg-[#262a30] text-[#10f984] hover:bg-[#10f984] hover:text-[#003919] active:scale-90'
                  }`}
                >
                  <span className="material-symbols-outlined text-[24px]">
                    {isJustAdded ? 'done' : 'add'}
                  </span>
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Fast-Action Grid */}
      <div className="grid grid-cols-2 gap-2.5 pt-2">
        <button
          onClick={() => {
            soundFx.playClick();
            onOpenBarcodeScanner();
          }}
          className="flex items-center justify-center gap-2 h-12 rounded-xl bg-[#262a30] text-[#00daf3] hover:bg-[#31353b] active:scale-[0.98] transition-all duration-150 border border-[#00daf3]/20 [filter:drop-shadow(0_0_8px_rgba(0,227,253,0.25))] cursor-pointer"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">photo_camera</span>
          <span className="font-['Outfit'] text-[14px] font-semibold">Barcode Scan</span>
        </button>
        <button
          onClick={() => {
            soundFx.playClick();
            onOpenCustomFoodModal();
          }}
          className="flex items-center justify-center gap-2 h-12 rounded-xl bg-[#262a30] text-[#10f984] hover:bg-[#31353b] active:scale-[0.98] transition-all duration-150 border border-[#10f984]/20 [filter:drop-shadow(0_0_8px_rgba(16,249,132,0.2))] cursor-pointer"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">edit_note</span>
          <span className="font-['Outfit'] text-[14px] font-semibold">Custom Food</span>
        </button>
      </div>
    </div>
  );
};
