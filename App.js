import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TextToSpeech from "./screens/TextToSpeech";
import Home from "./screens/Home";
import SpeechToText from "./screens/SpeechToText";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Text to Speech"
          component={TextToSpeech}
          options={{ title: "Text to Speech API" }}
        />
        <Stack.Screen
          name="Speech to Text"
          component={SpeechToText}
          options={{ title: "Speech to Text API" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
