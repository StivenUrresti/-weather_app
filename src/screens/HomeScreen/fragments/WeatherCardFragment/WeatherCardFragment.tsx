import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {WeatherResponse} from '../../../../api/interface/weather.interface';

interface Props {
  data: WeatherResponse;
}

export const WeatherCardFragment = ({data}: Props) => {
  const temperature = Math.round(data.main.temp - 273.15);
  const weatherIconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  return (
    <View style={styles.card}>
      <Text style={styles.city}>
        {data.name}, {data.sys.country}
      </Text>
      <Image source={{uri: weatherIconUrl}} style={styles.weatherIcon} />
      <Text style={styles.temperature}>{temperature}°C</Text>
      <Text style={styles.description}>{data.weather[0].description}</Text>
      <View style={styles.extraInfo}>
        <Text style={styles.infoText}>Humedad: {data.main.humidity}%</Text>
        <Text style={styles.infoText}>Viento: {data.wind.speed} m/s</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  city: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  weatherIcon: {
    width: 80,
    height: 80,
  },
  temperature: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#007AFF',
    marginVertical: 5,
  },
  description: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#555',
  },
  extraInfo: {
    marginTop: 10,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#444',
  },
});

export default WeatherCardFragment;
