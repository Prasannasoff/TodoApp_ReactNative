import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { rMS, rS, rV } from '../styles/responsive'
import { useState } from 'react';


const Task = () => {
  const [todo, settodo] = useState('')
  const [todolist, settodolist] = useState([])
  const [edittodo, setedittodo] = useState(null)
  const addtodo = () => {
    if (todo.length != 0) {
      settodolist(todolist.concat({ id: Date.now().toString(), title: todo }));
      settodo("") //this is set to make the input box empty after pressing add button
    }
    else {
      return (
        <Text style={{ color: 'black' }}>Enter Something</Text>
      )
    }

  }
  const deletetodo = (id) => {
    //     // Initialize an empty array to store the filtered todos
    // const updatedTodo = [];

    // // Loop through each todo in the todolist array
    // for (const todo of todolist) {
    //     // Check if the id of the current todo is not equal to the specified id
    //     if (todo.id !== id) {
    //         // If the condition is true, add the todo to the updatedTodo array
    //         updatedTodo.push(todo);
    //     }
    // }
    //or
    
    //Using Filter method you can create a new array by including only the elements that meet a certain condition. It doesn't modify the existing elements
    const updatedtodo = todolist.filter((todo) => todo.id !== id) //The todo parameter represents each element of the todolist array as the filter method iterates over it. 
    settodolist(updatedtodo)

  }
  const edit = (item) => {
    setedittodo(item) //this is set because when we press edit button,the add button will be replaced as save button.At Default it will be null
    settodo(item.title) //this is set to send the title to the input area to make changes

  }
  const save = () => {
    //map function iterates and in addition to that we can modify wheareas in filter we cannot modify
    const updateTodo = todolist.map((item) => { //item represents contents in todolist
      if (item.id === edittodo.id) { //edittodo means contents that when we press edit
        return { ...item, title: todo } //object spread syntax (...). It creates a new object by copying the properties of the item object and updating the title property with the value of todo.
      }
      return item
    })
    settodolist(updateTodo) 
    setedittodo(null)
    settodo("")

  }
  const renderTodo = ({ item, index }) => {

    return (
      <View style={[styles.content]}>
        {/*  the fragment is used to wrap the Text and View components returned inside the if condition.This ensures that multiple elements can be conditionally rendered without violating JSX syntax rules. */}
        <Text>{item.title}</Text>
        <View style={[styles.btns]}>
          <TouchableOpacity onPress={() => edit(item)}><Text style={[styles.btn1]}>Edit</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => deletetodo(item.id)}><Text style={[styles.btn2]}>Delete</Text></TouchableOpacity>
        </View>

      </View>


    )
  }
  return (
    <View>
      <View style={[styles.task]}>
        <TextInput style={[styles.input]} placeholder='Add a task' value={todo} onChangeText={settodo} />
        <Text style={[styles.head]}>Your Task's</Text>

        <View style={[styles.list]}>
          {/*  if the data provided to the FlatList changes (for example, if you add or remove items from the data array), the FlatList will re-render to reflect those changes. */}

          <FlatList data={todolist} renderItem={renderTodo} />
        </View>



        {edittodo ? (<TouchableOpacity onPress={() => save()}><Text style={[styles.addbtn]}>Save</Text></TouchableOpacity>) : (
          <View>
            <TouchableOpacity onPress={() => addtodo()}><Text style={[styles.addbtn]}>ADD</Text></TouchableOpacity>
            {todolist.length <= 0 && <Text style={{ textAlign: 'center' }}>Add Tasks</Text>}

          </View>
        )
        }
      </View>
    </View>




  )

}
export default Task;

const styles = StyleSheet.create({
  task: {
    flexDirection: 'column',
    gap: 20,
    padding: rMS(20),
    height: 'auto',
    marginTop: 40
  },
  input: {
    borderWidth: rS(1),
    borderRadius: 8,
  },
  head: {
    fontFamily: 'Jaro-Regular',
    fontWeight: '400',
    color: 'black',
    fontSize: 30
  },
  addbtn: {
    backgroundColor: 'black',
    color: 'white',
    borderRadius: 5,
    width: 90,
    textAlign: 'center',
    height: 60,
    padding: 20,
    marginTop: 10
  },
  font: {
    fontFamily: 'Poppins-Black',
    fontSize: 20,
    color: 'black'
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Align children to the start and end of the container
    borderRadius: 10,
    backgroundColor: 'lightblue',
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
    gap: 10
  },
  btns: {
    gap: 10,
    flexDirection: 'row'
  },
  btn1: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'black',
    color: 'white',

  },
  btn2: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    color: 'white',
  }
});
