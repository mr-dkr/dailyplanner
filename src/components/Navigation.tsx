import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface NavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: '#FAF8F5',
      borderTop: '1px solid #E8E3DB',
      paddingTop: '8px',
      paddingBottom: '8px',
      height: '70px',
      zIndex: 1000
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
        height: '100%'
      }}>
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '8px 16px',
                transition: 'all 0.2s ease',
                minWidth: '60px'
              }}
            >
              <Icon 
                size={24} 
                color={isActive ? '#8B5A3C' : '#B8B5B0'} 
              />
              <span style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                color: isActive ? '#8B5A3C' : '#B8B5B0',
                fontWeight: 500
              }}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};