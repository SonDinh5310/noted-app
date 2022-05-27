import create from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppStore = create((set) => ({
    isLoading: false,
    setIsLoading: (value) => set(() => ({ isLoading: value })),
    toggleEdit: false,
    setToggleEdit: () => set((state) => ({ toggleEdit: !state.toggleEdit })),
    togglePreview: false,
    setTogglePreview: () =>
        set((state) => ({ togglePreview: !state.togglePreview })),
    isUpdate: false,
    setIsUpdate: () => set((state) => ({ isUpdate: !state.isUpdate })),
}));

export const AuthStore = create(
    persist(
        (set) => ({
            userToken: null,
            setUserToken: (token) => set(() => ({ userToken: token })),
            userData: null,
            setUserData: (data) => set(() => ({ userData: data })),
        }),
        {
            name: 'local-storage',
            getStorage: () => AsyncStorage,
        }
    )
);