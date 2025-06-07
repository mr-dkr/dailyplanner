import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Target, Calendar, DollarSign, Droplets } from 'lucide-react';
import { DayData } from '../types/planner';

interface StatsPageProps {
  getAllDayData: () => DayData[];
}

type TimePeriod = 'daily' | 'weekly' | 'monthly';

export const StatsPage: React.FC<StatsPageProps> = ({ getAllDayData }) => {
  const [allDays, setAllDays] = useState<DayData[]>([]);
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('weekly');

  useEffect(() => {
    setAllDays(getAllDayData());
  }, [getAllDayData]);

  const getFilteredDays = () => {
    const now = new Date();
    const filtered = allDays.filter(day => {
      const dayDate = new Date(day.date);
      
      switch (timePeriod) {
        case 'daily':
          return dayDate.toDateString() === now.toDateString();
        case 'weekly':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return dayDate >= weekAgo;
        case 'monthly':
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          return dayDate >= monthAgo;
        default:
          return true;
      }
    });
    
    return filtered;
  };

  const filteredDays = getFilteredDays();

  const getLast7Days = () => {
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      const dayData = allDays.find(day => day.date === dateString);
      last7Days.push({
        date: dateString,
        data: dayData || null
      });
    }
    return last7Days;
  };

  const last7Days = getLast7Days();

  // Calculate statistics
  const totalTasks = filteredDays.reduce((sum, day) => sum + day.todos.length, 0);
  const completedTasks = filteredDays.reduce((sum, day) => 
    sum + day.todos.filter(todo => todo.completed).length, 0);
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const totalSpent = filteredDays.reduce((sum, day) => 
    sum + day.moneyEntries
      .filter(entry => entry.type === 'expense')
      .reduce((daySum, entry) => daySum + entry.amount, 0), 0);

  const totalEarned = filteredDays.reduce((sum, day) => 
    sum + day.moneyEntries
      .filter(entry => entry.type === 'income')
      .reduce((daySum, entry) => daySum + entry.amount, 0), 0);

  const avgWaterIntake = filteredDays.length > 0 ? 
    filteredDays.reduce((sum, day) => sum + day.waterIntake, 0) / filteredDays.length : 0;

  const avgDayRating = filteredDays.filter(day => day.dayRating > 0).length > 0 ?
    filteredDays.filter(day => day.dayRating > 0)
      .reduce((sum, day) => sum + day.dayRating, 0) / 
    filteredDays.filter(day => day.dayRating > 0).length : 0;

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
          Your Progress
        </h1>
        <p style={{
          fontFamily: 'Caveat, cursive',
          fontSize: '20px',
          color: '#B8B5B0',
          margin: 0,
          fontWeight: 500
        }}>
          Track your daily habits and achievements
        </p>
      </div>

      {/* Time Period Selector */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '32px'
      }}>
        <div style={{
          background: '#FFFFFF',
          borderRadius: '12px',
          padding: '4px',
          boxShadow: '0 2px 8px rgba(139, 90, 60, 0.1)',
          display: 'flex',
          gap: '4px'
        }}>
          {(['daily', 'weekly', 'monthly'] as TimePeriod[]).map(period => (
            <button
              key={period}
              onClick={() => setTimePeriod(period)}
              style={{
                padding: '8px 16px',
                background: timePeriod === period ? '#8B5A3C' : 'transparent',
                color: timePeriod === period ? 'white' : '#8B5A3C',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontFamily: 'Caveat, cursive',
                fontSize: '16px',
                fontWeight: 600,
                textTransform: 'capitalize',
                transition: 'all 0.2s ease'
              }}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}>
        <div className="fade-in" style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          padding: '20px',
          boxShadow: '0 4px 16px rgba(139, 90, 60, 0.1)',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '12px'
          }}>
            <Target size={20} color="#8B5A3C" />
            <span style={{
              fontFamily: 'Caveat, cursive',
              fontSize: '16px',
              color: '#8B5A3C',
              fontWeight: 700
            }}>
              Task Completion
            </span>
          </div>
          <div style={{
            fontFamily: 'Caveat, cursive',
            fontSize: '32px',
            color: '#2C2C2C',
            fontWeight: 700,
            marginBottom: '4px'
          }}>
            {completionRate.toFixed(1)}%
          </div>
          <div style={{
            fontFamily: 'Caveat, cursive',
            fontSize: '14px',
            color: '#B8B5B0',
            fontWeight: 500
          }}>
            {completedTasks} of {totalTasks} tasks completed
          </div>
        </div>

        <div className="fade-in" style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          padding: '20px',
          boxShadow: '0 4px 16px rgba(139, 90, 60, 0.1)',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '12px'
          }}>
            <DollarSign size={20} color="#16A34A" />
            <span style={{
              fontFamily: 'Caveat, cursive',
              fontSize: '16px',
              color: '#8B5A3C',
              fontWeight: 700
            }}>
              Financial Balance
            </span>
          </div>
          <div style={{
            fontFamily: 'Caveat, cursive',
            fontSize: '32px',
            color: totalEarned - totalSpent >= 0 ? '#16A34A' : '#DC2626',
            fontWeight: 700,
            marginBottom: '4px'
          }}>
            ₹{(totalEarned - totalSpent).toFixed(2)}
          </div>
          <div style={{
            fontFamily: 'Caveat, cursive',
            fontSize: '14px',
            color: '#B8B5B0',
            fontWeight: 500
          }}>
            Earned ₹{totalEarned.toFixed(2)} • Spent ₹{totalSpent.toFixed(2)}
          </div>
        </div>

        <div className="fade-in" style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          padding: '20px',
          boxShadow: '0 4px 16px rgba(139, 90, 60, 0.1)',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '12px'
          }}>
            <Droplets size={20} color="#3B82F6" />
            <span style={{
              fontFamily: 'Caveat, cursive',
              fontSize: '16px',
              color: '#8B5A3C',
              fontWeight: 700
            }}>
              Hydration
            </span>
          </div>
          <div style={{
            fontFamily: 'Caveat, cursive',
            fontSize: '32px',
            color: '#2C2C2C',
            fontWeight: 700,
            marginBottom: '4px'
          }}>
            {avgWaterIntake.toFixed(1)}
          </div>
          <div style={{
            fontFamily: 'Caveat, cursive',
            fontSize: '14px',
            color: '#B8B5B0',
            fontWeight: 500
          }}>
            Average litres per day
          </div>
        </div>
      </div>

      {/* Weekly Overview */}
      <div className="fade-in" style={{
        background: '#FFFFFF',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 4px 16px rgba(139, 90, 60, 0.1)',
        marginBottom: '24px'
      }}>
        <h3 style={{
          fontFamily: 'Caveat, cursive',
          fontSize: '22px',
          color: '#8B5A3C',
          marginBottom: '20px',
          fontWeight: 700,
          margin: '0 0 20px 0',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Calendar size={20} />
          Last 7 Days
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '12px'
        }}>
          {last7Days.map(({ date, data }) => {
            const dayName = new Date(date).toLocaleDateString('en', { weekday: 'short' });
            const dayNumber = new Date(date).getDate();
            const tasksCompleted = data ? data.todos.filter(t => t.completed).length : 0;
            const totalTasks = data ? data.todos.length : 0;
            const waterGoalMet = data ? data.waterIntake >= data.waterGoal : false;
            
            return (
              <div key={date} style={{
                textAlign: 'center',
                padding: '12px 8px',
                background: data ? '#FAF8F5' : '#F8F6F3',
                borderRadius: '8px',
                border: data ? '1px solid #E8E3DB' : '1px solid #F0EDE7'
              }}>
                <div style={{
                  fontFamily: 'Caveat, cursive',
                  fontSize: '12px',
                  color: '#8B5A3C',
                  marginBottom: '4px',
                  fontWeight: 600
                }}>
                  {dayName}
                </div>
                <div style={{
                  fontFamily: 'Caveat, cursive',
                  fontSize: '18px',
                  color: '#2C2C2C',
                  marginBottom: '8px',
                  fontWeight: 700
                }}>
                  {dayNumber}
                </div>
                
                {data && (
                  <>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginBottom: '4px'
                    }}>
                      <div style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        background: totalTasks > 0 && tasksCompleted === totalTasks ? '#16A34A' : 
                                   tasksCompleted > 0 ? '#F59E0B' : '#E5E7EB'
                      }} />
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginBottom: '4px'
                    }}>
                      <Droplets 
                        size={12} 
                        color={waterGoalMet ? '#3B82F6' : '#D1D5DB'} 
                        fill={waterGoalMet ? '#3B82F6' : 'none'}
                      />
                    </div>

                    {data.dayRating > 0 && (
                      <div style={{
                        fontFamily: 'Caveat, cursive',
                        fontSize: '12px',
                        color: '#F59E0B',
                        fontWeight: 700
                      }}>
                        ★{data.dayRating}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>

        <div style={{
          marginTop: '16px',
          padding: '12px',
          background: '#F8F6F3',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          fontSize: '12px',
          color: '#8B5A3C'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16A34A' }} />
            <span style={{ fontFamily: 'Caveat, cursive', fontWeight: 600 }}>All tasks done</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B' }} />
            <span style={{ fontFamily: 'Caveat, cursive', fontWeight: 600 }}>Some tasks done</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Droplets size={8} color="#3B82F6" fill="#3B82F6" />
            <span style={{ fontFamily: 'Caveat, cursive', fontWeight: 600 }}>Water goal met</span>
          </div>
        </div>
      </div>

      {/* Day Rating Chart */}
      {avgDayRating > 0 && (
        <div className="fade-in" style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 16px rgba(139, 90, 60, 0.1)',
        }}>
          <h3 style={{
            fontFamily: 'Caveat, cursive',
            fontSize: '22px',
            color: '#8B5A3C',
            marginBottom: '20px',
            fontWeight: 700,
            margin: '0 0 20px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <TrendingUp size={20} />
            Average Day Rating
          </h3>

          <div style={{
            textAlign: 'center',
            marginBottom: '16px'
          }}>
            <div style={{
              fontFamily: 'Caveat, cursive',
              fontSize: '52px',
              color: '#F59E0B',
              fontWeight: 700,
              lineHeight: 1
            }}>
              {avgDayRating.toFixed(1)}
            </div>
            <div style={{
              fontFamily: 'Caveat, cursive',
              fontSize: '16px',
              color: '#B8B5B0',
              fontWeight: 500
            }}>
              out of 5 stars
            </div>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '4px'
          }}>
            {[1, 2, 3, 4, 5].map(star => (
              <span key={star} style={{
                fontSize: '28px',
                color: star <= avgDayRating ? '#F59E0B' : '#E5E7EB'
              }}>
                ★
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};