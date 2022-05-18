import React from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/MaterialIcons';

function NotesList() {
    return (
        <View style={tw`w-full h-full flex `}>
            <View style={tw`mb-2 flex-row justify-between`}>
                <TouchableOpacity>
                    <Text>All Notes</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>Categories</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>Highlighted</Text>
                </TouchableOpacity>
            </View>

            <View style={tw`flex-grow`}>
                <ScrollView>
                    <View style={tw`p-3 mb-3 bg-[#A8D7E0] rounded-lg`}>
                        <View style={tw`flex-row items-center`}>
                            <Icon
                                name="description"
                                size={22}
                                color="black"
                            ></Icon>
                            <Text style={tw`ml-1 text-base`}>Cooking task</Text>
                        </View>
                        <Text style={tw`text-[15px] py-1`} numberOfLines={3}>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Est aut similique, hic voluptatem rerum
                            obcaecati quia dolore eum provident quibusdam
                            architecto nam veniam dolorem modi quis earum rem
                            neque explicabo?
                        </Text>
                        <View
                            style={tw`flex-row justify-between text-slate-400`}
                        >
                            <Text>Cook | Ongoing</Text>
                            <Text>05/04/2022</Text>
                        </View>
                    </View>
                    <View style={tw`p-3 mb-3 bg-[#A8D7E0] rounded-lg`}>
                        <View style={tw`flex flex-row items-center`}>
                            <Icon
                                name="description"
                                size={22}
                                color="black"
                            ></Icon>
                            <Text style={tw`ml-1 text-base`}>Cooking task</Text>
                        </View>
                        <Text style={tw`text-[15px] py-1`} numberOfLines={3}>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Est aut similique, hic voluptatem rerum
                            obcaecati quia dolore eum provident quibusdam
                            architecto nam veniam dolorem modi quis earum rem
                            neque explicabo?
                        </Text>
                        <View
                            style={tw`flex-row justify-between text-slate-400`}
                        >
                            <Text>Cook | Ongoing</Text>
                            <Text>05/04/2022</Text>
                        </View>
                    </View>
                    <View style={tw`p-3 mb-3 bg-[#A8D7E0] rounded-lg`}>
                        <View style={tw`flex-row items-center`}>
                            <Icon
                                name="description"
                                size={22}
                                color="black"
                            ></Icon>
                            <Text style={tw`ml-1 text-base`}>Cooking task</Text>
                        </View>
                        <Text style={tw`text-[15px] py-1`} numberOfLines={3}>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Est aut similique, hic voluptatem rerum
                            obcaecati quia dolore eum provident quibusdam
                            architecto nam veniam dolorem modi quis earum rem
                            neque explicabo?
                        </Text>
                        <View
                            style={tw`flex-row justify-between text-slate-400`}
                        >
                            <Text>Cook | Ongoing</Text>
                            <Text>05/04/2022</Text>
                        </View>
                    </View>
                    <View style={tw`p-3 mb-3 bg-[#A8D7E0] rounded-lg`}>
                        <View style={tw`flex-row items-center`}>
                            <Icon
                                name="description"
                                size={22}
                                color="black"
                            ></Icon>
                            <Text style={tw`ml-1 text-base`}>Cooking task</Text>
                        </View>
                        <Text style={tw`text-[15px] py-1`} numberOfLines={3}>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Est aut similique, hic voluptatem rerum
                            obcaecati quia dolore eum provident quibusdam
                            architecto nam veniam dolorem modi quis earum rem
                            neque explicabo?
                        </Text>
                        <View
                            style={tw`flex-row justify-between text-slate-400`}
                        >
                            <Text>Cook | Ongoing</Text>
                            <Text>05/04/2022</Text>
                        </View>
                    </View>
                    <View style={tw`p-3 mb-3 bg-[#A8D7E0] rounded-lg`}>
                        <View style={tw`flex-row items-center`}>
                            <Icon
                                name="description"
                                size={22}
                                color="black"
                            ></Icon>
                            <Text style={tw`ml-1 text-base`}>Cooking task</Text>
                        </View>
                        <Text style={tw`text-[15px] py-1`} numberOfLines={3}>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Est aut similique, hic voluptatem rerum
                            obcaecati quia dolore eum provident quibusdam
                            architecto nam veniam dolorem modi quis earum rem
                            neque explicabo?
                        </Text>
                        <View
                            style={tw`flex-row justify-between text-slate-400`}
                        >
                            <Text>Cook | Ongoing</Text>
                            <Text>05/04/2022</Text>
                        </View>
                    </View>
                    <View style={tw`p-3 mb-3 bg-[#A8D7E0] rounded-lg`}>
                        <View style={tw`flex-row items-center`}>
                            <Icon
                                name="description"
                                size={22}
                                color="black"
                            ></Icon>
                            <Text style={tw`ml-1 text-base`}>Cooking task</Text>
                        </View>
                        <Text style={tw`text-[15px] py-1`} numberOfLines={3}>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Est aut similique, hic voluptatem rerum
                            obcaecati quia dolore eum provident quibusdam
                            architecto nam veniam dolorem modi quis earum rem
                            neque explicabo?
                        </Text>
                        <View
                            style={tw`flex-row justify-between text-slate-400`}
                        >
                            <Text>Cook | Ongoing</Text>
                            <Text>05/04/2022</Text>
                        </View>
                    </View>
                    <View style={tw`p-3 mb-3 bg-[#A8D7E0] rounded-lg`}>
                        <View style={tw`flex-row items-center`}>
                            <Icon
                                name="description"
                                size={22}
                                color="black"
                            ></Icon>
                            <Text style={tw`ml-1 text-base`}>Cooking task</Text>
                        </View>
                        <Text style={tw`text-[15px] py-1`} numberOfLines={3}>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Est aut similique, hic voluptatem rerum
                            obcaecati quia dolore eum provident quibusdam
                            architecto nam veniam dolorem modi quis earum rem
                            neque explicabo?
                        </Text>
                        <View
                            style={tw`flex-row justify-between text-slate-400`}
                        >
                            <Text>Cook | Ongoing</Text>
                            <Text>05/04/2022</Text>
                        </View>
                    </View>
                    <View style={tw`p-3 mb-3 bg-[#A8D7E0] rounded-lg`}>
                        <View style={tw`flex-row items-center`}>
                            <Icon
                                name="description"
                                size={22}
                                color="black"
                            ></Icon>
                            <Text style={tw`ml-1 text-base`}>Cooking task</Text>
                        </View>
                        <Text style={tw`text-[15px] py-1`} numberOfLines={3}>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Est aut similique, hic voluptatem rerum
                            obcaecati quia dolore eum provident quibusdam
                            architecto nam veniam dolorem modi quis earum rem
                            neque explicabo?
                        </Text>
                        <View
                            style={tw`flex-row justify-between text-slate-400`}
                        >
                            <Text>Cook | Ongoing</Text>
                            <Text>05/04/2022</Text>
                        </View>
                    </View>
                    <View style={tw`p-3 mb-3 bg-[#A8D7E0] rounded-lg`}>
                        <View style={tw`flex-row items-center`}>
                            <Icon
                                name="description"
                                size={22}
                                color="black"
                            ></Icon>
                            <Text style={tw`ml-1 text-base`}>Cooking task</Text>
                        </View>
                        <Text style={tw`text-[15px] py-1`} numberOfLines={3}>
                            something something
                        </Text>
                        <View
                            style={tw`flex-row justify-between text-slate-400`}
                        >
                            <Text>Cook | Ongoing</Text>
                            <Text>05/04/2022</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

export default NotesList;
