// EditUser.js

import React, { useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const EditUser = ({ route, navigation }) => {
  const { user } = route.params;
  const [rate, setRate] = useState(user.rate.toString());
  const handleSave = async() => {
    console.log(`Save user with ID ${user.id}, new rate: ${rate}`);
    
    navigation.goBack(); // Navigate back to UserManagement after saving
  };

  return (
    <View style={styles.container}>
        <View style={styles.userInfoContainer}>
            <View style={styles.infoWrap}>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.userInfo}> {user.name}</Text>
            </View>
            <View style={styles.infoWrap}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.userInfo}> {user.email}</Text>
            </View>
            <View style={styles.infoWrap}>
                <Text style={styles.label}>Rate:</Text>
                <TextInput
                    style={[styles.userInfo, styles.input]}
                    value={rate}
                    onChangeText={text => setRate(text)}
                    keyboardType="numeric"
                />
            </View>
            <TouchableOpacity style={styles.addButton} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  userInfoContainer: {
    backgroundColor: 'white',
    padding: 30,
  },
  infoWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  userInfo: {
    fontSize: 16,
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    color: '#333',
    fontWeight: 'bold', // Make the label text bold
  },
  input: {
    height: 40,
    width: 100,
    padding: 10,
    borderColor: '#f3f3f3',
    borderWidth: 1,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#5D5FDE',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EditUser;
