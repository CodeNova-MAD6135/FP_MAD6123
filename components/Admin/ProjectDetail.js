import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { BarChart } from 'react-native-chart-kit';
import { deleteProjectTask, getCurrentProjectDetails } from '../../data/Storage';
import { useFocusEffect } from '@react-navigation/native';

const ProjectDetail = ({ route, navigation }) => {
  const { projectId, projectName, projectDescription } = route.params;
  

  const [searchQuery, setSearchQuery] = useState('');
  const [tasks, setTasks] = useState([
    { taskId: 1, taskName: 'Task 1', taskDescription: 'Description for Task 1', status: 'In Progress', created_at: '02/11/23' },
    { taskId: 2, taskName: 'Task 2', taskDescription: 'Description for Task 2', status: 'Completed', created_at: '02/11/23' }
    // Add more tasks as needed
  ]);

  const countTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status).length;
  };
  const filteredTasks= tasks.filter(task => 
    task.taskName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.taskDescription.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const deleteTaskItem = async(projectId, taskId) => {
    const response = await deleteProjectTask(projectId,taskId)
    if(response.status){
      Alert.alert("Success", response.msg, [{ text: 'Ok' }]);
      setTasks(response.data)
    }
  }

  let newTasksCount = countTasksByStatus('Pending');
  let inProgressTasksCount = countTasksByStatus('In Progress');
  let completedTasksCount = countTasksByStatus('Completed');

  const loadTasks = async() => {
    const data = await getCurrentProjectDetails(projectId)
    if(data !== null){
      setTasks(data.tasks)
    }
    newTasksCount = countTasksByStatus('Pending');
    inProgressTasksCount = countTasksByStatus('In Progress');
    completedTasksCount = countTasksByStatus('Completed');
  }

  useEffect( () => {
    loadTasks();
  },[searchQuery])

  useFocusEffect(
    React.useCallback(() => {
      loadTasks();
    }, [])
  );

  // const newTasksCount = countTasksByStatus('New');
  
  const handleAddTask = () => {
    // Navigate to AddTask screen with projectId as a parameter
    navigation.navigate('AddTask', { projectId: projectId });
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
      <View style={styles.projectWrap}>
        <Text style={styles.projectName}>{projectName}</Text>
        <Text style={styles.projectDescription}>{projectDescription}</Text>
        <Text style={styles.createdAt}>Created On: 09/11/2023</Text>
      </View>
      <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>Task(s) Overview</Text>
        <BarChart
          data={{
            labels: ['New', 'In Progress', 'Completed'],
            datasets: [
              {
                data: [newTasksCount, inProgressTasksCount, completedTasksCount]
              }
            ]
          }}
          width={300}
          height={220}
          yAxisLabel={'#'}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForBackgroundLines: {
              stroke: '#f0e6f6', // Lavender color
            },
          }}
        />
      </View>
      <TouchableOpacity style={styles.viewAllTasks} onPress={() => navigation.navigate('TaskOverview', {projectId: projectId}) }>
        <Text style={styles.viewText}>View All Tasks</Text>
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
    marginTop: 20,
    backgroundColor: '#f9f9f9',
    minHeight: 200,
    padding: 20
  },
  projectName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  projectDescription: {
    color: 'gray',
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'justify'
  },
  createdAt: {
    fontSize: 10,
    position: 'absolute',
    right: 5,
    bottom: 5,
    color: 'grey'
  },
  chartContainer:{
    marginTop: 40,
    display: 'flex',
    alignItems: 'center'
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  viewAllTasks: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20, // Adjust the marginTop as needed
  },
  viewText: {
    fontSize: 16,
    color: '#5D5FDE', // Adjust the color as needed
    fontWeight: 'bold',
  }

});

export default ProjectDetail;
