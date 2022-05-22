import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import tw from 'twrnc';

function CustomFloatingButton() {
    return (
        <View
            style={tw`w-18 h-18 rounded-full absolute bottom-34 right-[-5px] bg-[#384D95]`}
        >
            <TouchableOpacity
                style={tw`justify-center items-center h-full w-full`}
            >
                <Icon name="note-add" size={33} color="white" />
            </TouchableOpacity>
        </View>
    );
}

export default CustomFloatingButton;
