import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from './Styles'; 
import SizedBox from './SizedBox';
import { Controller, useForm } from '../node_modules/react-hook-form';

import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../assets/Colors';
import Strings from '../assets/Strings';

import Storage, { getUser, loginUser, setCurrentUser, getCurrentUser } from '../data/Storage';

// import {
//   findUserByEmailAndPassword
// } from '../Realm';

const LoginScreen = ({navigation}) => {

  // const { show } = useToast

  const getUser = async() => {
    const user = await getCurrentUser()
    if(user != null){
      navigation.navigate('TabNavigator', { screen: 'ProjectOverview'});
    }
  }
  getUser()

  const handleSignUpBtnPress = () => {
      navigation.navigate(Strings.navRegister);
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isPasswordVisible, setPasswordVisibility] = useState(true);
  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  const validateEmail = (email) => {
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = validateForm();
    if(errors.length !== 0){
      Alert.alert("Alert", errors[0], [{ text: 'Ok' }]);
      return
    }

    const response = await loginUser(email,password);
    if(response.status){
      await setCurrentUser(response.data)
      navigation.navigate('TabNavigator', { screen: 'ProjectOverview'});
    }
    else{
      Alert.alert("User not found", 'Credentials doesn\'t match.', [{ text: 'Ok' }]);
    }
    setEmail('')
    setPassword('')

    // const user = findUserByEmailAndPassword(email,password)
    // console.log(`Email: ${user}`)
    // if(user === undefined){
    //   Alert.alert('User not found', errors.join('\n'), [{ text: 'Ok' }]);
    // }
    // else{
    //   navigation.navigate('TabNavigator', { screen: 'ProjectOverview' });
    // }
  
    // if (errors.length === 0) {
    //   console.log(`Email: ${email}, Password: ${password}`);
    // } else {
    //   Alert.alert('Error', errors.join('\n'), [{ text: 'Ok' }]);

    // }
    // setEmail('');
    // setPassword('');
  };
  

  const validateForm = () => {
    const errors = [];
  
    if (!validateEmail(email)) {
      errors.push(Strings.errorInvalidEmail);
    }
  
    if (!password) {
      errors.push(Strings.errorInvalidPassword);
    }
  
    return errors;
  };
  
  

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeAreaView}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.content}
        >
          <Text style={styles.title}>{Strings.loginTitle}</Text>

          <SizedBox height={8} />

          <Text style={styles.subtitle}>{Strings.loginSubTitle}</Text>

          <SizedBox height={32} />

          <Pressable>
            <View style={styles.form}>

              <TextInput
                autoCapitalize="none"
                autoCompleteType="email"
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="next"
                style={styles.textInput}
                textContentType="username"
                value={email}
                placeholder={Strings.hintEmail}
                onChangeText={(text) => setEmail(text)}
                placeholderTextColor={Colors.hintColor}
              />

            </View>
          </Pressable>

          <SizedBox height={16} />

          <Pressable>
            <View style={styles.form}>

              <TextInput
                autoCapitalize="none"
                autoCompleteType="password"
                autoCorrect={false}
                returnKeyType="done"
                secureTextEntry={isPasswordVisible}
                style={styles.textInput}
                textContentType="password"
                value={password}
                placeholder={Strings.hintPassword}
                placeholderTextColor={Colors.hintColor}
                onChangeText={(text) => setPassword(text)}
              />

              <TouchableOpacity onPress={togglePasswordVisibility}>
                <Icon
                  name={isPasswordVisible ? 'eye-slash' : 'eye'}
                  size={20}
                  color={Colors.iconTintColor}
                />
              </TouchableOpacity>
              
            </View>
          </Pressable>

          <SizedBox height={16} />

          <View style={styles.extraContentContainer}>
            <Text style={styles.textButton}>{Strings.btnSingupPretext} <Text style={styles.signupbtn} onPress={handleSignUpBtnPress}>{Strings.btnSignUp}</Text> </Text>
          </View>

          <SizedBox height={16} />

          <TouchableOpacity onPress={handleSubmit}>
            <View style={styles.button}>
              <Text style={styles.buttonTitle}>{Strings.btnContinue}</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default LoginScreen;
