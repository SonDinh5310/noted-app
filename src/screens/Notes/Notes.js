import React from "react";
import {
    Text,
    ScrollView,
    View,
    TextInput,
    TouchableOpacity,
} from "react-native";
import NotesList from "../../components/NotesList/NotesList";
import tw from "twrnc";

function Notes() {
    return (
        <View style={tw`flex flex-column px-5 py-2.5 bg-white`}>
            <Text style={tw`text-[28px]`}>Hello, Nam! 👋🏻</Text>
            <TextInput
                placeholder="Search your note..."
                style={tw`p-3.5 my-2.5 bg-neutral-100 text-[16px] rounded-lg`}
            ></TextInput>
            <NotesList></NotesList>
            <TouchableOpacity
                style={tw`absolute bottom-2.5 right-2.5 bg-[#384D95] rounded-full`}
            >
                <Text>+</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Notes;
