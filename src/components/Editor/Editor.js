import React, { useState } from 'react';
import { Alert, TextInput, Dimensions, View, ScrollView } from 'react-native';
import CustomFloatingButton from '../CustomFloatingButton/CustomFloatingButton';
import { useHeaderHeight } from '@react-navigation/elements';
import tw from 'twrnc';

const height = Dimensions.get('window').height;

const Editor = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [data, setData] = useState('');

    const handleChange = (value, state) => {
        return state === 'title' ? setTitle(value) : setData(value);
    };

    const handleSave = () => {
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
        navigation.goBack();
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
