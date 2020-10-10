import React, { useState, useEffect } from 'react';
import { StyleSheet,View,Text,TextInput,TouchableWithoutFeedback,Alert,Animated} from 'react-native';
import { Picker } from '@react-native-community/picker';

const Formulario = ({busqueda,guardarBusqueda,guardarConsultar}) =>{

    //extraemos los valores de los output del areglo de busqueda
    const {pais, ciudad} = busqueda;
    const [ animacionboton ] = useState(new Animated.Value(1));

    //consultar 
    const consultarClima = () =>{
        if(ciudad.trim() === '' || pais.trim() === ''){
            mostrarAlerta();
            return;
        }
        //consultar la api
        guardarConsultar(true);
    }
   //alerta
    const mostrarAlerta = () => {
        Alert.alert(
            'Error',
            'Agrega una ciudad y país para la búsqueda',
            [{ text: 'Entendido '}]
        )
    }
    const animacionEntrada = () => {
         //console.log("entrando...")
         //del tamanio inicial del boton se hara mas pequenio
        Animated.spring( animacionboton, { 
            toValue: .75
        }).start();
    }

    const animacionSalida = () => {
        //console.log("saliendo...")
         
        Animated.spring( animacionboton, { 
            //lo regresa al tamanio normal
            toValue: 1, 
            //rebote del boton
            friction: 4,
            //movimiento del boton
            tension: 30
        }).start();
    }
    //convierto las animaciones en un array para pasarlo en el view
    const estiloAnimacion = {
        transform: [{ scale: animacionboton  }]
    }


    return (
        <>
         <View style = {styles.Formulario}>
                <TextInput
                style = {styles.input}
                //agrego la nueva ciudad al state busqueda
                onChangeText = {ciudad => guardarBusqueda({...busqueda , ciudad})}
                placeholder = "Ciudad"
                placeholderTextColor = "#666"
                value = {ciudad}
                />

            <View>
                <Picker
                 itemStyle={{ height: 120, backgroundColor: '#FFF' }}
                 selectedValue = {pais}
                 onValueChange = {pais => guardarBusqueda({...busqueda, pais})}
                >
                    <Picker.Item label = "--Seleccione un pais--" value=""/>
                    <Picker.Item label="El Salvador" value="SV" />
                    <Picker.Item label="Estados Unidos" value="US" />
                        <Picker.Item label="México" value="MX" />
                        <Picker.Item label="Argentina" value="AR" />
                        <Picker.Item label="Colombia" value="CO" />
                        <Picker.Item label="Costa Rica" value="CR" />
                        <Picker.Item label="España" value="ES" />
                        <Picker.Item label="Perú" value="PE" />
                    </Picker>    
            </View>    
            <TouchableWithoutFeedback
                    onPressIn={ () => animacionEntrada() }
                    onPressOut={ () => animacionSalida()  }
                    onPress={ () => consultarClima() }
                >
                    <Animated.View
                        style={[ styles.btnBuscar, estiloAnimacion] }
                    >
                        <Text style={styles.textoBuscar } >Buscar Clima</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View> 
        </>
      );
}

const styles = StyleSheet.create({
    input: {
        padding: 10,
        height: 50,
        backgroundColor: 'aliceblue',
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    btnBuscar: {
        marginTop: 50,
        backgroundColor: '#000',
        padding: 10,
        justifyContent: 'center'
    },
    textoBuscar: {
        color: '#FFF',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: 18
    }

});

export default Formulario;