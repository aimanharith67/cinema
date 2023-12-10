import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView,
} from "react-native";
import { globalStyles } from "../styles/global";
import Card from "../shared/card";
import { MaterialIcons } from "@expo/vector-icons";
import ReviewForm from "./reviewForm";
import MovieList from "../components/movieList";
import UpcomingMovieList from "../components/upcomingMovieList";
import * as data from "../constant/index";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import Loading from "../components/loading";
import { fetchTrendingMovies,fetchTopRatedMovies, fetchUpcomingMovies} from "../api/movieDb";

const ios = Platform.OS === "ios";

export default function Home({ navigation }) {
  const [api, setApi] = useState({});
  const { movieData, person } = data;
  const [loading, setLoading] = useState(true);
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
 
  useEffect(() => {
    getTrendingMovies()
    getUpcomingMovies()
    getTopRatedMovies()
  }, []);

  const getTrendingMovies = async () =>{
    const data = await fetchTrendingMovies();
    if(data && data.results){
      setTrending(data.results)
      setLoading(false)
    }
  }

  const getUpcomingMovies = async () =>{
    const data = await fetchUpcomingMovies();
    if(data && data.results){
      setUpcoming(data.results)
      setLoading(false)
    }
  }

  const getTopRatedMovies = async () =>{
    const data = await fetchTopRatedMovies();
    if(data && data.results){
      setTopRated(data.results)
      setLoading(false)
    }
  }

  const openMenu = () => { 
    navigation.openDrawer();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ marginBottom: ios ? -2 : 3 }}>
        <StatusBar style="light" />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 16,
          }}
        >
          <Bars3CenterLeftIcon
            size={30}
            strokeWidth={2}
            color="white"
            onPress={openMenu}
          />
          <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
            <Text style={styles.text}>M</Text>ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SearchScreen")}>
            <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {loading ? (
        <Loading />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Text style={globalStyles.titleText}>Trending</Text>
           {trending.length > 0 && <MovieList data={trending} />}

            {upcoming.length > 0 && (
              <UpcomingMovieList title='Upcoming' data={upcoming} navigation={navigation} />
            )}

            {topRated.length > 0 && <UpcomingMovieList title='Top rated' data={topRated} navigation={navigation} />}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  modalToggle: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0,
  },
  modalContent: {
    flex: 1,
  },
  text: {
    color: "#eab308",
  },
  container: {
    padding: 15,
    backgroundColor: "#333",
    flex:1
  },
});
