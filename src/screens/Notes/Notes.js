import React from "react";
import { Text, ScrollView, View, TextInput } from "react-native";
import tw from "twrnc";

function Notes() {
    return (
        <View>
            <Text>Hello, Nam! 👋🏻</Text>
            <TextInput placeholder="Search your note..."></TextInput>
        </View>
    );
}

export default Notes;
