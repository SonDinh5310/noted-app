import AsyncStorage from '@react-native-async-storage/async-storage';

export const handleUserStorageCheck = async (user_id) => {
    try {
        const userStorage = await AsyncStorage.getItem(`noted-${user_id}`);
        console.log(userStorage);
        if (!userStorage) {
            await AsyncStorage.setItem(`noted-${id}`, JSON.stringify({}));
            console.log('create new storage');
        }
    } catch (error) {
        console.log(error);
    }
};

export const getAllNote = async (user_id) => {
    try {
        const notes = await AsyncStorage.getItem(`noted-${user_id}`);
        return JSON.parse(notes);
    } catch (error) {
        console.log(error);
    }
};

export const saveNoteToStorage = async (user_id, note_id, data) => {
    try {
        const userStorage = await AsyncStorage.getItem(`noted-${user_id}`);
        await AsyncStorage.setItem(`noted-${user_id}`, {
            ...userStorage,
            [note_id]: data,
        });
    } catch (error) {
        console.log(error);
    }
};
