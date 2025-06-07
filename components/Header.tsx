import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>DAILY PLANNER</Text>
      </View>
      
      <View style={styles.dateSection}>
        <TouchableOpacity style={styles.dateContainer} onPress={onDatePress}>
          <Text style={styles.dateText}>
            {dateInfo.day} / {dateInfo.month} / {dateInfo.year}
          </Text>
          <View style={styles.dayLabels}>
            {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day, index) => (
              <Text 
                key={day} 
                style={[
                  styles.dayLabel,
                  day === dateInfo.weekday && styles.activeDayLabel
                ]}
              >
                {day}
              </Text>
            ))}
          </View>
        </TouchableOpacity>

        <View style={styles.ratingSection}>
          <Text style={styles.ratingLabel}>RATE YOUR DAY:</Text>
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((rating) => (
              <TouchableOpacity
                key={rating}
                style={[
                  styles.ratingButton,
                  dayRating === rating && styles.activeRating
                ]}
                onPress={() => onRatingPress?.(rating)}
              >
                <Text style={[
                  styles.ratingText,
                  dayRating === rating && styles.activeRatingText
                ]}>
                  {rating}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Caveat-Bold',
    fontSize: 28,
    color: '#8B5A3C',
    letterSpacing: 2,
  },
  dateSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  dateContainer: {
    flex: 1,
  },
  dateText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#8B5A3C',
    marginBottom: 8,
  },
  dayLabels: {
    flexDirection: 'row',
    gap: 8,
  },
  dayLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 10,
    color: '#B8B5B0',
    textAlign: 'center',
    minWidth: 24,
  },
  activeDayLabel: {
    color: '#8B5A3C',
    fontFamily: 'Inter-SemiBold',
  },
  ratingSection: {
    alignItems: 'flex-end',
  },
  ratingLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 10,
    color: '#8B5A3C',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: 6,
  },
  ratingButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#D4C4B0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeRating: {
    backgroundColor: '#8B5A3C',
    borderColor: '#8B5A3C',
  },
  ratingText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#8B5A3C',
  },
  activeRatingText: {
    color: '#FFFFFF',
  },
});