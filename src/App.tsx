import React, { useState } from 'react';
import { Header } from './components/Header';
import { TodoSection } from './components/TodoSection';
import { TimeTracker } from './components/TimeTracker';
import { MoneyTracker } from './components/MoneyTracker';
import { WaterTracker } from './components/WaterTracker';
import { HighlightsSection } from './components/HighlightsSection';
import { StatsPage } from './components/StatsPage';
import { HistoryPage } from './components/HistoryPage';
import { Navigation } from './components/Navigation';
import { useStorage } from './hooks/useStorage';
import { Calendar, BarChart3, User, History } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<'planner' | 'stats' | 'history' | 'profile'>('planner');
  const {
    currentDayData,
    updateTodos,
    updateTimeSlots,
    updateMoneyEntries,
    updateWaterIntake,
    updateDayRating,
    updateHighlight,
    getAllDayData,
    loadDayData,
    loading
  } = useStorage();

  if (loading || !currentDayData) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh',
        background: 'linear-gradient(135deg, #FAF8F5 0%, #F5F1E8 100%)'
      }}>
        <div style={{ 
          fontSize: '24px', 
          color: '#8B5A3C',
          fontFamily: 'Caveat, cursive',
          fontWeight: 700
        }}>
          Loading your planner...
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'planner' as const, label: 'Today', icon: Calendar },
    { id: 'stats' as const, label: 'Stats', icon: BarChart3 },
    { id: 'history' as const, label: 'History', icon: History },
    { id: 'profile' as const, label: 'Profile', icon: User }
  ];

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '80px' }}>
      {activeTab === 'planner' && (
        <div className="container">
          <Header
            date={currentDayData.date}
            dayRating={currentDayData.dayRating}
            onRatingPress={updateDayRating}
          />
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <TodoSection
              todos={currentDayData.todos}
              onUpdateTodos={updateTodos}
            />
            
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: window.innerWidth >= 768 ? '1fr 1fr' : '1fr',
              gap: '24px'
            }}>
              <TimeTracker
                timeSlots={currentDayData.timeSlots}
                onUpdateTimeSlots={updateTimeSlots}
              />
              <MoneyTracker
                moneyEntries={currentDayData.moneyEntries}
                onUpdateMoneyEntries={updateMoneyEntries}
              />
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: window.innerWidth >= 768 ? '1fr 1fr' : '1fr',
              gap: '24px'
            }}>
              <WaterTracker
                waterIntake={currentDayData.waterIntake}
                waterGoal={currentDayData.waterGoal}
                onUpdateWaterIntake={updateWaterIntake}
              />
              <HighlightsSection
                highlight={currentDayData.highlight}
                onUpdateHighlight={updateHighlight}
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'stats' && (
        <StatsPage getAllDayData={getAllDayData} />
      )}

      {activeTab === 'history' && (
        <HistoryPage 
          getAllDayData={getAllDayData} 
          loadDayData={loadDayData}
        />
      )}

      {activeTab === 'profile' && (
        <div className="container\" style={{ paddingTop: '50px' }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 4px 16px rgba(139, 90, 60, 0.1)',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontFamily: 'Caveat, cursive',
              fontSize: '36px',
              color: '#8B5A3C',
              marginBottom: '16px',
              fontWeight: 700
            }}>
              Your Daily Planner
            </h2>
            <p style={{
              fontFamily: 'Caveat, cursive',
              fontSize: '20px',
              color: '#2C2C2C',
              lineHeight: '1.6',
              marginBottom: '24px',
              fontWeight: 500
            }}>
              Track your daily progress, manage your time, and achieve your goals with this beautiful planner.
            </p>
            <div style={{
              padding: '20px',
              background: '#FAF8F5',
              borderRadius: '12px',
              border: '2px solid #E8E3DB'
            }}>
              <p style={{
                fontFamily: 'Caveat, cursive',
                fontSize: '18px',
                color: '#8B5A3C',
                fontWeight: 600
              }}>
                "Every day is a new opportunity to grow and improve"
              </p>
            </div>
          </div>
        </div>
      )}

      <Navigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
}

export default App;