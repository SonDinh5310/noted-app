import React, { useState } from 'react';
import {
    Text,
    ScrollView,
    View,
    TextInput,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import NotesList from '../../components/NotesList/NotesList';
import CustomFloatingButton from '../../components/CustomFloatingButton/CustomFloatingButton';
import tw from 'twrnc';

function Notes({ navigation }) {
    // const [update, setUpdate] = useState(false);

    // const handleUpdate = () => {
    //     setUpdate(!update);
    // };

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
            <Text style={tw`text-[28px]`}>Hello, Nam! 👋🏻</Text>
            <TextInput
                placeholder="Search your note..."
                style={tw`w-full p-3.5 my-2.5 bg-neutral-100 text-[16px] rounded-lg`}
            ></TextInput>
            <NotesList></NotesList>
            <CustomFloatingButton
                name="note-add"
                size={33}
                onPress={() => navigation.navigate('Editor')}
            />
        </View>
    );
}

export default Notes;
