// App.tsx

import React from "react";
import { View, StyleSheet } from "react-native";
import Compass from "./Compass";

const App = () => {
  return (
    <View style={styles.container}>
      <Compass />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
