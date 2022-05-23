import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import tw from 'twrnc';

function CustomFloatingButton({ name, size, onPress }) {
    return (
        <View
            style={tw`w-16 h-16 rounded-full absolute bottom-4 right-5 bg-[#384D95]`}
        >
            <TouchableOpacity
                style={tw`justify-center items-center h-full w-full`}
                onPress={onPress}
            >
                <Icon name={name} size={size} color="white" />
            </TouchableOpacity>
        </View>
    );
}

export default CustomFloatingButton;
