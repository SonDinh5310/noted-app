import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import NoteItem from "../NoteItem/NoteItem";
import tw from "twrnc";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthStore, AppStore } from "../../context/zustand";
import { getAllNote } from "../../utils/helpers";

function NotesList() {
    const [notes, setNotes] = useState([]);

    const { userData } = AuthStore((state) => ({
        userData: state.userData,
    }));

    const { isUpdate } = AppStore((state) => ({
        isUpdate: state.isUpdate,
    }));

    useEffect(() => {
        const getNotes = async () => {
            try {
                const res = await AsyncStorage.getItem(`noted-${userData._id}`);
                const notes = JSON.parse(res);
                setNotes(notes);
            } catch (error) {
                console.log(error);
            }
        };
        getNotes();
    }, [isUpdate]);
    console.log("noteslist: ", notes);
    return (
        <View style={tw`w-full h-full flex `}>
            {/* <View style={tw`mb-2 flex-row justify-around`}>
                <TouchableOpacity>
                    <Text>All Notes</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>Categories</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>Highlighted</Text>
                </TouchableOpacity>
            </View> */}

            <View style={tw`h-4/5`}>
                <ScrollView style={tw`h-full`}>
                    {notes &&
                        notes.map((note) => (
                            <NoteItem data={note} key={note.local_id} />
                        ))}
                </ScrollView>
            </View>
        </View>
    );
}

export default NotesList;
