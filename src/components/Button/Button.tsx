/* eslint-disable react-native/no-inline-styles */
const React = require('react');
import {
  AnimatableNumericValue,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {Text} from '@react-native-material/core';

interface Props {
  label: string;
  disabled?: boolean;
  backgroundColor?: string;
  padding?: number;
  textColor?: string;
  fullWidth?: boolean;
  borderRadius?: AnimatableNumericValue | undefined;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export const Button = (props: Props) => {
  const {
    label,
    onPress,
    disabled = false,
    backgroundColor = '#0764C1',
    textColor = '#FFFFFF',
    fullWidth = false,
    borderRadius,
    padding = 16,
    iconLeft,
    iconRight,
    style,
  } = props;
  return (
    <TouchableOpacity
      testID="button"
      onPress={onPress}
      disabled={disabled}
      style={[
        style,
        {
          borderRadius: borderRadius || 24,
          padding,
        },
        fullWidth && styles.container,
        styles.button,
        {backgroundColor: disabled ? '#F1F1F1' : backgroundColor},
      ]}>
      {iconLeft}
      <Text
        color={disabled ? '#5F5E61' : textColor}
        style={[
          iconLeft ? styles.iconLeft : {},
          iconRight ? styles.iconRight : {},
        ]}>
        {label}
      </Text>
      {iconRight}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },

  iconLeft: {
    marginRight: 4,
  },

  iconRight: {
    marginLeft: 4,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
