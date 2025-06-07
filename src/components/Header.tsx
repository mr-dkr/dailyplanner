import React from 'react';

interface HeaderProps {
  date: string;
  dayRating: number;
  onDatePress?: () => void;
  onRatingPress?: (rating: number) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  date, 
  dayRating, 
  onDatePress, 
  onRatingPress 
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 
                   'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    
    return {
      day: String(date.getDate()).padStart(2, '0'),
      month: months[date.getMonth()],
      year: date.getFullYear(),
      weekday: days[date.getDay()]
    };
  };

  const dateInfo = formatDate(date);

  return (
    <div style={{
      background: 'transparent',
      padding: '50px 20px 20px',
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '20px'
      }}>
        <h1 style={{
          fontFamily: 'Caveat, cursive',
          fontSize: '32px',
          color: '#8B5A3C',
          letterSpacing: '2px',
          fontWeight: 700,
          margin: 0
        }}>
          DAILY PLANNER
        </h1>
      </div>
      
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <button 
            onClick={onDatePress}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              textAlign: 'left'
            }}
          >
            <div style={{
              fontFamily: 'Caveat, cursive',
              fontSize: '22px',
              color: '#8B5A3C',
              marginBottom: '8px',
              fontWeight: 600
            }}>
              {dateInfo.day} / {dateInfo.month} / {dateInfo.year}
            </div>
            <div style={{
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap'
            }}>
              {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => (
                <span 
                  key={day} 
                  style={{
                    fontFamily: 'Caveat, cursive',
                    fontSize: '14px',
                    color: day === dateInfo.weekday ? '#8B5A3C' : '#B8B5B0',
                    textAlign: 'center',
                    minWidth: '28px',
                    fontWeight: day === dateInfo.weekday ? 700 : 500
                  }}
                >
                  {day}
                </span>
              ))}
            </div>
          </button>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{
            fontFamily: 'Caveat, cursive',
            fontSize: '14px',
            color: '#8B5A3C',
            marginBottom: '8px',
            fontWeight: 600
          }}>
            RATE YOUR DAY:
          </div>
          <div style={{
            display: 'flex',
            gap: '6px'
          }}>
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => onRatingPress?.(rating)}
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '14px',
                  background: dayRating === rating ? '#8B5A3C' : 'transparent',
                  border: `2px solid ${dayRating === rating ? '#8B5A3C' : '#D4C4B0'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (dayRating !== rating) {
                    e.currentTarget.style.borderColor = '#8B5A3C';
                  }
                }}
                onMouseLeave={(e) => {
                  if (dayRating !== rating) {
                    e.currentTarget.style.borderColor = '#D4C4B0';
                  }
                }}
              >
                <span style={{
                  fontFamily: 'Caveat, cursive',
                  fontSize: '16px',
                  color: dayRating === rating ? '#FFFFFF' : '#8B5A3C',
                  fontWeight: 700
                }}>
                  {rating}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};