/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { FoodItem, LoggedItem, DailyTargets, MealType, Recipe } from './types';
import {
  INITIAL_FOOD_DATABASE,
  INITIAL_TODAY_LOGS,
  DEFAULT_DAILY_TARGETS,
} from './data/initialData';
import { Header } from './components/Header';
import { Navigation, TabType } from './components/Navigation';
import { FoodLogger } from './components/FoodLogger';
import { Dashboard } from './components/Dashboard';
import { Analytics } from './components/Analytics';
import { Recipes } from './components/Recipes';
import { BarcodeScannerModal } from './components/BarcodeScannerModal';
import { VoiceInputModal } from './components/VoiceInputModal';
import { CustomFoodModal } from './components/CustomFoodModal';
import { FoodDetailModal } from './components/FoodDetailModal';
import { ProfileModal } from './components/ProfileModal';

export default function App() {
  // Navigation active tab: initialized to 'log' to match user's screenshot
  const [activeTab, setActiveTab] = useState<TabType>('log');
  
  // Current active date
  const [currentDate, setCurrentDate] = useState<string>('2026-10-24');

  // Currently selected meal window (Breakfast, Lunch, Dinner, Snacks)
  const [selectedMeal, setSelectedMeal] = useState<MealType>('lunch');

  // Food items database
  const [foods, setFoods] = useState<FoodItem[]>(() => {
    try {
      const saved = localStorage.getItem('kinetix_foods_db');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return INITIAL_FOOD_DATABASE;
  });

  // Logged meal items
  const [loggedItems, setLoggedItems] = useState<LoggedItem[]>(() => {
    try {
      const saved = localStorage.getItem('kinetix_logged_items');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return INITIAL_TODAY_LOGS;
  });

  // Athlete daily targets
  const [targets, setTargets] = useState<DailyTargets>(() => {
    try {
      const saved = localStorage.getItem('kinetix_targets');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return DEFAULT_DAILY_TARGETS;
  });

  // Water intake
  const [waterIntake, setWaterIntake] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('kinetix_water_intake');
      if (saved) return Number(saved);
    } catch {
      // Fallback
    }
    return 2250;
  });

  // Modals state
  const [isBarcodeOpen, setIsBarcodeOpen] = useState(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isCustomFoodOpen, setIsCustomFoodOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [detailFood, setDetailFood] = useState<FoodItem | null>(null);

  // Active toast notification message
  const [activeToast, setActiveToast] = useState<string | null>(null);

  // Save to LocalStorage on updates
  useEffect(() => {
    try {
      localStorage.setItem('kinetix_foods_db', JSON.stringify(foods));
    } catch {}
  }, [foods]);

  useEffect(() => {
    try {
      localStorage.setItem('kinetix_logged_items', JSON.stringify(loggedItems));
    } catch {}
  }, [loggedItems]);

  useEffect(() => {
    try {
      localStorage.setItem('kinetix_targets', JSON.stringify(targets));
    } catch {}
  }, [targets]);

  useEffect(() => {
    try {
      localStorage.setItem('kinetix_water_intake', String(waterIntake));
    } catch {}
  }, [waterIntake]);

  const showToast = (message: string) => {
    setActiveToast(message);
    setTimeout(() => {
      setActiveToast((current) => (current === message ? null : current));
    }, 2200);
  };

  // Quick Add 1 default serving from Fast Recall list
  const handleQuickAddFood = (food: FoodItem) => {
    const newItem: LoggedItem = {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      foodItemId: food.id,
      name: food.name,
      brand: food.brand,
      grams: food.defaultGrams,
      calories: food.calories,
      protein: food.protein,
      carbs: food.carbs,
      fat: food.fat,
      mealType: selectedMeal,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      dateStr: currentDate,
      image: food.image,
    };

    setLoggedItems((prev) => [newItem, ...prev]);

    // Increment food recall frequency
    setFoods((prev) =>
      prev.map((f) => (f.id === food.id ? { ...f, frequency: (f.frequency || 0) + 1 } : f))
    );

    showToast(`Added ${food.name} to ${selectedMeal.charAt(0).toUpperCase() + selectedMeal.slice(1)}`);
  };

  // Add customized serving from FoodDetailModal
  const handleLogCustomPortion = (food: FoodItem, grams: number, mealType: MealType) => {
    const multiplier = grams / (food.defaultGrams || 100);
    const newItem: LoggedItem = {
      id: `log-${Date.now()}`,
      foodItemId: food.id,
      name: food.name,
      brand: food.brand,
      grams,
      calories: Math.round(food.calories * multiplier),
      protein: Math.round(food.protein * multiplier * 10) / 10,
      carbs: Math.round(food.carbs * multiplier * 10) / 10,
      fat: Math.round(food.fat * multiplier * 10) / 10,
      mealType,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      dateStr: currentDate,
      image: food.image,
    };

    setLoggedItems((prev) => [newItem, ...prev]);
    showToast(`Added ${grams}g ${food.name} to ${mealType}`);
  };

  // Save new custom food item and optionally log it
  const handleSaveCustomFood = (food: FoodItem, autoLogMeal?: MealType) => {
    setFoods((prev) => [food, ...prev]);

    if (autoLogMeal) {
      const newItem: LoggedItem = {
        id: `log-${Date.now()}`,
        foodItemId: food.id,
        name: food.name,
        brand: food.brand,
        grams: food.defaultGrams,
        calories: food.calories,
        protein: food.protein,
        carbs: food.carbs,
        fat: food.fat,
        mealType: autoLogMeal,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        dateStr: currentDate,
        image: food.image,
      };
      setLoggedItems((prev) => [newItem, ...prev]);
      showToast(`Logged ${food.name} to ${autoLogMeal}`);
    } else {
      showToast(`Saved "${food.name}" to Recall Catalog`);
    }
  };

  // Add from voice parser
  const handleAddParsedMeal = (parsed: Partial<LoggedItem>) => {
    const newItem: LoggedItem = {
      id: `log-voice-${Date.now()}`,
      name: parsed.name || 'Voice Logged Food',
      grams: parsed.grams || 100,
      calories: parsed.calories || 200,
      protein: parsed.protein || 20,
      carbs: parsed.carbs || 10,
      fat: parsed.fat || 5,
      mealType: parsed.mealType || selectedMeal,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      dateStr: currentDate,
    };

    setLoggedItems((prev) => [newItem, ...prev]);
    showToast(`Voice logged ${newItem.name}`);
  };

  // Add from barcode scanner
  const handleFoodFromBarcode = (food: FoodItem, mealType: MealType) => {
    handleLogCustomPortion(food, food.defaultGrams, mealType);
  };

  // Add recipe to meal
  const handleLogRecipe = (recipe: Recipe, meal: MealType) => {
    const newItem: LoggedItem = {
      id: `log-rec-${Date.now()}`,
      name: recipe.title,
      grams: 350,
      calories: recipe.calories,
      protein: recipe.protein,
      carbs: recipe.carbs,
      fat: recipe.fat,
      mealType: meal,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      dateStr: currentDate,
      image: recipe.image,
    };

    setLoggedItems((prev) => [newItem, ...prev]);
    showToast(`Logged recipe "${recipe.title}" to ${meal}`);
  };

  // Delete logged item
  const handleDeleteLoggedItem = (id: string) => {
    setLoggedItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Removed item from ledger');
  };

  // Water increment
  const handleAddWater = (amount: number) => {
    setWaterIntake((prev) => prev + amount);
    showToast(`+${amount}ml Hydration added`);
  };

  // Toggle favorite
  const handleToggleFavorite = (foodId: string) => {
    setFoods((prev) =>
      prev.map((f) => (f.id === foodId ? { ...f, isFavorite: !f.isFavorite } : f))
    );
  };

  // Reset to initial baseline mockup data
  const handleResetData = () => {
    setFoods(INITIAL_FOOD_DATABASE);
    setLoggedItems(INITIAL_TODAY_LOGS);
    setTargets(DEFAULT_DAILY_TARGETS);
    setWaterIntake(2250);
    setCurrentDate('2026-10-24');
    setSelectedMeal('lunch');
    localStorage.clear();
    showToast('Reset back to baseline mockup');
  };

  // Filter items for currently selected date
  const currentDayLogs = loggedItems.filter((i) => i.dateStr === currentDate);

  return (
    <div className="min-h-screen bg-[#101419] text-[#e0e2ea] flex flex-col font-['Outfit'] selection:bg-[#10f984]/30 selection:text-[#dbffde]">
      {/* Top Header */}
      <Header
        currentDate={currentDate}
        onSelectDate={setCurrentDate}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 w-full max-w-md mx-auto pt-20 pb-24 px-4 flex flex-col">
        {activeTab === 'log' && (
          <FoodLogger
            foods={foods}
            loggedItems={currentDayLogs}
            targets={targets}
            selectedMeal={selectedMeal}
            onSelectMeal={setSelectedMeal}
            onQuickAddFood={handleQuickAddFood}
            onOpenFoodDetail={(food) => setDetailFood(food)}
            onOpenBarcodeScanner={() => setIsBarcodeOpen(true)}
            onOpenVoiceModal={() => setIsVoiceOpen(true)}
            onOpenCustomFoodModal={() => setIsCustomFoodOpen(true)}
            activeToast={activeToast}
          />
        )}

        {activeTab === 'dash' && (
          <Dashboard
            loggedItems={currentDayLogs}
            targets={targets}
            waterIntake={waterIntake}
            onAddWater={handleAddWater}
            onDeleteLoggedItem={handleDeleteLoggedItem}
            onNavigateToLog={(meal) => {
              setSelectedMeal(meal);
              setActiveTab('log');
            }}
          />
        )}

        {activeTab === 'analytics' && (
          <Analytics
            loggedItems={loggedItems}
            targets={targets}
          />
        )}

        {activeTab === 'recipes' && (
          <Recipes
            onLogRecipe={handleLogRecipe}
          />
        )}
      </main>

      {/* Bottom Sticky Navigation */}
      <Navigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Modals */}
      <BarcodeScannerModal
        isOpen={isBarcodeOpen}
        onClose={() => setIsBarcodeOpen(false)}
        onFoodDetected={handleFoodFromBarcode}
        targetMeal={selectedMeal}
      />

      <VoiceInputModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        onAddParsedMeal={handleAddParsedMeal}
        currentMeal={selectedMeal}
      />

      <CustomFoodModal
        isOpen={isCustomFoodOpen}
        onClose={() => setIsCustomFoodOpen(false)}
        onSaveFood={handleSaveCustomFood}
        currentMeal={selectedMeal}
      />

      <FoodDetailModal
        food={detailFood}
        isOpen={!!detailFood}
        onClose={() => setDetailFood(null)}
        onLogFood={handleLogCustomPortion}
        defaultMeal={selectedMeal}
        onToggleFavorite={handleToggleFavorite}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        targets={targets}
        onUpdateTargets={setTargets}
        onResetData={handleResetData}
      />
    </div>
  );
}
