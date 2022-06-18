import AsyncStorage from "@react-native-async-storage/async-storage";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";

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

            if (storage === "noted") {
                await saveNoteToStorage(user_id, tobeDeleteNote, "noted-bin");
            }
            await AsyncStorage.setItem(
                `${storage}-${user_id}`,
                JSON.stringify(newData)
            );
        }
        return;
    } catch (error) {
        console.log("error: ", error);
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
            await saveNoteToStorage(user_id, toBeRestoreNote, "noted");
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
        console.log("error: ", error);
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
        console.log("error: ", error);
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
        console.log("error: ", error);
    }
};

export const clearAll = async () => {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        console.log("error: ", error);
    }

    console.log("...Done.");
};

export const exportFile = async (noteName, fileContent, fileType) => {
    // const request = await MediaLibrary.getPermissionsAsync();
    // console.group(request);
    const accessPermission = await MediaLibrary.requestPermissionsAsync();
    console.log(accessPermission);
    //    if (!request.status) {
    //         accessPermission = await MediaLibrary.requestPermissionsAsync();
    //         console.log("accessPeermission:", accessPermission);
    //     }
    if (accessPermission.status === "granted") {
        try {
            const fileUri = `${FileSystem.documentDirectory}${noteName.replace(
                /\s+/g,
                "-"
            )}.${fileType}`;
            console.log("fileUri:", fileUri);
            // await FileSystem.writeAsStringAsync(fileUri, fileContent, {
            //     encoding: FileSystem.EncodingType.UTF8,
            // });
            const asset = await MediaLibrary.createAssetAsync(fileUri);
            console.log("asset:", asset);
            await MediaLibrary.createAlbumAsync("Noted_Exports", asset, false);
        } catch (error) {
            console.log(error);
        }
    }
};
