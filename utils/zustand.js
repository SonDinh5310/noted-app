import create from "zustand";

export const AppStore = create((set) => ({
    toggleEdit: false,
    setToggleEdit: () => set((state) => ({ toggleEdit: !state.toggleEdit })),
}));
