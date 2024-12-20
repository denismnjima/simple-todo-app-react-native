import { StyleSheet, Text, View, TextInput,Pressable,ScrollView} from 'react-native';

function ListItem({task,index}) {
  return (
    <View style={styles.todoItem}>
    <Text>{task}</Text>
    {/* <Pressable>
      <Text> Delete</Text>
    </Pressable> */}
    <Pressable>
      <Text> Done</Text>
    </Pressable>
  </View>
  )
}
const styles = StyleSheet.create({
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
export default ListItem