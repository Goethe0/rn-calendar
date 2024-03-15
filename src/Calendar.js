import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDay, setSelectedDay] = useState(null);


  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const days = [];
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const previousMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
    if (currentMonth === 0) {
      setCurrentYear((prev) => prev - 1);
    }
  };

  const nextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
    if (currentMonth === 11) {
      setCurrentYear((prev) => prev + 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        <View style={styles.row}>
          <Text style={styles.monthLabel}>
            {monthNames[currentMonth]}
          </Text>
          <Text style={styles.yearLabel}>
            {currentYear}
          </Text>
        </View>
        <View style={styles.navButtons}>
          <TouchableOpacity onPress={previousMonth}>
            <Text style={styles.arrow}>&lt;</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={nextMonth}>
            <Text style={styles.arrow}>&gt;</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.days}>
        {Array.from({ length: firstDayOfMonth }, (_, index) => (
          <Text key={`empty-${index}`} style={styles.day} />
        ))}
        {days.map((day, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.day,
              selectedDay === day && styles.selectedDay,
            ]}
            onPress={() => setSelectedDay(day)}
          >
            <Text style={styles.dayText}>
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#131313',
    border: 'border: 1px solid rgba(183, 183, 183, 0.37)',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 16,
  },
  arrow: {
    fontSize: 16,
    color: '#FFF',
    paddingHorizontal: 4,
  },
  monthLabel: {
    fontSize: 20,
    color: '#FFF',
  },
  yearLabel: {
    paddingLeft: 8,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  days: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  day: {
    width: '16.66%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 32,
    color: '#FFF',
  },
  selectedDay: {
    backgroundColor: '#0DA19B',
  },
  dayText: {
    color: '#FFF',
  },
});

export default Calendar;
