

import React,{useState,useEffect} from 'react';
import {StyleSheet,View,Text,TextInput,Button,TouchableHighlight} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const App = () => {

  const[inputTexto,guardarTexto] = useState('');
  const[nombreStorage,guardarNombreStorage] = useState('');
 
  useEffect(()=>{
      obtenerDatosStorage()
  },[])

  //guardar En local Storage
  const guardarDatos= async()=>{
      try {
          await AsyncStorage.setItem('nombre',inputTexto);
          guardarNombreStorage(inputTexto);
      } catch (error) {
        console.log(error);
      }
  }
  //obtener valor del local
  const obtenerDatosStorage = async () =>{
    try {

      const nombre = await AsyncStorage.getItem('nombre');
      guardarNombreStorage(nombre);

    } catch (error) {
      console.log(error)
    } 
  }
  //Eliminar valor del local
  const eliminarDatos = async()=>{
      try {
          await AsyncStorage.removeItem('nombre');
          guardarNombreStorage('');
      } catch (error) {
          console.log(error);
      }
  }

  return (
    <>
      <View style={styles.contenedor}>

          {nombreStorage ? <Text>Hola:  {nombreStorage}</Text> : null}
        <TextInput
            style={styles.input}
            placeholder="Escribe tu nombre"
            onChangeText={text =>guardarTexto(text)}
        />
        <Button
          title="Guardar"
          color='#333'
          onPress={()=>guardarDatos()}
        />

        {nombreStorage ?
            <TouchableHighlight 
              style={styles.btnEliminar}
              onPress={()=> eliminarDatos()}
            >
                <Text style={styles.textoEliminar}>Eliminar Nombre &times;</Text>
            </TouchableHighlight> 
          : null 
        }
        
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  contenedor:{
    flex:1,
    backgroundColor:'#FFF',
    alignItems:'center',
    justifyContent:'center'
  },
  input:{
    borderColor:'#6A2BE0',
    borderBottomWidth:1,
    width:300,
    height:40,
    marginBottom:40
  },
  btnEliminar:{
    marginTop:10,
    backgroundColor:'red',
    paddingHorizontal:50,
    paddingVertical:12,
    borderRadius:15,
    textTransform:'uppercase'
    
  },
  textoEliminar:{
    color:'white'
  }
});

export default App;
