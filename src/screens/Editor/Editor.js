import 'react-native-get-random-values';

import { Alert, Dimensions, ScrollView, TextInput, View } from 'react-native';
import { AppStore, AuthStore } from '../../context/zustand';
import React, { useState } from 'react';
import { saveNoteToStorage, updateNoteToStorage } from '../../utils/helpers';

import CustomFloatingButton from '../../components/CustomFloatingButton/CustomFloatingButton';
import tw from 'twrnc';
import { v4 as uuidv4 } from 'uuid';

const Editor = ({ navigation, route }) => {
    const { type, data: noteData } = route.params;

    const [title, setTitle] = useState(noteData ? noteData.name : '');
    const [data, setData] = useState(noteData ? noteData.content : '');

    const { userData } = AuthStore((state) => ({
        userData: state.userData,
    }));
    const { setIsUpdate } = AppStore((state) => ({
        setIsUpdate: state.setIsUpdate,
    }));

    const handleChange = (value, state) => {
        return state === 'title' ? setTitle(value) : setData(value);
    };

    const handleSave = async () => {
        if (!title) {
            return Alert.alert(
                'Title missing',
                'Give your note a name!',
                [
                    {
                        text: 'OK',
                        style: 'cancel',
                    },
                ],
                { cancelable: true }
            );
        }

        try {
            if (type === 'modify') {
                await updateNoteToStorage(userData._id, noteData.local_id, {
                    local_id: noteData.local_id,
                    name: title,
                    content: data,
                    lastUpdated: new Date(),
                    createdAt: noteData.createdAt,
                });
            }
            if (type === 'create') {
                const id = uuidv4();
                await saveNoteToStorage(userData._id, {
                    local_id: id,
                    name: title,
                    content: data,
                    lastUpdated: new Date(),
                    createdAt: new Date(),
                });
            }
        } catch (error) {
            console.log('error: ', error);
        } finally {
            setIsUpdate();
            navigation.goBack();
        }
    };

    return (
        <>
            <ScrollView style={tw`bg-white`} contentContainerStyle={tw`p-5`}>
                <TextInput
                    placeholder="Give your note a title"
                    style={tw`text-[20px] mb-2 py-2 bg-white font-bold border-b-2 border-b-slate-200`}
                    value={title}
                    onChangeText={(text) => handleChange(text, 'title')}
                />
                <TextInput
                    multiline={true}
                    placeholder="Write your note here..."
                    style={tw.style('h-full', 'bg-white', 'text-[18px]', {
                        textAlignVertical: 'top',
                    })}
                    value={data}
                    onChangeText={(text) => handleChange(text, 'data')}
                ></TextInput>
            </ScrollView>
            <CustomFloatingButton
                name="done"
                size={33}
                onPress={() => handleSave()}
            />
        </>
    );
};

export default Editor;
