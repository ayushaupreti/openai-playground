import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, SafeAreaView } from "react-native";

const Home = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <Button
        title="Text to Speech API"
        onPress={() => navigation.navigate("Text to Speech")}
      />

      <Button
        title="Speech to Text API"
        onPress={() => navigation.navigate("Speech to Text")}
      />
    </SafeAreaView>
  );
};

export default Home;
