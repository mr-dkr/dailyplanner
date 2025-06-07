import AsyncStorage from '@react-native-async-storage/async-storage';
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

  const loadDayData = async (date: string) => {
    try {
      const stored = await AsyncStorage.getItem(`day-${date}`);
      if (stored) {
        return JSON.parse(stored) as DayData;
      }
      return createDefaultDayData(date);
    } catch (error) {
      console.error('Error loading day data:', error);
      return createDefaultDayData(date);
    }
  };

  const saveDayData = async (dayData: DayData) => {
    try {
      await AsyncStorage.setItem(`day-${dayData.date}`, JSON.stringify(dayData));
      setCurrentDayData(dayData);
    } catch (error) {
      console.error('Error saving day data:', error);
    }
  };

  const updateTodos = async (todos: TodoItem[]) => {
    if (!currentDayData) return;
    const updated = { ...currentDayData, todos };
    await saveDayData(updated);
  };

  const updateTimeSlots = async (timeSlots: TimeSlot[]) => {
    if (!currentDayData) return;
    const updated = { ...currentDayData, timeSlots };
    await saveDayData(updated);
  };

  const updateMoneyEntries = async (moneyEntries: MoneyEntry[]) => {
    if (!currentDayData) return;
    const updated = { ...currentDayData, moneyEntries };
    await saveDayData(updated);
  };

  const updateWaterIntake = async (waterIntake: number) => {
    if (!currentDayData) return;
    const updated = { ...currentDayData, waterIntake };
    await saveDayData(updated);
  };

  const updateExerciseHours = async (exerciseHours: number) => {
    if (!currentDayData) return;
    const updated = { ...currentDayData, exerciseHours };
    await saveDayData(updated);
  };

  const updateMealPlan = async (mealPlan: MealPlan) => {
    if (!currentDayData) return;
    const updated = { ...currentDayData, mealPlan };
    await saveDayData(updated);
  };

  const updateDayRating = async (dayRating: number) => {
    if (!currentDayData) return;
    const updated = { ...currentDayData, dayRating };
    await saveDayData(updated);
  };

  const updateHighlight = async (highlight: string) => {
    if (!currentDayData) return;
    const updated = { ...currentDayData, highlight };
    await saveDayData(updated);
  };

  const getAllDayData = async (): Promise<DayData[]> => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const dayKeys = keys.filter(key => key.startsWith('day-'));
      const data = await AsyncStorage.multiGet(dayKeys);
      return data.map(([_, value]) => JSON.parse(value!)).sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } catch (error) {
      console.error('Error getting all day data:', error);
      return [];
    }
  };

  useEffect(() => {
    const initializeToday = async () => {
      const today = getTodayKey();
      const dayData = await loadDayData(today);
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