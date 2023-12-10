import React, { useState } from 'react';
import { StyleSheet, Text, View,TouchableOpacity,TouchableWithoutFeedback, Image, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { image500 } from '../api/movieDb';
var {width, height}=Dimensions.get('window')






export default function MovieList({data}){
return(
    <View>
   <Carousel
              data={data}
              renderItem={({item})=> <MovieCard item={item}/>}
              firstItem={0}
              inactiveSlideOpacity={0.50}
              sliderWidth={width}
              itemWidth={width * 0.52}
              slideStyle={{display:'flex',alignItems:'center'}}
            />
    </View>
 
)
}

const MovieCard = ({item}) =>{
    return(
        <TouchableWithoutFeedback>
            <Image
                source={{uri:image500(item.poster_path)}}
                style={{
                    width:width*0.5,
                    height:height*0.5,
                    borderRadius: 15,

                }}
                className='rounded-3xl'
            />
        </TouchableWithoutFeedback>
    )
}