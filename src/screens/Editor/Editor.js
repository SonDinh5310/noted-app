import 'react-native-get-random-values';
import React, { useState } from 'react';
import { Alert, ScrollView, TextInput } from 'react-native';
import { AppStore, AuthStore } from '../../context/zustand';
import { saveNoteToStorage, updateNoteToStorage } from '../../utils/helpers';
import CustomFloatingButton from '../../components/CustomFloatingButton/CustomFloatingButton';
import CustomDropdown from '../../components/CustomDropdown/CustomDropdown';
import CustomTagsInput from '../../components/CustomTagsInput/CustomTagsInput';
import tw from 'twrnc';
import { v4 as uuidv4 } from 'uuid';

const Editor = ({ navigation, route }) => {
    const { type, data: noteData } = route.params;

    const [title, setTitle] = useState(noteData ? noteData.name : '');
    const [data, setData] = useState(noteData ? noteData.content : '');
    const [status, setStatus] = useState(noteData ? noteData.status : '');
    const [tags, setTags] = useState({
        tag: '',
        tagsArray: noteData ? noteData.tags : [],
    });

    const { userData } = AuthStore((state) => ({
        userData: state.userData,
    }));
    const { setIsUpdate } = AppStore((state) => ({
        setIsUpdate: state.setIsUpdate,
    }));

    const handleChangeTitle = (value) => {
        return setTitle(value);
    };
    const handleChangeData = (value) => {
        return setData(value);
    };
    const handleStatusChange = (value) => {
        setStatus(value);
    };
    const handleTagsChange = (value) => {
        setTags(value);
    };
    const handleSave = async () => {
        if (!title) {
            return Alert.alert(
                'Title missing',
                'Give your note a name!',
                [
                    {
                        text: 'OK',
                        style: 'cancel',
                    },
                ],
                { cancelable: true }
            );
        }

        try {
            if (type === 'modify') {
                await updateNoteToStorage(userData._id, noteData.local_id, {
                    local_id: noteData.local_id,
                    name: title,
                    status: status,
                    tags: tags.tagsArray,
                    content: data,
                    lastUpdated: new Date().toISOString(),
                    createdAt: noteData.createdAt,
                });
            }
            if (type === 'create') {
                const id = uuidv4();
                await saveNoteToStorage(
                    userData._id,
                    {
                        local_id: id,
                        name: title,
                        status: status,
                        tags: tags.tagsArray,
                        content: data,
                        lastUpdated: new Date().toISOString(),
                        createdAt: new Date().toISOString(),
                    },
                    'noted'
                );
            }
        } catch (error) {
            console.log('error: ', error);
        } finally {
            setIsUpdate();
            navigation.goBack();
        }
    };

    return (
        <>
            <ScrollView style={tw`bg-white`} contentContainerStyle={tw`p-5`}>
                <TextInput
                    placeholder="Give your note a title..."
                    style={tw`text-[20px] mb-2 p-2 bg-white font-bold border-b-2 border-b-slate-200`}
                    value={title}
                    onChangeText={(text) => handleChangeTitle(text, 'title')}
                />
                <CustomDropdown
                    status={status}
                    placeholder={{
                        label: 'Select note status ...',
                        value: null,
                    }}
                    handleStatusChange={handleStatusChange}
                />
                <CustomTagsInput
                    tags={tags}
                    handleTagsChange={handleTagsChange}
                />
                <TextInput
                    multiline={true}
                    placeholder="Write your note here..."
                    style={tw.style(
                        'h-full',
                        'bg-white',
                        'text-[18px]',
                        'px-2',
                        'pt-2',
                        {
                            textAlignVertical: 'top',
                        }
                    )}
                    value={data}
                    onChangeText={(text) => handleChangeData(text, 'data')}
                ></TextInput>
            </ScrollView>
            <CustomFloatingButton
                name="done"
                size={33}
                onPress={() => handleSave()}
            />
        </>
    );
};

export default Editor;
