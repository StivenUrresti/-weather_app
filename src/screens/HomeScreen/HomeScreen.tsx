import {Text, SafeAreaView, StyleSheet, ActivityIndicator} from 'react-native';
import React from 'react';
import {TextInputAnimated} from '../../components';
import {useActions} from './useActions';
import {View} from 'react-native-ui-lib';
import {Button} from '../../components/Button';

export const HomeScreen = () => {
  const {control, errors, isDirty, isValid, weatherData, loading, fetchData} =
    useActions();

  return (
    <SafeAreaView style={styles.container}>
      <View flex padding-16>
        <Text style={styles.text}>¿De qué ciudad quieres saber el clima?</Text>
        <TextInputAnimated
          name="city"
          label="Escribe en nombre de la ciudad"
          control={control}
          autoCapitalize="none"
          error={!!errors.city}
          helperTextError={errors?.city?.message}
        />
        <Button
          label="Buscar"
          onPress={fetchData}
          fullWidth
          disabled={!isDirty || !isValid}
        />

        {loading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Cargando clima...</Text>
          </View>
        )}

        {weatherData && (
          <View style={styles.weatherContainer}>
            <Text style={styles.cityName}>
              {weatherData.name}, {weatherData.sys.country}
            </Text>
            <Text style={styles.temp}>
              {Math.round(weatherData.main.temp - 273.15)}°C
            </Text>
            <Text style={styles.description}>
              {weatherData.weather[0].description}
            </Text>
            <Text>Humedad: {weatherData.main.humidity}%</Text>
            <Text>Viento: {weatherData.wind.speed} m/s</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
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
  weatherContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    alignItems: 'center',
  },
  cityName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  temp: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  description: {
    fontSize: 18,
    fontStyle: 'italic',
  },
});
