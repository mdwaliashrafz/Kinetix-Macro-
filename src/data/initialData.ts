import { FoodItem, LoggedItem, DailyTargets, Recipe } from '../types';

export const INITIAL_FOOD_DATABASE: FoodItem[] = [
  {
    id: 'food-chicken-breast',
    name: 'Pan-Seared Chicken Breast',
    defaultGrams: 180,
    calories: 297,
    protein: 54,
    carbs: 0,
    fat: 6.5,
    tag: 'HIGH PROTEIN',
    verified: true,
    category: 'protein',
    isFavorite: true,
    frequency: 14,
    barcode: '011110002341',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDABBSJ6GIUc8PHtAPrg0vUTXuYqPVGlCVV4cAjZTjE-B8NulZ-JdhOTpZsPSd5ezbLDSWV2TTg2GjqhV7tsAB27xqxwrCVO2eWNN909DZD46zIbqdRKDS3yIRjAjDJ1t-OJOKYR53IKdgTyww2EjV2_wsWFA8yiJcgzg1zdCgqE5hNbN7G0pdwK6HDRk1h95GNGmz34E_aQ-YXf4s96olEeJZJGj8OQQrmXAqq-NcOeGUfRO9GBIs'
  },
  {
    id: 'food-greek-yogurt',
    name: 'Greek Yogurt 0%',
    defaultGrams: 200,
    calories: 130,
    protein: 22,
    carbs: 8,
    fat: 0,
    tag: 'LEAN',
    verified: true,
    category: 'dairy',
    isFavorite: true,
    frequency: 11,
    barcode: '028400041238',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcLlTGVmX7_z3sJKpTgAbOcbvCquvsA3axlqXFq6aswuqsEyVNpJpYrfPIR2BAk-LtHLdLsvAAVdbj-_MI5LgxI6THYBsGFWPh_zjfoaDfdBkvmdWuxABy_JbxSm8eaj5V7g46vf7IrO0WbX79sq1A8JUh4NqWXrz-Aw-dhjs1NmF3kyaSfaE9dIM-2oGcecyENN6C4Gi-Mui1GTodKTdPLV1yyTcgPlT8xjbNxq20SnJwFQF53eA'
  },
  {
    id: 'food-rolled-oats',
    name: 'Organic Rolled Oats',
    defaultGrams: 50,
    calories: 189,
    protein: 6,
    carbs: 34,
    fat: 3,
    tag: 'COMPLEX CARB',
    verified: true,
    category: 'carb',
    isFavorite: true,
    frequency: 18,
    barcode: '052100018902',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsgH6DWZT2jAkjscspOhv6WjvLY68jA7_fv9vh0TqvT8LW8jr-DO_NP9yG3HOelLFbhO8gUrXSJ40ji7FIcIVByqpkS8Ob2Ybp9VhUBoIChcC7iquW2-5ahBQgQMm6rpqZjwIed3jnFUkTM4VJOWN0C1dkmcPec9SF-D7ujr0ELUP0VQ_aUQxmUBKH2FSRbIMIyKzR0BtrAxXiRLQ0vzd49JVFreumfRW0uAIqzaf-H2HEfGS2Y6k'
  },
  {
    id: 'food-avocado',
    name: 'Hass Avocado (Half)',
    defaultGrams: 75,
    calories: 120,
    protein: 1.5,
    carbs: 6,
    fat: 11,
    tag: 'HEALTHY LIPID',
    secondaryTag: 'LOW CARB',
    verified: true,
    category: 'fat',
    isFavorite: false,
    frequency: 8,
    barcode: '040460012014',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGdox78EciHX_gcFzN_StNZrfvqqSXZM9kYLh781BFDss9OnbD5k_16xjfPtCcUBCa3iOtACUethvcQpcCvWDQhOCtuw10rgxsGYDNw3lxApOIc1Q3hzSn6wwoTYe8dDY9DCThRlLiIZudbPivXxjXycGCZfBU7Ai6Bp1juFuo08sUXaft9VAU9TMthZIBkR-mNoXGr_LK17enVplEWQqahDXEB42ZtQDe3G-lYZyjFyMmWb8uHA0'
  },
  {
    id: 'food-sweet-potato',
    name: 'Sweet Potato Baked',
    defaultGrams: 150,
    calories: 135,
    protein: 3,
    carbs: 31,
    fat: 0.2,
    tag: 'SLOW GLYCOGEN',
    verified: true,
    category: 'carb',
    isFavorite: true,
    frequency: 9,
    barcode: '048110001358',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCz-slEtdY6lbn6NPRDrIGsRlk4TvNcK_SJ3TqwZc-28pqiSog_dpl1fz6hhELqhXmS8SZ8OnGU7CwKrSYVpu3jxXVjKHpIdmdHAgpJy0yfu-1S2Eyx3p3fWVxqKWW659UOR_rfFOxT9NvHyHgXz0JnilKgiPsCxyfxZTyUWO3-3dqQ-b4lm-GtSuFkynojQqEbGG864q5V-h4CPexsxbfsMm1rxFZqhjhU_brrtOrsiWuAKnjbd70'
  },
  {
    id: 'food-salmon-fillet',
    name: 'Wild Atlantic Salmon',
    defaultGrams: 170,
    calories: 340,
    protein: 36,
    carbs: 0,
    fat: 20,
    tag: 'OMEGA 3 EPA/DHA',
    verified: true,
    category: 'protein',
    isFavorite: true,
    frequency: 7,
    barcode: '071234005678',
    image: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'food-flank-steak',
    name: 'Grass-Fed Flank Steak',
    defaultGrams: 180,
    calories: 340,
    protein: 48,
    carbs: 0,
    fat: 16,
    tag: 'HIGH PROTEIN',
    secondaryTag: 'IRON RICH',
    verified: true,
    category: 'protein',
    isFavorite: true,
    frequency: 10,
    barcode: '089823001249',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'food-jasmine-rice',
    name: 'Steamed Jasmine Rice',
    defaultGrams: 200,
    calories: 260,
    protein: 5,
    carbs: 58,
    fat: 0.5,
    tag: 'FAST GLYCOGEN',
    verified: true,
    category: 'carb',
    isFavorite: false,
    frequency: 15,
    barcode: '012903004812',
    image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'food-whey-isolate',
    name: 'Pure Whey Isolate Vanilla',
    brand: 'Kinetix Labs',
    defaultGrams: 30,
    calories: 120,
    protein: 27,
    carbs: 1,
    fat: 0.5,
    tag: 'RAPID ABSORPTION',
    verified: true,
    category: 'protein',
    isFavorite: true,
    frequency: 21,
    barcode: '099182736450',
    image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'food-blueberries',
    name: 'Fresh Organic Blueberries',
    defaultGrams: 125,
    calories: 70,
    protein: 1,
    carbs: 17,
    fat: 0.4,
    tag: 'ANTIOXIDANTS',
    verified: true,
    category: 'fruit',
    isFavorite: true,
    frequency: 12,
    barcode: '034567891011',
    image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'food-pasture-eggs',
    name: 'Pasture-Raised Eggs (3)',
    defaultGrams: 150,
    calories: 215,
    protein: 18,
    carbs: 1.5,
    fat: 15,
    tag: 'CHOLINE DENSE',
    verified: true,
    category: 'protein',
    isFavorite: true,
    frequency: 16,
    barcode: '045612378901',
    image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'food-raw-almonds',
    name: 'Whole Raw Almonds',
    defaultGrams: 30,
    calories: 175,
    protein: 6,
    carbs: 6,
    fat: 15,
    tag: 'MAGNESIUM',
    verified: true,
    category: 'fat',
    isFavorite: false,
    frequency: 5,
    barcode: '087654321098',
    image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=300&auto=format&fit=crop&q=80'
  }
];

