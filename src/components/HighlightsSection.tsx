import React, { useState } from 'react';
import { Star, Edit3 } from 'lucide-react';

interface HighlightsSectionProps {
  highlight: string;
  onUpdateHighlight: (highlight: string) => void;
}

export const HighlightsSection: React.FC<HighlightsSectionProps> = ({
  highlight,
  onUpdateHighlight
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempHighlight, setTempHighlight] = useState(highlight);

  const saveHighlight = () => {
    onUpdateHighlight(tempHighlight);
    setIsEditing(false);
  };

  return (
    <div className="fade-in" style={{
      background: '#FFFFFF',
      borderRadius: '16px',
      padding: '20px',
      boxShadow: '0 4px 16px rgba(139, 90, 60, 0.1)',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px'
      }}>
        <h3 style={{
          fontFamily: 'Caveat, cursive',
          fontSize: '18px',
          color: '#8B5A3C',
          fontWeight: 700,
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <Star size={16} color="#F59E0B" fill="#F59E0B" />
          HIGHLIGHT OF THE DAY
        </h3>
        <button
          onClick={() => {
            if (isEditing) {
              saveHighlight();
            } else {
              setTempHighlight(highlight);
              setIsEditing(true);
            }
          }}
          style={{
            background: 'transparent',
            border: '1px solid #D4C4B0',
            borderRadius: '6px',
            padding: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Edit3 size={14} color="#8B5A3C" />
        </button>
      </div>

      {isEditing ? (
        <textarea
          value={tempHighlight}
          onChange={(e) => setTempHighlight(e.target.value)}
          onBlur={saveHighlight}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              saveHighlight();
            }
          }}
          placeholder="What made today special?"
          autoFocus
          style={{
            width: '100%',
            minHeight: '80px',
            padding: '12px',
            border: '1px solid #D4C4B0',
            borderRadius: '8px',
            fontFamily: 'Caveat, cursive',
            fontSize: '18px',
            color: '#2C2C2C',
            background: '#FAF8F5',
            resize: 'vertical',
            outline: 'none',
            fontWeight: 600
          }}
        />
      ) : (
        <div
          onClick={() => {
            setTempHighlight(highlight);
            setIsEditing(true);
          }}
          style={{
            minHeight: '80px',
            padding: '12px',
            background: '#FAF8F5',
            borderRadius: '8px',
            border: '1px solid #E8E3DB',
            cursor: 'text',
            display: 'flex',
            alignItems: highlight ? 'flex-start' : 'center',
            justifyContent: highlight ? 'flex-start' : 'center'
          }}
        >
          <span style={{
            fontFamily: 'Caveat, cursive',
            fontSize: '18px',
            color: highlight ? '#2C2C2C' : '#B8B5B0',
            lineHeight: '1.4',
            fontStyle: highlight ? 'normal' : 'italic',
            fontWeight: highlight ? 600 : 500
          }}>
            {highlight || 'Click to add your highlight...'}
          </span>
        </div>
      )}

      {highlight && !isEditing && (
        <div style={{
          marginTop: '12px',
          padding: '8px 12px',
          background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
          borderRadius: '8px',
          border: '1px solid #F59E0B',
          textAlign: 'center'
        }}>
          <span style={{
            fontFamily: 'Caveat, cursive',
            fontSize: '14px',
            color: '#92400E',
            fontWeight: 600
          }}>
            ✨ Today's golden moment captured!
          </span>
        </div>
      )}
    </div>
  );
};