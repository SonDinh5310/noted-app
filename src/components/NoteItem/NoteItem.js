import { Text, View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import tw from 'twrnc';

const moment = require('moment');

function NoteItem({ data, navigation }) {
    const { name, content, createdAt } = data;
    return (
        <View
            onPress={() => navigation.navigate('Editor', { data })}
            style={tw`p-3 mb-3 bg-[#A8D7E0] rounded-lg`}
        >
            <View style={tw`flex-row items-center`}>
                <Icon name="description" size={28} color="black"></Icon>
                <Text style={tw`ml-1 text-[20px] font-bold`}>{name}</Text>
            </View>
            <Text style={tw`text-[17px] py-1`} numberOfLines={3}>
                {content}
            </Text>
            <View style={tw`flex-row justify-between text-slate-400`}>
                <Text>Cook | Ongoing</Text>
                <Text>{moment(createdAt).format('LLL')}</Text>
            </View>
        </View>
    );
}

export default NoteItem;
