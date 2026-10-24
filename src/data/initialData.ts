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
  },
  {
    id: 'rec-5',
    title: 'Spinach, Feta & Egg White Scramble Wrap',
    prepTime: '10 min',
    servings: 1,
    calories: 340,
    protein: 38,
    carbs: 28,
    fat: 8,
    tag: 'LEAN BREAKFAST',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500&auto=format&fit=crop&q=80',
    description: 'High-volume egg white scramble with wilted baby spinach and authentic Greek feta rolled in a high-fiber whole grain tortilla.',
    ingredients: [
      '200g Liquid egg whites',
      '1 Whole pasture egg',
      '60g Fresh baby spinach',
      '25g Crumbled Greek sheep feta',
      '1 Whole wheat low-carb flatbread',
      'Pinch of smoked paprika and black pepper'
    ],
    instructions: [
      'Sauté spinach in a non-stick pan until wilted, about 1 minute.',
      'Pour in egg whites and whole egg, gently folding with a spatula over medium-low heat.',
      'Fold in crumbled feta right before eggs set.',
      'Transfer onto warmed tortilla, sprinkle with smoked paprika, and wrap snugly.'
    ]
  },
  {
    id: 'rec-6',
    title: 'Cinnamon Chia Protein French Toast',
    prepTime: '12 min',
    servings: 1,
    calories: 390,
    protein: 36,
    carbs: 44,
    fat: 7,
    tag: 'ANABOLIC BREAKFAST',
    image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=500&auto=format&fit=crop&q=80',
    description: 'Thick-cut artisanal sourdough dipped in vanilla whey egg custard and dusted with antioxidant Ceylon cinnamon.',
    ingredients: [
      '2 Slices rustic sourdough bread (80g)',
      '150g Liquid egg whites',
      '20g Whey isolate vanilla',
      '1 tsp Ground Ceylon cinnamon',
      '1 tbsp Chia seeds',
      '2 tbsp Sugar-free pure maple syrup'
    ],
    instructions: [
      'Whisk egg whites, whey protein, cinnamon, and chia seeds in a shallow bowl.',
      'Dip sourdough slices, letting each side absorb the protein custard for 30 seconds.',
      'Pan-toast on a hot griddle with coconut spray for 3 minutes per side until golden brown.',
      'Drizzle with pure sugar-free maple syrup and serve hot.'
    ]
  },
  {
    id: 'rec-7',
    title: 'Smoked Salmon & Smashed Avocado Sourdough',
    prepTime: '8 min',
    servings: 1,
    calories: 410,
    protein: 32,
    carbs: 34,
    fat: 14,
    tag: 'HEALTHY LIPIDS',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500&auto=format&fit=crop&q=80',
    description: 'Omega-3 dense wild smoked sockeye salmon over mashed Haas avocado on toasted fermented sourdough bread.',
    ingredients: [
      '120g Wild-caught smoked salmon',
      '1 Slice fermented country sourdough (55g)',
      '50g Ripe Hass avocado',
      '1 tbsp Non-pareil capers',
      'Fresh dill sprigs and lemon juice'
    ],
    instructions: [
      'Toast sourdough until crisp and deeply golden.',
      'Mash avocado with a squeeze of fresh lemon juice, sea salt, and red pepper flakes.',
      'Spread avocado evenly across the toast.',
      'Layer smoked salmon slices, capers, and fresh dill over top.'
    ]
  },
  {
    id: 'rec-8',
    title: 'Chocolate Peanut Butter Bio-Casein Pudding',
    prepTime: '5 min',
    servings: 1,
    calories: 380,
    protein: 44,
    carbs: 22,
    fat: 12,
    tag: 'NIGHT RECOVERY',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=500&auto=format&fit=crop&q=80',
    description: 'Micellar casein protein whipped into a decadent chocolate mousse with natural defatted peanut butter for overnight amino acid release.',
    ingredients: [
      '40g Micellar Casein Chocolate',
      '15g Natural crunchy peanut butter',
      '100ml Unsweetened almond milk',
      '5g Raw cacao nibs',
      '1/2 Banana sliced (50g)'
    ],
    instructions: [
      'Add casein powder to a mixing bowl with almond milk gradually, stirring vigorously with a fork until thick pudding texture forms.',
      'Swirl in creamy peanut butter.',
      'Top with banana coins and raw crunchy cacao nibs.',
      'Chill in freezer for 10 minutes before eating.'
    ]
  },
  {
    id: 'rec-9',
    title: 'Golden Turmeric Tofu & Veggie Scramble',
    prepTime: '12 min',
    servings: 1,
    calories: 290,
    protein: 28,
    carbs: 18,
    fat: 11,
    tag: 'PLANT POWER',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=80',
    description: 'High-protein organic sprouted tofu crumbled with anti-inflammatory turmeric, nutritional yeast, and crisp bell peppers.',
    ingredients: [
      '220g High-protein extra-firm organic tofu',
      '1/2 Bell pepper diced',
      '1 cup Baby kale leaves',
      '1 tbsp Nutritional yeast (B-vitamins)',
      '1/2 tsp Ground turmeric and black pepper',
      '1 tsp Cold-pressed avocado oil'
    ],
    instructions: [
      'Crumble firm tofu with hands into a hot skillet with avocado oil.',
      'Add turmeric, nutritional yeast, sea salt, and pepper, tossing until golden yellow.',
      'Add diced peppers and baby kale, sautéing for 3 minutes until tender-crisp.',
      'Plate with a dash of hot sauce.'
    ]
  },
  {
    id: 'rec-10',
    title: 'Wild Blueberry Flaxseed Protein Pancakes',
    prepTime: '15 min',
    servings: 1,
    calories: 420,
    protein: 42,
    carbs: 48,
    fat: 6,
    tag: 'ANABOLIC BREAKFAST',
    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=500&auto=format&fit=crop&q=80',
    description: 'Fluffy golden flapjacks packed with oat flour, pure whey isolate, golden flaxseeds, and burst wild blueberries.',
    ingredients: [
      '50g Rolled oat flour',
      '30g Vanilla whey isolate',
      '100g Egg whites',
      '1 tbsp Ground golden flaxseeds',
      '60g Fresh organic wild blueberries',
      '1/2 tsp Baking powder'
    ],
    instructions: [
      'Blend oat flour, whey, egg whites, flaxseed, and baking powder until smooth batter forms.',
      'Gently fold in fresh wild blueberries.',
      'Pour silver-dollar rounds onto a hot non-stick griddle over medium heat.',
      'Flip when bubbles appear on the surface (approx 2 minutes) and cook 90 seconds more.'
    ]
  },
  {
    id: 'rec-11',
    title: 'Lemon Herb Grilled Chicken Tabouli Bowl',
    prepTime: '15 min',
    servings: 1,
    calories: 470,
    protein: 48,
    carbs: 42,
    fat: 11,
    tag: 'HIGH PROTEIN',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=80',
    description: 'Marinated pasture-raised chicken breast sliced over tri-color quinoa, chopped Italian parsley, mint, and heirloom tomatoes.',
    ingredients: [
      '180g Boneless skinless chicken breast',
      '120g Cooked tri-color quinoa',
      '1 cup Finely chopped flat-leaf parsley and mint',
      '1/2 cup Diced Persian cucumbers and cherry tomatoes',
      '1 tbsp Lemon juice and cold-pressed extra virgin olive oil'
    ],
    instructions: [
      'Grill chicken breast for 6 minutes per side at 400°F until internal temp reaches 165°F.',
      'Toss warm quinoa with herbs, cucumber, tomatoes, lemon juice, and olive oil.',
      'Slice chicken against the grain and arrange atop fresh tabouli.',
      'Garnish with sumac spice.'
    ]
  },
  {
    id: 'rec-12',
    title: 'Ahi Tuna & Edamame Poke Matrix',
    prepTime: '10 min',
    servings: 1,
    calories: 450,
    protein: 44,
    carbs: 46,
    fat: 9,
    tag: 'LEAN RECOVERY',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=80',
    description: 'Sashimi-grade yellowfin tuna cubes tossed in coconut aminos and toasted sesame, served over sushi-style jasmine rice and shelled edamame.',
    ingredients: [
      '170g Fresh sashimi-grade ahi tuna diced',
      '130g Warm jasmine rice',
      '60g Shelled steamed edamame',
      '1/4 English cucumber ribboned',
      '1 tbsp Coconut aminos and 1 tsp sesame seeds',
      '1 Sheet nori seaweed cut into strips'
    ],
    instructions: [
      'Toss diced ahi tuna with coconut aminos, sesame oil, and scallions.',
      'Assemble warm rice bowl, topping with marinated tuna and edamame.',
      'Add cucumber ribbons and crispy nori strips.',
      'Finish with toasted white and black sesame seeds.'
    ]
  },
  {
    id: 'rec-13',
    title: 'Lean Ground Turkey Burrito Skillet',
    prepTime: '15 min',
    servings: 1,
    calories: 510,
    protein: 46,
    carbs: 52,
    fat: 12,
    tag: 'HYPERTROPHY FUEL',
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=500&auto=format&fit=crop&q=80',
    description: '93/7 lean ground turkey browned with cumin, fire-roasted black beans, sweet corn, and brown basmati rice.',
    ingredients: [
      '180g Extra lean ground turkey breast',
      '100g Cooked brown basmati rice',
      '70g Organic black beans rinsed',
      '40g Roasted sweet corn',
      '2 tbsp Fresh pico de gallo salsa',
      '1 tbsp Ground cumin, chili powder, and sea salt'
    ],
    instructions: [
      'Brown ground turkey in a cast-iron skillet, breaking into crumbles.',
      'Add Mexican spices, black beans, sweet corn, and brown rice with 2 tbsp water.',
      'Simmer for 3 minutes until flavors meld completely.',
      'Top with fresh pico de gallo and fresh chopped cilantro.'
    ]
  },
  {
    id: 'rec-14',
    title: 'Grass-Fed Bison & Sweet Potato Hash',
    prepTime: '18 min',
    servings: 1,
    calories: 500,
    protein: 50,
    carbs: 40,
    fat: 14,
    tag: 'HYPERTROPHY FUEL',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=80',
    description: 'Nutrient-rich North American ground bison with caramelized sweet potato cubes and crisp sweet onions for maximal iron and zinc replenishment.',
    ingredients: [
      '180g 90% lean ground grass-fed bison',
      '180g Diced sweet potato cubes',
      '1/2 Yellow onion diced',
      '1 cup Baby spinach',
      '1 tsp Rosemary and garlic powder'
    ],
    instructions: [
      'Roast or pan-fry sweet potato cubes in a covered skillet until tender and caramelized.',
      'Push potatoes to side, add diced onions and ground bison, browning thoroughly.',
      'Stir in baby spinach until wilted.',
      'Season with sea salt, cracked black pepper, and fresh rosemary.'
    ]
  },
  {
    id: 'rec-15',
    title: 'Blackened Pacific Cod with Cilantro Cauli-Rice',
    prepTime: '12 min',
    servings: 1,
    calories: 290,
    protein: 40,
    carbs: 14,
    fat: 7,
    tag: 'LOW CARB / LEAN',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&auto=format&fit=crop&q=80',
    description: 'Wild Pacific cod dredged in Creole cajun spices, seared hot, and paired with citrus-infused riced cauliflower.',
    ingredients: [
      '200g Wild Pacific cod fillet',
      '200g Riced cauliflower',
      '1 tbsp Cajun blackened seasoning rub',
      '1 tbsp Fresh lime juice and cilantro',
      '1 tsp Ghee or coconut oil for searing'
    ],
    instructions: [
      'Coat cod generously on all sides with cajun blackened spices.',
      'Sear cod in smoking cast iron with ghee for 3.5 minutes per side until flaky.',
      'Sauté riced cauliflower in a separate pan with lime juice and cilantro for 4 minutes.',
      'Serve blackened fish over cauliflower rice with fresh lime wedges.'
    ]
  },
  {
    id: 'rec-16',
    title: 'Mediterranean Shrimp & Chickpea Energy Bowl',
    prepTime: '12 min',
    servings: 1,
    calories: 415,
    protein: 38,
    carbs: 36,
    fat: 12,
    tag: 'HIGH PROTEIN',
    image: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?w=500&auto=format&fit=crop&q=80',
    description: 'Jumbo tiger shrimp sautéed with garlic, oregano, organic chickpeas, and sun-dried tomatoes over mixed greens.',
    ingredients: [
      '180g Jumbo wild shrimp peeled and deveined',
      '100g Cooked chickpeas',
      '20g Sun-dried tomatoes slivered',
      '2 cups Arugula and baby gem lettuce',
      '1 tbsp Cold-pressed olive oil with lemon oregano'
    ],
    instructions: [
      'Sauté shrimp in a hot pan with minced garlic and oregano for 2 minutes each side.',
      'Toss chickpeas and sun-dried tomatoes into the pan for 60 seconds to warm through.',
      'Arrange over fresh crisp arugula bed.',
      'Drizzle with olive oil and fresh lemon zest.'
    ]
  },
  {
    id: 'rec-17',
    title: 'Sesame Ginger Tempeh & Roasted Broccoli',
    prepTime: '15 min',
    servings: 1,
    calories: 390,
    protein: 32,
    carbs: 30,
    fat: 14,
    tag: 'PLANT POWER',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=80',
    description: 'Fermented organic tempeh cubes simmered in fresh grated ginger, tamari, and sesame seeds alongside charred broccoli.',
    ingredients: [
      '200g Organic fermented tempeh sliced into cubes',
      '150g Fresh broccoli florets',
      '1 tbsp Low-sodium tamari soy sauce',
      '1 tsp Fresh grated ginger root and garlic',
      '1 tsp Toasted sesame oil',
      '1 tsp Raw sesame seeds'
    ],
    instructions: [
      'Steam tempeh cubes for 5 minutes to remove bitterness, then pat dry.',
      'Pan-sear tempeh in sesame oil until golden brown on all sides.',
      'Add broccoli florets with a splash of water, covering pan to steam-char.',
      'Pour in ginger-tamari glaze and toss until glossy and caramelized.'
    ]
  },
  {
    id: 'rec-18',
    title: 'Teriyaki Chicken Thigh & Bok Choy Bowl',
    prepTime: '16 min',
    servings: 1,
    calories: 520,
    protein: 45,
    carbs: 54,
    fat: 13,
    tag: 'HYPERTROPHY FUEL',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=80',
    description: 'Boneless skinless chicken thighs seared in a homemade low-sugar teriyaki glaze over fluffy jasmine rice and steamed baby bok choy.',
    ingredients: [
      '190g Boneless skinless chicken thighs trimmed',
      '140g Steamed jasmine rice',
      '2 Baby bok choy heads halved',
      '1.5 tbsp Coconut aminos teriyaki glaze',
      '1 Scallion sliced thin'
    ],
    instructions: [
      'Sear chicken thighs in a hot non-stick pan for 5 minutes per side until deeply browned.',
      'Add bok choy and 2 tbsp water, covering to steam for 2 minutes.',
      'Brush chicken generously with teriyaki glaze, reducing sauce until tacky.',
      'Slice chicken and arrange over warm jasmine rice with scallions.'
    ]
  },
  {
    id: 'rec-19',
    title: 'Center-Cut Sirloin with Crispy Baby Potatoes',
    prepTime: '18 min',
    servings: 1,
    calories: 510,
    protein: 54,
    carbs: 36,
    fat: 15,
    tag: 'HYPERTROPHY FUEL',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=80',
    description: 'Lean prime sirloin steak seared cast-iron style with garlic rosemary baby gold potatoes and blistered asparagus.',
    ingredients: [
      '200g Lean top sirloin steak trimmed',
      '150g Baby Yukon gold potatoes par-boiled and smashed',
      '100g Tender asparagus spears',
      '1 tsp Grass-fed butter or tallow',
      'Fresh rosemary, sea salt, and peppercorns'
    ],
    instructions: [
      'Sear par-boiled smashed potatoes in skillet until crusty and golden.',
      'Season sirloin with coarse salt and pepper, sear in cast iron 3.5 min per side for medium.',
      'Baste meat with a touch of butter and fresh rosemary.',
      'Rest for 5 minutes before slicing alongside crispy potatoes and asparagus.'
    ]
  },
  {
    id: 'rec-20',
    title: 'Air-Fried Salmon with Charred Lemon Zucchini',
    prepTime: '12 min',
    servings: 1,
    calories: 375,
    protein: 42,
    carbs: 8,
    fat: 18,
    tag: 'LOW CARB / KETO',
    image: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=500&auto=format&fit=crop&q=80',
    description: 'Crispy skin salmon fillet cooked in the air fryer with zero excess oil, paired with charred garlic zucchini medallions.',
    ingredients: [
      '180g Wild King Salmon fillet',
      '1 Medium green zucchini sliced into coins (150g)',
      '1/2 Lemon sliced',
      '1 tsp Smoked sea salt and dried oregano',
      '1 tsp Olive oil spray'
    ],
    instructions: [
      'Season salmon fillet with smoked salt and lemon zest.',
      'Place in air fryer basket at 400°F (200°C) with zucchini rounds.',
      'Air-fry for 9-10 minutes until salmon skin is blistered and flesh flakes easily.',
      'Squeeze roasted lemon over fish and serve immediately.'
    ]
  },
  {
    id: 'rec-21',
    title: 'Slow-Cooked Shredded Chicken Salsa Verde',
    prepTime: '10 min prep',
    servings: 1,
    calories: 310,
    protein: 48,
    carbs: 12,
    fat: 6,
    tag: 'LEAN RECOVERY',
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=500&auto=format&fit=crop&q=80',
    description: 'Ultra-tender pulled chicken breast braised in fire-roasted tomatillo salsa verde, garlic, and fresh Mexican oregano.',
    ingredients: [
      '220g Boneless chicken breast',
      '100g Roasted tomatillo salsa verde',
      '1/2 White onion sliced',
      'Fresh cilantro and lime juice',
      '1 tsp Ground cumin and coriander'
    ],
    instructions: [
      'Slow-cook chicken breasts with salsa verde and onions on low for 4 hours (or pressure cook 12 min).',
      'Shred with two forks until succulent and completely coated in green sauce.',
      'Garnish with fresh cilantro sprigs and squeeze of lime.',
      'Ideal for ultra-lean meal prep or high-protein macro filling.'
    ]
  },
  {
    id: 'rec-22',
    title: 'Lean Meatballs & Red Lentil Protein Pasta',
    prepTime: '20 min',
    servings: 1,
    calories: 590,
    protein: 56,
    carbs: 58,
    fat: 13,
    tag: 'HYPERTROPHY FUEL',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500&auto=format&fit=crop&q=80',
    description: 'Herb-infused lean beef and turkey meatballs over high-protein red lentil penne pasta in rich San Marzano marinara.',
    ingredients: [
      '160g Lean beef/turkey meatballs (baked)',
      '75g Dry red lentil penne pasta',
      '120g San Marzano tomato marinara sauce',
      '15g Freshly grated aged Parmigiano Reggiano',
      'Fresh sweet basil leaves'
    ],
    instructions: [
      'Boil red lentil penne in salted water for 7 minutes al dente.',
      'Simmer baked meatballs in marinara sauce until piping hot.',
      'Toss drained pasta directly into the sauce with meatballs.',
      'Plate and crown with aged parmesan and torn sweet basil.'
    ]
  },
  {
    id: 'rec-23',
    title: 'Baked Halibut in Tomato Basil Olive Medley',
    prepTime: '15 min',
    servings: 1,
    calories: 320,
    protein: 42,
    carbs: 10,
    fat: 11,
    tag: 'LEAN RECOVERY',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&auto=format&fit=crop&q=80',
    description: 'Thick-cut Pacific halibut baked en papillote with blistered cherry tomatoes, Kalamata olives, capers, and sweet basil.',
    ingredients: [
      '190g Pacific halibut fillet',
      '80g Cherry tomatoes halved',
      '15g Pitted Kalamata olives',
      '1 tsp Non-pareil capers',
      '1 tbsp Cold-pressed olive oil and white wine reduction'
    ],
    instructions: [
      'Place halibut fillet in center of parchment paper.',
      'Scatter halved cherry tomatoes, olives, capers, and fresh basil around fish.',
      'Drizzle with olive oil, fold parchment paper into a sealed pouch.',
      'Bake at 400°F (200°C) for 14 minutes until steaming and delicate.'
    ]
  },
  {
    id: 'rec-24',
    title: 'Honey Garlic Pork Tenderloin with Haricots Verts',
    prepTime: '18 min',
    servings: 1,
    calories: 360,
    protein: 46,
    carbs: 22,
    fat: 8,
    tag: 'HIGH PROTEIN',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=80',
    description: 'Extra-lean pork tenderloin medallions glazed in raw garlic clover honey with steamed French green beans.',
    ingredients: [
      '200g Lean pork tenderloin medallions',
      '140g French green beans (haricots verts)',
      '1 tbsp Raw clover honey',
      '2 Cloves garlic minced with 1 tbsp coconut aminos',
      '1 tsp Olive oil'
    ],
    instructions: [
      'Sear pork medallions in hot skillet for 3 minutes per side until lightly blushed center.',
      'Pour garlic honey aminos mixture into pan, swirling to glaze medallions for 60 seconds.',
      'Blanch green beans in salted boiling water for 3 minutes until vivid green.',
      'Serve glazed medallions over beans.'
    ]
  },
  {
    id: 'rec-25',
    title: 'Chimichurri Chicken Skewers & Pearl Couscous',
    prepTime: '20 min',
    servings: 1,
    calories: 470,
    protein: 47,
    carbs: 45,
    fat: 10,
    tag: 'HIGH PROTEIN',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&auto=format&fit=crop&q=80',
    description: 'Char-grilled skewered chicken breast cubes basted with herbaceous parsley oregano chimichurri over toasted Israeli pearl couscous.',
    ingredients: [
      '200g Chicken breast cut into 1-inch cubes',
      '80g Israeli pearl couscous cooked',
      '1/2 Red bell pepper and red onion threaded on skewers',
      '2 tbsp Fresh herb chimichurri dressing'
    ],
    instructions: [
      'Thread chicken, bell peppers, and red onions onto wooden skewers.',
      'Grill on medium-high heat for 10-12 minutes, turning frequently.',
      'Brush with fresh chimichurri during final 2 minutes of cooking.',
      'Serve alongside warm pearl couscous.'
    ]
  },
  {
    id: 'rec-26',
    title: 'High-Nitrate Beet & Goat Cheese Chicken Bowl',
    prepTime: '10 min',
    servings: 1,
    calories: 410,
    protein: 44,
    carbs: 24,
    fat: 14,
    tag: 'BIO-PERFORMANCE',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=80',
    description: 'Nitric oxide boosting roasted beets with grilled chicken breast, crumbled chèvre goat cheese, and toasted walnuts on arugula.',
    ingredients: [
      '180g Grilled chicken breast sliced',
      '100g Steamed red beets diced (nitric oxide boost)',
      '25g Crumbled artisanal goat cheese',
      '15g Toasted walnut halves',
      '2 cups Wild baby arugula and balsamic glaze'
    ],
    instructions: [
      'Toss wild arugula with a dash of aged balsamic vinegar.',
      'Top with diced crimson beets, sliced chicken breast, and creamy goat cheese.',
      'Scatter toasted walnuts for crunch and ALA fatty acids.',
      'Ideal for pre-workout vasodilation and athletic endurance.'
    ]
  },
  {
    id: 'rec-27',
    title: 'Fast-Glycogen Cream of Rice & Whey Isolate',
    prepTime: '4 min',
    servings: 1,
    calories: 440,
    protein: 35,
    carbs: 68,
    fat: 2,
    tag: 'INTRA / POST WORKOUT',
    image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=500&auto=format&fit=crop&q=80',
    description: 'Ultra-fast digesting hydrolyzed cream of rice cereal infused with whey protein isolate for rapid post-workout muscle glycogen restock.',
    ingredients: [
      '75g Pure white cream of rice cereal',
      '35g Pure Whey Isolate Chocolate or Vanilla',
      '250ml Boiling water',
      '1 tbsp Natural honey or date syrup'
    ],
    instructions: [
      'Whisk cream of rice into boiling water, stirring for 2 minutes until smooth and thick.',
      'Let cool for 2 minutes, then stir in whey isolate thoroughly.',
      'Drizzle with natural honey.',
      'Consume within 45 minutes post-training for rapid replenishment.'
    ]
  },
  {
    id: 'rec-28',
    title: 'Tropical Mango Pineapple EAA Smoothie Bowl',
    prepTime: '5 min',
    servings: 1,
    calories: 395,
    protein: 34,
    carbs: 56,
    fat: 3,
    tag: 'POST WORKOUT',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&auto=format&fit=crop&q=80',
    description: 'Thick frozen smoothie bowl blended with mango, pineapple, essential amino acids, and vanilla whey protein isolate.',
    ingredients: [
      '120g Frozen mango chunks',
      '80g Frozen pineapple chunks',
      '35g Vanilla Whey Isolate',
      '100ml Pure coconut water (electrolytes)',
      '1 tbsp Shredded unsweetened coconut'
    ],
    instructions: [
      'Blend frozen mango, pineapple, whey, and coconut water on high speed with a tamper until soft-serve consistency.',
      'Spoon into chilled performance bowl.',
      'Top with toasted shredded coconut and kiwi slices.'
    ]
  },
  {
    id: 'rec-29',
    title: 'Crispy Sweet Potato Waffles with Greek Yogurt',
    prepTime: '14 min',
    servings: 1,
    calories: 410,
    protein: 28,
    carbs: 58,
    fat: 6,
    tag: 'ANABOLIC BREAKFAST',
    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=500&auto=format&fit=crop&q=80',
    description: 'Grated sweet potato and egg white Belgian waffle cooked crisp, smothered in cinnamon Greek yogurt and crushed pecans.',
    ingredients: [
      '160g Grated raw sweet potato',
      '100g Liquid egg whites',
      '100g 0% Greek strained yogurt',
      '10g Crushed pecans',
      '1/2 tsp Cinnamon and vanilla extract'
    ],
    instructions: [
      'Mix grated sweet potato with egg whites, pinch of sea salt, and cinnamon.',
      'Press firmly into hot waffle iron greased with coconut oil spray.',
      'Cook for 7-8 minutes until exterior is crunchy and deep golden.',
      'Top with cool Greek yogurt and crushed pecans.'
    ]
  },
  {
    id: 'rec-30',
    title: 'Strawberry Colostrum Electrolyte Shake',
    prepTime: '3 min',
    servings: 1,
    calories: 380,
    protein: 38,
    carbs: 45,
    fat: 4,
    tag: 'IMMUNITY / RECOVERY',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=500&auto=format&fit=crop&q=80',
    description: 'Whole organic strawberries blended with bovine colostrum, whey isolate, banana, and electrolyte pink Himalayan salt.',
    ingredients: [
      '150g Fresh organic strawberries',
      '1 Medium ripe banana',
      '35g Vanilla whey isolate',
      '5g Bovine colostrum powder (gut lining repair)',
      '250ml Cold filtered water and ice',
      'Pinch of pink Himalayan rock salt'
    ],
    instructions: [
      'Combine all ingredients in a high-speed blender.',
      'Pulse on high for 45 seconds until frosty and velvet smooth.',
      'Pour into shaker and consume cold.'
    ]
  },
  {
    id: 'rec-31',
    title: 'Zucchini Ribbon Beef Bolognese',
    prepTime: '15 min',
    servings: 1,
    calories: 400,
    protein: 48,
    carbs: 12,
    fat: 16,
    tag: 'LOW CARB / KETO',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500&auto=format&fit=crop&q=80',
    description: 'Lean grass-fed ground beef simmered with crushed tomatoes and Italian herbs over broad zucchini pappardelle ribbons.',
    ingredients: [
      '190g 93% lean ground beef',
      '2 Medium green zucchini spiralized into broad ribbons (250g)',
      '100g Crushed Italian plum tomatoes',
      '20g Freshly shaved Parmigiano Reggiano',
      'Garlic, oregano, and crushed red pepper'
    ],
    instructions: [
      'Brown ground beef with minced garlic and oregano in skillet.',
      'Add crushed tomatoes and simmer on low for 6 minutes.',
      'Flash-sauté zucchini ribbons in a separate pan for just 90 seconds so they stay al dente.',
      'Ladle hearty bolognese over zucchini and top with parmesan.'
    ]
  },
  {
    id: 'rec-32',
    title: 'Avocado & Free-Range Egg Bacon Cloud Boats',
    prepTime: '16 min',
    servings: 1,
    calories: 370,
    protein: 26,
    carbs: 5,
    fat: 26,
    tag: 'HEALTHY LIPIDS',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500&auto=format&fit=crop&q=80',
    description: 'Hass avocado halves stuffed with pasture-raised egg yolks, baked till custardy, topped with uncured turkey bacon crumble.',
    ingredients: [
      '1 Whole ripe Hass avocado halved and pitted',
      '2 Pasture-raised egg yolks + 50g whites',
      '2 Slices uncured turkey bacon crisped and crumbled',
      'Everything bagel seasoning and chives'
    ],
    instructions: [
      'Scoop out a small spoonful from the center of each avocado half to enlarge the cavity.',
      'Crack egg into each avocado half, season with everything bagel spice.',
      'Bake at 425°F (220°C) for 12-14 minutes until whites are set and yolks remain jammy.',
      'Top with crumbled turkey bacon and snipped chives.'
    ]
  },
  {
    id: 'rec-33',
    title: 'Pan-Roasted Sea Bass with Asparagus & Garlic Herb Ghee',
    prepTime: '14 min',
    servings: 1,
    calories: 385,
    protein: 38,
    carbs: 6,
    fat: 21,
    tag: 'LOW CARB / KETO',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&auto=format&fit=crop&q=80',
    description: 'Chilean sea bass fillet pan-roasted in grass-fed cultured ghee with garlic and baby asparagus spears.',
    ingredients: [
      '180g Wild sea bass or barramundi fillet',
      '120g Tender pencil asparagus',
      '1 tbsp Grass-fed clarified ghee',
      '2 Cloves smashed garlic',
      'Flaky sea salt, lemon wheels, and tarragon'
    ],
    instructions: [
      'Heat ghee in skillet over medium-high heat until shimmering.',
      'Place sea bass skin side down and cook 4 minutes until golden crust develops.',
      'Add asparagus and smashed garlic to pan, flip fish and cook 3 minutes more, spooning warm ghee over the top.',
      'Finish with lemon wheels and fresh tarragon.'
    ]
  },
  {
    id: 'rec-34',
    title: 'Walnut Crusted Rosemary Chicken Thighs',
    prepTime: '20 min',
    servings: 1,
    calories: 430,
    protein: 46,
    carbs: 8,
    fat: 22,
    tag: 'HEALTHY LIPIDS',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&auto=format&fit=crop&q=80',
    description: 'Tender chicken thighs crusted in crushed English walnuts, minced fresh rosemary, and Dijon mustard, oven roasted to perfection.',
    ingredients: [
      '200g Boneless skinless chicken thighs',
      '30g Raw English walnuts crushed fine',
      '1 tbsp Dijon mustard',
      '1 tbsp Fresh rosemary minced',
      '1 cup Steamed French green beans'
    ],
    instructions: [
      'Brush chicken thighs thoroughly with Dijon mustard.',
      'Press crushed walnuts and minced rosemary onto the top of each piece to form a crust.',
      'Bake on parchment paper at 400°F (200°C) for 18 minutes until walnuts are toasted and juices run clear.',
      'Serve alongside warm steamed green beans.'
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
