import React, { useState } from 'react';
import 'react-native-get-random-values';
import { Alert, TextInput, Dimensions, View, ScrollView } from 'react-native';
import CustomFloatingButton from '../../components/CustomFloatingButton/CustomFloatingButton';
import { useHeaderHeight } from '@react-navigation/elements';
import { AuthStore, AppStore } from '../../context/zustand';
import tw from 'twrnc';
import { saveNoteToStorage } from '../../utils/helpers';
import { v4 as uuidv4 } from 'uuid';

const height = Dimensions.get('window').height;

const Editor = ({ navigation, route, note_id }) => {
    const [title, setTitle] = useState('');
    const [data, setData] = useState('');

    const { userData } = AuthStore((state) => ({
        userData: state.userData,
    }));
    const { setIsUpdate } = AppStore((state) => ({
        setIsUpdate: state.setIsUpdate,
    }));
    // const { note_id, name, content } = route.params;
    // console.log(route.params);
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
            // if (!note_id) {
            //     const id = uuidv4();
            //     saveNoteToStorage(userData._id, id, {
            //         note_id: id,
            //         name: title,
            //         content: data,
            //     });
            //setIsUpdate()
            // }
            // saveNoteToStorage(userData._id, {
            //     note_id: note_id,
            //     name: title,
            //     content: data,
            // });
            const id = uuidv4();
            saveNoteToStorage(userData._id, {
                local_id: id,
                name: title,
                content: data,
            });
        } catch (error) {
            console.log('error: ', error);
        } finally {
            // setIsUpdate();
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
