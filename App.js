import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Platform, Keyboard, Alert, AsyncStorage} from 'react-native';
import { Ionicons, MaterialIcons} from "@expo/vector-icons";

export default function App() {
  const [task, setTask] = useState([]);
  const [newTask, setNewTask] = useState('')

  async function addTask() 
  {
    if(newTask === "")
    { 
      return; 
    }
    setTask([... task, newTask]);
    setNewTask('');
  }
  
  async function removeTask(item)
  {
    setTask(task.filter(tasks => tasks !== item))
  }

  useEffect(() => 
  {
    async function carregaDados()
    {
      const task = await AsyncStorage.getItem("task");
      if(task)
      {
        setTask(JSON.parse(task));
      }
    }
    carregaDados();
  }, 
  []);

  useEffect(() => 
  {
    async function salvaDados()
    {
      AsyncStorage.setItem("task", JSON.stringify(task));
    }
    salvaDados();
  }, 
  [task]);

  return(
      <View style={styles.container}>
        <View style={styles.Title}>
            <Text style={styles.TitleTxt} >Aplicativo ToDoList</Text>
        </View>
        <View style={styles.Form}>
          <Text style={styles.TarefaTxt}>Adicionar Tarefa</Text>
          <TextInput style={styles.Input} placeholderTextColor="#999" autoCorrect={true} placeholder="Tarefa" maxLength={30} onChangeText={text => setNewTask(text)} value={newTask} />
          <TouchableOpacity style={styles.Button} onPress={( )=> addTask( )}>
            <Text style={styles.btn}>Adicionar Tarefa</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.Body}>
          <FlatList style={styles.FlatList} data={task} keyExtractor={item => item.toString()} showsVerticalScrollIndicator={false} renderItem={({item})=>(
              <View style={styles.ContainerView}>
                <View style={styles.ContainerView2}>
                  <TouchableOpacity>
                    <MaterialIcons name="storage" color="black" size={32}/>
                  </TouchableOpacity>
                    <Text style={styles.TitleTxt2}>Tarefa</Text>
                  <TouchableOpacity onPress={( )=> removeTask(item)}>
                    <MaterialIcons name="close" color="red" size={32}/>
                  </TouchableOpacity>
                </View>
                <Text style={styles.txtTask}>{item}</Text>
              </View>
            )}
          />
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  container: 
  {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 20,
  },

  Title: 
  {
    color: "#000",
    backgroundColor: "#fff",
    width: 315,
    height: 73,
     alignItems: "center",
  },

  TitleTxt: 
  {
    marginTop: 50,
    fontSize: 24,
  },

  TitleTxt2: 
  {
    fontSize: 24,
    fontWeight: 'bold'
  },

  TarefaTxt: {
    alignSelf: "center",
    fontSize: 24,
    height: 50,
  },

  btn: 
  {
    color: "#FFFFFF",
    fontSize: 18,
  },

  Body: 
  {
    flex: 1
  },

  Form: 
  {
    width: 315,
    height: 206,
    alignItems: "center",
    marginTop: 39,
    borderRadius: 20,
    alignSelf: "center",
    borderColor: "#eee",
    backgroundColor: "#fff",
    alignContent: "center"
  },

  Input: 
  {
    marginTop: -10,
    width: 272,
    height: 59,
    backgroundColor: "#E5E5E5",
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },

  Button: 
  {
    height: 38,
    width: 271,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#6200EE",
    borderRadius: 4,
    marginTop: 25
  },

  FlatList: 
  {
    flex: 1,
  },

  ContainerView: 
  {
    width: 315,
    height: 136,
    marginTop: 25,
    padding: 15,
    borderRadius: 4,
    backgroundColor: "#eee",
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 20
  },

  ContainerView2: 
  {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  txtTask: 
  {
    fontSize: 14,
    color: '#757575',
    marginTop: 30
  }
});
