import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export const globalStyles = StyleSheet.create({
    container: {
     flex: 1,
     padding:20,
     backgroundColor:'#333'
    },
    titleText:{
        fontSize:18,
        color:'#fff'
    },
    paragraph:{
        marginVertical:8,
        lineHeight:20
    },
    input:{
        borderWidth:1,
        borderColor:'#ddd',
        padding:10,
        fontSize:18,
        borderRadius:6
    },
    errorText:{
        color:'crimson',
        fontWeight:'bold',
        marginBottom:10,
        marginTop:6,
        textAlign:'center'
    }
  });
  
export const Images ={
    ratings:{
        '1':require('../assets/rating-1.png'),
        '2':require('../assets/rating-2.png'),
        '3':require('../assets/rating-3.png'),
        '4':require('../assets/rating-4.png'),
        '5':require('../assets/rating-5.png'),
    }
}