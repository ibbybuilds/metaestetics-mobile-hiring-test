import React, { useState, useEffect } from 'react';
import { Animated, Text } from 'react-native';
import { styles } from './Toast.styles';
import { Typography } from '../Typography';
import { colors } from '@theme';
import Ionicons from '@expo/vector-icons/Ionicons';

type ToastType = 'success' | 'error' | 'warning' | 'info';

type ToastProps = {
  text: string;
  type?: ToastType;
  placement?: 'bottom' | 'top';
  duration?: number;
};

let toastRef: ((props: ToastProps) => void) | null = null;

export const showToast = (props: ToastProps) => {
  toastRef?.(props);
};

export const Toast: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState<ToastProps | null>(null);
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    toastRef = (props: ToastProps) => {
      setMessage(props);
      setVisible(true);
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        Animated.timing(animation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setVisible(false);
          setMessage(null);
        });
      }, props.duration || 3000);
    };
  }, []);

  if (!visible || !message) return null;

  const icon =
    message.type === 'success' ? (
      <Ionicons name="checkmark-circle-outline" size={24} style={styles.icon} />
    ) : message.type === 'error' ? (
      <Ionicons name="close-circle-outline" size={24} style={styles.icon} />
    ) : message.type === 'warning' ? (
      <Ionicons name="warning-outline" size={24} style={styles.icon} />
    ) : (
      <Ionicons name="information-circle-outline" size={24} style={styles.icon} />
    );

  const backgroundColor =
    message.type === 'success'
      ? colors.success
      : message.type === 'error'
      ? colors.error
      : message.type === 'warning'
      ? colors.warning
      : colors.info;

  const positionStyle = message.placement === 'top' ? { top: 50 } : { bottom: 50 };

  return (
    <Animated.View
      style={[styles.container, positionStyle, { backgroundColor, opacity: animation }]}
    >
      {icon}
      <Typography variant="body2" style={styles.text}>
        {message.text}
      </Typography>
    </Animated.View>
  );
};
