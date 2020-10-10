import React, { useState, useEffect } from 'react';
import {StyleSheet,Keyboard,View,Text,TouchableWithoutFeedback} from 'react-native';
import Formulario from './componentes/Formulario';


const App = () => {

  
  //ocultar teclado 
  const ocultarTeclado = () =>{
    Keyboard.dismiss();
  }
  return (
    <>
 <TouchableWithoutFeedback onPress={ () => ocultarTeclado() }>
          <View style={styles.app}>
              <View style={styles.contenido}>
              
                <Formulario 
                 
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
    justifyContent: 'center',
    backgroundColor: '#5a9597'
  },
  contenido: {
    marginHorizontal: '2.5%'
  }
});

export default App;
