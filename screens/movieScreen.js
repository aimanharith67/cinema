import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { globalStyles, Images } from "../styles/global";
import { LinearGradient } from "expo-linear-gradient";
import { HeartIcon } from "react-native-heroicons/solid";
import Cast from "../components/cast";
const ios = Platform.OS == "ios";
const topMargin = ios ? "" : " mt-3";
import { ArrowLeftIcon, ChevronLeftIcon } from "react-native-heroicons/outline";
import Loading from "../components/loading";
import { useEffect } from "react";
import { fetchMovieCredits, fetchMovieDetails, fetchSimilarMovie, image500 } from "../api/movieDb";
import UpcomingMovieList from "../components/upcomingMovieList";

var { width, height } = Dimensions.get("window");

export default function MovieScreen({ route, navigation }) {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);
  const { id } = route.params;
  const [isFavourite, toggleFavourite] = useState(false);

  useEffect(() => {
    setLoading(true);
    getMovieDetails(id);
    getMovieCredits(id)
    getSimilarMovie(id)
  }, [id]);

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);
    setLoading(false);
    if (data) {
      setMovie(data);
    }
  };

  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);
    setLoading(false);
    if (data) {
      setCast(data.cast);
    }
  };

  const getSimilarMovie = async (id) => {
    const data = await fetchSimilarMovie(id);
    setLoading(false);
    if (data) {
      setSimilar(data.results);
    }
  };


  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.background}>
      <SafeAreaView style={styles.header}>
        <TouchableOpacity
          style={styles.background}
          onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
          <HeartIcon size={35} color={isFavourite ? "#eab308" : "white"} />
        </TouchableOpacity>
      </SafeAreaView>
      {loading ? (
        <Loading />
      ) : (
        <View>
          <Image
            key={id}
            source={{ uri: image500(movie?.poster_path) }}
            className="rounded-3xl"
            style={{ width, height: height * 0.75, borderRadius: 15 }}
          />
          <LinearGradient
            colors={[
              "transparent",
              "rgba(23, 23, 23, 0.8)",
              "rgba(23, 23, 23, 1)",
            ]}
            style={{
              width,
              height: height * 0.4,
              position: "absolute",
              bottom: 0,
            }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          />
          {/* movie details */}

          <View style={styles.container}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{movie.title}</Text>
              <Text style={styles.status}>
                {movie?.status}•{movie?.release_date?.split("-")[0] || "N/A"} •{" "}
                {movie?.runtime} min
              </Text>
            </View>
            <Text style={styles.description}>{movie?.overview}</Text>

            {/* cast */}
            {cast?.length > 0 && <Cast casts={cast} navigation={navigation} />}

            {/* similar */}
            {similar?.length > 0 && <UpcomingMovieList title='Similar' data={similar}  navigation={navigation}/>}

          </View>
        </View>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  background: {
    backgroundColor: "#333",
    flex: 1,
  },
  container: {
    padding: 20,
  },
  header: {
    padding: 10,
    flexDirection: "row",
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
