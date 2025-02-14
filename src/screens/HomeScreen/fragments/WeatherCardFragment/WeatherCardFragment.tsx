import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Animated,
  Easing,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {WeatherResponse} from '../../../../api/interface/weather.interface';
import {DownArrowIcon} from '../../../../assets/svg';

interface Props {
  data: WeatherResponse;
}

export const WeatherCardFragment = ({data}: Props) => {
  const temperature = Math.round(data.main.temp - 273.15);
  const feelsLike = Math.round(data.main.feels_like - 273.15);
  const weatherIconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();

  const getColorByTemperature = () => {
    if (temperature < 10) {
      return '#007AFF';
    } else if (temperature < 20) {
      return '#FF9500';
    } else {
      return '#FF3B30';
    }
  };

  const arrowAnim = useRef(new Animated.Value(0)).current;
  const arrowOpacity = useRef(new Animated.Value(1)).current;
  const [showArrow, setShowArrow] = useState(true);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(arrowAnim, {
          toValue: 10,
          duration: 800,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(arrowAnim, {
          toValue: 0,
          duration: 800,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [arrowAnim]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;

    if (offsetY > 20 && showArrow) {
      setShowArrow(false);
      Animated.timing(arrowOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else if (offsetY <= 20 && !showArrow) {
      setShowArrow(true);
      Animated.timing(arrowOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View style={styles.card}>
      <ScrollView
        testID="weather-scrollview"
        showsVerticalScrollIndicator={false}
        style={styles.scroll}
        onScroll={handleScroll}
        scrollEventThrottle={16}>
        <View style={styles.container}>
          <Text style={styles.city}>
            {data.name}, {data.sys?.country ?? 'Desconocido'}
          </Text>
          <Image source={{uri: weatherIconUrl}} style={styles.weatherIcon} />
          <Text style={[styles.temperature, {color: getColorByTemperature()}]}>
            {temperature}°C
          </Text>
          <Text style={styles.description}>{data.weather[0].description}</Text>

          <View style={styles.infoContainer}>
            {[
              ['Sensación térmica:', `${feelsLike}°C`],
              ['Humedad:', `${data.main.humidity}%`],
              ['Viento:', `${data.wind.speed} m/s`],
              ['Presión:', `${data.main.pressure} hPa`],
              ['Nubosidad:', `${data.clouds.all}%`],
              ['Atardecer:', sunset],
            ].map(([label, value], index) => (
              <View key={index} style={styles.row}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.value}>{value}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <Animated.View
        testID="down-arrow"
        style={[
          styles.arrowContainer,
          {
            transform: [{translateY: arrowAnim}, {translateX: -10}],
            opacity: arrowOpacity,
          },
        ]}>
        <DownArrowIcon width={30} height={30} color="#777" />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    flex: 1,
  },
  scroll: {
    flex: 1,
    padding: 16,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  city: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  weatherIcon: {
    width: 140,
    height: 140,
  },
  temperature: {
    fontSize: 50,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  description: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#555',
    marginBottom: 10,
  },
  infoContainer: {
    marginTop: 10,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 8,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#444',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  arrowContainer: {
    position: 'absolute',
    bottom: 10,
    left: '50%',
  },
});
