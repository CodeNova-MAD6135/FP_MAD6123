import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { deleteProject, getMyProjectList, getProjectList, getCurrentUser } from '../../data/Storage';
import { useFocusEffect } from '@react-navigation/native';

const TaskManagement = ({ navigation }) => {

  // const {userId} = route.params;
  const [userId,setUserId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [projects, setProjects] = useState([]);

  const getUser = async() => {
    const user = await getCurrentUser()
    setUserId(user.id)
  }

  const loadProjects = async() => {
    const projects = await getMyProjectList(userId)
    console.log(projects)
    setProjects(projects)
  };

  useEffect( () => {
    getUser();
    loadProjects();
  },[userId,searchQuery])

  // useFocusEffect(
  //   React.useCallback(() => {
  //     getUser();
  //     loadProjects();
  //   }, [])
  // );

  const filteredProjects = projects.filter( (project) => 
    project?.projectName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project?.projectDescription?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const deleteItem = async(id) => {
    const response = await deleteProject(id)
    if(response.status){
      Alert.alert("Success", "Project Deleted", [{ text: 'Ok' }]);
      setProjects(response.data)
    }
  }

  const handleDelete = (projectItem) => {
    Alert.alert(
      'Confirm Deletion',
      `Are you sure you want to remove ${projectItem.projectName}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            // setProjects(projects.filter( (project) => project.projectId !== projectItem.projectId))
            deleteItem(projectItem.projectId)
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const handleProjectPress = (projectItem) => {
    navigation.navigate('ProjectDetail', 
    { 
      userId: userId,
      projectId: projectItem.projectId,
      projectName: projectItem.projectName,
      projectDescription: projectItem.projectDescription
    });
  };

  const groupedProjects = [];
  for (let i = 0; i < filteredProjects.length; i += 2) {
    if (i + 1 < filteredProjects.length) {
      groupedProjects.push([filteredProjects[i], filteredProjects[i + 1]]);
    } else {
      groupedProjects.push([filteredProjects[i]]);
    }
  }

  const renderItem = ({ item }) => (
    <View style={styles.rowContainer}>
      {item.map(project => (
          <View key={project.projectId} style={styles.folderContainer} >
            <View style={styles.backCard}></View>
            <View style={styles.frontCard}>
            <TouchableOpacity onPress={() => handleProjectPress(project)}>
              <Text style={styles.label}>{project.projectName}</Text>
              </TouchableOpacity>
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => handleDelete(project)}>
                  <Ionicons name="trash" size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>
        </View>
      ))}
    </View>
    
  );

  return (
    
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Projects"
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
        data={groupedProjects}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
       <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddProject',{userId:userId})}>
        <Feather name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  rightContent: {
    flex: 1,
    paddingTop: 10
  },
  projectName: {
    fontWeight: 'bold',
    color: 'gray',
  },
  projectDescription: {
    color: 'gray',
  },
  info: {
    color: 'gray',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 5
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
    top: 20,
    right: 20
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  folderContainer: {
    width: '48%',
    height: 120,
    flexDirection: 'row',
    position: 'relative'
  },
  backCard: {
    width: '50%',
    height: '100%',
    backgroundColor: '#4A4CC3',
    borderRadius: 5,
    position: 'absolute'
  },
  frontCard: {
    height: '90%',
    width: '90%',
    backgroundColor: '#5D5FDE',
    borderRadius: 8,
    borderTopLeftRadius: 0,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'flex-end',
  },
  label: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    paddingBottom: 10,
    color: '#FFF',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#5D5FDE',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },

  
});

export default TaskManagement;
