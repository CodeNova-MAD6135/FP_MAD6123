import React, { useState ,useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TaskCard from '../Common/TaskCard';
import { getCurrentProjectDetails } from '../../data/Storage';
import { useFocusEffect } from '@react-navigation/native';

const NewTasks = ({ route, navigation }) => {

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

  const loadTasks = async() => {
    const data = await getCurrentProjectDetails(projectId)
    if(data !== null){
      setTasks(data.tasks.filter((t) => t.status === 'New'))
    }
  }

  useEffect( () => {
    loadTasks();
  },[searchQuery])

  useFocusEffect(
    React.useCallback(() => {
      // Load or refresh data here
      loadTasks();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.listWrap}>
        <View style={styles.searchBox}>
            <TextInput
            style={styles.searchInput}
            placeholder="Search New Tasks"
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
            />
            <Ionicons 
                name="search-outline" 
                size={24} 
                color="#d3d3d3" 
                style={styles.searchIcon} 
            />
        </View>
        <FlatList
            data={filteredTasks}
            keyExtractor={(item) => item.taskId.toString()}
            renderItem={({ item }) => <TaskCard task={item} projectID={projectId} navigation={navigation} />}
            style={styles.taskList}
        />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  listWrap: {
    marginTop: 20,
    padding: 10,
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
    alignItems: 'flex-end',
    justifyContent:'space-between',
    width: '90%'
  },
  taskDate: {
    color: 'grey',
    fontSize: 12
  }
});

export default NewTasks;
