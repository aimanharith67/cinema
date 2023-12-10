import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/outline";
import Loading from "../components/loading";
import {debounce} from 'lodash'
import { image185, searchMovies } from "../api/movieDb";

const { width, height } = Dimensions.get("window");

export default function SearchScreen({ route, navigation }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleSearch = value =>{
    if(value && value.length > 2){
      setLoading(true)
      searchMovies({
        query:value,
        include_adult:'false',
        language:'en-US',
        page:'1'
      }).then((data) =>{
        setLoading(false)
        if(data && data.results) setResults(data.results);
      })
    }else{
      setLoading(false)
      setResults([])
    }
  }
  const handleTextDebounce = useCallback(debounce(handleSearch , 400),[])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#333" }}>
      <View
        style={{
          marginHorizontal: 16,
          marginBottom: 3,
          marginTop: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "#888",
          borderRadius: 999,
        }}
      >
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search Movie"
          placeholderTextColor={"lightgray"}
          style={{
            margin: 10,
            paddingBottom: 5,
            paddingTop: 5,
            paddingLeft: 6,
            flex: 1,
            fontSize: 16,
            fontWeight: "bold",
            color: "white",
            letterSpacing: 1,
          }}
        />
        <TouchableOpacity
          style={{
            borderRadius: 999,
            padding: 3,
            margin: 6,
            backgroundColor: "#888",
          }}
          onPress={() => navigation.navigate("HomeStack")}
        >
          <XMarkIcon size={30} color="white" />
        </TouchableOpacity>
      </View>
      {loading ? (
        <Loading />
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          style={{ marginVertical: 3 }}
        >
          <Text>Result ({results.length})</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            {results.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => navigation.navigate("MovieScreen", item)}
                >
                  <View>
                    <Image
                      source={{uri:image185(item?.poster_path)}}
                      style={{ width: width * 0.43, height: height * 0.43 }}
                    />
                    <Text style={{ paddingBottom: 5,color:'#fff' }}>
                      {item.original_title.length > 14
                        ? item.original_title.slice(0, 14) + "..."
                        : item.original_title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Image
            source={require("../assets/movieTime.png")}
            style={{ height: height * 0.6, width: width * 0.6 }}
          />
        </View>
      )}
    </SafeAreaView>
  );
}
