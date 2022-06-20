import CustomDrawer from '../CustomDrawer/CustomDrawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Notes from '../../screens/Notes/Notes';
import React from 'react';
import Settings from '../../screens/Settings/Settings';
import UserProfile from '../../screens/UserProfile/UserProfile';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as DocumentPicker from 'expo-document-picker';
import { TouchableOpacity } from 'react-native';
import { importFile } from '../../utils/helpers';
import { AuthStore, AppStore } from '../../context/zustand';
import tw from 'twrnc';

const Drawer = createDrawerNavigator();

const SideMenu = ({ navigation }) => {
    // console.log('pickerResponse:', pickerResponse);
    const { userData } = AuthStore((state) => ({
        userData: state.userData,
    }));
    const { setIsUpdate } = AppStore((state) => ({
        setIsUpdate: state.setIsUpdate,
    }));

    const handleDocumentSelection = async () => {
        const response = await DocumentPicker.getDocumentAsync({
            type: 'text/*',
        });
        if (response && response.type === 'success') {
            try {
                await importFile(userData._id, response.name, response.uri);
            } catch (error) {
                console.log(error);
            } finally {
                setIsUpdate();
            }
        }
        // console.log(response);
    };
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
                        <Icon name="description" size={22} color={color}></Icon>
                    ),
                    headerRight: ({ color }) => (
                        <TouchableOpacity
                            style={tw`pr-5`}
                            onPress={() => handleDocumentSelection()}
                        >
                            <Icon
                                name="file-download"
                                size={28}
                                color={color}
                            ></Icon>
                        </TouchableOpacity>
                    ),
                }}
            />
            <Drawer.Screen
                name="Profile"
                component={UserProfile}
                options={{
                    drawerIcon: ({ color }) => (
                        <Icon name="person" size={22} color={color}></Icon>
                    ),
                }}
            />
            <Drawer.Screen
                name="Recycle Bin"
                initialParams={{ type: 'deleted_note' }}
                component={Notes}
                options={{
                    drawerIcon: ({ color }) => (
                        <Icon name="delete" size={22} color={color}></Icon>
                    ),
                }}
            />
            <Drawer.Screen
                name="Settings"
                component={Settings}
                options={{
                    drawerIcon: ({ color }) => (
                        <Icon name="settings" size={22} color={color}></Icon>
                    ),
                }}
            />
        </Drawer.Navigator>
    );
};

export default SideMenu;
