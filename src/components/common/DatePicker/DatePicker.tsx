import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Platform, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Input } from '../Input';
import { Typography } from '../Typography';
import { Button } from '../Button';
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

  useEffect(() => {
    if (value) {
      setInternalDate(value);
    }
  }, [value]);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
      if (selectedDate) {
        setInternalDate(selectedDate);
        onChange(selectedDate);
      }
      return;
    }

    if (Platform.OS === 'ios') {
      if (event.type === 'dismissed') {
        setShowPicker(false);
        if (value) {
          setInternalDate(value);
        }
        return;
      }

      if (selectedDate) {
        setInternalDate(selectedDate);
      }
    }
  };

  const handleConfirm = () => {
    if (Platform.OS === 'ios') {
      onChange(internalDate);
      setShowPicker(false);
    }
  };

  const handleCancel = () => {
    if (value) {
      setInternalDate(value);
    }
    setShowPicker(false);
  };

  const displayValue = value ? formatDate(value) : '';

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

      {Platform.OS === 'ios' && showPicker ? (
        <Modal
          visible={showPicker}
          transparent
          animationType="slide"
          onRequestClose={handleCancel}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Button
                  title="Cancel"
                  onPress={handleCancel}
                  variant="ghost"
                  size="small"
                />
                <Button
                  title="Done"
                  onPress={handleConfirm}
                  variant="primary"
                  size="small"
                />
              </View>
              <DateTimePicker
                value={internalDate}
                mode="date"
                display="spinner"
                onChange={handleDateChange}
                maximumDate={new Date()}
                style={styles.picker}
              />
            </View>
          </View>
        </Modal>
      ) : (
        showPicker && (
          <DateTimePicker
            value={internalDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
            maximumDate={new Date()}
          />
        )
      )}
    </View>
  );
};
