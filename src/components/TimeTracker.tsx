import React, { useState } from 'react';
import { TimeSlot } from '../types/planner';

interface TimeTrackerProps {
  timeSlots: TimeSlot[];
  onUpdateTimeSlots: (timeSlots: TimeSlot[]) => void;
}

export const TimeTracker: React.FC<TimeTrackerProps> = ({ timeSlots, onUpdateTimeSlots }) => {
  const [editingHour, setEditingHour] = useState<number | null>(null);

  const formatHour = (hour: number) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour.toString().padStart(2, '0')}:00 ${period}`;
  };

  const updateActivity = (hour: number, activity: string) => {
    const updated = timeSlots.map(slot =>
      slot.hour === hour ? { ...slot, activity } : slot
    );
    onUpdateTimeSlots(updated);
  };

  const getTimeSlotForHour = (hour: number) => {
    return timeSlots.find(slot => slot.hour === hour) || { hour, activity: '' };
  };

  // Show key hours for mobile optimization
  const keyHours = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

  return (
    <div className="fade-in" style={{
      background: '#FFFFFF',
      borderRadius: '16px',
      padding: '20px',
      boxShadow: '0 4px 16px rgba(139, 90, 60, 0.1)',
      maxHeight: '400px',
    }}>
      <h3 style={{
        fontFamily: 'Caveat, cursive',
        fontSize: '18px',
        color: '#8B5A3C',
        marginBottom: '16px',
        fontWeight: 700,
        margin: '0 0 16px 0'
      }}>
        TIME TRACKER
      </h3>
      <div style={{
        maxHeight: '320px',
        overflowY: 'auto'
      }}>
        {keyHours.map((hour) => {
          const slot = getTimeSlotForHour(hour);
          const isEditing = editingHour === hour;
          
          return (
            <div key={hour} style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '8px',
              minHeight: '32px'
            }}>
              <span style={{
                fontFamily: 'Caveat, cursive',
                fontSize: '14px',
                color: '#8B5A3C',
                width: '70px',
                flexShrink: 0,
                fontWeight: 600
              }}>
                {formatHour(hour)}
              </span>
              <div style={{
                flex: 1,
                marginLeft: '12px',
                borderBottom: '1px solid #F0EDE7'
              }}>
                {isEditing ? (
                  <input
                    type="text"
                    value={slot.activity}
                    onChange={(e) => updateActivity(hour, e.target.value)}
                    onBlur={() => setEditingHour(null)}
                    onKeyPress={(e) => e.key === 'Enter' && setEditingHour(null)}
                    placeholder="Enter activity..."
                    autoFocus
                    style={{
                      fontFamily: 'Caveat, cursive',
                      fontSize: '18px',
                      color: '#2C2C2C',
                      padding: '6px 2px',
                      border: 'none',
                      background: 'transparent',
                      width: '100%',
                      outline: 'none',
                      fontWeight: 600
                    }}
                  />
                ) : (
                  <div
                    onClick={() => setEditingHour(hour)}
                    style={{
                      padding: '6px 2px',
                      minHeight: '28px',
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'text'
                    }}
                  >
                    <span style={{
                      fontFamily: 'Caveat, cursive',
                      fontSize: '18px',
                      color: slot.activity ? '#2C2C2C' : '#B8B5B0',
                      lineHeight: '22px',
                      fontStyle: slot.activity ? 'normal' : 'italic',
                      fontWeight: slot.activity ? 600 : 500
                    }}>
                      {slot.activity || 'Tap to add activity'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};