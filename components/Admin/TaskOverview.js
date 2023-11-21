import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import NewTasks from './NewTasks';
import InProgressTasks from './InProgressTasks';
import CompletedTasks from './CompletedTasks';

const Tab = createMaterialTopTabNavigator();

const TaskOverview = ({ route, navigation }) => {
  const { projectId } = route.params;
  

  const [searchQuery, setSearchQuery] = useState('');
  const [tasks, setTasks] = useState([
    { taskId: 1, taskName: 'Task 1', taskDescription: 'Description for Task 1', taskStatus: 'In Progress', created_at: '02/11/23' },
    { taskId: 2, taskName: 'Task 2', taskDescription: 'Description for Task 2', taskStatus: 'Completed', created_at: '02/11/23' }
    // Add more tasks as needed
  ]);

  const filteredTasks= tasks.filter(task => 
    task.taskName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.taskDescription.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddTask = () => {
    // Navigate to AddTask screen with projectId as a parameter
    navigation.navigate('AddTask', { projectId });
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <View style={styles.leftCol}>
        <Ionicons name='folder-open-outline' size={24} color={'#d7d7d7'} />
      </View>
      <View style={styles.rightCol}>
        <View style={styles.rcFirst}>
        <Text style={styles.taskName}>{item.taskName}</Text>
        <Text style={styles.taskDescription}>{item.taskDescription}</Text>
        </View>
        <View style={styles.rcLast}>
        <Text style={styles.taskStatus}>{item.taskStatus}</Text>
        <Text style={styles.taskDate}>{item.created_at}</Text>
        </View>
        
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Tab.Navigator 
      screenOptions={({ route }) => ({
        tabBarLabelStyle: { fontWeight: 'bold' },
        tabBarIndicatorStyle: {backgroundColor: '#5D5FDE'}
      })}>
        <Tab.Screen name="New" component={NewTasks} initialParams={{ projectId }}/>
        <Tab.Screen name="In Progress" component={InProgressTasks} initialParams={{ projectId }}/>
        <Tab.Screen name="Completed" component={CompletedTasks} initialParams={{ projectId }}/>
      </Tab.Navigator>

      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <Feather name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 4,
  },
  projectWrap:{
    display: 'flex',
    alignItems: 'center',
  },
  projectName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  projectDescription: {
    color: 'gray',
    fontSize: 14,
    marginBottom: 20,
  },
  listWrap: {
    marginTop: 20,
    padding: 10,
  },
  taskTitleWrap:{
    borderBottomWidth: 1,
    borderBottomColor: '#c7c7c7',
    marginBottom: 10
  },
  taskTitle:{
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  taskItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 5,
    width: '100%'
    
  },
  taskName: {
    fontWeight: 'bold',
  },
  taskDescription: {
    color: 'gray',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#5D5FDE',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  searchInput: {
    height: 40,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 8
  },
  searchIcon: {
    position: 'absolute',
    top: 8,
    right: 5
  },
  leftCol: {
   marginRight: 10
  },
  rightCol: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
    width: '90%'
  }
});

export default TaskOverview;
