import React, { useState,useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import { HeartIcon} from 'react-native-heroicons/solid';
import { globalStyles, Images } from "../styles/global";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from '@react-navigation/native';
import Cast from "../components/cast";
const ios = Platform.OS == 'ios';
const topMargin = ios? '':' mt-3';
import { ArrowLeftIcon, ChevronLeftIcon } from 'react-native-heroicons/outline';
import Loading from "../components/loading";
import { fetchPersonDetail, fetchPersonMovie, image342 } from "../api/movieDb";
import UpcomingMovieList from "../components/upcomingMovieList";

var { width, height } = Dimensions.get("window");

export default function CastScreen({ route }) {
  const {
    id
  } = route.params;
  const [isFavourite, toggleFavourite] = useState(false); 
  const [loading, setLoading] = useState(false);
  const [person, setPerson] = useState({}) 
  const [movie, setMovie] = useState([]) 

  useEffect(() => {
    getPersonDetail(id)
    getPersonMovie(id)
  }, []);

  const getPersonDetail = async (id) =>{
    const data = await fetchPersonDetail(id)
    setPerson(data)
  } 

  const getPersonMovie = async (id) =>{
    const data = await fetchPersonMovie(id)
    setMovie(data.cast)
  } 


  const navigation = useNavigation();
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#333" }}>
    <SafeAreaView style={styles.header}>
      <TouchableOpacity style={styles.background} onPress={() => navigation.goBack()}>
        <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
        <HeartIcon size={35} color={isFavourite ? '#eab308' : 'white'} />
      </TouchableOpacity>
    </SafeAreaView>
    {
        loading?(
            <Loading/>
        ):(
            <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                shadowColor: "gray",
                shadowRadius: 190,
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 1,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  overflow: "hidden",
                  height: 220, // Adjust the height as needed
                  width: 220, // Adjust the width as needed
                  borderRadius: 120, // half of 120
                  borderWidth: 2,
                  borderColor: "#ccc", // neutral-500 color (adjust the color)
                }}
              >
                <Image
                   source={{ uri: image342(person?.profile_path) }}
                  style={{ height: "100%", width: "100%" }}
                />
              </View>
            </View>
    
            <View
              style={{
                marginTop: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {person.name}
              </Text>
              <Text style={{ color: "#ccc", fontSize: 16, textAlign: "center" }}>
                {/* {person?.place_of_birth} */}
                {person.place_of_birth}
              </Text>
            </View>
    
            <View
              style={{
                marginHorizontal: 12,
                padding: 16,
                marginTop: 24,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#444",
                borderRadius: 999,
              }}
            >
              <View
                style={{
                  borderRightWidth: 2,
                  borderRightColor: "#888",
                  paddingRight: 17,
                  paddingLeft: 0,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>Gender</Text>
                <Text style={{ color: "#ccc", fontSize: 12 }}>{person.gender == 1? 'Female' : 'Male'}</Text>
              </View>
    
              <View
                style={{
                  borderRightWidth: 2,
                  borderRightColor: "#ccc",
                  paddingRight: 17,
                  paddingLeft: 0,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>Birthday</Text>
                <Text style={{ color: "#ccc", fontSize: 12 }}>{person.birthday}</Text>
              </View>
    
              <View
                style={{
                  borderRightWidth: 2,
                  borderRightColor: "#ccc",
                  paddingRight: 17,
                  paddingLeft: 0,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  known for
                </Text>
                <Text style={{ color: "#ccc", fontSize: 12 }}>{person.known_for_department}</Text>
              </View>
    
              <View style={{ paddingHorizontal: 8, alignItems: "center" }}>
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Popularity
                </Text>
                <Text style={{ color: "#ccc", fontSize: 12 }}>{person.popularity}</Text>
              </View>
            </View>
    
            <View
              style={{
                marginVertical: 6,
                marginHorizontal: 4,
                flexDirection: "column",
                padding:10
              }}
            >
              <Text style={{ color: "white", fontSize: 18, paddingTop:20 }}>Biography</Text>
              <Text style={{ color: "#ccc", fontSize: 14, letterSpacing: 0.5 }}>
                {person.biography}
              </Text>
            </View>

            {movie.length > 0 && <UpcomingMovieList title='Movies' data={movie}  navigation={navigation}/>}

          </View>
        )
    }
     
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  background: {
    backgroundColor: "#333",
    flex:1
  },
  header: {
    padding: 20,
    flexDirection:'row'
  },
  container: {
    padding: 20,
  },
  titleContainer: {
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  status: {
    color: "#ccc",
    marginLeft: 4,
    letterSpacing: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  description: {
    color: "#ccc",
    marginLeft: 4,
    letterSpacing: 1,
    marginBottom: 20,
  },
});
