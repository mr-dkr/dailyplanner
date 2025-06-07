import React, { useState } from 'react';
import { Plus, TrendingUp, TrendingDown, X } from 'lucide-react';
import { MoneyEntry } from '../types/planner';

interface MoneyTrackerProps {
  moneyEntries: MoneyEntry[];
  onUpdateMoneyEntries: (entries: MoneyEntry[]) => void;
}

const categories = [
  'Food', 'Transport', 'Shopping', 'Entertainment', 'Bills', 
  'Health', 'Education', 'Work', 'Other'
];

export const MoneyTracker: React.FC<MoneyTrackerProps> = ({ 
  moneyEntries, 
  onUpdateMoneyEntries 
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEntry, setNewEntry] = useState({
    amount: '',
    description: '',
    type: 'expense' as 'expense' | 'income',
    category: 'Food'
  });

  const addEntry = () => {
    if (newEntry.amount && newEntry.description) {
      const entry: MoneyEntry = {
        id: Date.now().toString(),
        amount: parseFloat(newEntry.amount),
        description: newEntry.description,
        type: newEntry.type,
        category: newEntry.category,
        date: new Date().toISOString()
      };
      onUpdateMoneyEntries([...moneyEntries, entry]);
      setNewEntry({ amount: '', description: '', type: 'expense', category: 'Food' });
      setShowAddForm(false);
    }
  };

  const deleteEntry = (id: string) => {
    onUpdateMoneyEntries(moneyEntries.filter(entry => entry.id !== id));
  };

  const totalExpenses = moneyEntries
    .filter(entry => entry.type === 'expense')
    .reduce((sum, entry) => sum + entry.amount, 0);

  const totalIncome = moneyEntries
    .filter(entry => entry.type === 'income')
    .reduce((sum, entry) => sum + entry.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="fade-in" style={{
      background: '#FFFFFF',
      borderRadius: '16px',
      padding: '20px',
      boxShadow: '0 4px 16px rgba(139, 90, 60, 0.1)',
      maxHeight: '400px',
      display: 'flex',
      flexDirection: 'column'
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
          margin: 0
        }}>
          MONEY TRACKER
        </h3>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          style={{
            background: showAddForm ? '#F0EDE7' : 'transparent',
            border: '1px solid #D4C4B0',
            borderRadius: '6px',
            padding: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Plus size={16} color="#8B5A3C" />
        </button>
      </div>

      {/* Summary */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '8px',
        marginBottom: '16px',
        padding: '12px',
        background: '#FAF8F5',
        borderRadius: '8px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: 'Caveat, cursive',
            fontSize: '12px',
            color: '#8B5A3C',
            marginBottom: '2px',
            fontWeight: 600
          }}>
            INCOME
          </div>
          <div style={{
            fontFamily: 'Caveat, cursive',
            fontSize: '16px',
            color: '#16A34A',
            fontWeight: 700
          }}>
            ₹{totalIncome.toFixed(2)}
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: 'Caveat, cursive',
            fontSize: '12px',
            color: '#8B5A3C',
            marginBottom: '2px',
            fontWeight: 600
          }}>
            EXPENSES
          </div>
          <div style={{
            fontFamily: 'Caveat, cursive',
            fontSize: '16px',
            color: '#DC2626',
            fontWeight: 700
          }}>
            ₹{totalExpenses.toFixed(2)}
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: 'Caveat, cursive',
            fontSize: '12px',
            color: '#8B5A3C',
            marginBottom: '2px',
            fontWeight: 600
          }}>
            BALANCE
          </div>
          <div style={{
            fontFamily: 'Caveat, cursive',
            fontSize: '16px',
            color: balance >= 0 ? '#16A34A' : '#DC2626',
            fontWeight: 700
          }}>
            ₹{balance.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div style={{
          padding: '12px',
          background: '#F8F6F3',
          borderRadius: '8px',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
            <button
              onClick={() => setNewEntry({ ...newEntry, type: 'expense' })}
              style={{
                flex: 1,
                padding: '8px 12px',
                background: newEntry.type === 'expense' ? '#8B5A3C' : 'transparent',
                color: newEntry.type === 'expense' ? 'white' : '#8B5A3C',
                border: '1px solid #8B5A3C',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                fontFamily: 'Caveat, cursive',
                fontWeight: 600
              }}
            >
              Expense
            </button>
            <button
              onClick={() => setNewEntry({ ...newEntry, type: 'income' })}
              style={{
                flex: 1,
                padding: '8px 12px',
                background: newEntry.type === 'income' ? '#8B5A3C' : 'transparent',
                color: newEntry.type === 'income' ? 'white' : '#8B5A3C',
                border: '1px solid #8B5A3C',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                fontFamily: 'Caveat, cursive',
                fontWeight: 600
              }}
            >
              Income
            </button>
          </div>
          <input
            type="number"
            placeholder="Amount (₹)"
            value={newEntry.amount}
            onChange={(e) => setNewEntry({ ...newEntry, amount: e.target.value })}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #D4C4B0',
              borderRadius: '4px',
              marginBottom: '8px',
              fontSize: '16px',
              fontFamily: 'Caveat, cursive'
            }}
          />
          <input
            type="text"
            placeholder="Description"
            value={newEntry.description}
            onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #D4C4B0',
              borderRadius: '4px',
              marginBottom: '8px',
              fontSize: '16px',
              fontFamily: 'Caveat, cursive'
            }}
          />
          <select
            value={newEntry.category}
            onChange={(e) => setNewEntry({ ...newEntry, category: e.target.value })}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #D4C4B0',
              borderRadius: '4px',
              marginBottom: '8px',
              fontSize: '16px',
              fontFamily: 'Caveat, cursive'
            }}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <button
            onClick={addEntry}
            style={{
              width: '100%',
              padding: '10px',
              background: '#8B5A3C',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px',
              fontFamily: 'Caveat, cursive',
              fontWeight: 700
            }}
          >
            Add Entry
          </button>
        </div>
      )}

      {/* Entries List */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        maxHeight: '200px'
      }}>
        {moneyEntries.length === 0 ? (
          <div style={{
            textAlign: 'center',
            color: '#B8B5B0',
            fontFamily: 'Caveat, cursive',
            fontSize: '18px',
            fontStyle: 'italic',
            padding: '20px',
            fontWeight: 500
          }}>
            No entries yet. Add your first transaction!
          </div>
        ) : (
          moneyEntries.slice().reverse().map(entry => (
            <div key={entry.id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 0',
              borderBottom: '1px solid #F0EDE7'
            }}>
              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '2px'
                }}>
                  {entry.type === 'income' ? 
                    <TrendingUp size={14} color="#16A34A" /> : 
                    <TrendingDown size={14} color="#DC2626" />
                  }
                  <span style={{
                    fontFamily: 'Caveat, cursive',
                    fontSize: '16px',
                    color: '#2C2C2C',
                    fontWeight: 600
                  }}>
                    {entry.description}
                  </span>
                </div>
                <div style={{
                  fontFamily: 'Caveat, cursive',
                  fontSize: '12px',
                  color: '#B8B5B0',
                  fontWeight: 500
                }}>
                  {entry.category}
                </div>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{
                  fontFamily: 'Caveat, cursive',
                  fontSize: '16px',
                  color: entry.type === 'income' ? '#16A34A' : '#DC2626',
                  fontWeight: 700
                }}>
                  {entry.type === 'income' ? '+' : '-'}₹{entry.amount.toFixed(2)}
                </span>
                <button
                  onClick={() => deleteEntry(entry.id)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '2px'
                  }}
                >
                  <X size={12} color="#D4C4B0" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};