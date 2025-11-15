import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Platform, Modal, Text, Alert } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
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
  editable?: boolean; // allow consumer to mark the picker non-editable
}

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  error,
  placeholder = 'Select date',
  editable = true,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [internalDate, setInternalDate] = useState<Date>(value || new Date());

  useEffect(() => {
    if (value) {
      setInternalDate(value);
    }
  }, [value]);

  const isAtLeast12YearsOld = (date: Date) => {
    const today = new Date();
    const minDate = new Date(today.getFullYear() - 12, today.getMonth(), today.getDate());
    return date <= minDate;
  };

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date | undefined) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
      if (selectedDate) {
        if (!isAtLeast12YearsOld(selectedDate)) {
          Alert.alert(
            'Age Restriction',
            'You must be at least 12 years old to register. Please select a valid date of birth.'
          );
          return;
        }
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
      if (!isAtLeast12YearsOld(internalDate)) {
        Alert.alert(
          'Age Restriction',
          'You must be at least 12 years old to register. Please select a valid date of birth.'
        );
        return;
      }
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
      {/* Make the entire field clickable by wrapping label, input, and icon in TouchableOpacity */}
      <TouchableOpacity
        onPress={() => editable && setShowPicker(true)}
        style={styles.touchable}
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel={label || placeholder}
        accessibilityState={{ disabled: !editable }}
      >
        {/* Render label above input for accessibility and clarity */}
        {label && (
          <Typography variant="body2" style={styles.label}>
            {label}
          </Typography>
        )}
        <View style={styles.inputWrapper} pointerEvents="none">
          <Input
            label={undefined}
            placeholder={placeholder}
            value={displayValue}
            onChangeText={() => {}}
            editable={false}
            error={error}
            rightIcon={<Text>📅</Text>}
          />
        </View>
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

