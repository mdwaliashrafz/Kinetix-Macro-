import React, { useState, useMemo } from 'react';
import { Recipe, MealType } from '../types';
import { RECIPES_DATA } from '../data/initialData';
import { soundFx } from '../utils/audio';

interface RecipesProps {
  onLogRecipe: (recipe: Recipe, meal: MealType) => void;
}

export const Recipes: React.FC<RecipesProps> = ({ onLogRecipe }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'default' | 'protein' | 'calories' | 'time'>('default');
  const [activeRecipe, setActiveRecipe] = useState<Recipe | null>(null);
  const [selectedMeal, setSelectedMeal] = useState<MealType>('lunch');

  // Filter & Search recipes
  const filteredRecipes = useMemo(() => {
    let result = [...RECIPES_DATA];

    // Filter by tag
    if (selectedTag === 'hypertrophy') {
      result = result.filter((r) => r.tag.toLowerCase().includes('hypertrophy'));
    } else if (selectedTag === 'high-protein') {
      result = result.filter((r) => r.protein >= 40);
    } else if (selectedTag === 'breakfast') {
      result = result.filter((r) =>
        r.tag.toLowerCase().includes('breakfast') || r.title.toLowerCase().includes('proats') || r.title.toLowerCase().includes('toast') || r.title.toLowerCase().includes('pancake') || r.title.toLowerCase().includes('scramble') || r.title.toLowerCase().includes('parfait') || r.title.toLowerCase().includes('waffle')
      );
    } else if (selectedTag === 'low-carb') {
      result = result.filter((r) => r.carbs <= 15 || r.tag.toLowerCase().includes('keto') || r.tag.toLowerCase().includes('low carb'));
    } else if (selectedTag === 'quick') {
      result = result.filter((r) => {
        const timeNum = parseInt(r.prepTime, 10);
        return !isNaN(timeNum) && timeNum <= 15;
      });
    } else if (selectedTag === 'lean') {
      result = result.filter((r) => r.tag.toLowerCase().includes('lean') || r.fat <= 10);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.tag.toLowerCase().includes(q) ||
          r.ingredients.some((ing) => ing.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortBy === 'protein') {
      result.sort((a, b) => b.protein - a.protein);
    } else if (sortBy === 'calories') {
      result.sort((a, b) => a.calories - b.calories);
    } else if (sortBy === 'time') {
      result.sort((a, b) => {
        const timeA = parseInt(a.prepTime, 10) || 99;
        const timeB = parseInt(b.prepTime, 10) || 99;
        return timeA - timeB;
      });
    }

    return result;
  }, [selectedTag, searchQuery, sortBy]);

  const handleLogClick = () => {
    if (activeRecipe) {
      soundFx.playLogSuccess();
      onLogRecipe(activeRecipe, selectedMeal);
      setActiveRecipe(null);
    }
  };

  const handleQuickLog = (e: React.MouseEvent, recipe: Recipe) => {
    e.stopPropagation();
    soundFx.playLogSuccess();
    onLogRecipe(recipe, selectedMeal);
  };

  return (
    <div className="flex flex-col w-full gap-y-3.5 pb-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <div>
          <span className="font-['JetBrains_Mono'] text-[10px] uppercase font-semibold text-[#849585] tracking-wider block">
            Athlete Bio-Fuel
          </span>
          <h2 className="font-['Outfit'] font-bold text-lg text-[#e0e2ea]">
            High-Performance Kitchen
          </h2>
        </div>
        <span className="font-['JetBrains_Mono'] text-xs text-[#10f984] bg-[#10f984]/10 px-2.5 py-1 rounded-full border border-[#10f984]/20 font-semibold">
          {filteredRecipes.length} Protocols
        </span>
      </div>

      {/* Recipe Search Bar */}
      <div className="relative w-full">
        <div className="relative flex items-center bg-[#181c21] rounded-xl px-3 py-2 border border-[#262a30] transition-all duration-200 focus-within:bg-[#1c2025] focus-within:border-[#10f984]/40">
          <span className="material-symbols-outlined text-[#849585] text-[20px] mr-2">
            search
          </span>
          <input
            type="text"
            placeholder="Search 34+ athlete recipes, ingredients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-[#e0e2ea] placeholder:text-[#849585] font-['Outfit'] text-[13px] focus:outline-none min-w-0 pr-2"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-[#849585] hover:text-[#e0e2ea] p-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">cancel</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Chips Carousel */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 -mx-4 px-4">
        {[
          { id: 'all', label: `All (${RECIPES_DATA.length})` },
          { id: 'high-protein', label: 'High Protein (40g+)' },
          { id: 'breakfast', label: 'Breakfast Fuel' },
          { id: 'hypertrophy', label: 'Hypertrophy' },
          { id: 'low-carb', label: 'Low Carb / Keto' },
          { id: 'lean', label: 'Lean Recovery' },
          { id: 'quick', label: 'Quick (<15m)' },
        ].map((chip) => {
          const isActive = selectedTag === chip.id;
          return (
            <button
              key={chip.id}
              type="button"
              onClick={() => {
                soundFx.playClick();
                setSelectedTag(chip.id);
              }}
              className={`flex-shrink-0 h-7 px-3 rounded-full font-['JetBrains_Mono'] text-[11px] font-medium active:scale-95 transition-all cursor-pointer ${
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

      {/* Secondary Sort Row */}
      <div className="flex items-center justify-between px-1 text-[11px] font-['JetBrains_Mono'] text-[#849585]">
        <span>Showing {filteredRecipes.length} results</span>
        <div className="flex items-center gap-1">
          <span>Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#181c21] border border-[#262a30] text-[#10f984] rounded px-1.5 py-0.5 text-[10px] focus:outline-none"
          >
            <option value="default">Featured</option>
            <option value="protein">Highest Protein</option>
            <option value="calories">Lowest Calorie</option>
            <option value="time">Quickest Prep</option>
          </select>
        </div>
      </div>

      {/* Recipe Cards List */}
      <div className="flex flex-col gap-3">
        {filteredRecipes.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center bg-[#181c21] rounded-2xl border border-[#262a30]">
            <span className="material-symbols-outlined text-[36px] text-[#849585] mb-2">
              restaurant_menu
            </span>
            <p className="font-['Outfit'] text-sm font-semibold text-[#e0e2ea]">
              No recipes match your criteria
            </p>
            <p className="font-['JetBrains_Mono'] text-xs text-[#849585] mt-1">
              Try clearing filters or search terms.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedTag('all');
                setSearchQuery('');
              }}
              className="mt-3 px-3 py-1.5 rounded-lg bg-[#10f984] text-[#003919] text-xs font-bold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              onClick={() => {
                soundFx.playClick();
                setActiveRecipe(recipe);
              }}
              className="rounded-2xl bg-[#181c21] border border-[#262a30] overflow-hidden hover:border-[#10f984]/40 transition-all cursor-pointer shadow-md group"
            >
              <div className="relative h-36 bg-[#0a0e13] overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181c21] via-transparent to-black/30" />
                <div className="absolute top-2.5 left-3">
                  <span className="px-2 py-0.5 rounded bg-[#10f984]/20 backdrop-blur-md text-[#10f984] font-['JetBrains_Mono'] text-[9px] font-bold tracking-wider uppercase border border-[#10f984]/30">
                    {recipe.tag}
                  </span>
                </div>
                <div className="absolute top-2.5 right-3 bg-[#181c21]/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-['JetBrains_Mono'] text-[#e0e2ea] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px] text-[#00daf3]">
                    schedule
                  </span>
                  <span>{recipe.prepTime}</span>
                </div>
              </div>

              <div className="p-3.5 flex flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-['Outfit'] font-bold text-sm text-[#e0e2ea] group-hover:text-[#10f984] transition-colors">
                    {recipe.title}
                  </h3>
                  <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#10f984] shrink-0">
                    {recipe.calories} kcal
                  </span>
                </div>

                <p className="font-['Outfit'] text-xs text-[#849585] line-clamp-2">
                  {recipe.description}
                </p>

                {/* Macro Vector Bar & Quick Action */}
                <div className="flex items-center justify-between pt-1 gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="px-2 py-0.5 rounded-md bg-[#00daf3]/10 text-[#00daf3] font-['JetBrains_Mono'] text-[11px] font-medium">
                      P {recipe.protein}g
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-[#10f984]/10 text-[#10f984] font-['JetBrains_Mono'] text-[11px]">
                      C {recipe.carbs}g
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-[#ffb0c9]/10 text-[#ffb0c9] font-['JetBrains_Mono'] text-[11px]">
                      F {recipe.fat}g
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => handleQuickLog(e, recipe)}
                    title="Quick log recipe to today's ledger"
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#262a30] hover:bg-[#10f984] hover:text-[#003919] text-[#10f984] font-['JetBrains_Mono'] text-[10px] font-bold transition-all cursor-pointer shrink-0"
                  >
                    <span className="material-symbols-outlined text-[14px]">add</span>
                    <span>Log</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Recipe Detail Modal */}
      {activeRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm rounded-2xl bg-[#181c21] border border-[#262a30] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Image */}
            <div className="relative h-44 bg-[#0a0e13] overflow-hidden shrink-0">
              <img
                src={activeRecipe.image}
                alt={activeRecipe.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181c21] via-transparent to-black/50" />
              <button
                type="button"
                onClick={() => setActiveRecipe(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#181c21]/80 backdrop-blur-md flex items-center justify-center text-[#e0e2ea] hover:bg-[#262a30] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
              <div className="absolute bottom-3 left-4 right-4">
                <span className="inline-block px-2 py-0.5 mb-1 rounded bg-[#10f984]/20 text-[#10f984] text-[9px] font-['JetBrains_Mono'] font-bold">
                  {activeRecipe.tag}
                </span>
                <h3 className="font-['Outfit'] font-bold text-base text-white">
                  {activeRecipe.title}
                </h3>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-4 flex flex-col gap-3.5 overflow-y-auto no-scrollbar">
              {/* Macro stats */}
              <div className="grid grid-cols-4 gap-2 bg-[#1c2025] p-2.5 rounded-xl border border-[#262a30] text-center">
                <div>
                  <span className="block text-[9px] font-['JetBrains_Mono'] text-[#849585]">CALORIES</span>
                  <span className="font-['Outfit'] font-bold text-sm text-[#10f984]">{activeRecipe.calories}</span>
                </div>
                <div>
                  <span className="block text-[9px] font-['JetBrains_Mono'] text-[#00daf3]">PROTEIN</span>
                  <span className="font-['Outfit'] font-bold text-sm text-[#00daf3]">{activeRecipe.protein}g</span>
                </div>
                <div>
                  <span className="block text-[9px] font-['JetBrains_Mono'] text-[#10f984]">CARBS</span>
                  <span className="font-['Outfit'] font-bold text-sm text-[#10f984]">{activeRecipe.carbs}g</span>
                </div>
                <div>
                  <span className="block text-[9px] font-['JetBrains_Mono'] text-[#ffb0c9]">FATS</span>
                  <span className="font-['Outfit'] font-bold text-sm text-[#ffb0c9]">{activeRecipe.fat}g</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-[#b9cbb9] font-['Outfit'] bg-[#101419] p-2.5 rounded-lg border border-[#262a30]">
                {activeRecipe.description}
              </p>

              {/* Ingredients */}
              <div>
                <span className="text-[10px] font-['JetBrains_Mono'] uppercase tracking-wider text-[#849585] block mb-1">
                  Bio-Fuel Components:
                </span>
                <ul className="flex flex-col gap-1 text-xs text-[#e0e2ea]">
                  {activeRecipe.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-center gap-2 bg-[#101419] p-2 rounded-lg border border-[#262a30]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10f984]" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div>
                <span className="text-[10px] font-['JetBrains_Mono'] uppercase tracking-wider text-[#849585] block mb-1">
                  Preparation Directives:
                </span>
                <ol className="flex flex-col gap-1.5 text-xs text-[#b9cbb9]">
                  {activeRecipe.instructions.map((step, i) => (
                    <li key={i} className="flex items-start gap-2 bg-[#101419] p-2 rounded-lg border border-[#262a30]">
                      <span className="font-['JetBrains_Mono'] text-[10px] text-[#10f984] font-bold mt-0.5">
                        0{i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Target Meal Selection */}
              <div>
                <span className="text-[10px] font-['JetBrains_Mono'] uppercase tracking-wider text-[#849585] block mb-1.5">
                  Log this Meal into:
                </span>
                <div className="grid grid-cols-4 gap-1 p-1 bg-[#101419] rounded-xl border border-[#262a30]">
                  {(['breakfast', 'lunch', 'dinner', 'snacks'] as MealType[]).map((meal) => (
                    <button
                      key={meal}
                      type="button"
                      onClick={() => setSelectedMeal(meal)}
                      className={`py-1.5 text-center rounded-lg text-xs font-['Outfit'] capitalize transition-colors cursor-pointer ${
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

              {/* Action Button */}
              <button
                type="button"
                onClick={handleLogClick}
                className="w-full py-3 rounded-xl bg-[#10f984] text-[#003919] font-['Outfit'] font-bold text-sm hover:bg-[#61ff98] transition-all shadow-[0_0_16px_rgba(16,249,132,0.4)] cursor-pointer shrink-0"
              >
                Log Recipe to {selectedMeal}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
