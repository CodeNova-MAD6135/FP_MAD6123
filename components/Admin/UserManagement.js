import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, Alert, TextInput, TouchableWithoutFeedback } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';
import { getUserList } from '../../data/Storage';
import { getUserListOfType } from '../../data/Storage';
import { useFocusEffect } from '@react-navigation/native';

const UserManagement = ({ navigation }) => {

  const [searchQuery, setSearchQuery] = useState('');
  const openedRow = useRef();

  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', rate: 4.5 },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', rate: 3.8 },
  ]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLongPress = (user) => {
    // Display a menu or options for edit and delete
    Alert.alert(
      'Options',
      'Choose an action',
      [
        {
          text: 'Edit',
          onPress: () => {
            // Navigate or perform edit action
            navigation.navigate('EditUser', { user });
          },
        },
        {
          text: 'Delete',
          onPress: () => handleDelete(user),
          style: 'destructive',
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  const loadUsers = async() => {
    const data = await getUserListOfType('member')
    setUsers(data);
  }

  useEffect( () => {
    loadUsers();
  },[searchQuery])

  useFocusEffect(
    React.useCallback(() => {
      loadUsers();
    }, [])
  );

  const handleDelete = (user) => {
    Alert.alert(
      'Confirm Deletion',
      `Are you sure you want to remove ${user.name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => setUsers(users.filter(u => u.id !== user.id)),
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item }) => (
    <TouchableWithoutFeedback
      onLongPress={() => handleLongPress(item)}
    >
      <View style={styles.userItem}>
        <View style={styles.leftContent}>
          <Image
            source={require('../../assets/user.png')} // Path to your user image
            style={styles.profileImage}
          />
        </View>
        <View style={styles.rightContent}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.info}>Email: {item.email}</Text>
          <Text style={styles.info}>Rate: {item.rate}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Users"
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      <Ionicons
        name="search-outline"
        size={24}
        color="#d3d3d3"
        style={styles.searchIcon}
      />
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  userSwipeItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editBtn: {
    backgroundColor: '#007BFF',
    padding: 20,
  },
  deleteBtn: {
    backgroundColor: '#FF4500',
    padding: 20,
  },
  btnText:{
    color: 'white',
    fontWeight: 'bold'
  },
  userItem: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f3f3'
  },
  leftContent: {
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  rightContent: {
    flex: 1,
    paddingTop: 10
  },
  name: {
    fontWeight: 'bold',
    color: 'gray',
  },
  info: {
    color: 'gray',
  },
  actions: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'flex-end'
  },
  searchInput: {
    height: 40,
    backgroundColor: '#f5f5f5',
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 8
  },
  searchIcon: {
    position: 'absolute',
    top: 22,
    right: 20
  },
});

export default UserManagement;
