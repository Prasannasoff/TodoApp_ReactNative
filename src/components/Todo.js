import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { rMS, rS, rV } from '../styles/responsive'
import { useState, useEffect } from 'react';
import axios from 'axios';



const Todo = () => {
    const [todo, settodo] = useState('')

    const [todolist, settodolist] = useState([])
    const [edittodo, setedittodo] = useState(null)
    const [id, setid] = useState([])
    const [loading, setloading] = useState()
    //useEffect hook with an empty dependency array ensures that fetchData is called when the TodoList component mounts
    useEffect(() => { // Use useEffect to fetch data on component mount
        fetchData();
    }, []); // Pass an empty dependency array to run the effect only once.And first empty array is passed untill component mounts

    const fetchData = async () => {
        try {
            setloading(true)
            const response = await axios.get("http://192.168.0.108:5000/");
            settodolist(response.data.tasks)

            setloading(false)
            // settodolist(response.data.tasks.map(task => task.title)); // Extract titles from the response


        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    }
    const addtodo = async () => {
        if (todo.length !== 0) {
            try {
                const response = await axios.post("http://192.168.0.108:5000/tasks", { title: todo });
                console.log(response.data.title)
                settodolist(todolist.concat(response.data))
                settodo("");
            } catch (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.error("Server responded with error:", error.response.data);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error("No response received from server:", error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.error("Error setting up request:", error.message);
                }
                // Handle the error here, e.g., show an error message to the user
            }
        } else {
            console.log("Enter Something");
        }
    }
    const markRead = async (id) => {

        const response = axios.post(`http://192.168.0.108:5000/markRead/${id}`,
            { read: 'true' }
        )
        const updatetodo = todolist.map(item => {
            if (item._id === id) {
                return { ...item, read: true };
            }
            return item;
        })
        settodolist(updatetodo);
        console.log(response);

    }
    const edit = (item, id) => {
        setid(id)
        console.log(id)
        setedittodo(item) //this is set because when we press edit button,the add button will be replaced as save button.At Default it will be null
        settodo(item) //this is set to send the title to the input area to make changes

    }
    const save = async () => {
        try {
            // Send a PUT request to update the todo item
            const response = await axios.put(`http://192.168.0.108:5000/edit/${id}`, {
                title: todo,
            });

            // Check if the response contains data
            if (response.data) {
                // Map through the current todo list and update the todo item with the matching ID
                const updatedTodoList = todolist.map(item => {
                    if (item._id === response.data._id) {
                        // If the ID matches, update the title
                        return { ...item, title: response.data.title }; //object spread syntax (...). It creates a new object by copying the properties of the item object and updating the title property with the value of todo.
                    }
                    return item; // Otherwise, return the item unchanged
                });

                // Update the todo list state with the updated list
                settodolist(updatedTodoList);

                // Reset the edit state
                setedittodo(null);

                // Reset the todo input
                settodo('');
            } else {
                console.error("No data received from server.");
            }
        } catch (error) {
            console.error("Error updating todo:", error.message);
        }
    };

    const deletetodo = async (item, id) => {
        //     //     // Initialize an empty array to store the filtered todos
        // const updatedTodo = [];

        //    // Loop through each todo in the todolist array
        // for (const todo of todolist) {
        //   // Check if the id of the current todo is not equal to the specified id
        //     if (todo.id !== id) {
        //         // If the condition is true, add the todo to the updatedTodo array
        //         updatedTodo.push(todo);
        //     }
        // }
        //or
        try {
            const response = await axios.delete(`http://192.168.0.108:5000/data/${id}`)
            console.log(response.data);
        }
        catch (error) {
            console.log(error)
        }

        //Using Filter method you can create a new array by including only the elements that meet a certain condition. It doesn't modify the existing elements
        const updatedtodo = todolist.filter((todo) => todo._id !== id) //The todo parameter represents each element of the todolist array as the filter method iterates over it. 

        settodolist(updatedtodo)

    }
    //Hello
    const renderTodo = ({ item, index }) => {

        return (

            <View style={[styles.content,]}>
                {/*  the fragment is used to wrap the Text and View components returned inside the if condition.This ensures that multiple elements can be conditionally rendered without violating JSX syntax rules. */}


                <Text style={item.read ? styles.line : { color: 'black' }}>{item.title}</Text>






                <View style={[styles.btns]}>
                    <TouchableOpacity onPress={() => markRead(item._id)}><Text style={[styles.btn1]}>Mark Read</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => edit(item.title, item._id)}><Text style={[styles.btn1]}>Edit</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => deletetodo(item.title, item._id)}><Text style={[styles.btn2]}>Delete</Text></TouchableOpacity>
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

                    <FlatList
                        data={todolist}
                        renderItem={renderTodo}
                        keyExtractor={(item) => item._id}
                    />
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
export default Todo;

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
        color: 'black'
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
    },
    line: {
        textDecorationLine: 'line-through',
        color: 'red',
    }

});
