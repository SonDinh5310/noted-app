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
}));

export const AuthStore = create(
    persist(
        (set) => ({
            userToken: null,
            setUserToken: (token) => set(() => ({ userToken: token })),
        }),
        {
            name: 'local-storage',
            getStorage: () => AsyncStorage,
        }
    )
);
