import { AppStore, AuthStore } from '../../context/zustand';
import React, { useState, useEffect } from 'react';
import {
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CustomFloatingButton from '../../components/CustomFloatingButton/CustomFloatingButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NotesList from '../../components/NotesList/NotesList';
import tw from 'twrnc';

function Notes({ navigation }) {
    const [notes, setNotes] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchResult, setSearchResult] = useState(null);

    const { userData } = AuthStore((state) => ({
        userData: state.userData,
    }));
    const { isUpdate } = AppStore((state) => ({
        isUpdate: state.isUpdate,
    }));

    const handleSearchTextChange = (text) => {
        setSearchText(text);
    };
    const handleSearch = async (text) => {
        const userStorage = await AsyncStorage.getItem(`noted-${userData._id}`);
        const notes = JSON.parse(userStorage);
        // console.log(notes);
        const filteredNotes = notes.filter((note) =>
            note.name.toLowerCase().includes(searchText.toLowerCase())
        );

        setSearchResult(filteredNotes);
        Keyboard.dismiss();
    };
    const handleResetSearch = () => {
        setSearchResult(null);
        setSearchText('');
        Keyboard.dismiss();
    };
    useEffect(() => {
        const getNotes = async () => {
            // console.log('getting notes');
            const res = await AsyncStorage.getItem(`noted-${userData._id}`);
            const notes = JSON.parse(res);
            setNotes(notes);
        };
        getNotes();
    }, [isUpdate]);
    return (
        <View
            style={tw.style(
                'flex',
                'flex-col',
                'px-5',
                'pt-3',
                'bg-white',
                'h-full'
            )}
        >
            <Text style={tw`text-[28px]`}>Hello, {userData.name}! 👋🏻</Text>
            <View
                style={tw`w-full flex flex-row justify-between items-center my-2.5`}
            >
                <View
                    style={tw`w-[85%] p-3.5 my-2.5 bg-neutral-100 rounded-lg flex-row justify-between items-center`}
                >
                    <TextInput
                        placeholder="Search your note..."
                        onChangeText={(text) => handleSearchTextChange(text)}
                        value={searchText}
                        style={tw`w-[90%] text-[16px]`}
                        onSubmitEditing={() => handleSearch(searchText)}
                    />
                    {searchText ? (
                        <TouchableOpacity>
                            <Icon
                                name="close"
                                size={25}
                                color="tomato"
                                onPress={() => handleResetSearch()}
                            />
                        </TouchableOpacity>
                    ) : null}
                </View>

                <TouchableOpacity
                    style={tw`px-3.5 py-4 bg-neutral-100 rounded-xl`}
                >
                    <Icon
                        name="search"
                        size={25}
                        color="black"
                        onPress={() => handleSearch(searchText)}
                    />
                </TouchableOpacity>
            </View>
            {/* {searchResult && (
                <NotesList navigation={navigation} notes={notes}></NotesList>
            )} */}
            <NotesList
                navigation={navigation}
                notes={searchResult ? searchResult : notes}
            ></NotesList>
            <CustomFloatingButton
                name="note-add"
                size={33}
                onPress={() =>
                    navigation.navigate('Editor', { type: 'create' })
                }
            />
        </View>
    );
}

export default Notes;
