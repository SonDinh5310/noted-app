import AsyncStorage from '@react-native-async-storage/async-storage';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

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
            await removeNoteFromStorage(user_id, local_id, 'noted');
            await saveNoteToStorage(user_id, data, 'noted');
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
            temp.unshift(data);
            await AsyncStorage.setItem(
                `${storage}-${user_id}`,
                JSON.stringify(temp)
            );
            return;
        }
        await AsyncStorage.setItem(
            `${storage}-${user_id}`,
            JSON.stringify([data])
        );
    } catch (error) {
        console.log('error: ', error);
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
    const [status, requestPermission] = MediaLibrary.usePermissions();
    // if (status.accessPrivileges === 'none') {
    //     console.log(await requestPermission());
    //     // await requestPermission();
    // }
    if (status.accessPrivileges === 'all') {
        const fileUri =
            FileSystem.documentDirectory + `${noteName}.${fileType}`;
        await FileSystem.writeAsStringAsync(fileUri, fileContent, {
            encoding: 'utf8',
        });
        const asset = await MediaLibrary.createAssetAsync(fileUri);
        await MediaLibrary.createAlbumAsync('Noted Exports', asset, false);
    }
};
