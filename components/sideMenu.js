import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SingIn from "./signIn/signIn";
import SignUp from "./signUp/signUp";

const Drawer = createDrawerNavigator();

const SideMenu = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="SignIn" component={SingIn} />
            <Drawer.Screen name="SignUp" component={SignUp} />
        </Drawer.Navigator>
    );
};

export default SideMenu;
