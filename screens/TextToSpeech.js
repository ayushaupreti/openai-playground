import React, { useState } from "react";
import {
  Text,
  Linking,
  TextInput,
  View,
  StyleSheet,
  Button,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Slider from "@react-native-community/slider";

import {
  arrayToSelectOptions,
  fetchAudioFileBlob,
} from "../utils/helperFunctions";
import { voices, models, formats } from "../utils/constants";

const TextToSpeech = () => {
  const [apiKey, setApiKey] = useState("");
  const [text, setText] = useState("");
  const [voice, setVoice] = useState("");
  const [model, setModel] = useState("");
  const [format, setFormat] = useState("");
  const [speed, setSpeed] = useState(1.0);

  const [fetchingAudio, setFetchingAudio] = useState(false);

  const [audioUrl, setAudioUrl] = useState();
  const [error, setError] = useState();

  const voiceOptions = arrayToSelectOptions(voices);
  const modelOptions = arrayToSelectOptions(models);
  const formatOptions = arrayToSelectOptions(formats);

  const generateSpeech = async () => {
    setFetchingAudio(true);
    const response = await fetchAudioFileBlob(
      model.value,
      text,
      voice.value,
      format.value,
      speed,
      apiKey
    );
    setFetchingAudio(false);
    if (response.type === "success") {
      const url = URL.createObjectURL(response.data);
      setAudioUrl(url);
    } else {
      setError(`Error fetching audio: ${response.data}`);
    }
  };

  return (
    <ScrollView style={styles.background}>
      <Text style={styles.info}>
        Interact with the OpenAI text to speech endpoint. You can find
        documentation{" "}
        <Text
          style={{ color: "blue" }}
          onPress={() =>
            Linking.openURL(
              "https://platform.openai.com/docs/api-reference/audio/createSpeech"
            )
          }
        >
          here
        </Text>
      </Text>
      <View>
        <TextInput
          style={[styles.input, styles.formItems]}
          onChangeText={(text) => setApiKey(text)}
          value={apiKey}
          placeholder="API Key"
        />

        <TextInput
          multiline
          style={[styles.multilineInput, styles.formItems]}
          onChangeText={(text) => setText(text)}
          value={text}
          placeholder="Text"
        />

        <Text style={styles.textLength}>{text.length}/4096</Text>

        <Dropdown
          data={voiceOptions}
          style={[styles.dropdown, styles.formItems]}
          labelField="label"
          valueField="value"
          placeholder="Select Voice"
          value={voice}
          onChange={(option) => setVoice(option)}
        />

        <Dropdown
          data={modelOptions}
          style={[styles.dropdown, styles.formItems]}
          labelField="label"
          valueField="value"
          placeholder="Select Model"
          value={model}
          onChange={(option) => setModel(option)}
        />

        <Dropdown
          data={formatOptions}
          style={[styles.dropdown, styles.formItems]}
          labelField="label"
          valueField="value"
          placeholder="Select Format"
          value={format}
          onChange={(option) => setFormat(option)}
        />

        <View style={styles.slider}>
          <Text>Speed: {speed.toFixed(2)}</Text>
          <Slider
            minimumValue={0.25}
            maximumValue={4.0}
            value={speed}
            onValueChange={(option) => setSpeed(option)}
          />
        </View>

        {!audioUrl && !error && (
          <View style={styles.submit}>
            {fetchingAudio && (
              <ActivityIndicator
                animating={fetchingAudio}
                size="small"
                color="#0765ff"
              />
            )}
            <Button title="Generate Speech" onPress={generateSpeech} />
          </View>
        )}

        {(audioUrl || error) && (
          <Button
            title="Reset"
            onPress={() => {
              setAudioUrl();
              setError();
            }}
          />
        )}

        {error && <Text style={styles.error}>{error}</Text>}

        {audioUrl && (
          <AudioPlayer src={audioUrl} style={{ marginBottom: "30px" }} />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  background: {
    height: "100%",
  },
  info: {
    margin: 12,
  },
  textLength: {
    marginHorizontal: 12,
    alignSelf: "flex-end",
  },
  formItems: {
    borderRadius: 5,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  multilineInput: {
    height: 150,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  dropdown: {
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  slider: {
    padding: 10,
  },
  submit: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  error: {
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "#c54f4e",
    backgroundColor: "#ecc7c5",
  },
});

export default TextToSpeech;
