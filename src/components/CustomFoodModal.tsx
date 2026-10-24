import React, { useState } from 'react';
import { FoodItem, MealType } from '../types';
import { soundFx } from '../utils/audio';

interface CustomFoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveFood: (food: FoodItem, autoLogMeal?: MealType) => void;
  currentMeal: MealType;
}

export const CustomFoodModal: React.FC<CustomFoodModalProps> = ({
  isOpen,
  onClose,
  onSaveFood,
  currentMeal,
}) => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [grams, setGrams] = useState(100);
  const [calories, setCalories] = useState(200);
  const [protein, setProtein] = useState(20);
  const [carbs, setCarbs] = useState(15);
  const [fat, setFat] = useState(5);
  const [tag, setTag] = useState('CUSTOM BIO-FUEL');
  const [alsoLogDirectly, setAlsoLogDirectly] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newFood: FoodItem = {
      id: `custom-${Date.now()}`,
      name: name.trim(),
      brand: brand.trim() || undefined,
      defaultGrams: Number(grams) || 100,
      calories: Number(calories) || 0,
      protein: Number(protein) || 0,
      carbs: Number(carbs) || 0,
      fat: Number(fat) || 0,
      tag: tag.trim() || 'CUSTOM',
      category: 'custom',
      verified: true,
      isFavorite: true,
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=300&auto=format&fit=crop&q=80',
    };

    soundFx.playLogSuccess();
    onSaveFood(newFood, alsoLogDirectly ? currentMeal : undefined);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm rounded-2xl bg-[#181c21] border border-[#262a30] shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#262a30]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#10f984]">
              edit_note
            </span>
            <span className="font-['Outfit'] font-semibold text-sm text-[#e0e2ea]">
              Create Custom Bio-Nutrient
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

        <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-3">
          <div>
            <label className="block text-[10px] font-['JetBrains_Mono'] uppercase tracking-wider text-[#849585] mb-1">
              Food or Recipe Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Grass-Fed Beef Jerky"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#101419] border border-[#262a30] rounded-xl px-3 py-2 text-xs text-[#e0e2ea] font-['Outfit'] focus:outline-none focus:border-[#10f984]"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[10px] font-['JetBrains_Mono'] uppercase tracking-wider text-[#849585] mb-1">
                Brand / Source
              </label>
              <input
                type="text"
                placeholder="e.g. Organic Valley"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full bg-[#101419] border border-[#262a30] rounded-xl px-3 py-2 text-xs text-[#e0e2ea] focus:outline-none focus:border-[#10f984]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-['JetBrains_Mono'] uppercase tracking-wider text-[#849585] mb-1">
                Serving Grams *
              </label>
              <input
                type="number"
                min="1"
                required
                value={grams}
                onChange={(e) => setGrams(Number(e.target.value))}
                className="w-full bg-[#101419] border border-[#262a30] rounded-xl px-3 py-2 text-xs text-[#e0e2ea] font-['JetBrains_Mono'] focus:outline-none focus:border-[#10f984]"
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 pt-1">
            <div className="bg-[#1c2025] p-2 rounded-xl border border-[#262a30]">
              <span className="block text-[9px] font-['JetBrains_Mono'] text-[#10f984] font-semibold">
                KCAL
              </span>
              <input
                type="number"
                min="0"
                required
                value={calories}
                onChange={(e) => setCalories(Number(e.target.value))}
                className="w-full bg-transparent text-xs font-['JetBrains_Mono'] font-bold text-[#e0e2ea] focus:outline-none"
              />
            </div>
            <div className="bg-[#1c2025] p-2 rounded-xl border border-[#262a30]">
              <span className="block text-[9px] font-['JetBrains_Mono'] text-[#00daf3] font-semibold">
                PROT (g)
              </span>
              <input
                type="number"
                min="0"
                required
                value={protein}
                onChange={(e) => setProtein(Number(e.target.value))}
                className="w-full bg-transparent text-xs font-['JetBrains_Mono'] font-bold text-[#e0e2ea] focus:outline-none"
              />
            </div>
            <div className="bg-[#1c2025] p-2 rounded-xl border border-[#262a30]">
              <span className="block text-[9px] font-['JetBrains_Mono'] text-[#10f984] font-semibold">
                CARB (g)
              </span>
              <input
                type="number"
                min="0"
                required
                value={carbs}
                onChange={(e) => setCarbs(Number(e.target.value))}
                className="w-full bg-transparent text-xs font-['JetBrains_Mono'] font-bold text-[#e0e2ea] focus:outline-none"
              />
            </div>
            <div className="bg-[#1c2025] p-2 rounded-xl border border-[#262a30]">
              <span className="block text-[9px] font-['JetBrains_Mono'] text-[#ffb0c9] font-semibold">
                FAT (g)
              </span>
              <input
                type="number"
                min="0"
                required
                value={fat}
                onChange={(e) => setFat(Number(e.target.value))}
                className="w-full bg-transparent text-xs font-['JetBrains_Mono'] font-bold text-[#e0e2ea] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-['JetBrains_Mono'] uppercase tracking-wider text-[#849585] mb-1">
              Performance Tag
            </label>
            <input
              type="text"
              placeholder="e.g. HIGH PROTEIN, ANABOLIC"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="w-full bg-[#101419] border border-[#262a30] rounded-xl px-3 py-2 text-xs text-[#e0e2ea] font-['JetBrains_Mono'] focus:outline-none focus:border-[#10f984]"
            />
          </div>

          <label className="flex items-center gap-2 text-xs text-[#b9cbb9] cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={alsoLogDirectly}
              onChange={(e) => setAlsoLogDirectly(e.target.checked)}
              className="rounded accent-[#10f984]"
            />
            <span>Also immediately log to today's {currentMeal}</span>
          </label>

          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-xl bg-[#10f984] text-[#003919] font-bold text-xs hover:bg-[#61ff98] transition-all shadow-[0_0_12px_rgba(16,249,132,0.4)] cursor-pointer"
          >
            Save & Add to Recall Database
          </button>
        </form>
      </div>
    </div>
  );
};
