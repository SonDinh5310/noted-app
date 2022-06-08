import { AppStore, AuthStore } from '../../context/zustand';
import { Text, TouchableOpacity, View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import { removeNoteFromStorage } from '../../utils/helpers';
import tw from 'twrnc';

const moment = require('moment');

function NoteItem({ data, navigation }) {
    const { local_id, name, content, lastUpdated, status, tags } = data;

    const { userData } = AuthStore((state) => ({
        userData: state.userData,
    }));

    const { setIsUpdate } = AppStore((state) => ({
        setIsUpdate: state.setIsUpdate,
    }));

    const handleDeleteNote = async () => {
        try {
            await removeNoteFromStorage(userData._id, local_id);
        } catch (error) {
            console.log(error);
        } finally {
            setIsUpdate();
        }
    };
    return (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate('Editor', { data, type: 'modify' })
            }
            style={tw`p-3 mb-3 bg-[#A8D7E0] rounded-lg`}
        >
            <View style={tw`flex-row items-center justify-between`}>
                <View style={tw`flex-row`}>
                    <Icon name="description" size={28} color="black"></Icon>
                    <Text style={tw`ml-1 text-[20px] font-bold`}>{name}</Text>
                </View>
                <TouchableOpacity onPress={() => handleDeleteNote()}>
                    <Icon name="delete" size={28} color="tomato"></Icon>
                </TouchableOpacity>
            </View>
            <Text style={tw`text-[17px] py-1 font-semibold`} numberOfLines={3}>
                {content}
            </Text>
            <View style={tw`flex-row justify-between text-slate-400`}>
                <Text style={tw`capitalize text-[16px] font-bold`}>
                    {status}
                </Text>
                <Text style={tw`text-[15px] font-bold`}>
                    {moment(lastUpdated).format('LLL')}
                </Text>
            </View>
            <View style={tw`flex flex-row mt-2`}>
                {tags.map((tag, index) => (
                    <Text
                        key={index}
                        style={tw`border-2 pl-3 pr-2 py-0.5 rounded-xl text-[15px] mr-1 text-white bg-[#384D95] font-bold`}
                    >
                        {tag}
                    </Text>
                ))}
            </View>
        </TouchableOpacity>
    );
}

export default NoteItem;
