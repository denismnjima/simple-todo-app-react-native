import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput,Pressable,ScrollView} from 'react-native';
import { useState } from 'react';
import ListItem from './components/ListItem';

export default function App() {
  const [todoList, setTodoList] = useState([]);
  const [task, setTask] = useState('');

  const addTask = () => {
    setTodoList([...todoList, task]);
    setTask('');
    console.log(todoList);
  }
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

