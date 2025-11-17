import React, { useState } from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Input } from '../Input';
import { Typography } from '../Typography';
import { formatDate } from '@utils/formatters';
import { styles } from './DatePicker.styles';

export interface DatePickerProps {
  label?: string;
  value: Date | null;
  onChange: (date: Date) => void;
  error?: string;
  placeholder?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  error,
  placeholder = 'Select date',
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [internalDate, setInternalDate] = useState<Date>(value || new Date());

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }

    if (selectedDate) {
      setInternalDate(selectedDate);
      onChange(selectedDate);
      if (Platform.OS === 'ios') {
        setShowPicker(false);
      }
    }
  };

  const displayValue = value ? formatDate(value) : '';

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        style={styles.touchable}
      >
        <Input
          style={styles.input}
          label={label}
          placeholder={placeholder}
          value={displayValue}
          onChangeText={() => {}}
          editable={false}
          error={error}
          rightIcon={
            <Typography variant="body2" style={styles.icon}>
              📅
            </Typography>
          }
        />
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={internalDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          maximumDate={new Date()}
        />
      )}
    </View>
  );
};

