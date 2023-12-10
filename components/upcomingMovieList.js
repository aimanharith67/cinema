import React, { useState } from 'react';
import { StyleSheet, Text, View,TouchableOpacity,TouchableWithoutFeedback, Image, Dimensions,ScrollView } from 'react-native';
import { image185, image342 } from '../api/movieDb';
var {width, height}=Dimensions.get('window')


export default function UpcomingMovieList({data,navigation,title}){
return(
    <View className='mb-8 space-y-4'>
          <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:14}}>
        <Text style={styles.text}>{title}</Text>
        <TouchableOpacity>
        <Text style={styles.textAll}>See all</Text>
        </TouchableOpacity>
        </View>
<ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 15}}
      >
        {
            data.map((item,index)=>{
                return(
                    <TouchableWithoutFeedback
                    key={index}
                    onPress={() => navigation.navigate("MovieScreen", item)}
                    >
                         <View  style={{ marginRight: 4, marginBottom: 1 }} >
                            <Image 
                              source={{uri:image185(item.poster_path)}}
                              className="rounded-3xl" 
                              style={{ width: width*0.33, height: height*0.22}} 
                            />
                            <Text style={styles.text}>
                                {
                                    item.title.length>14? item.title.slice(0,14)+'...': item.title
                                }
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                )
            })
        }
      </ScrollView>
    </View>
 
)
}

const styles = StyleSheet.create({
    text:{
        color:'#fff',
        marginTop:4
    },
    textAll:{
        color:'#FFCC33'
    },
    movieCard:{
        alignItems:'center'
    }
})