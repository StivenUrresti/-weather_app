import {Text, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import {TextInputAnimated} from '../../components';
import {useActions} from './useActions';
import {View} from 'react-native-ui-lib';
import {Button} from '../../components/Button';

export const HomeScreen = () => {
  const {control, errors} = useActions();
  return (
    <SafeAreaView style={styles.container}>
      <View flex padding-16>
        <Text style={styles.text}>HomeScreen</Text>
        <TextInputAnimated
          name="username"
          label="city"
          control={control}
          autoCapitalize="none"
          error={!!errors.city}
          helperTextError={errors?.city?.message}
        />
        <Button
          label="Submit"
          onPress={() => console.log('Submit')}
          fullWidth
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
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
