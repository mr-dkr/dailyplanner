export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  priority: number;
}

export interface TimeSlot {
  hour: number;
  activity: string;
}

export interface MoneyEntry {
  id: string;
  amount: number;
  description: string;
  type: 'expense' | 'income';
  category: string;
  date: string;
}

export interface MealPlan {
  breakfast: string;
  lunch: string;
  dinner: string;
  snacks: string;
}

export interface DayData {
  id: string;
  date: string;
  todos: TodoItem[];
  timeSlots: TimeSlot[];
  moneyEntries: MoneyEntry[];
  waterIntake: number;
  waterGoal: number;
  exerciseHours: number;
  mealPlan: MealPlan;
  dayRating: number;
  highlight: string;
}