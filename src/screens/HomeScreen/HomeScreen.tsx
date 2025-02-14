import {
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  View,
  Animated,
  Easing,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {TextInputAnimated} from '../../components';
import {useActions} from './useActions';
import {Button} from '../../components/Button';
import {WeatherCardFragment} from './fragments';
import {Text} from '@react-native-material/core';
import {MapIcon} from '../../assets/svg';

export const HomeScreen = () => {
  const {
    control,
    errors,
    isDirty,
    isValid,
    weatherData,
    loading,
    erroMessage,
    fetchData,
  } = useActions();

  const showWeather = !loading && weatherData && !erroMessage;
  const showError = !loading && erroMessage;

  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -5,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 5,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [translateY]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <Text style={styles.text}>
            ¿De qué ciudad quieres saber el clima?
          </Text>

          <TextInputAnimated
            name="city"
            label="Escribe el nombre de la ciudad"
            control={control}
            autoCapitalize="none"
            error={!!errors.city}
            helperTextError={errors?.city?.message}
          />

          {!weatherData && (
            <View style={styles.iconContainer}>
              <Animated.View style={{transform: [{translateY}]}}>
                <MapIcon width={240} height={240} />
              </Animated.View>
            </View>
          )}

          {loading && (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="small" color="#007AFF" />
              <Text style={styles.loadingText}>Cargando clima...</Text>
            </View>
          )}

          {showError && <Text style={styles.errorText}>{erroMessage}</Text>}

          {showWeather && <WeatherCardFragment data={weatherData} />}
        </View>

        <Button
          label="Buscar"
          onPress={fetchData}
          fullWidth
          disabled={!isDirty || !isValid || loading}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  inputContainer: {
    flexGrow: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  loaderContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
    color: '#555',
  },
  errorText: {
    marginTop: 10,
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  button: {
    marginVertical: 20,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default HomeScreen;
