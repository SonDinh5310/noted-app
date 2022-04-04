import React, { useContext, useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SignIn from "./signIn/signIn";
import SignUp from "./signUp/signUp";
import NotedApp from "../NotedApp";
import UserProfile from "./userProfile";
import Settings from "./settings";
import CustomDrawer from "./customDrawer";
import { AppContext } from "../utils/context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Drawer = createDrawerNavigator();

const SideMenu = () => {
    const { togglePreview, handleTogglePreview } = useContext(AppContext);
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
            <Drawer.Screen
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
                                flexDirection: "row",
                                alignItems: "center",
                                marginRight: 10,
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => handleTogglePreview()}
                            >
                                {togglePreview ? (
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
            />
        </Drawer.Navigator>
    );
};

export default SideMenu;