export const DEFAULT_DAILY_TARGETS: DailyTargets = {
  calories: 2400,
  protein: 180,
  carbs: 240,
  fat: 65,
  waterMl: 3200
};

export const INITIAL_TODAY_LOGS: LoggedItem[] = [
  {
    id: 'log-1',
    foodItemId: 'food-rolled-oats',
    name: 'Organic Rolled Oats',
    grams: 75,
    calories: 284,
    protein: 9,
    carbs: 51,
    fat: 4.5,
    mealType: 'breakfast',
    timestamp: '08:15 AM',
    dateStr: '2026-10-24',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsgH6DWZT2jAkjscspOhv6WjvLY68jA7_fv9vh0TqvT8LW8jr-DO_NP9yG3HOelLFbhO8gUrXSJ40ji7FIcIVByqpkS8Ob2Ybp9VhUBoIChcC7iquW2-5ahBQgQMm6rpqZjwIed3jnFUkTM4VJOWN0C1dkmcPec9SF-D7ujr0ELUP0VQ_aUQxmUBKH2FSRbIMIyKzR0BtrAxXiRLQ0vzd49JVFreumfRW0uAIqzaf-H2HEfGS2Y6k'
  },
  {
    id: 'log-2',
    foodItemId: 'food-whey-isolate',
    name: 'Pure Whey Isolate Vanilla',
    brand: 'Kinetix Labs',
    grams: 40,
    calories: 160,
    protein: 36,
    carbs: 2,
    fat: 1,
    mealType: 'breakfast',
    timestamp: '08:20 AM',
    dateStr: '2026-10-24'
  },
  {
    id: 'log-3',
    foodItemId: 'food-blueberries',
    name: 'Fresh Organic Blueberries',
    grams: 100,
    calories: 56,
    protein: 1,
    carbs: 14,
    fat: 0.3,
    mealType: 'breakfast',
    timestamp: '08:22 AM',
    dateStr: '2026-10-24'
  },
  {
    id: 'log-4',
    foodItemId: 'food-sweet-potato',
    name: 'Sweet Potato Baked',
    grams: 200,
    calories: 180,
    protein: 4,
    carbs: 41,
    fat: 0.3,
    mealType: 'snacks',
    timestamp: '10:45 AM',
    dateStr: '2026-10-24',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCz-slEtdY6lbn6NPRDrIGsRlk4TvNcK_SJ3TqwZc-28pqiSog_dpl1fz6hhELqhXmS8SZ8OnGU7CwKrSYVpu3jxXVjKHpIdmdHAgpJy0yfu-1S2Eyx3p3fWVxqKWW659UOR_rfFOxT9NvHyHgXz0JnilKgiPsCxyfxZTyUWO3-3dqQ-b4lm-GtSuFkynojQqEbGG864q5V-h4CPexsxbfsMm1rxFZqhjhU_brrtOrsiWuAKnjbd70'
  },
  {
    id: 'log-5',
    foodItemId: 'food-greek-yogurt',
    name: 'Greek Yogurt 0%',
    grams: 250,
    calories: 162,
    protein: 28,
    carbs: 10,
    fat: 0,
    mealType: 'snacks',
    timestamp: '10:50 AM',
    dateStr: '2026-10-24',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcLlTGVmX7_z3sJKpTgAbOcbvCquvsA3axlqXFq6aswuqsEyVNpJpYrfPIR2BAk-LtHLdLsvAAVdbj-_MI5LgxI6THYBsGFWPh_zjfoaDfdBkvmdWuxABy_JbxSm8eaj5V7g46vf7IrO0WbX79sq1A8JUh4NqWXrz-Aw-dhjs1NmF3kyaSfaE9dIM-2oGcecyENN6C4Gi-Mui1GTodKTdPLV1yyTcgPlT8xjbNxq20SnJwFQF53eA'
  },
  {
    id: 'log-6',
    foodItemId: 'food-flank-steak',
    name: 'Grass-Fed Flank Steak',
    grams: 180,
    calories: 340,
    protein: 48,
    carbs: 0,
    fat: 16,
    mealType: 'lunch',
    timestamp: '12:15 PM',
    dateStr: '2026-10-24'
  },
  {
    id: 'log-7',
    foodItemId: 'food-jasmine-rice',
    name: 'Steamed Jasmine Rice',
    grams: 260,
    calories: 338,
    protein: 6.5,
    carbs: 75.4,
    fat: 0.7,
    mealType: 'lunch',
    timestamp: '12:16 PM',
    dateStr: '2026-10-24'
  },
  {
    id: 'log-8',
    foodItemId: 'food-avocado',
    name: 'Hass Avocado (Half)',
    grams: 85,
    calories: 140,
    protein: 1.5,
    carbs: 6.6,
    fat: 15.2,
    mealType: 'lunch',
    timestamp: '12:20 PM',
    dateStr: '2026-10-24',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGdox78EciHX_gcFzN_StNZrfvqqSXZM9kYLh781BFDss9OnbD5k_16xjfPtCcUBCa3iOtACUethvcQpcCvWDQhOCtuw10rgxsGYDNw3lxApOIc1Q3hzSn6wwoTYe8dDY9DCThRlLiIZudbPivXxjXycGCZfBU7Ai6Bp1juFuo08sUXaft9VAU9TMthZIBkR-mNoXGr_LK17enVplEWQqahDXEB42ZtQDe3G-lYZyjFyMmWb8uHA0'
  }
];

