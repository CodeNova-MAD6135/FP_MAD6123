import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getCurrentProjectDetails, getUserByID, updateProjectTask } from '../../data/Storage';

const TaskDetail = ({ route,navigation }) => {


  const {taskID, projectID, editable} = route.params;
  const [task, setTask] = useState(null)
  const [member,setMember] = useState(null)

  const [startTaskDate, setStartTaskDate] = useState(new Date());
  const [endTaskDate, setEndTaskDate] = useState(new Date());
  const [completionHours, setCompletionHours] = useState('');

  const [progress,setProgress] = useState(0);
  const [progressColor,setColor] = useState('');
  let status = 'In Progress';
  // if (status === 'Completed') {
  //   progress = 100;
  //   progressColor = '#4CAF50';
  // } else if (status === 'In Progress') {
  //   progress = 50;
  //   progressColor = '#5D5FDE';
  // }

  const loadProject = async() => {
    console.log('taskID:' +taskID+" and projectID:"+projectID)
    const project = await getCurrentProjectDetails(projectID)
    const currentTask = project.tasks.find((t) => t.taskId === taskID)
    console.log(currentTask)
    setTask(currentTask)

    if (currentTask.status === 'Completed') {
      setProgress(100) ;
      setColor('#4CAF50');
    } else if (currentTask.status === 'In Progress') {
      setProgress(50)
      setColor('#5D5FDE');
    }
    else{
      setProgress(0)
      setColor('#fff')
    }
    
    setStartTaskDate( (currentTask.startDate) ? new Date(currentTask.startDate) : new Date())
    setEndTaskDate( (currentTask.endDate) ? new Date(currentTask.endDate) : new Date())
    setCompletionHours(currentTask.completionHours || '')
    const user = await getUserByID(currentTask.assignedMember)
    console.log(user)
    setMember(user)
  }

  const updateTask = async() => {
    task.startDate = startTaskDate
    task.endDate = endTaskDate
    task.completionHours = completionHours
    const updated = await updateProjectTask(projectID,task)
    if(updated){
      Alert.alert("Success", "Task Updated", [{ text: 'Ok' }]);
      navigation.goBack();
    }
  }

  useEffect( () => {
    loadProject()
  },[])

  

  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        <LinearGradient
          colors={['#fff', progressColor]} // Add white gradient on both sides
          style={[styles.progressBar, { width: `${progress}%` }]}
        />
      </View>
      <View style={styles.taskWrap}>
        <Text style={styles.taskName}>{task?.taskName}</Text>
        <Text style={styles.taskDescription}>{task?.taskDescription}</Text>
        <View style={styles.contentWrap}>
          <Text style={styles.label}>Created Date:</Text><Text style={styles.value}>09/11/2023</Text>
        </View>
        <View style={styles.contentWrap}>
          <Text style={styles.label}>Assigned Member:</Text><Text style={styles.value}>{member?.name}</Text>
        </View>
        <View style={styles.memberTaskContent}>
          <View style={styles.contentWrap}>
            <Text style={styles.label}>Start Task Date:</Text>
              <DateTimePicker
              style={styles.datePicker}
                value={startTaskDate}
                mode="date"
                display="default"
                textColor="#964570"
                onChange={(event, date) => setStartTaskDate(date)}
              />
          </View>
          <View style={styles.contentWrap}>
            <Text style={styles.label}>End Task Date:</Text>
              <DateTimePicker
                style={styles.datePicker}
                value={endTaskDate}
                mode="date"
                display="default"
                onChange={(event, date) => setEndTaskDate(date)}
              />
          </View>
          <View style={styles.contentWrap}>
            <Text style={styles.label}>Completion Hours:</Text>
            <TextInput
              style={styles.input}
              value={completionHours}
              onChangeText={(text) => setCompletionHours(text)}
              keyboardType="numeric"
            />
          </View>
          { editable ? (
            <TouchableOpacity style={styles.addButton} onPress={updateTask}>
              <Text style={styles.buttonText}>Update Task</Text>
          </TouchableOpacity>
          ):(
            <TouchableOpacity>
              <Text></Text>
          </TouchableOpacity>
          )
          }
          
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 4,
  },
  taskWrap:{
    marginTop: 20,
    backgroundColor: '#f9f9f9',
    minHeight: 200,
    padding: 20
  },
  taskName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  taskDescription: {
    color: 'gray',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'justify',
  },
  contentWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  label: {
    fontWeight: 'bold',
    color: '#000'
  },
  value: {
    color: 'grey'
  },
  status: {
    fontSize: 12,
    color: 'grey',
    marginBottom: 10,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#ccc',
    borderRadius: 4,
    marginVertical: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  input: {
    height: 30,
    width: 80,
    borderColor: '#d7d7d7',
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 10,
  },
  datePicker: {
    marginRight: -12,
    transform: [{ scale: 0.8 }],
  },
  memberTaskContent: {
    marginTop: 10
  },
  addButton: {
    backgroundColor: '#5D5FDE',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 50,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TaskDetail;
