import AsyncStorage from '@react-native-async-storage/async-storage';

const clearAllData = async () => {
  try {
    await AsyncStorage.clear();
    console.log('AsyncStorage data cleared successfully.');
  } catch (error) {
    console.error('Error clearing AsyncStorage data:', error);
  }
};

//clearAllData();

const USER_DATA = "USER"
const PROJECT_DATA = "PROJECT"

import axios from 'axios';

export const setCurrentUser = async(user) => {
    try{
        await AsyncStorage.setItem('current_user',JSON.stringify(user))
        return true
    }
    catch(error){
        return false
    }  
}

export const getCurrentUser = async() => {
    try{
        const data = await AsyncStorage.getItem('current_user');
        if(data){
            return JSON.parse(data);
        }
        return null
    }
    catch(error){
        return null
    }
}

export const logoutUser = async() => {
    try{
        await AsyncStorage.removeItem('current_user')
        return true
    }
    catch(error){
        return false
    }
}


export const getUserList = async (type) => {
    try {
      const response = await axios.get('http://localhost:8090/users/');
      const users = response.data;

      return users;
    } catch (error) {
      console.error('Error fetching user list:', error);
      return [];
    }
  };


export const getUserListOfType = async (type) => {
    try {
      const response = await axios.get('http://localhost:8090/users/');
      const users = response.data;
  
      // Filter users based on the specified type
      const filteredUsers = users.filter((u) => u.role === type) || [];
      return filteredUsers;
    } catch (error) {
      console.error('Error fetching user list:', error);
      return [];
    }
  };

export const getUserByID = async(id) => {
    try{
        const response = await axios.get(`http://localhost:8090/users/${id}`);
        const user = response.data;
        return user;
    }
    catch(error){
        return null
    }
}


export const loginUser = async(email,pwd) => {
    try{
        const data = await getUserList()
        console.log(data)
        const myUser = data.find( (item) => item.email === email && item.pwd === pwd)
        if(myUser){
            return {
                status: true,
                data: myUser,
                msg: "Welcome!" 
            }
        }
        return {
            status: false,
            data: null,
            msg: "No User Found."
        }
    }
    catch(error){
        return {
            status: false,
            data: null,
            msg: "Error"+error.msg
        };
    }
};

export const addUser = async (name, email, pwd, role) => {
    try {
      const response = await axios.post('http://localhost:8090/users/add', {
        name,
        email,
        pwd,
        role,
      });
      return {
        status: true,
        data: response.data,
        msg: "Successfully registered."
        }

    } catch (error) {
      console.error('Error adding user:', error);
      return {
        status: false,
        data: null,
        msg: 'Internal Server Error',
      };
    }
  };

  export const updateUser = async (id, updatedUserData) => {
    try {
      const response = await axios.patch(`http://localhost:8090/users/${id}`, updatedUserData);
      return {
        status: true,
        data: response.data,
        msg: 'User updated successfully.',
      };
    } catch (error) {
      console.error('Error updating user:', error);
      return {
        status: false,
        data: null,
        msg: 'Internal Server Error',
      };
    }
  };

export const getProjectList = async() => {
    try{
        const data = await AsyncStorage.getItem(PROJECT_DATA)
        if(data){
            return JSON.parse(data)
        }
        return []
    }
    catch(error){
        return []
    }
}

export const getCurrentProjectDetails = async(projectID) => {
    try{
        const data = await getProjectList()
        const project = data.find( item => item.projectId === projectID)
        return project
    }
    catch(error){
        return null
    }
}

export const getMyProjectList = async (userID) => {
    try {
      const response = await axios.get(`http://localhost:8090/projects/`);
  
      if (response.status === 200) {
        const projects = response.data;
        const myProjects = projects.filter((item) => {
          const isAdmin = item.adminId === userID;
          const hasAssignedTasks = item.tasks && item.tasks.some((task) => task.assignedMember === userID);
          return isAdmin || hasAssignedTasks;
        });
  
        return myProjects || [];
      } else {
        console.error('Error fetching projects:', response.statusText);
        return [];
      }
    } catch (error) {
      console.error('Error fetching projects:', error.message);
      return [];
    }
  };

export const addNewProject = async (project) => {
    try {
      const response = await axios.post('http://localhost:8090/projects/add', project);
  
      return {
        status: true,
        data: response.data,
        msg: 'Project added successfully.',
      };
    } catch (error) {
      console.error('Error adding project:', error);
  
      return {
        status: false,
        data: null,
        msg: 'Internal Server Error',
      };
    }
  };

  export const deleteProject = async (projectID) => {
    try {
      await axios.delete(`http://localhost:8090/projects/${projectID}`);
      const projects = await getProjectList();
  
      return {
        status: true,
        data: projects,
      };
    } catch (error) {
      return {
        status: false,
        data: [],
      };
    }
  };

  export const addProjectTask = async (projectID, task) => {
    try {
      // Make a POST request to the server endpoint
      const response = await axios.post(`http://localhost:8090/projects/${projectID}/tasks`, { task });

      const updatedProject = response.data;
  
      return true;
    } catch (error) {
      console.error('Error adding project task:', error);
      return false;
    }
  };

export const updateProjectTask = async(projectID, task) => {
    try{
        let projects = await getProjectList()
        let myProject = projects.find((p) => p.projectId === projectID)
        let currentTask = myProject.tasks.find( (t) => t.taskId === task.taskId)
        currentTask.startDate = task.startDate
        currentTask.endDate = task.endDate
        currentTask.completionHours = task.completionHours
        if(task.startDate){
            currentTask.status = 'In Progress'
        }
        if(task.completionHours){
            currentTask.status = 'Completed'
        }
        await AsyncStorage.setItem(PROJECT_DATA,JSON.stringify(projects))
        return true
    }
    catch(error){
        return false
    }
}

export const deleteProjectTask= async(projectID,taskID) => {
    try{
        let projects = await getProjectList()
        let myProject = projects.find(project => project.projectId === projectID)
        myProject.tasks.filter( task => task.id !== taskID)
        await AsyncStorage.setItem(PROJECT_DATA,JSON.stringify(projects))
        return {
            status: true,
            data: myProject.tasks,
            msg: "Task deleted"
        }
    }
    catch(error){
        return {
            status: false,
            data: null,
            msg: "Error"
        }
    }
}