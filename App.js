import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import SideMenu from './src/components/SideMenu/SideMenu';

export default function App() {
    return (
        <NavigationContainer>
            <StatusBar animated={true} backgroundColor="black" />
            <SideMenu></SideMenu>
        </NavigationContainer>
    );
}