export const RECIPES_DATA: Recipe[] = [
  {
    id: 'rec-1',
    title: 'Anabolic Salmon & Sweet Potato Power Bowl',
    prepTime: '20 min',
    servings: 1,
    calories: 520,
    protein: 46,
    carbs: 48,
    fat: 16,
    tag: 'HYPERTROPHY FUEL',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=80',
    description: 'High biological value protein combined with complex slow-release starch and anti-inflammatory Omega-3 fatty acids for muscle protein synthesis.',
    ingredients: [
      '180g Wild Atlantic Salmon fillet',
      '200g Roasted sweet potato cubes',
      '80g Steamed baby broccoli florets',
      '1/2 Hass avocado sliced',
      '1 tbsp Lemon herb amino dressing'
    ],
    instructions: [
      'Pan-sear the salmon in a hot skillet for 4 minutes skin-side down until crispy.',
      'Flip salmon and cook for 3 more minutes until tender pink center.',
      'Warm roasted sweet potato and arrange in performance bowl with steamed broccoli.',
      'Top with sliced avocado and drizzle with lemon herb dressing.'
    ]
  },
  {
    id: 'rec-2',
    title: 'Cold-Brew Vanilla Overnight Proats',
    prepTime: '5 min prep',
    servings: 1,
    calories: 440,
    protein: 42,
    carbs: 52,
    fat: 7,
    tag: 'ANABOLIC BREAKFAST',
    image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=500&auto=format&fit=crop&q=80',
    description: 'Micronized rolled oats soaked in cold-brew coffee and whey isolate for dual glycogen replenishment and mental alertness.',
    ingredients: [
      '60g Organic rolled oats',
      '35g Pure Whey Isolate Vanilla',
      '150ml Unsweetened almond milk',
      '50ml Cold brew coffee concentrate',
      '10g Chia seeds',
      '50g Fresh blueberries'
    ],
    instructions: [
      'Whisk whey isolate, almond milk, and cold brew until silky smooth.',
      'Fold in rolled oats and chia seeds until evenly suspended.',
      'Refrigerate overnight (minimum 4 hours) in an airtight glass container.',
      'Garnish with fresh blueberries and a dusting of Ceylon cinnamon.'
    ]
  },
  {
    id: 'rec-3',
    title: 'Seared Flank Steak Chimichurri Plate',
    prepTime: '15 min',
    servings: 1,
    calories: 490,
    protein: 52,
    carbs: 32,
    fat: 18,
    tag: 'HIGH PROTEIN / LEAN',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=500&auto=format&fit=crop&q=80',
    description: 'Grass-fed lean cut providing zinc, creatine, and heme iron, paired with fresh parsley-oregano antioxidant chimichurri.',
    ingredients: [
      '200g Grass-fed flank steak',
      '150g Steamed jasmine rice',
      '100g Grilled asparagus spears',
      '2 tbsp Fresh herb chimichurri (olive oil, garlic, red wine vinegar)'
    ],
    instructions: [
      'Pat flank steak dry and season generously with sea salt and coarse black pepper.',
      'Sear on cast iron at high heat for 3.5 minutes each side for medium-rare.',
      'Rest for 5 minutes to retain juices, then slice against the grain at a 45-degree angle.',
      'Serve alongside warm jasmine rice and spoon fresh chimichurri over meat.'
    ]
  },
  {
    id: 'rec-4',
    title: 'Ultra-Lean Mediterranean Greek Yogurt Parfait',
    prepTime: '3 min',
    servings: 1,
    calories: 280,
    protein: 34,
    carbs: 26,
    fat: 4,
    tag: 'LEAN RECOVERY',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&auto=format&fit=crop&q=80',
    description: 'Zero-fat strained Greek yogurt layered with wild berries and sprouted pumpkin seeds for gut microbiome and slow-release casein protein.',
    ingredients: [
      '250g Non-fat Greek strained yogurt',
      '15g Sprouted organic pumpkin seeds',
      '80g Mixed wild berries',
      '1 tsp Raw manuka honey'
    ],
    instructions: [
      'Spoon Greek yogurt into a chilled bowl.',
      'Layer fresh blackberries, blueberries, and raspberries.',
      'Sprinkle raw sprouted pumpkin seeds for crunch and magnesium.',
      'Lightly drizzle with manuka honey.'
    ]
  }
];

