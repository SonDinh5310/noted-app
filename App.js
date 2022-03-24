import React from "react";
import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
    ScrollView,
} from "react-native";
import RenderHtml from "react-native-render-html";
import markdownProcessor from "./utils/markdownProcessor";
import Markdown from "react-native-markdown-display";

export default function App() {
    const { width } = useWindowDimensions();
    const copy =
        "# Hi\n\n## Table of contents\n\n### Hello\n\n**Some** ~more~ _things_.\n ```js\nconsole.log('hello world')\n```";
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            {/* <RenderHtml
                contentWidth={width}
                source={{ html: markdownProcessor() }}
            /> */}
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={{ height: "100%", width: width }}
            >
                <Markdown style={{ body: { fontFamily: "sans-serif" } }}>
                    {copy}
                </Markdown>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        fontFamily: "sans-serif",
    },
});
