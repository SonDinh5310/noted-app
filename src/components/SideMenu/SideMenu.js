import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AppStore } from '../../context/zustand';
import { TouchableOpacity, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import UserProfile from '../../screens/UserProfile/UserProfile';
import Notes from '../../screens/Notes/Notes';
import Settings from '../../screens/Settings/Settings';
import CustomDrawer from '../CustomDrawer/CustomDrawer';

const Drawer = createDrawerNavigator();

const SideMenu = () => {
    // const { toggleEdit, setToggleEdit } = AppStore((state) => ({
    //     toggleEdit: state.toggleEdit,
    //     setToggleEdit: state.setToggleEdit,
    // }));
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={{
                drawerLabelStyle: { marginLeft: -20 },
            }}
        >
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
        </Drawer.Navigator>
    );
};

export default SideMenu;
