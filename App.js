import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import SideMenu from "./src/components/SideMenu/SideMenu";

export default function App() {
    return (
        <NavigationContainer>
            <SideMenu></SideMenu>
        </NavigationContainer>
    );
}
