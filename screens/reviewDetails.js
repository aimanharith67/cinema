import React, { useState } from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import {globalStyles,Images} from '../styles/global'
import Card from '../shared/card'


export default function ReviewDetails({route}) {
    const {title,rating,body} = route.params

 return(
    <View style={globalStyles.container}>
        <Card>
        <Text style={globalStyles.titleText}>{title}</Text>
        <Text style={globalStyles.titleText}>{rating}</Text>
        <Text style={globalStyles.titleText}>{body}</Text>
        <View style={styles.rating}>
        <Text>Gamezone rating:</Text>
        <Image source={Images.ratings[rating]}/>
        </View>
        </Card>
    </View>
 )
}

const styles = StyleSheet.create({
    rating:{
        flexDirection:'row',
        justifyContent:'center',
        paddingTop:16,
        marginTop:16,
        borderTopWidth:1,
        borderTopColor:'#eee'
    }
})
