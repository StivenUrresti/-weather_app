import React, {useRef, useState} from 'react';
import {
  Animated,
  KeyboardTypeOptions,
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import {Text} from '@react-native-material/core';
import {useController} from 'react-hook-form';

interface Props {
  control?: any;
  name: string;
  required?: boolean;
  label?: string;
  error: boolean;
  helperTextError?: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  autoComplete?: any;
  keyboardType?: KeyboardTypeOptions | undefined;
  editable?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  multiline?: boolean;
  isDark?: boolean;
  onChange?: (text: string) => void;
}

export const TextInputAnimated = ({
  name,
  control,
  label,
  error,
  required,
  helperTextError = '',
  editable = true,
  containerStyle,
  keyboardType,
  autoCapitalize,
  autoComplete,
  multiline = false,
  onChange,
}: Props) => {
  const {field} = useController({
    control,
    defaultValue: '',
    name,
    rules: {
      required,
    },
  });
  const [inputHeight, setHeight] = useState(0);
  const [placeholderWidth, setWidth] = useState(0);
  const animation = useRef(new Animated.Value(0)).current;
  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -inputHeight / 5],
  });
  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -placeholderWidth / 8],
  });
  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.7],
  });
  const onFocus = () => animate(1);
  const onBlur = () => !field.value && animate(0);
  const animate = (val: number) => {
    Animated.spring(animation, {
      toValue: val,
      bounciness: 0,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View
        style={[styles.inputContainer, containerStyle]}
        onLayout={e => !inputHeight && setHeight(e.nativeEvent.layout.height)}>
        <View style={{height: inputHeight, ...styles.placeholderContainer}}>
          <Animated.Text
            style={[
              styles.placeholder,
              {transform: [{translateY}, {translateX}, {scale}]},
            ]}
            onTextLayout={e =>
              !placeholderWidth && setWidth(e.nativeEvent.lines[0]?.width || 0)
            }>
            {label}
          </Animated.Text>
        </View>
        <TextInput
          style={[styles.input, multiline && styles.inputArea]}
          autoComplete={autoComplete}
          value={field.value}
          editable={editable}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          multiline={multiline}
          onBlur={onBlur}
          onFocus={onFocus}
          onChangeText={onChange || field.onChange}
        />
      </View>
      {error && <Text style={styles.textError}>{helperTextError}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    width: '100%',
  },
  inputContainer: {
    borderRadius: 16,
    width: '100%',
    backgroundColor: '#F8F8F8',
    height: 68,
  },
  input: {
    marginTop: 18,
    paddingHorizontal: 14,
    fontSize: 16,
    height: 48,
    color: '#1C1C21',
  },
  inputArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  placeholderContainer: {
    position: 'absolute',
    justifyContent: 'center',
  },
  placeholder: {
    fontSize: 18,
    position: 'absolute',
    marginHorizontal: 5,
    paddingHorizontal: 5,
    color: '#777B85',
  },
  textError: {
    color: '#FF0000',
    marginBottom: 16,
    marginLeft: 16,
  },
});
