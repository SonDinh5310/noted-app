import AsyncStorage from '@react-native-async-storage/async-storage';

// export const handleUserStorageCheck = async (user_id) => {
//     try {
//         const userStorage = await AsyncStorage.getItem(`noted-${user_id}`);
//         if (!userStorage) {
//             await AsyncStorage.setItem(`noted-${user_id}`, JSON.stringify({}));
//             console.log('create new storage');
//         }
//     } catch (error) {
//         console.log(error);
//     }
// };

// export const getAllNote = async (user_id) => {
//     try {
//         const res = await AsyncStorage.getItem(`noted-${user_id}`);
//         // setData();
//         // const notes = await JSON.parse(res);
//         // console.log('notes: ', notes);
//         return JSON.parse(res);
//         // return data;
//     } catch (error) {
//         console.log('error: ', error);
//     }
// };

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
