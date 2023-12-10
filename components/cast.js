import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { image185 } from "../api/movieDb";

var { width, height } = Dimensions.get("window");

export default function Cast({ casts, navigation }) {
  return (
    <View>
      <Text style={{ color: 'white', fontSize: 16, marginLeft: 4, marginBottom: 5 }}>Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {casts.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              style={{ marginRight: 4, alignItems: 'center' }}
              onPress={() => navigation.navigate("CastScreen", item)}
            >
              <View style={styles.castContainer}>
                <View style={styles.castPicContainer}>
                  <Image
                    style={styles.castPic}
                    source={{uri:image185(item.profile_path)}}
                  />
                </View>

                <Text style={styles.textNeutral}>
                  {item.character.length > 10
                    ? item.character.slice(0, 10) + '...'
                    : item.character}
                </Text>
                <Text style={styles.textMini}>
                  {item.original_name.length > 10
                    ? item.original_name.slice(0, 10) + '...'
                    : item.original_name}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  castContainer: {
    marginRight: 4,
    alignItems: 'center',
  },
  castPicContainer: {
    overflow: 'hidden',
    borderRadius: 50,
    height: 60,
    width: 60,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  castPic: {
    borderRadius: 8,
    height: 64,
    width: 60,
  },
  textNeutral: {
    color: '#ccc',
    marginLeft: 1,
  },
  textMini:{
    fontSize:10,
    color: '#ccc',
  }
});
