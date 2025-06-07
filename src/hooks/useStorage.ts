import { useState, useEffect } from 'react';
import { DayData, TodoItem, MoneyEntry, TimeSlot, MealPlan } from '../types/planner';

// Initialize default day data
const createDefaultDayData = (date: string): DayData => ({
  id: `day-${date}`,
  date,
  todos: [],
  timeSlots: Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    activity: ''
  })),
  moneyEntries: [],
  waterIntake: 0,
  waterGoal: 8,
  exerciseHours: 0,
  mealPlan: {
    breakfast: '',
    lunch: '',
    dinner: '',
    snacks: ''
  },
  dayRating: 0,
  highlight: ''
});

export const useStorage = () => {
  const [loading, setLoading] = useState(true);
  const [currentDayData, setCurrentDayData] = useState<DayData | null>(null);

  const getTodayKey = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const loadDayData = (date: string): DayData => {
    try {
      const stored = localStorage.getItem(`day-${date}`);
      if (stored) {
        return JSON.parse(stored) as DayData;
      }
      return createDefaultDayData(date);
    } catch (error) {
      console.error('Error loading day data:', error);
      return createDefaultDayData(date);
    }
  };

  const saveDayData = (dayData: DayData) => {
    try {
      localStorage.setItem(`day-${dayData.date}`, JSON.stringify(dayData));
      setCurrentDayData(dayData);
    } catch (error) {
      console.error('Error saving day data:', error);
    }
  };

  const updateTodos = (todos: TodoItem[]) => {
    if (!currentDayData) return;
    const updated = { ...currentDayData, todos };
    saveDayData(updated);
  };

  const updateTimeSlots = (timeSlots: TimeSlot[]) => {
    if (!currentDayData) return;
    const updated = { ...currentDayData, timeSlots };
    saveDayData(updated);
  };

  const updateMoneyEntries = (moneyEntries: MoneyEntry[]) => {
    if (!currentDayData) return;
    const updated = { ...currentDayData, moneyEntries };
    saveDayData(updated);
  };

  const updateWaterIntake = (waterIntake: number) => {
    if (!currentDayData) return;
    const updated = { ...currentDayData, waterIntake };
    saveDayData(updated);
  };

  const updateExerciseHours = (exerciseHours: number) => {
    if (!currentDayData) return;
    const updated = { ...currentDayData, exerciseHours };
    saveDayData(updated);
  };

  const updateMealPlan = (mealPlan: MealPlan) => {
    if (!currentDayData) return;
    const updated = { ...currentDayData, mealPlan };
    saveDayData(updated);
  };

  const updateDayRating = (dayRating: number) => {
    if (!currentDayData) return;
    const updated = { ...currentDayData, dayRating };
    saveDayData(updated);
  };

  const updateHighlight = (highlight: string) => {
    if (!currentDayData) return;
    const updated = { ...currentDayData, highlight };
    saveDayData(updated);
  };

  const getAllDayData = (): DayData[] => {
    try {
      const keys = Object.keys(localStorage).filter(key => key.startsWith('day-'));
      const data = keys.map(key => JSON.parse(localStorage.getItem(key)!)).sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      return data;
    } catch (error) {
      console.error('Error getting all day data:', error);
      return [];
    }
  };

  useEffect(() => {
    const initializeToday = () => {
      const today = getTodayKey();
      const dayData = loadDayData(today);
      setCurrentDayData(dayData);
      setLoading(false);
    };

    initializeToday();
  }, []);

  return {
    loading,
    currentDayData,
    loadDayData,
    saveDayData,
    updateTodos,
    updateTimeSlots,
    updateMoneyEntries,
    updateWaterIntake,
    updateExerciseHours,
    updateMealPlan,
    updateDayRating,
    updateHighlight,
    getAllDayData,
    getTodayKey
  };
};