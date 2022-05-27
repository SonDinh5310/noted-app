import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import NoteItem from '../NoteItem/NoteItem';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthStore, AppStore } from '../../context/zustand';
import { getAllNote } from '../../utils/helpers';

function NotesList() {
    const [notes, setNotes] = useState([]);

    const { userData } = AuthStore((state) => ({
        userData: state.userData,
    }));

    const { isUpdate } = AppStore((state) => ({
        isUpdate: state.userData,
    }));

    useEffect(() => {
        const getNotes = async () => {
            try {
                const res = await AsyncStorage.getItem(`noted-${userData._id}`);
                const notes = JSON.parse(res);
                setNotes(notes);
            } catch (error) {
                console.log(error);
            }
        };
        getNotes();
    }, [isUpdate]);
    console.log('noteslist: ', notes);
    return (
        <View style={tw`w-full h-full flex `}>
            <View style={tw`mb-2 flex-row justify-around`}>
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

            <View style={tw`h-4/5`}>
                <ScrollView style={tw`h-full`}>
                    {notes &&
                        notes.map((note) => (
                            <NoteItem data={note} key={note.local_id} />
                        ))}
                    {/* <View style={tw`p-3 mb-3 bg-[#A8D7E0] rounded-lg`}>
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
                    </View> */}
                </ScrollView>
            </View>
        </View>
    );
}

export default NotesList;
