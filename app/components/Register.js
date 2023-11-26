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
import RNPickerSelect from 'react-native-picker-select';
import { styles } from './Styles'; 
import SizedBox from './SizedBox';
import { Controller, useForm } from '../node_modules/react-hook-form';

import Strings from '../assets/Strings';
import Colors from '../assets/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { addUser } from '../data/Storage';


const RegisterScreen = ({navigation}) => {
  const handleSignInBtnPress = () => {
      navigation.navigate(Strings.navLogin);
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');

  const [isPasswordVisible, setPasswordVisibility] = useState(true);
  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };
  const [isConfirmPasswordVisible, setConfirmPasswordVisibility] = useState(true);
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisibility(!isConfirmPasswordVisible);
  };

  const validateEmail = (email) => {
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const errors = validateForm();
  
    if (errors.length === 0) {
      // Add your login logic here
      console.log(`Email: ${email}, Password: ${password}`);

      const response = await addUser(name,email,password,role)
      if(response.status){
        Alert.alert("Success", response.msg, [{ text: 'Ok' }]);
        navigation.navigate('Login');
      }
      else{
        Alert.alert("Failure", response.msg, [{ text: 'Ok' }]);
      }

    } 
    else {
      Alert.alert('Error', errors.join('\n'), [{ text: 'Ok' }]);
      return
    }
    
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setRole('');
  };
  

  const validateForm = () => {
    const errors = [];

    if (!name) {
        errors.push(Strings.errorInvalidName);
      }
  
    if (!validateEmail(email)) {
      errors.push(Strings.errorInvalidEmail);
    }
  
    if (!password) {
      errors.push(Strings.errorInvalidPassword);
    }

    if (password !== confirmPassword) {
        errors.push('Passwords do not match');
        return;
    }

    if (!role) {
        errors.push(Strings.errorRoleEmpty);
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
          <Text style={styles.title}>{Strings.signupTitle}</Text>

          <SizedBox height={32} />

          <Pressable>
            <View style={styles.form}>
              <TextInput
                autoCapitalize="none"
                autoCompleteType="name"
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="next"
                style={styles.textInput}
                textContentType="name"
                value={name}
                placeholder={Strings.hintName}
                placeholderTextColor={Colors.hintColor}
                onChangeText={(text) => setName(text)}
              />
            </View>
          </Pressable>

          <SizedBox height={16} />

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
                placeholderTextColor={Colors.hintColor}
                onChangeText={(text) => setEmail(text)}
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

          <Pressable>
            <View style={styles.form}>
              <TextInput
                autoCapitalize="none"
                autoCompleteType="password"
                autoCorrect={false}
                secureTextEntry={isConfirmPasswordVisible}
                returnKeyType="done"
                style={styles.textInput}
                textContentType="password"
                value={confirmPassword}
                placeholder={Strings.hintConfirmPassword}
                placeholderTextColor={Colors.hintColor}
                onChangeText={(text) => setConfirmPassword(text)}
              />

              <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
                <Icon
                  name={isConfirmPasswordVisible ? 'eye-slash' : 'eye'}
                  size={20}
                  color={Colors.iconTintColor}
                />
              </TouchableOpacity>
            </View>
          </Pressable>

          <SizedBox height={16} />
          <View style={styles.form}>
          <Text style={styles.label}>User Type</Text>
            <View style={styles.selectContainer}>
              <RNPickerSelect
                placeholder = { {label: Strings.hintChooseRole, value: null}}
                onValueChange={(value) => setRole(value)}
                items={[
                  { label: 'Member', value: 'member' },
                  { label: 'Admin', value: 'admin' },
                ]}
                style={{
                  inputAndroid: {
                    color: 'rgba(235, 235, 245, 0.6)',
                    fontSize: 15,
                    fontWeight: '400',
                    lineHeight: 20,
                  },
                  inputIOS: {
                    color: 'rgba(235, 235, 245, 0.6)',
                    fontSize: 15,
                    fontWeight: '400',
                    lineHeight: 20,
                  },
                }}
              />
            </View>
         </View>

          <SizedBox height={32} />

          <TouchableOpacity onPress={handleSubmit}>
            <View style={styles.button}>
              <Text style={styles.buttonTitle}>{Strings.btnSignUp}</Text>
            </View>
          </TouchableOpacity>

          <SizedBox height={16} />

          <View style={styles.extraContentContainer}>
            <Text style={styles.textButton}>{Strings.btnLoginPretext} <Text style={styles.signupbtn} onPress={handleSignInBtnPress}>{Strings.btnLogin}</Text> </Text>
          </View>

        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default RegisterScreen;
