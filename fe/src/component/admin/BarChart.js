import { flatMap } from 'lodash';
import React from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';

//import React Native chart Kit for different kind of Chart
import {
  LineChart,
  
} from 'react-native-chart-kit';



const Chart = (props) => {
    const {data}=props
    return (
      <>
        <Text style={styles.header}>Biểu đồ doanh thu theo ngày</Text>
        <LineChart
          
          withDots={false}
          fromZero={true}
          data={data}
          width={Dimensions.get('window').width -16} // from react-native
          height={400}
          yAxisLabel={'$'}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 0, 
            strokeWidth: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            
            style: {
              borderRadius: 16,
            },
           
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }
        
        }
          
        />
      </>
    );
  };
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: 10,
    },
    header: {
      textAlign: 'center',
      fontSize: 18,
      padding: 16,
      marginTop: 16,
    },
  });
export default Chart;