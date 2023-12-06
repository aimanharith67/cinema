import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal,TouchableWithoutFeedback, Keyboard } from 'react-native';
import {globalStyles} from '../styles/global'
import Card from '../shared/card'
import {MaterialIcons} from '@expo/vector-icons'
import ReviewForm from './reviewForm';

export default function Home({navigation}) {
    const [api, setApi] = useState({})
    const [modelOpen, setModelOpen] = useState(false)
    const [reviewDetails, setReviewDetails] = useState([
        {title:'Zelda, Breath of Fresh Air', rating:5,body:'lorem ipsum',key:'1'},
        {title:'Gotta Catch them all', rating:2,body:'lorem ipsum',key:'2'},
        {title:'Final Fantasyt', rating:3,body:'lorem ipsum',key:'3'},
    ])

    const addReview = (review) =>{
        review.key = Math.random().toString()
         setReviewDetails((currentReview)=>{
            return[review,...currentReview];
        })
        setModelOpen(false)
    }

    useEffect(() => {
      fetch('https://www.boredapi.com/api/activity').then(res => res.json())
      .then((result) =>{
        setApi(result)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
      console.log(api)
    }, [])
    

 return(
    <View style={globalStyles.container}>
        <Modal visible={modelOpen} animationType='slide'>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalContent}>
                <MaterialIcons
             name='close'
             size={24}
             style={{...styles.modalToggle,...styles.modalClose}}
             onPress={() =>{setModelOpen(false)}}/>
             <ReviewForm addReview ={addReview}/>
            </View>
            </TouchableWithoutFeedback>    
        </Modal>

        <MaterialIcons
        name='add'
        size={24}
        style={styles.modalToggle}
        onPress={() =>{setModelOpen(true)}}/>
       {api && (
        <Card>
          <Text>{api.activity}</Text>
        </Card>
      )}
       
        <FlatList
        data={reviewDetails}
        renderItem={({item}) =>( 
            <TouchableOpacity onPress={() => navigation.navigate("ReviewDetails", item)}>
                <Card>
                <Text style={globalStyles.titleText}>{item.title}</Text>
                </Card>
            </TouchableOpacity>
        )}
        />
    </View>
 )
}

const styles = StyleSheet.create({
    modalToggle:{
        marginBottom :10,
        borderWidth:1,
        borderColor:'#f2f2f2',
        padding:10,
        borderRadius:10,
        alignSelf:'center'
    },
    modalClose:{
        marginTop:20,
        marginBottom:0
    },
    modalContent:{
        flex:1,
    }
})
