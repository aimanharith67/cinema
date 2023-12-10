import React, { useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import * as Progress from "react-native-progress";
var { width, height } = Dimensions.get("window");

export default function Loading() {
  return (
    <View style={styles.loading}>
      <Progress.CircleSnail thickness={12} size={160} color="#eab308" />
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: height,
    width: width,
    // backgroundColor:'#333'

  },
});
