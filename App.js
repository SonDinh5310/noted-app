import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppContext } from './src/utils/context';
import SideMenu from './src/components/SideMenu/SideMenu';

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
