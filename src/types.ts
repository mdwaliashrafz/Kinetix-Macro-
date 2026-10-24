export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snacks';

export interface FoodItem {
  id: string;
  name: string;
  brand?: string;
  defaultGrams: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  tag?: string; // e.g. "HIGH PROTEIN", "LEAN", "COMPLEX CARB", "HEALTHY LIPID", "LOW CARB"
  secondaryTag?: string;
  verified?: boolean;
  image: string;
  category: 'protein' | 'carb' | 'fat' | 'dairy' | 'fruit' | 'custom';
  isFavorite?: boolean;
  frequency?: number;
  barcode?: string;
}

export interface LoggedItem {
  id: string;
  foodItemId?: string;
  name: string;
  brand?: string;
  grams: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  mealType: MealType;
  timestamp: string;
  dateStr: string; // YYYY-MM-DD
  image?: string;
}

export interface DailyTargets {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  waterMl: number;
}

export interface Recipe {
  id: string;
  title: string;
  prepTime: string;
  servings: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  tag: string;
  image: string;
  description: string;
  ingredients: string[];
  instructions: string[];
}
