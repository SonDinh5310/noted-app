import create from 'zustand';

export const AppStore = create((set) => ({
    isLoading: false,
    setIsLoading: (value) => set((state) => ({ isLoading: value })),
    toggleEdit: false,
    setToggleEdit: () => set((state) => ({ toggleEdit: !state.toggleEdit })),
    togglePreview: false,
    setTogglePreview: () =>
        set((state) => ({ togglePreview: !state.togglePreview })),
}));
