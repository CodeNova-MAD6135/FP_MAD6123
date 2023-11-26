// TaskCard.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Alert, } from 'react-native';

const TaskCard = ({ projectID,task, navigation }) => {
  const handleLongPress = () => {
    // Display a menu or options for edit and delete
    Alert.alert(
      'Options',
      'Choose an action',
      [
        {
          text: 'Edit',
          onPress: () => {
            // Navigate or perform edit action
            navigation.navigate('TaskDetail', { taskID: task.taskId, projectID: projectID,editable: true });
          },
        },
        {
          text: 'Delete',
          onPress: () => handleDelete(),
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

  const handleRegularPress = () => {
    // Handle regular tap
    navigation.navigate('TaskDetail',{ taskID: task.taskId, projectID: projectID, editable:false });
  };

  const handleDelete = () => {
    Alert.alert(
      'Confirm Deletion',
      `Are you sure you want to remove this task?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          // onPress: () => ,
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  return (
      <TouchableWithoutFeedback onLongPress={handleLongPress} onPress={handleRegularPress}>
        <View style={styles.taskItem}>
          <View style={styles.rightCol}>
            <View style={styles.rcFirst}>
              <Text style={styles.taskName}>{task.taskName}</Text>
              <Text style={styles.taskDescription}>{task.taskDescription}</Text>
            </View>
            <View style={styles.rcLast}>
              <Text style={styles.taskDate}>{task.created_at}</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  taskItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#f3f3f3',
  },
  taskName: {
    fontWeight: 'bold',
  },
  taskDescription: {
    color: 'gray',
  },
  rightCol: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%'
  },
  taskDate: {
    color: 'grey',
    fontSize: 12
  }
});

export default TaskCard;
