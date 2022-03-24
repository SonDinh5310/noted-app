import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
    ScrollView,
    TouchableOpacity,
    TextInput,
} from "react-native";
import RenderHtml from "react-native-render-html";
import markdownProcessor from "./utils/markdownProcessor";
import Markdown from "react-native-markdown-display";

export default function App() {
    const [togglePreview, setTogglePreview] = useState(false);
    const [note, setNote] = useState("");
    const handleTogglePreview = () => {
        setTogglePreview(!togglePreview);
    };

    const handleChange = (value) => {
        console.log(value);
        setNote(value);
    };

    const { width, height } = useWindowDimensions();
    const copy =
        "# Hi\n\n## Table of contents\n\n### Hello\n\n**Some** ~more~ _things_.\n ```js\nconsole.log('hello world')\n```";
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            {/* <RenderHtml
                contentWidth={width}
                source={{ html: markdownProcessor() }}
            /> */}
            <TouchableOpacity onPress={() => handleTogglePreview()}>
                <Text>Preview</Text>
            </TouchableOpacity>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                keyboardDismissMode="interactive"
                style={{ height: "100%", width: width }}
            >
                {togglePreview ? (
                    <Markdown style={{ body: { fontFamily: "sans-serif" } }}>
                        {note}
                    </Markdown>
                ) : (
                    <TextInput
                        multiline={true}
                        autoFocus={true}
                        placeholder="write your code here"
                        style={{
                            height: height - 80,
                            backgroundColor: "black",
                            color: "white",
                            fontSize: 16,
                        }}
                        onChange={(e) => handleChange(e.nativeEvent.text)}
                    ></TextInput>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        fontFamily: "sans-serif",
    },
});
