import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_DATA = "USER"
const PROJECT_DATA = "PROJECT"

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


export const getUserList = async() => {
    try{
        const users = await AsyncStorage.getItem(USER_DATA);
        if(users){
            return JSON.parse(users);
        }
        return [];
    }
    catch(error){
        console.log("error getting user list:" + error.msg)
        return [];
    }
};
export const getUserListOfType = async(type) => {
    try{
        const users = await getUserList()
        return users.filter((u) => u.role === type) || []
    }
    catch(error){
        return [];
    }
}
export const getUserByID = async(id) => {
    try{
        const users = await getUserList()
        return users.find( (u) => u.id === id ) || null
    }
    catch(error){
        return null
    }
}


export const loginUser = async(email,pwd) => {
    try{
        const data = await getUserList()
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

export const addUser = async(name,email,pwd,role) => {
    try{
        const data = await getUserList()
        const myUser = data.find( (item) => item.email === email && item.role == role)
        if(myUser){
            return {
                status: false,
                data: null,
                msg: "User already exists"
            }
        }
        const newUser = {
            id: new Date().getTime(),
            name: name,
            email: email,
            pwd: pwd,
            role: role
        }
        if(role == 'member'){
            newUser.rate = 20
        }
        await AsyncStorage.setItem(USER_DATA,JSON.stringify([...data,newUser]))
        return {
            status: true,
            data: newUser,
            msg: "Successfully registered."
        }
    }
    catch(error){
        return {
            status: false,
            data : null,
            msg: "Error:" + error.msg
        }
    }
}

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

export const getMyProjectList = async(userID) => {
    try{
        const projects = await getProjectList()
        const myProjects = projects.filter( (item) => item.adminId === userID)
        return myProjects || []
    }
    catch(error){
        return []
    }
}

export const addNewProject = async(project) => {
    try{
        let projects = await getProjectList()
        await AsyncStorage.setItem(PROJECT_DATA,JSON.stringify([...projects,project]))
        return true
    }
    catch(error){
        return false
    }
}

export const deleteProject = async(projectID) => {
    try{
        let projects = await getProjectList()
        projects = projects.filter( (item) => item.projectId !== projectID )
        await AsyncStorage.setItem(PROJECT_DATA,JSON.stringify(projects))
        return {
            status: true,
            data: projects
        }
    }
    catch(error){
        return {
            status:false,
            data: []
        }
    }
}

export const addProjectTask = async(projectID,task) => {
    try{
        let projects = await getProjectList()
        let myProject = projects.find(project => project.projectId === projectID)
        myProject.tasks.push(task)
        await AsyncStorage.setItem(PROJECT_DATA,JSON.stringify(projects))
        return true
    }
    catch(error){
        return false
    }
}
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