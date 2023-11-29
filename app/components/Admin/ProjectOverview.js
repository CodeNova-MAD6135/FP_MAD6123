import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { getCurrentUser, getMyProjectList, getUserByID } from '../../data/Storage';
import { useFocusEffect } from '@react-navigation/native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['en'] = {
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthNamesShort: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'],
};

LocaleConfig.defaultLocale = 'en';

const ProjectOverview = ({ route }) => {
  const [userId, setUserId] = useState('');
  const [projects, setProjects] = useState([]);
  const [linedata, setLineChartData] = useState();
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    const getUser = async () => {
      const user = await getCurrentUser();
      setUserId(user.id);
    };

    getUser();

    const loadProjects = async () => {
      const allProjects = await getMyProjectList(userId);
      setProjects(allProjects);

      // Calculate project start dates based on tasks
      const projectStartDates = {};
      allProjects.forEach((project) => {
        
        const earliestStartDate = calculateEarliestStartDate(project.tasks);
        if (earliestStartDate) {
          projectStartDates[earliestStartDate] = {
            customStyles: {
              container: {
                backgroundColor: '#5D5FDE',
                borderRadius: 20,
              },
              text: {
                color: 'white',
              },
            },
          };
        }
      });
      
      setMarkedDates(projectStartDates);
      //console.log(markedDates)
    };

    loadProjects();
  }, [userId]);

  const calculateEarliestStartDate = (tasks) => {
    let earliestStartDate = null;

    tasks.forEach((task) => {
      if (task.startDate) {
        const taskStartDate = new Date(task.startDate);
        if (!earliestStartDate || taskStartDate < earliestStartDate) {
          earliestStartDate = taskStartDate;
        }
      }
    });

    if(earliestStartDate != null){
      return earliestStartDate?.toISOString().split('T')[0];
    }


    return earliestStartDate;
  };

  useEffect(() => {
    const calculateProjectCostsForLineChart = async () => {
      const newLineChartData = {
        labels: [],
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
    //console.log(linedata);
  }, [linedata]);

  useFocusEffect(React.useCallback(() => {}, [linedata]));

  return (
    <ScrollView>
      <View style={styles.lineChart}>
        {linedata && linedata.datasets && linedata.datasets[0].data.length > 0 && (
          <LineChart
            data={linedata}
            width={Dimensions.get('window').width}
            height={220}
            yAxisLabel={'$'}
            chartConfig={{
              backgroundColor: '#5D5FDE',
              backgroundGradientFrom: '#5D5FDE',
              backgroundGradientTo: '#5D5FDE',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                marginVertical: 40,
              },
            }}
            bezier
            style={{
              borderRadius: 5,
            }}
          />
        )}
      </View>

      {/* Calendar Section */}
      <View style={styles.calendarContainer}>
        <Calendar
          markingType={'custom'}
          markedDates={markedDates}
        />
      </View>
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
    margin: 10,
  },
  calendarContainer: {
    marginTop: 20,
  },
});

export default ProjectOverview;
