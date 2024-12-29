import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput,Pressable,ScrollView} from 'react-native';
import { useState,useEffect } from 'react';
import ListItem from './components/ListItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [todoList, setTodoList] = useState([]);
  const [task, setTask] = useState('');


  const storeData = async (key,value)=>{
    try{
      let valueStringified = JSON.stringify(value)
      await AsyncStorage.setItem(key,valueStringified)
    }
    catch(error){
      console.error(error);
    }
  }

  const getData = async (key)=>{
    try {
      let Data =  await AsyncStorage.getItem(key);
      console.log(Data);
      if(Data !== null){
        Data = JSON.parse(Data);
        return Data

      }
      else{
        return []
      }
      
    } catch (error) {
      console.error(error)
      return [];
      
    }
  }

  const addTask = async () => {
    try {
      const TodoListData = await getData('tasks');
      const updatedList = [...TodoListData, task];
      await storeData('tasks', updatedList); // Wait for storeData to complete
      setTask('');
      fetchData(); // Fetch new data
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };
  

  const fetchData = async () => {
    try {
      const todoList = await getData('tasks');
      setTodoList(todoList); // Update the state with fetched tasks
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    fetchData()
    
  },[])
  return (
    <View style={styles.mainWrapper}>
      <StatusBar style="auto"  backgroundColor='orange'/>
      <Text style={styles.topBarText}> Todo List</Text>

      <View>
        <TextInput placeholder="Enter your task" style={styles.todoInput} value={task} onChangeText={setTask}/>
        <Pressable onPress={addTask}>
          <Text style={styles.addTodoButton}> Add Task</Text>
        </Pressable>

        <ScrollView>
          <View style={styles.todoListContainer}>
            {
              todoList.map((item, index) => {
                return <ListItem task={item} key={index}/>
            }
          )
        }

          </View>
        
        </ScrollView>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper:{
    paddingTop:30,

  },
  topBarText:{
    textAlign:'center',
    fontWeight:'bold',
    fontSize:20,
    backgroundColor:'orange',
    paddingTop:20,
    paddingVertical:10,
    color: 'white'  
  },
  todoInput:{
    borderWidth: 1,
    borderColor:'black',
    padding:10,
    margin:10,
  },
  addTodoButton:{
    backgroundColor:'orange',
    color:'white',
    padding:10,
    textAlign:'center',
    fontWeight:'bold',
    margin:10,
    marginTop: -5,
  },
  todoListContainer:{
    marginTop:10,
    flexDirection:'column',
    gap:5
  },
  todoItem:{
    flexDirection:'row',
    justifyContent:'space-between',
    padding:10,
    flex:1,
    margin:5,
    marginHorizontal:10,
    backgroundColor:'lightgrey',

  }
});

