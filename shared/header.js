import React, { useState } from 'react';
import { StyleSheet, Text, View, Image,ImageBackground } from 'react-native';
import {MaterialIcons} from '@expo/vector-icons'

export default function Header({navigation, title}){


    const openMenu = () =>{
        navigation.openDrawer()
    }


    return(
        <ImageBackground source={require('../assets/game_bg.png')} style={styles.header}>
            <View style={styles.icon}>
            <MaterialIcons name='menu' onPress={openMenu} size={28} />
            </View>
                <View  style={styles.title}>
                    <Image source={require('../assets/heart_logo.png')} style={styles.headerImage}/>
                <Text style={styles.headerText}>{title}</Text>
                </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    header:{
        height: 70,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    title:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',

    },
    headerText:{
        fontWeight:'bold',
        fontSize:20,
        color:'#333',
    },
    icon:{
      position:'absolute',
      left:16

    },
    headerImage:{
        width:26,
        height:26,
        marginHorizontal:10
    }
})