import AsyncStorage from '@react-native-async-storage/async-storage';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import { v4 as uuidv4 } from 'uuid';
const axios = require('axios');
import { AuthStore, AppStore } from '../context/zustand';

export const removeNoteFromStorage = async (user_id, local_id, storage) => {
    // console.log('local_id:', local_id);
    try {
        const userStorage = await AsyncStorage.getItem(`${storage}-${user_id}`);
        if (userStorage && local_id) {
            const temp = JSON.parse(userStorage);
            let newData = [],
                tobeDeleteNote;
            temp.map((note) => {
                if (note.local_id === local_id) {
                    tobeDeleteNote = note;
                    return;
                }
                return newData.push(note);
            });

            if (storage === 'noted') {
                await saveNoteToStorage(user_id, tobeDeleteNote, 'noted-bin');
            }
            await AsyncStorage.setItem(
                `${storage}-${user_id}`,
                JSON.stringify(newData)
            );
        }
        return;
    } catch (error) {
        console.log('error: ', error);
    }
};

export const restoreNote = async (user_id, local_id) => {
    try {
        const recycleBin = await AsyncStorage.getItem(`noted-bin-${user_id}`);
        if (recycleBin && local_id) {
            const temp = JSON.parse(recycleBin);
            let toBeRestoreNote;
            temp.forEach((note, index) => {
                if (note.local_id === local_id) {
                    toBeRestoreNote = note;
                    temp.splice(index, 1);
                    return;
                }
            });
            // console.log('temp:', temp);
            await saveNoteToStorage(user_id, toBeRestoreNote, 'noted');
            await AsyncStorage.setItem(
                `noted-bin-${user_id}`,
                JSON.stringify(temp)
            );
            // await saveNoteToStorage(
            //     user_id,
            //     JSON.stringify(newData),
            //     'noted-bin'
            // );
        }
    } catch (error) {
        console.log('error: ', error);
    }
};

export const updateNoteToStorage = async (user_id, local_id, data) => {
    try {
        const userStorage = await AsyncStorage.getItem(`noted-${user_id}`);
        if (userStorage) {
            const temp = JSON.parse(userStorage);
            temp.forEach((note, index) => {
                if (note.local_id === local_id) {
                    temp.splice(index, 1, data);
                    return;
                }
            });

            await AsyncStorage.setItem(
                `noted-${user_id}`,
                JSON.stringify(temp)
            );
        }
    } catch (error) {
        console.log('error: ', error);
    }
};

export const saveNoteToStorage = async (user_id, data, storage) => {
    try {
        const userStorage = await AsyncStorage.getItem(`${storage}-${user_id}`);
        if (userStorage) {
            let temp = JSON.parse(userStorage);
            if (!Array.isArray(data)) {
                temp.unshift(data);
            }
            if (Array.isArray(data)) {
                data.forEach((note) => temp.unshift(note));
            }
            await AsyncStorage.setItem(
                `${storage}-${user_id}`,
                JSON.stringify(temp)
            );
            return;
        }
        await AsyncStorage.setItem(
            `${storage}-${user_id}`,
            JSON.stringify(Array.isArray(data) ? data : [data])
        );
    } catch (error) {
        console.log('error: ', error);
    }
};

export const backupNote = async (data) => {
    try {
        const res = await axios.post(
            'https://noted-app-backend.herokuapp.com/api/note/backup',
            data
        );
        console.log('res:', res);
    } catch (error) {
        console.log(error);
    }
};

export const updateLocal = async (data) => {
    try {
        const res = await axios.post(
            'https://noted-app-backend.herokuapp.com/api/note/update_local',
            data
        );
        // console.log('res:', res);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const clearAll = async () => {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        console.log('error: ', error);
    }

    console.log('...Done.');
};

export const exportFile = async (noteName, fileContent, fileType) => {
    const accessPermission = await Permissions.askAsync(
        Permissions.MEDIA_LIBRARY
    );

    if (accessPermission.status === 'granted') {
        try {
            const folderUri = FileSystem.documentDirectory + 'Noted/';
            await FileSystem.makeDirectoryAsync(folderUri, {
                intermediates: true,
            });
            // console.log('folderUri:', folderUri);
            const fileUri = `${folderUri}${noteName.replace(
                ' ',
                '-'
            )}.${fileType}`;
            // console.log('fileUri:', fileUri);
            await FileSystem.writeAsStringAsync(fileUri, fileContent, {
                encoding: FileSystem.EncodingType.UTF8,
            });
            const asset = await MediaLibrary.createAssetAsync(fileUri);
            // console.log('asset:', asset);
            const album = await MediaLibrary.getAlbumAsync('Exports');
            // console.log('album:', album);
            if (!album) {
                await MediaLibrary.createAlbumAsync('Exports', asset);
                // console.log('Done...');
            } else {
                await MediaLibrary.addAssetsToAlbumAsync(
                    asset,
                    'Exports',
                    false
                );
                // console.log('Done...');
            }
        } catch (error) {
            console.log(error);
        }
    }
};

export const importFile = async (user_id, fileName, fileUri) => {
    const fileContent = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.UTF8,
    });
    // console.log('fileContent:', fileContent);

    const id = uuidv4();
    const newData = {
        local_id: id,
        name: fileName.replace('-', ' ').split('.').slice(0, -1).join('.'), //replace '-' with ' ' && remove file extension
        status: null,
        tags: [],
        content: fileContent,
        lastUpdated: new Date(),
        createdAt: new Date(),
    };
    try {
        await saveNoteToStorage(user_id, newData, 'noted');
    } catch (error) {
        console.log(error);
    }
};
