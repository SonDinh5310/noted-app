import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import Editor from "./components/editor";
import Preview from "./components/preview";
import SideMenu from "./components/sideMenu";

const NotedApp = () => {
    const [togglePreview, setTogglePreview] = useState(false);
    const [note, setNote] = useState("");

    const handleTogglePreview = () => {
        setTogglePreview(!togglePreview);
    };

    const handleChange = (value) => {
        setNote(value);
    };

    const { width } = useWindowDimensions();
    // const copy =
    //     "# Hi\n\n## Table of contents\n\n### Hello\n\n**Some** ~more~ _things_.\n ```js\nconsole.log('hello world')\n```";
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View
                style={{
                    marginTop: 20,
                    marginBottom: 10,
                    marginHorizontal: 10,
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "row",
                }}
            >
                <TouchableOpacity>
                    <Text>Menu</Text>
                </TouchableOpacity>
                <Text>My note</Text>
                <TouchableOpacity
                    onPress={() => handleTogglePreview()}
                    style={{}}
                >
                    <Text>{togglePreview ? "Editor" : "Preview"}</Text>
                </TouchableOpacity>
            </View>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                keyboardDismissMode="interactive"
                style={{ height: "100%", width: width }}
            >
                {togglePreview ? (
                    <Preview>{note}</Preview>
                ) : (
                    <Editor note={note} handleChange={handleChange}></Editor>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontFamily: "sans-serif",
    },
});

export default NotedApp;
