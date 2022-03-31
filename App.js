import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NotedApp from "./NotedApp";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={NotedApp}
                    // options={{ headerShown: false }}
                ></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
