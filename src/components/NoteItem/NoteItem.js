import { AppStore, AuthStore } from '../../context/zustand';
import { Text, TouchableOpacity, View, Alert } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import {
    removeNoteFromStorage,
    restoreNote,
    exportFile,
    backupNote,
} from '../../utils/helpers';
import tw from 'twrnc';

const moment = require('moment');

function NoteItem({ data, navigation, type }) {
    const { local_id, name, content, lastUpdated, createdAt, status, tags } =
        data;

    const { userData } = AuthStore((state) => ({
        userData: state.userData,
    }));

    const { setIsUpdate } = AppStore((state) => ({
        setIsUpdate: state.setIsUpdate,
    }));

    const handleDeleteNote = async (storage) => {
        try {
            // Alert.alert(
            //     'User Confirm',
            //     `This will delete the note from ${
            //         storage === 'noted' ? 'note list' : 'recycle bin'
            //     }`,
            //     [
            //         { text: 'Cancel' },
            //         {
            //             text: 'Confirm',
            //         },
            //     ]
            // );
            await removeNoteFromStorage(userData._id, local_id, storage);
        } catch (error) {
            console.log(error);
        } finally {
            setIsUpdate();
        }
    };
    const handleRestoreNote = async () => {
        try {
            await restoreNote(userData._id, local_id);
        } catch (error) {
            console.log(error);
        } finally {
            setIsUpdate();
        }
    };
    const handleExportNote = async () => {
        try {
            await exportFile(name, content, 'txt');
        } catch (error) {
            console.log(error);
        }
    };
    const handleBackupNote = async () => {
        try {
            await backupNote({
                owner: userData._id,
                local_id: local_id,
                name: name,
                content: content,
                tags: tags,
                status: status,
                lastUpdated: lastUpdated,
                createdAt: createdAt,
            });
        } catch (error) {
            console(error);
        }
    };
    return (
        <TouchableOpacity
            onPress={
                navigation
                    ? () =>
                          navigation.navigate('Editor', {
                              data,
                              type: 'modify',
                          })
                    : null
            }
            style={tw`p-3 mb-3 bg-[#A8D7E0] rounded-lg`}
        >
            <View style={tw`flex-row items-center justify-between`}>
                <View style={tw`flex-row`}>
                    <Icon name="description" size={28} color="black"></Icon>
                    <Text style={tw`ml-1 text-[20px] font-bold`}>{name}</Text>
                </View>
                {type === 'note' && (
                    <View style={tw`flex-row`}>
                        <TouchableOpacity
                            style={tw`mr-3`}
                            onPress={() => handleExportNote()}
                        >
                            <Icon
                                name="file-upload"
                                size={28}
                                color="blue"
                            ></Icon>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={tw`mr-3`}
                            onPress={() => handleBackupNote()}
                        >
                            <Icon name="backup" size={28} color="white"></Icon>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleDeleteNote('noted')}
                        >
                            <Icon name="delete" size={28} color="tomato"></Icon>
                        </TouchableOpacity>
                    </View>
                )}
                {type === 'deleted_note' && (
                    <View style={tw`flex-row`}>
                        <TouchableOpacity
                            style={tw`mr-3`}
                            onPress={() => handleRestoreNote()}
                        >
                            <Icon
                                name="restore-from-trash"
                                size={28}
                                color="green"
                            ></Icon>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleDeleteNote('noted-bin')}
                        >
                            <Icon name="delete" size={28} color="tomato"></Icon>
                        </TouchableOpacity>
                    </View>
                )}
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
                {tags?.map((tag, index) => (
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
