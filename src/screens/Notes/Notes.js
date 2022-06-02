import { AppStore, AuthStore } from '../../context/zustand';
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

import CustomFloatingButton from '../../components/CustomFloatingButton/CustomFloatingButton';
import NotesList from '../../components/NotesList/NotesList';
import tw from 'twrnc';

function Notes({ navigation }) {
    const { userData } = AuthStore((state) => ({
        userData: state.userData,
    }));
    const { isUpdate } = AppStore((state) => ({
        isUpdate: state.isUpdate,
    }));
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
            <TextInput
                placeholder="Search your note..."
                style={tw`w-full p-3.5 my-2.5 bg-neutral-100 text-[16px] rounded-lg`}
            ></TextInput>
            <NotesList navigation={navigation}></NotesList>
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
