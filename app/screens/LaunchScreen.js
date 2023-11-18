import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  StatusBar,
  Dimensions,
} from 'react-native';
import colors from '../misc/colors';
import RoundBtn from '../components/RoundBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LaunchScreen = ({onFinish}) => {
    const [name, setName] = useState('');
    const handleOnChangeText = text => setName(text);

    const handleSubmit = async() =>{
        const user ={name:name};
        await AsyncStorage.setItem('user', JSON.stringify(user));
        if(onFinish) onFinish();
    }
  return (
    <>
    <StatusBar hidden />
    <View style={styles.container}>
        <Text style={styles.inputTitle}>Enter your Name</Text>
        <TextInput 
        value={name}
        onChangeText={handleOnChangeText}
        placeholder='Enter Name'
        style={styles.textInput}
         />
         {name.trim().length >= 3 ? // if user text value is greater than 3 then show arrow button otherwise show null
         (<RoundBtn antIconName='arrowright' onPress={handleSubmit} />)
         : null
         }
    </View>
    </>
  )
}

export default LaunchScreen
const width = Dimensions.get('window').width - 50;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      textInput: {
        borderWidth: 2,
        borderColor: colors.PRIMARY,
        color: colors.PRIMARY,
        width,
        height: 50,
        borderRadius: 10,
        paddingLeft: 15,
        fontSize: 25,
        marginBottom: 15,
      },
      inputTitle: {
        alignSelf: 'flex-start',
        paddingLeft: 25,
        marginBottom: 5,
        opacity: 0.5,
      },
})