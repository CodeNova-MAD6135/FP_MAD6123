import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
} from 'react-native-chart-kit';
import { getCurrentUser, getMyProjectList, getUserByID } from '../../data/Storage';
import { useFocusEffect } from '@react-navigation/native';

const ProjectOverview = ({ route }) => {
  const [userId, setUserId] = useState('');
  const [projects, setProjects] = useState([]);
  const [linedata, setLineChartData] = useState();

  // const linedata = {
  //   labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  //   datasets: [
  //     {
  //       data: [20, 45, 28, 80, 99, 43],
  //       strokeWidth: 2, // optional
  //     },
  //   ],
  // };

  useEffect(() => {

    const getUser = async () => {
      const user = await getCurrentUser();
      setUserId(user.id);
    };

    getUser();

    const loadProjects = async () => {
      const allProjects = await getMyProjectList(userId);
      setProjects(allProjects);
    };

    loadProjects();

  }, [userId]);

  useEffect(() => {
    const calculateProjectCostsForLineChart = async () => {
      const newLineChartData = {
        labels: [],  // Project names as labels
        datasets: [{ data: [], strokeWidth: 2 }],
      };

      // Iterate over projects
      for (const project of projects) {
        const completedTasks = project.tasks.filter((task) => task.status === 'Completed');
        if (completedTasks && completedTasks.length > 0) {
          const totalCost = await calculateTotalCost(completedTasks);

          if (totalCost !== undefined) {

            newLineChartData.labels.push(project.projectName);
            newLineChartData.datasets[0].data.push(totalCost);

          }
        }
      }

      setLineChartData(newLineChartData);
      console.log(linedata);

    };

    const calculateTotalCost = async (completedTasks) => {

      const totalCost = await completedTasks.reduce(async (acc, task) => {
        const member = await getUserByID(task.assignedMember);
        const hourlyRate = member.rate;
        const hoursWorked = task.completionHours;
        return acc + hourlyRate * hoursWorked;
      }, 0);

      return totalCost;
    };

    calculateProjectCostsForLineChart();



  }, [projects]);

  useEffect(() => {
    // Log the updated linedata when it changes
    console.log(linedata);
  }, [linedata]);

  useFocusEffect(
    React.useCallback(() => {
    }, [linedata])
  );

  return (
    <ScrollView>
      {linedata && linedata.datasets && linedata.datasets[0].data.length > 0 && (
        <View style={styles.lineChart}>
          <LineChart
            data={linedata}
            width={420} // from react-native
            height={220}
            yAxisLabel={'$'}
            chartConfig={{
              backgroundColor: '#5D5FDE',
              backgroundGradientFrom: '#5D5FDE',
              backgroundGradientTo: '#5D5FDE',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                marginVertical: 40,
              }
            }}
            bezier
            style={{
              borderRadius: 5
            }}
          />
        </View>
      )}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
    paddingTop: 30,
    backgroundColor: '#ecf0f1',
  },
  lineChart: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  }
});

export default ProjectOverview;

