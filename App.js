import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator } from 'react-native';
import { StatusBar } from 'react-native';
import { AuthStore, AppStore } from './src/context/zustand';
import SignIn from './src/screens/SignIn/SignIn';
import SignUp from './src/screens/SignUp/SignUp';
import SideMenu from './src/components/SideMenu/SideMenu';
import Editor from './src/components/Editor/Editor';

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
                    style={{ margin: 'auto' }}
                />
            )}
            {!isLoading && (
                <NavigationContainer>
                    <StatusBar animated={true} backgroundColor="black" />
                    <Stack.Navigator>
                        {userToken ? (
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
