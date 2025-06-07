import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
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
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>TIME TRACKER</Text>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {keyHours.map((hour) => {
          const slot = getTimeSlotForHour(hour);
          const isEditing = editingHour === hour;
          
          return (
            <View key={hour} style={styles.timeSlotRow}>
              <Text style={styles.timeLabel}>{formatHour(hour)}</Text>
              <View style={styles.activityContainer}>
                {isEditing ? (
                  <TextInput
                    style={styles.activityInput}
                    value={slot.activity}
                    onChangeText={(text) => updateActivity(hour, text)}
                    onBlur={() => setEditingHour(null)}
                    onSubmitEditing={() => setEditingHour(null)}
                    placeholder="Enter activity..."
                    autoFocus
                  />
                ) : (
                  <TouchableOpacity
                    style={styles.activityTouchable}
                    onPress={() => setEditingHour(hour)}
                  >
                    <Text style={[
                      styles.activityText,
                      !slot.activity && styles.placeholderText
                    ]}>
                      {slot.activity || 'Tap to add activity'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#8B5A3C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    maxHeight: 400,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#8B5A3C',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  scrollContainer: {
    maxHeight: 320,
  },
  timeSlotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    minHeight: 32,
  },
  timeLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#8B5A3C',
    width: 70,
  },
  activityContainer: {
    flex: 1,
    marginLeft: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0EDE7',
  },
  activityTouchable: {
    paddingVertical: 6,
    paddingHorizontal: 2,
    minHeight: 28,
    justifyContent: 'center',
  },
  activityText: {
    fontFamily: 'Caveat-Regular',
    fontSize: 16,
    color: '#2C2C2C',
    lineHeight: 20,
  },
  placeholderText: {
    color: '#B8B5B0',
    fontStyle: 'italic',
  },
  activityInput: {
    fontFamily: 'Caveat-Regular',
    fontSize: 16,
    color: '#2C2C2C',
    paddingVertical: 6,
    paddingHorizontal: 2,
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
});