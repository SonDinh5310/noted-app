import React from "react";
import { StyleSheet, TextInput, Dimensions } from "react-native";

const height = Dimensions.get("window").height;

const Editor = ({ note, handleChange }) => {
    return (
        <TextInput
            multiline={true}
            autoFocus={true}
            placeholder="write your code here"
            style={styles.editor}
            value={note}
            onChangeText={(text) => handleChange(text)}
        ></TextInput>
    );
};

const styles = StyleSheet.create({
    editor: {
        height: height,
        textAlignVertical: "top",
        backgroundColor: "black",
        color: "white",
        fontSize: 16,
        padding: 10,
    },
});

export default Editor;
