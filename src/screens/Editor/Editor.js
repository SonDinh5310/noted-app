import 'react-native-get-random-values';

import { Alert, Dimensions, ScrollView, TextInput, View } from 'react-native';
import { AppStore, AuthStore } from '../../context/zustand';
import React, { useState } from 'react';

import CustomFloatingButton from '../../components/CustomFloatingButton/CustomFloatingButton';
import { saveNoteToStorage } from '../../utils/helpers';
import tw from 'twrnc';
import { useHeaderHeight } from '@react-navigation/elements';
import { v4 as uuidv4 } from 'uuid';

const height = Dimensions.get('window').height;

const Editor = ({ navigation, route }) => {
    const { type } = route.params;

    const [title, setTitle] = useState(route.params ? name : '');
    const [data, setData] = useState(route.params ? content : '');

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
                return saveNoteToStorage(userData._id, {
                    local_id: local_id,
                    name: title,
                    content: data,
                    lastUpdated: new Date(),
                });
            }
            if (type === 'create') {
                const id = uuidv4();
                return saveNoteToStorage(userData._id, {
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
            navigation.navigate('Notes');
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
