import AsyncStorage from '@react-native-async-storage/async-storage';

export const removeNoteFromStorage = async (user_id, local_id) => {
    console.log('local_id:', local_id);
    try {
        const userStorage = await AsyncStorage.getItem(`noted-${user_id}`);
        if (userStorage && local_id) {
            const temp = JSON.parse(userStorage);
            const newData = temp.filter((note) => note.local_id !== local_id);
            console.log('newData:', newData);
            await AsyncStorage.setItem(
                `noted-${user_id}`,
                JSON.stringify(newData)
            );
        }
        return;
    } catch (error) {
        console.log(error);
    }
};

export const updateNoteToStorage = async (user_id, local_id, data) => {
    try {
        const userStorage = await AsyncStorage.getItem(`noted-${user_id}`);
        if (userStorage) {
            await removeNoteFromStorage(user_id, local_id);
            await saveNoteToStorage(user_id, data);
        }
    } catch (error) {
        console.log('error: ', error);
    }
};

export const saveNoteToStorage = async (user_id, data) => {
    try {
        const userStorage = await AsyncStorage.getItem(`noted-${user_id}`);
        if (userStorage) {
            let temp = JSON.parse(userStorage);
            temp.unshift(data);
            await AsyncStorage.setItem(
                `noted-${user_id}`,
                JSON.stringify(temp)
            );
            return;
        }
        await AsyncStorage.setItem(`noted-${user_id}`, JSON.stringify([data]));
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