export const BARCODE_SAMPLE_LOOKUPS: Record<string, Partial<FoodItem>> = {
  '011110002341': {
    name: 'Pan-Seared Chicken Breast',
    defaultGrams: 180,
    calories: 297,
    protein: 54,
    carbs: 0,
    fat: 6.5,
    tag: 'HIGH PROTEIN',
    category: 'protein'
  },
  '028400041238': {
    name: 'Greek Yogurt 0%',
    defaultGrams: 200,
    calories: 130,
    protein: 22,
    carbs: 8,
    fat: 0,
    tag: 'LEAN',
    category: 'dairy'
  },
  '052100018902': {
    name: 'Organic Rolled Oats',
    defaultGrams: 50,
    calories: 189,
    protein: 6,
    carbs: 34,
    fat: 3,
    tag: 'COMPLEX CARB',
    category: 'carb'
  },
  '040460012014': {
    name: 'Hass Avocado (Half)',
    defaultGrams: 75,
    calories: 120,
    protein: 1.5,
    carbs: 6,
    fat: 11,
    tag: 'HEALTHY LIPID',
    category: 'fat'
  },
  '099182736450': {
    name: 'Pure Whey Isolate Vanilla',
    brand: 'Kinetix Labs',
    defaultGrams: 30,
    calories: 120,
    protein: 27,
    carbs: 1,
    fat: 0.5,
    tag: 'RAPID ABSORPTION',
    category: 'protein'
  }
};
