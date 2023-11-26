import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import Register from './components/Register';
import Login from './components/Login';
import ProjectOverview from './components/Admin/ProjectOverview';
import TaskManagement from './components/Admin/TaskManagement';
import UserManagement from './components/Admin/UserManagement';
import Profile from './components/Admin/Profile';
import EditUser from './components/Admin/EditUser';
import AddProject from './components/Admin/AddProject';
import ProjectDetail from './components/Admin/ProjectDetail';
import AddTask from './components/Admin/AddTask';
import TaskOverview from './components/Admin/TaskOverview';
import TaskDetail from './components/Common/TaskDetail';

import Strings from './assets/Strings';
import Colors from './assets/Colors';
import { getCurrentUser } from './data/Storage';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
  const [isAdmin,setIsAdmin] = useState(false)
  const loadCurrentUser = async() => {
    const user = await getCurrentUser()
    if(user){
      setIsAdmin(user.role === 'admin')
    }
  }
  loadCurrentUser()
  return (

      <Tab.Navigator
      screenOptions={({ route }) => ({

        tabBarLabel: () => null,
        tabBarStyle: {
          padding: 0,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === Strings.navProjectOverview) {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === Strings.navUserManagement) {
            iconName = focused ? 'users-cog' : 'users-cog';
          } else if (route.name === Strings.navTaskManagement) {
            iconName = focused ? 'list' : 'list';
          } else if (route.name === Strings.navProfile) {
            iconName = focused ? 'user-alt' : 'user-alt';
          }

          // return <Ionicons name={iconName} size={30} color={color} />;
          return <FontAwesome5 name={iconName} size={25} color={color} />;
        },
        tabBarActiveTintColor: Colors.tabBarActiveColor,
        tabBarInactiveTintColor: Colors.tabBarInactiveColor,
      })}
      initialParams={{
        userId : null
      }} 
    >
      {isAdmin ? (
        <Tab.Screen name={Strings.navProjectOverview} component={ProjectOverview} options={{ title: Strings.titleProjectOverview }} initialParams={{
          userId : null
        }} />
      ):null}
      
      <Tab.Screen name={Strings.navTaskManagement} component={TaskManagement} options={{ title: Strings.titleTaskManagement }} initialParams={{
          userId : null
        }} />
        { isAdmin ? (

        <Tab.Screen name={Strings.navUserManagement} component={UserManagement} options={{ title: Strings.titleUserManagement }} initialParams={{
          userId : null
        }} />

        ): null}
      
      <Tab.Screen name={Strings.navProfile} component={Profile} initialParams={{
          userId : null
        }} />
    </Tab.Navigator>
    
  );
};

const TaskTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({

        tabBarLabel: () => null,
        tabBarStyle: {
          padding: 0,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === Strings.navProjectOverview) {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === Strings.navUserManagement) {
            iconName = focused ? 'users-cog' : 'users-cog';
          } else if (route.name === Strings.navTaskManagement) {
            iconName = focused ? 'list' : 'list';
          } else if (route.name === Strings.navProfile) {
            iconName = focused ? 'user-alt' : 'user-alt';
          }

          return <FontAwesome5 name={iconName} size={25} color={color} />;
        },
        tabBarActiveTintColor: Colors.tabBarActiveColor,
        tabBarInactiveTintColor: Colors.tabBarInactiveColor,
      })}
    >
      <Tab.Screen name={Strings.navProjectOverview} component={ProjectOverview} options={{ title: Strings.titleProjectOverview }} />
      <Tab.Screen name={Strings.navTaskManagement} component={TaskManagement} options={{ title: Strings.titleTaskManagement }} />
      <Tab.Screen name={Strings.navUserManagement} component={UserManagement} options={{ title: Strings.titleUserManagement }} />
      <Tab.Screen name={Strings.navProfile} component={Profile} />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={Strings.navLogin}
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={Strings.navRegister}
          component={Register}
          options={{
            title: Strings.titleRegister,
            headerBackTitle: null,
            headerStyle:{
              backgroundColor: Colors.colorSurface,
            },
            headerTintColor: Colors.colorOnSurface,
            headerShown: true
          }}
        />
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{ headerShown: false }}
          initialParams={{
            userId : null
          }} 
        />
        <Stack.Screen 
        name={Strings.navEditUser} 
        component={EditUser}
        options={{
          title: '',
          headerBackTitle: null
        }} 
        />
        <Stack.Screen 
        name={Strings.navAddProject}
        component={AddProject} 
        options={{
          title: Strings.titleAddProject,
          headerBackTitle: null
        }}
        initialParams={{
          userId : null
        }} 
        />
        <Stack.Screen 
        name={Strings.navProjectDetail}
        component={ProjectDetail} 
        options={{
          title: '',
          headerBackTitle: null
        }} 
        />
         <Stack.Screen 
        name={Strings.navAddTask}
        component={AddTask} 
        options={{
          title: Strings.titleAddTask
        }} 
        />
        <Stack.Screen 
        name='TaskOverview'
        component={TaskOverview} 
        options={{
          title: ''
        }} 
        />
        <Stack.Screen 
        name='TaskDetail'
        component={TaskDetail} 
        options={{
          title: null
        }} 
        initialParams={{
          projectID : null,
          taskID: null,
          editable:false
        }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
