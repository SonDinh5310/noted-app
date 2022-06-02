import { AppStore, AuthStore } from './src/context/zustand';

import { ActivityIndicator } from 'react-native';
import Editor from './src/screens/Editor/Editor';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import SideMenu from './src/components/SideMenu/SideMenu';
import SignIn from './src/screens/SignIn/SignIn';
import SignUp from './src/screens/SignUp/SignUp';
import { StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import tw from 'twrnc';

const Stack = createNativeStackNavigator();

export default function App() {
    const { userToken } = AuthStore((state) => ({
        userToken: state.userToken,
    }));

    const { isLoading } = AppStore((state) => ({
        isLoading: state.isLoading,
    }));
    return (
        <>
            {isLoading && (
                <ActivityIndicator
                    size="large"
                    color="#0000ff"
                    style={tw`my-auto h-full`}
                />
            )}
            {!isLoading && (
                <NavigationContainer>
                    <StatusBar animated={true} backgroundColor="black" />
                    <Stack.Navigator>
                        {userToken && userToken !== undefined ? (
                            <>
                                <Stack.Screen
                                    name="Side Menu"
                                    component={SideMenu}
                                    options={{ headerShown: false }}
                                />
                                <Stack.Screen
                                    name="Editor"
                                    component={Editor}
                                    options={{ title: '' }}
                                />
                            </>
                        ) : (
                            <>
                                <Stack.Screen
                                    name="Sign In"
                                    component={SignIn}
                                    options={{ headerShown: false }}
                                />
                                <Stack.Screen
                                    name="Sign Up"
                                    component={SignUp}
                                    options={{ headerShown: false }}
                                />
                            </>
                        )}
                    </Stack.Navigator>
                </NavigationContainer>
            )}
        </>
    );
}
