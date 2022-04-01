import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SideMenu from './components/sideMenu';
import { AppContext } from './utils/context';

export default function App() {
    const [togglePreview, setTogglePreview] = useState(false);
    const handleTogglePreview = () => {
        setTogglePreview(!togglePreview);
    };
    return (
        <AppContext.Provider value={{ togglePreview, handleTogglePreview }}>
            <NavigationContainer>
                <SideMenu></SideMenu>
            </NavigationContainer>
        </AppContext.Provider>
    );
}
