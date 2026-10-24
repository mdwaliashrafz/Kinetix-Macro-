import React, { useState, useEffect } from 'react';
import { FoodItem, MealType } from '../types';
import { soundFx } from '../utils/audio';

interface FoodDetailModalProps {
  food: FoodItem | null;
  isOpen: boolean;
  onClose: () => void;
  onLogFood: (food: FoodItem, grams: number, mealType: MealType) => void;
  defaultMeal: MealType;
  onToggleFavorite?: (id: string) => void;
}

export const FoodDetailModal: React.FC<FoodDetailModalProps> = ({
  food,
  isOpen,
  onClose,
  onLogFood,
  defaultMeal,
  onToggleFavorite,
}) => {
  const [grams, setGrams] = useState(100);
  const [selectedMeal, setSelectedMeal] = useState<MealType>(defaultMeal);

  useEffect(() => {
    if (food) {
      setGrams(food.defaultGrams);
      setSelectedMeal(defaultMeal);
    }
  }, [food, defaultMeal]);

  if (!isOpen || !food) return null;

  const multiplier = grams / (food.defaultGrams || 100);
  const calculatedKcal = Math.round(food.calories * multiplier);
  const calculatedProtein = Math.round(food.protein * multiplier * 10) / 10;
  const calculatedCarbs = Math.round(food.carbs * multiplier * 10) / 10;
  const calculatedFat = Math.round(food.fat * multiplier * 10) / 10;

  const handleConfirm = () => {
    soundFx.playLogSuccess();
    onLogFood(food, grams, selectedMeal);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm rounded-2xl bg-[#181c21] border border-[#262a30] shadow-2xl overflow-hidden flex flex-col">
        {/* Header Image Cover */}
        <div className="relative h-44 bg-[#0a0e13] overflow-hidden">
          <img
            src={food.image}
            alt={food.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src =
                'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181c21] via-transparent to-black/40" />

          {/* Close & Favorite */}
          <div className="absolute top-3 right-3 flex items-center gap-2">
            {onToggleFavorite && (
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  onToggleFavorite(food.id);
                }}
                className="w-8 h-8 rounded-full bg-[#181c21]/80 backdrop-blur-md flex items-center justify-center text-[#e0e2ea] hover:text-[#10f984] cursor-pointer"
              >
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={food.isFavorite ? { fontVariationSettings: "'FILL' 1", color: '#10f984' } : undefined}
                >
                  favorite
                </span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#181c21]/80 backdrop-blur-md flex items-center justify-center text-[#e0e2ea] hover:bg-[#262a30] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          {/* Title on image */}
          <div className="absolute bottom-3 left-4 right-4">
            {food.tag && (
              <span className="inline-block px-2 py-0.5 mb-1 rounded bg-[#00e3fd]/20 text-[#00daf3] text-[9px] font-['JetBrains_Mono'] font-bold tracking-wider uppercase">
                {food.tag}
              </span>
            )}
            <h3 className="font-['Outfit'] font-bold text-lg text-white truncate">
              {food.name}
            </h3>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 flex flex-col gap-4">
          {/* Real-time Macro Tiles */}
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-[#1c2025] p-2.5 rounded-xl border border-[#262a30] text-center">
              <span className="block text-[9px] font-['JetBrains_Mono'] text-[#849585] uppercase">
                Energy
              </span>
              <span className="font-['Outfit'] text-base font-bold text-[#10f984]">
                {calculatedKcal}
              </span>
              <span className="block text-[9px] font-['JetBrains_Mono'] text-[#849585]">
                kcal
              </span>
            </div>
            <div className="bg-[#1c2025] p-2.5 rounded-xl border border-[#262a30] text-center">
              <span className="block text-[9px] font-['JetBrains_Mono'] text-[#00daf3] uppercase">
                Protein
              </span>
              <span className="font-['Outfit'] text-base font-bold text-[#00daf3]">
                {calculatedProtein}g
              </span>
              <span className="block text-[9px] font-['JetBrains_Mono'] text-[#849585]">
                {Math.round((calculatedProtein * 4 / Math.max(1, calculatedKcal)) * 100)}%
              </span>
            </div>
            <div className="bg-[#1c2025] p-2.5 rounded-xl border border-[#262a30] text-center">
              <span className="block text-[9px] font-['JetBrains_Mono'] text-[#10f984] uppercase">
                Carbs
              </span>
              <span className="font-['Outfit'] text-base font-bold text-[#10f984]">
                {calculatedCarbs}g
              </span>
              <span className="block text-[9px] font-['JetBrains_Mono'] text-[#849585]">
                {Math.round((calculatedCarbs * 4 / Math.max(1, calculatedKcal)) * 100)}%
              </span>
            </div>
            <div className="bg-[#1c2025] p-2.5 rounded-xl border border-[#262a30] text-center">
              <span className="block text-[9px] font-['JetBrains_Mono'] text-[#ffb0c9] uppercase">
                Fats
              </span>
              <span className="font-['Outfit'] text-base font-bold text-[#ffb0c9]">
                {calculatedFat}g
              </span>
              <span className="block text-[9px] font-['JetBrains_Mono'] text-[#849585]">
                {Math.round((calculatedFat * 9 / Math.max(1, calculatedKcal)) * 100)}%
              </span>
            </div>
          </div>

          {/* Portion Grams Slider & Input */}
          <div className="bg-[#1c2025] p-3 rounded-xl border border-[#262a30] flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-['Outfit'] font-semibold text-[#e0e2ea]">
                Serving Quantity:
              </span>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={grams}
                  onChange={(e) => setGrams(Math.max(1, Number(e.target.value)))}
                  className="w-16 bg-[#101419] border border-[#3b4b3d] rounded px-1.5 py-0.5 text-right font-['JetBrains_Mono'] text-xs text-[#10f984] font-bold focus:outline-none"
                />
                <span className="font-['JetBrains_Mono'] text-xs text-[#849585]">grams</span>
              </div>
            </div>

            <input
              type="range"
              min="20"
              max="500"
              step="5"
              value={grams}
              onChange={(e) => setGrams(Number(e.target.value))}
              className="w-full accent-[#10f984] cursor-pointer"
            />

            <div className="flex justify-between text-[10px] font-['JetBrains_Mono'] text-[#849585]">
              <button
                type="button"
                onClick={() => setGrams(Math.round(food.defaultGrams * 0.5))}
                className="hover:text-[#10f984] cursor-pointer"
              >
                Half ({Math.round(food.defaultGrams * 0.5)}g)
              </button>
              <button
                type="button"
                onClick={() => setGrams(food.defaultGrams)}
                className="hover:text-[#10f984] cursor-pointer"
              >
                Default ({food.defaultGrams}g)
              </button>
              <button
                type="button"
                onClick={() => setGrams(Math.round(food.defaultGrams * 1.5))}
                className="hover:text-[#10f984] cursor-pointer"
              >
                1.5x ({Math.round(food.defaultGrams * 1.5)}g)
              </button>
              <button
                type="button"
                onClick={() => setGrams(food.defaultGrams * 2)}
                className="hover:text-[#10f984] cursor-pointer"
              >
                Double ({food.defaultGrams * 2}g)
              </button>
            </div>
          </div>

          {/* Meal Target Segment */}
          <div>
            <span className="block text-[10px] font-['JetBrains_Mono'] uppercase tracking-wider text-[#849585] mb-1.5">
              Target Meal Destination
            </span>
            <div className="grid grid-cols-4 gap-1 p-1 bg-[#101419] rounded-xl border border-[#262a30]">
              {(['breakfast', 'lunch', 'dinner', 'snacks'] as MealType[]).map((meal) => (
                <button
                  key={meal}
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    setSelectedMeal(meal);
                  }}
                  className={`py-1.5 text-center rounded-lg text-xs font-['Outfit'] capitalize transition-all cursor-pointer ${
                    selectedMeal === meal
                      ? 'bg-[#262a30] text-[#10f984] font-bold shadow-sm'
                      : 'text-[#849585] hover:text-[#e0e2ea]'
                  }`}
                >
                  {meal}
                </button>
              ))}
            </div>
          </div>

          {/* Action button */}
          <button
            type="button"
            onClick={handleConfirm}
            className="w-full py-3 rounded-xl bg-[#10f984] text-[#003919] font-['Outfit'] font-bold text-sm hover:bg-[#61ff98] active:scale-[0.98] transition-all shadow-[0_0_16px_rgba(16,249,132,0.4)] cursor-pointer"
          >
            Log {grams}g to {selectedMeal}
          </button>
        </div>
      </div>
    </div>
  );
};
