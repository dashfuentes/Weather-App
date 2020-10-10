import React, { useState, useEffect } from 'react';
import {StyleSheet,Keyboard,View,Text,TouchableWithoutFeedback,Alert} from 'react-native';
import Formulario from './componentes/Formulario';
import Clima from './componentes/Clima'


const App = () => {

  const [busqueda, guardarBusqueda ] = useState({
    ciudad: '',
    pais: ''
  });
  //extraemos los valores de los output del areglo de busqueda
  const {pais, ciudad} = busqueda;
//state de la peticion
  const [consultar, guardarConsultar] = useState(false);
//state de la respuesta
const [resultado, guardarResultado ] = useState({});
//state del color de fondo
const [bgcolor, guardarBgcolor] = useState('rgb(71, 149, 212)');

  useEffect(() => {
    const consultarClima = async () => {
      //si es true
      if(consultar) {
        const appId = 'aeeedf4a1a76c4af5ae1a18c4f75bd65';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
       // console.log(url)
  
        try {
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();
            //console.log(resultado);
            //lleno el state vacio con todo el json
            guardarResultado(resultado);
            guardarConsultar(false);

            // Modifica los colores de fondo basado en la temperatura

            const kelvin = 273.15;
            //extraer la temperatura del resultado de la peticion
            const { main } = resultado;
            const actual = main.temp - kelvin;

            if(actual < 10) {
              //frio
              guardarBgcolor('rgb( 105, 108, 149 )');
            } else if(actual >= 10 && actual < 25) {
              //normal
              guardarBgcolor('rgb(71, 149, 212)');
            } else {
              //calor
              guardarBgcolor('rgb( 178, 28, 61)');
            }
            
        } catch (error) {
            mostrarAlerta();
        }
      }
    }
    consultarClima();
}, [consultar]);

const bgColorApp = {
  backgroundColor: bgcolor
}
const mostrarAlerta = () => {
  Alert.alert(
      'Error',
      'No hay resultados, intenta con otra ciudad o país',
      [{ text: 'OK '}]
  )
}

  
  //ocultar teclado 
  const ocultarTeclado = () =>{
    Keyboard.dismiss();
  }
  return (
    <>
 <TouchableWithoutFeedback onPress={ () => ocultarTeclado() }>
      <View style={[styles.app, bgColorApp ]}>
              <View style={styles.contenido}>
              <Clima
                  resultado={resultado}
                />
              
                <Formulario 
                 busqueda  = {busqueda}
                 guardarBusqueda = {guardarBusqueda}
                 guardarConsultar={guardarConsultar}
                />

              </View>
          </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center'
    //backgroundColor: '#5a9597'
  },
  contenido: {
    marginHorizontal: '2.5%'
  }
});

export default App;
