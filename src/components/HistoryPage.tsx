import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Star, Droplets, CheckCircle, DollarSign } from 'lucide-react';
import { DayData } from '../types/planner';

interface HistoryPageProps {
  getAllDayData: () => DayData[];
  loadDayData: (date: string) => DayData;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({ getAllDayData, loadDayData }) => {
  const [allDays, setAllDays] = useState<DayData[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedDayData, setSelectedDayData] = useState<DayData | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    setAllDays(getAllDayData());
  }, [getAllDayData]);

  useEffect(() => {
    if (selectedDate) {
      const dayData = loadDayData(selectedDate);
      setSelectedDayData(dayData);
    }
  }, [selectedDate, loadDayData]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayData = allDays.find(d => d.date === dateString);
      days.push({
        day,
        date: dateString,
        data: dayData
      });
    }
    
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const monthDays = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString('en', { month: 'long', year: 'numeric' });

  const getDayIndicators = (dayData: DayData | undefined) => {
    if (!dayData) return { hasData: false, completedTasks: 0, totalTasks: 0, waterGoalMet: false, rating: 0 };
    
    const completedTasks = dayData.todos.filter(t => t.completed).length;
    const totalTasks = dayData.todos.length;
    const waterGoalMet = dayData.waterIntake >= dayData.waterGoal;
    
    return {
      hasData: true,
      completedTasks,
      totalTasks,
      waterGoalMet,
      rating: dayData.dayRating
    };
  };

  return (
    <div className="container" style={{ paddingTop: '50px' }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '32px'
      }}>
        <h1 style={{
          fontFamily: 'Caveat, cursive',
          fontSize: '36px',
          color: '#8B5A3C',
          margin: '0 0 8px 0',
          fontWeight: 700
        }}>
          Daily History
        </h1>
        <p style={{
          fontFamily: 'Caveat, cursive',
          fontSize: '20px',
          color: '#B8B5B0',
          margin: 0,
          fontWeight: 500
        }}>
          Review your past achievements and progress
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: selectedDate ? '1fr 1fr' : '1fr',
        gap: '24px',
        alignItems: 'start'
      }}>
        {/* Calendar */}
        <div className="fade-in" style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 16px rgba(139, 90, 60, 0.1)',
        }}>
          {/* Calendar Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <button
              onClick={() => navigateMonth('prev')}
              style={{
                background: 'transparent',
                border: '1px solid #D4C4B0',
                borderRadius: '8px',
                padding: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ChevronLeft size={20} color="#8B5A3C" />
            </button>
            
            <h2 style={{
              fontFamily: 'Caveat, cursive',
              fontSize: '24px',
              color: '#8B5A3C',
              margin: 0,
              fontWeight: 700
            }}>
              {monthName}
            </h2>
            
            <button
              onClick={() => navigateMonth('next')}
              style={{
                background: 'transparent',
                border: '1px solid #D4C4B0',
                borderRadius: '8px',
                padding: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ChevronRight size={20} color="#8B5A3C" />
            </button>
          </div>

          {/* Day Headers */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '8px',
            marginBottom: '12px'
          }}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} style={{
                textAlign: 'center',
                fontFamily: 'Caveat, cursive',
                fontSize: '14px',
                color: '#8B5A3C',
                fontWeight: 600,
                padding: '8px'
              }}>
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '8px'
          }}>
            {monthDays.map((dayInfo, index) => {
              if (!dayInfo) {
                return <div key={index} style={{ height: '60px' }} />;
              }

              const indicators = getDayIndicators(dayInfo.data);
              const isSelected = selectedDate === dayInfo.date;
              const isToday = dayInfo.date === new Date().toISOString().split('T')[0];

              return (
                <button
                  key={dayInfo.date}
                  onClick={() => setSelectedDate(dayInfo.date)}
                  style={{
                    height: '60px',
                    background: isSelected ? '#8B5A3C' : indicators.hasData ? '#FAF8F5' : 'transparent',
                    border: isToday ? '2px solid #F59E0B' : '1px solid #E8E3DB',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '2px',
                    transition: 'all 0.2s ease',
                    position: 'relative'
                  }}
                >
                  <span style={{
                    fontFamily: 'Caveat, cursive',
                    fontSize: '16px',
                    color: isSelected ? '#FFFFFF' : '#2C2C2C',
                    fontWeight: 600
                  }}>
                    {dayInfo.day}
                  </span>
                  
                  {indicators.hasData && (
                    <div style={{
                      display: 'flex',
                      gap: '2px',
                      alignItems: 'center'
                    }}>
                      {indicators.totalTasks > 0 && (
                        <div style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: indicators.completedTasks === indicators.totalTasks ? '#16A34A' : 
                                     indicators.completedTasks > 0 ? '#F59E0B' : '#E5E7EB'
                        }} />
                      )}
                      {indicators.waterGoalMet && (
                        <Droplets size={6} color="#3B82F6" fill="#3B82F6" />
                      )}
                      {indicators.rating > 0 && (
                        <span style={{ fontSize: '8px', color: '#F59E0B' }}>★</span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Day Details */}
        {selectedDate && selectedDayData && (
          <div className="fade-in" style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 16px rgba(139, 90, 60, 0.1)',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h3 style={{
                fontFamily: 'Caveat, cursive',
                fontSize: '24px',
                color: '#8B5A3C',
                margin: 0,
                fontWeight: 700
              }}>
                {new Date(selectedDate).toLocaleDateString('en', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h3>
              
              {selectedDayData.dayRating > 0 && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <Star size={16} color="#F59E0B" fill="#F59E0B" />
                  <span style={{
                    fontFamily: 'Caveat, cursive',
                    fontSize: '18px',
                    color: '#F59E0B',
                    fontWeight: 700
                  }}>
                    {selectedDayData.dayRating}/5
                  </span>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: '12px',
              marginBottom: '20px'
            }}>
              <div style={{
                background: '#FAF8F5',
                borderRadius: '8px',
                padding: '12px',
                textAlign: 'center'
              }}>
                <CheckCircle size={16} color="#16A34A" style={{ marginBottom: '4px' }} />
                <div style={{
                  fontFamily: 'Caveat, cursive',
                  fontSize: '16px',
                  color: '#2C2C2C',
                  fontWeight: 700
                }}>
                  {selectedDayData.todos.filter(t => t.completed).length}/{selectedDayData.todos.length}
                </div>
                <div style={{
                  fontFamily: 'Caveat, cursive',
                  fontSize: '12px',
                  color: '#B8B5B0',
                  fontWeight: 500
                }}>
                  Tasks
                </div>
              </div>

              <div style={{
                background: '#FAF8F5',
                borderRadius: '8px',
                padding: '12px',
                textAlign: 'center'
              }}>
                <Droplets size={16} color="#3B82F6" style={{ marginBottom: '4px' }} />
                <div style={{
                  fontFamily: 'Caveat, cursive',
                  fontSize: '16px',
                  color: '#2C2C2C',
                  fontWeight: 700
                }}>
                  {selectedDayData.waterIntake}L
                </div>
                <div style={{
                  fontFamily: 'Caveat, cursive',
                  fontSize: '12px',
                  color: '#B8B5B0',
                  fontWeight: 500
                }}>
                  Water
                </div>
              </div>

              <div style={{
                background: '#FAF8F5',
                borderRadius: '8px',
                padding: '12px',
                textAlign: 'center'
              }}>
                <DollarSign size={16} color="#16A34A" style={{ marginBottom: '4px' }} />
                <div style={{
                  fontFamily: 'Caveat, cursive',
                  fontSize: '16px',
                  color: '#2C2C2C',
                  fontWeight: 700
                }}>
                  ₹{selectedDayData.moneyEntries.reduce((sum, entry) => 
                    sum + (entry.type === 'income' ? entry.amount : -entry.amount), 0
                  ).toFixed(0)}
                </div>
                <div style={{
                  fontFamily: 'Caveat, cursive',
                  fontSize: '12px',
                  color: '#B8B5B0',
                  fontWeight: 500
                }}>
                  Balance
                </div>
              </div>
            </div>

            {/* Tasks */}
            {selectedDayData.todos.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <h4 style={{
                  fontFamily: 'Caveat, cursive',
                  fontSize: '18px',
                  color: '#8B5A3C',
                  marginBottom: '8px',
                  fontWeight: 700
                }}>
                  Tasks
                </h4>
                {selectedDayData.todos.map(todo => (
                  <div key={todo.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '4px'
                  }}>
                    <CheckCircle 
                      size={14} 
                      color={todo.completed ? '#16A34A' : '#D1D5DB'} 
                      fill={todo.completed ? '#16A34A' : 'none'}
                    />
                    <span style={{
                      fontFamily: 'Caveat, cursive',
                      fontSize: '16px',
                      color: todo.completed ? '#B8B5B0' : '#2C2C2C',
                      textDecoration: todo.completed ? 'line-through' : 'none',
                      fontWeight: 500
                    }}>
                      {todo.text}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Highlight */}
            {selectedDayData.highlight && (
              <div style={{
                background: '#FEF3C7',
                borderRadius: '8px',
                padding: '12px',
                border: '1px solid #F59E0B'
              }}>
                <h4 style={{
                  fontFamily: 'Caveat, cursive',
                  fontSize: '16px',
                  color: '#92400E',
                  marginBottom: '4px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <Star size={14} color="#F59E0B" fill="#F59E0B" />
                  Highlight
                </h4>
                <p style={{
                  fontFamily: 'Caveat, cursive',
                  fontSize: '16px',
                  color: '#92400E',
                  margin: 0,
                  fontWeight: 500
                }}>
                  {selectedDayData.highlight}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};