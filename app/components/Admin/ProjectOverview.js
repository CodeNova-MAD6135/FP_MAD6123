import React, { useState ,useEffect} from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import ProjectCard from './ProjectCard';
import { getCurrentUser, getMyProjectList } from '../../data/Storage';


const ProjectOverview = ({route}) => {

  const [userId,setUserId] = useState('');

  // Dummy project data for demonstration
  const [projects, setProjects] = useState([
    { id: 1, name: 'Project A', status: 'In Progress', progress: 70 },
    { id: 2, name: 'Project B', status: 'Completed', progress: 100 },
    // Add more project objects as needed
  ])

  const getUser = async() => {
    const user = await getCurrentUser()
    setUserId(user.id)
  }
  useEffect( () => {

    getUser()

    const loadProjects = async() => {
      const projects = await getMyProjectList(userId)
      console.log(projects)
      setProjects(projects)
    };

    loadProjects();
  },[userId])

  return (
    <View style={styles.container}>
      <FlatList
        data={projects}
        keyExtractor={(item,index) => index.toString()}
        renderItem={({ item }) => (
          <ProjectCard
            name={item.projectName}
            status={item.status}
            progress={item.progress}
          />
        )}
      />
    </View>
  )};

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      padding: 20
    }
  });

export default ProjectOverview;
