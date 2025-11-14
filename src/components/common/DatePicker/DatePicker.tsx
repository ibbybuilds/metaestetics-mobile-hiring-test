import React, { useState } from 'react';
import { View, TouchableOpacity, Platform, Modal, Button } from 'react-native';
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
      if (selectedDate) {
        onChange(selectedDate);
      }
    } else {
      if (selectedDate) {
        setInternalDate(selectedDate);
      }
    }
  };

  const handleDone = () => {
    onChange(internalDate);
    setShowPicker(false);
  };

  const handleCancel = () => {
    setInternalDate(value || new Date());
    setShowPicker(false);
  };

  const displayValue = value ? formatDate(value) : '';

  const renderIOSPicker = () => (
    <Modal
      transparent={true}
      animationType="slide"
      visible={showPicker}
      onRequestClose={handleCancel}
    >
      <View style={styles.modalContainer}>
        <View style={styles.pickerContainer}>
          <View style={styles.toolbar}>
            <Button title="Cancel" onPress={handleCancel} />
            <Button title="Done" onPress={handleDone} />
          </View>
          <DateTimePicker
            value={internalDate}
            mode="date"
            display="spinner"
            onChange={handleDateChange}
            maximumDate={new Date()}
          />
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        style={styles.touchable}
      >
        <Input
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
      
      {showPicker && Platform.OS === 'android' && (
        <DateTimePicker
          value={internalDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
          maximumDate={new Date()}
        />
      )}
      {Platform.OS === 'ios' && renderIOSPicker()}
    </View>
  );
};

