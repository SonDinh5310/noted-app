import CustomDrawer from '../CustomDrawer/CustomDrawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Notes from '../../screens/Notes/Notes';
import React from 'react';
import Settings from '../../screens/Settings/Settings';
import UserProfile from '../../screens/UserProfile/UserProfile';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const SideMenu = ({ navigation }) => {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={{
                drawerLabelStyle: { marginLeft: -20 },
            }}
        >
            <Drawer.Screen
                name="Notes"
                initialParams={{ type: 'note' }}
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
                name="Recycle Bin"
                initialParams={{ type: 'deleted_note' }}
                component={Notes}
                options={{
                    drawerIcon: ({ color }) => (
                        <MaterialIcons
                            name="delete"
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
        </Drawer.Navigator>
    );
};

export default SideMenu;
