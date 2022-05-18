import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import tw from 'twrnc';

function CustomButton({ title, func }) {
    return (
        <TouchableOpacity
            onPress={func}
            style={tw`rounded-lg bg-[#EC7160] mt-5`}
        >
            <Text style={tw`mx-auto py-4 text-white text-base`}>{title}</Text>
        </TouchableOpacity>
    );
}

export default CustomButton;
