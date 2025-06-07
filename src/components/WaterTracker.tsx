import React from 'react';
import { Droplets, Plus, Minus } from 'lucide-react';

interface WaterTrackerProps {
  waterIntake: number;
  waterGoal: number;
  onUpdateWaterIntake: (intake: number) => void;
}

export const WaterTracker: React.FC<WaterTrackerProps> = ({
  waterIntake,
  waterGoal,
  onUpdateWaterIntake
}) => {
  const percentage = Math.min((waterIntake / waterGoal) * 100, 100);

  const adjustWater = (amount: number) => {
    const newIntake = Math.max(0, waterIntake + amount);
    onUpdateWaterIntake(newIntake);
  };

  return (
    <div className="fade-in" style={{
      background: '#FFFFFF',
      borderRadius: '16px',
      padding: '20px',
      boxShadow: '0 4px 16px rgba(139, 90, 60, 0.1)',
    }}>
      <h3 style={{
        fontFamily: 'Caveat, cursive',
        fontSize: '18px',
        color: '#8B5A3C',
        marginBottom: '16px',
        fontWeight: 700,
        margin: '0 0 16px 0'
      }}>
        WATER TRACKER
      </h3>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Droplets size={20} color="#3B82F6" />
          <span style={{
            fontFamily: 'Caveat, cursive',
            fontSize: '22px',
            color: '#2C2C2C',
            fontWeight: 700
          }}>
            {waterIntake} / {waterGoal}
          </span>
          <span style={{
            fontFamily: 'Caveat, cursive',
            fontSize: '16px',
            color: '#B8B5B0',
            fontWeight: 600
          }}>
            litres
          </span>
        </div>

        <div style={{
          display: 'flex',
          gap: '8px'
        }}>
          <button
            onClick={() => adjustWater(-0.25)}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: '#F0EDE7',
              border: '1px solid #D4C4B0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <Minus size={16} color="#8B5A3C" />
          </button>
          <button
            onClick={() => adjustWater(0.25)}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: '#8B5A3C',
              border: '1px solid #8B5A3C',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <Plus size={16} color="#FFFFFF" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{
        width: '100%',
        height: '8px',
        background: '#F0EDE7',
        borderRadius: '4px',
        marginBottom: '12px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${percentage}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #3B82F6 0%, #1D4ED8 100%)',
          borderRadius: '4px',
          transition: 'width 0.3s ease'
        }} />
      </div>

      {/* Visual Glasses */}
      <div style={{
        display: 'flex',
        gap: '4px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {Array.from({ length: Math.ceil(waterGoal * 4) }, (_, i) => (
          <div
            key={i}
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: i < waterIntake * 4 ? '#3B82F6' : '#F0EDE7',
              border: `2px solid ${i < waterIntake * 4 ? '#1D4ED8' : '#D4C4B0'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
          >
            {i < waterIntake * 4 && <Droplets size={10} color="#FFFFFF" />}
          </div>
        ))}
      </div>

      <div style={{
        textAlign: 'center',
        marginTop: '12px'
      }}>
        <span style={{
          fontFamily: 'Caveat, cursive',
          fontSize: '16px',
          color: percentage >= 100 ? '#16A34A' : '#8B5A3C',
          fontWeight: 600
        }}>
          {percentage >= 100 ? '🎉 Goal achieved!' : `${(100 - percentage).toFixed(0)}% to go`}
        </span>
      </div>
    </div>
  );
};