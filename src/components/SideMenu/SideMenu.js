import React from "react";
import shallow from "zustand/shallow";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { AppStore } from "../../utils/zustand";
import { TouchableOpacity, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import SignIn from "../../screens/SignIn/SignIn";
import SignUp from "../../screens/SignUp/SignUp";
import NotedApp from "../../../NotedApp";
import UserProfile from "../../screens/UserProfile/UserProfile";
import Notes from "../../screens/Notes/Notes";
import Settings from "../../screens/Settings/Settings";
import CustomDrawer from "../CustomDrawer/CustomDrawer";

const Drawer = createDrawerNavigator();

const SideMenu = () => {
    const { toggleEdit, setToggleEdit } = AppStore(
        (state) => ({
            toggleEdit: state.toggleEdit,
            setToggleEdit: state.setToggleEdit,
        }),
        shallow
    );
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={{
                // headerShown: false,
                drawerLabelStyle: { marginLeft: -20 },
            }}
        >
            <Drawer.Screen
                name="Profile"
                component={UserProfile}
                options={{
                    drawerIcon: ({ color }) => (
                        <MaterialIcons
                            name="person"
                            size={22}
                            color={color}
                        ></MaterialIcons>
                    ),
                }}
            />
            <Drawer.Screen
                name="Sign In"
                component={SignIn}
                options={{
                    headerShown: false,
                    drawerIcon: ({ color }) => (
                        <MaterialIcons
                            name="login"
                            size={22}
                            color={color}
                        ></MaterialIcons>
                    ),
                }}
            />
            <Drawer.Screen
                name="Sign Up"
                component={SignUp}
                options={{
                    headerShown: false,
                    drawerIcon: ({ color }) => (
                        <MaterialIcons
                            name="assignment"
                            size={22}
                            color={color}
                        ></MaterialIcons>
                    ),
                }}
            />
            <Drawer.Screen
                name="Settings"
                component={Settings}
                options={{
                    drawerIcon: ({ color }) => (
                        <MaterialIcons
                            name="settings"
                            size={22}
                            color={color}
                        ></MaterialIcons>
                    ),
                }}
            />
            {/* <Drawer.Screen
                name="Note"
                component={NotedApp}
                options={{
                    drawerIcon: ({ color }) => (
                        <MaterialIcons
                            name="description"
                            size={22}
                            color={color}
                        ></MaterialIcons>
                    ),
                    headerRight: ({ color }) => (
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginRight: 10,
                            }}
                        >
                            <TouchableOpacity onPress={() => setToggleEdit()}>
                                {toggleEdit ? (
                                    <MaterialIcons
                                        name="edit"
                                        size={22}
                                        color={color}
                                    ></MaterialIcons>
                                ) : (
                                    <MaterialIcons
                                        name="play-arrow"
                                        size={28}
                                        color={color}
                                    ></MaterialIcons>
                                )}
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginLeft: 10 }}>
                                <MaterialIcons
                                    name="more-vert"
                                    size={25}
                                    color={color}
                                ></MaterialIcons>
                            </TouchableOpacity>
                        </View>
                    ),
                }}
            /> */}
            <Drawer.Screen
                name="Notes"
                component={Notes}
                options={{
                    drawerIcon: ({ color }) => (
                        <MaterialIcons
                            name="description"
                            size={22}
                            color={color}
                        ></MaterialIcons>
                    ),
                }}
            />
        </Drawer.Navigator>
    );
};

export default SideMenu;
