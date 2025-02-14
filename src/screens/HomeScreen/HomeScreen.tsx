import {SafeAreaView, StyleSheet, ActivityIndicator} from 'react-native';
import React from 'react';
import {TextInputAnimated} from '../../components';
import {useActions} from './useActions';
import {View} from 'react-native-ui-lib';
import {Button} from '../../components/Button';
import {WeatherCardFragment} from './fragments';
import {Text} from '@react-native-material/core';

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

  return (
    <SafeAreaView style={styles.container}>
      <View flex padding-16>
        <Text style={styles.text}>¿De qué ciudad quieres saber el clima?</Text>

        <TextInputAnimated
          name="city"
          label="Escribe el nombre de la ciudad"
          control={control}
          autoCapitalize="none"
          error={!!errors.city}
          helperTextError={errors?.city?.message}
        />

        <Button
          label="Buscar"
          onPress={fetchData}
          fullWidth
          disabled={!isDirty || !isValid || loading}
          style={styles.button}
        />

        {loading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="small" color="#007AFF" />
            <Text style={styles.loadingText}>Cargando clima...</Text>
          </View>
        )}

        {showError && <Text style={styles.errorText}>{erroMessage}</Text>}

        {showWeather && <WeatherCardFragment data={weatherData} />}
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
});

export default HomeScreen;
