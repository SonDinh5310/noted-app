import React from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import tw from "twrnc";

function NoteItem({ data, navigation }) {
    const { name, content } = data;
    return (
        <View
            style={tw`p-3 mb-3 bg-[#A8D7E0] rounded-lg`}
            onPress={() => navigation.navigate("Editor", { data })}
        >
            <View style={tw`flex-row items-center`}>
                <Icon name="description" size={22} color="black"></Icon>
                <Text style={tw`ml-1 text-base`}>{name}</Text>
            </View>
            <Text style={tw`text-[15px] py-1`} numberOfLines={3}>
                {content}
            </Text>
            <View style={tw`flex-row justify-between text-slate-400`}>
                <Text>Cook | Ongoing</Text>
                <Text>05/04/2022</Text>
            </View>
        </View>
    );
}

export default NoteItem;
