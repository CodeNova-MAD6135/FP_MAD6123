import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { addNewProject } from '../../data/Storage';
import * as DocumentPicker from 'expo-document-picker';
import { FontAwesome5 } from '@expo/vector-icons';

const AddProject = ({ route,navigation }) => {
  const {userId} = route.params;
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [AttachedDocument, setAttachedDocument] = useState(null);

  const handleAddProject = async() => {
    // Handle adding the project (e.g., save to state or API)
    // You can implement this part as needed
    const project = {
      projectId: new Date().getTime(),
      adminId: userId,
      projectName: projectName,
      projectDescription: projectDescription,
      tasks: [],
      progress: 0,
      status: 'In Progress'
    }
    const added = await addNewProject(project)
    if(added){
      Alert.alert("Success", "New Project Created", [{ text: 'Ok' }]);
      navigation.goBack();
    }
  };

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
      if (result.assets[0]) {
        setAttachedDocument(result.assets[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
          <TextInput
              style={styles.input}
              placeholder="Project Name"
              value={projectName}
              onChangeText={text => setProjectName(text)}
          />
          <TextInput
              style={[styles.input, styles.inputArea]}
              multiline
              numberOfLines={4}
              placeholder="Project Description"
              value={projectDescription}
              onChangeText={text => setProjectDescription(text)}
          />
          <TouchableOpacity style={styles.attachButton} onPress={handlePickDocument}>
            {AttachedDocument ? (
              <Text>Attachment: {AttachedDocument.name}</Text>
            ) : (
              <View style={styles.plusIconWrapper}>
                <FontAwesome5 name='plus-circle' size={25} color='#5D5FDE' />
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.addButton} onPress={handleAddProject}>
              <Text style={styles.buttonText}>Add Project</Text>
          </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    position: 'relative'
  },
  input: {
    height: 40,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  inputArea: {
    height: 200,
  },
  addButton: {
    backgroundColor: '#5D5FDE',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 50,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  attachButton: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    paddingVertical: 40,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#5D5FDE',
    position: 'relative',
  },
});

export default AddProject;
