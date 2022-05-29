import { AppStore, AuthStore } from '../../context/zustand';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import NoteItem from '../NoteItem/NoteItem';
import tw from 'twrnc';

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
    console.log('noteslist: ', notes);
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

            <View style={tw`h-5/6`}>
                <ScrollView style={tw`h-full`}>
                    {notes &&
                        notes.map((note) => (
                            <NoteItem data={note} key={note.local_id} />
                        ))}
                    {!notes && (
                        <Text style={tw`w-full text-center text-[16px]`}>
                            OOps! You don't have any note
                        </Text>
                    )}
                </ScrollView>
            </View>
        </View>
    );
}

export default NotesList;
