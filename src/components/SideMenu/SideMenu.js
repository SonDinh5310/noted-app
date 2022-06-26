import CustomDrawer from '../CustomDrawer/CustomDrawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Notes from '../../screens/Notes/Notes';
import React from 'react';
import Settings from '../../screens/Settings/Settings';
import UserProfile from '../../screens/UserProfile/UserProfile';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as DocumentPicker from 'expo-document-picker';
import { TouchableOpacity, View } from 'react-native';
import { importFile, updateLocal } from '../../utils/helpers';
import { AuthStore, AppStore } from '../../context/zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveNoteToStorage } from '../../utils/helpers';
import tw from 'twrnc';

const Drawer = createDrawerNavigator();

const SideMenu = ({ navigation }) => {
    const { userData } = AuthStore((state) => ({
        userData: state.userData,
    }));
    const { setIsUpdate, setIsLoading } = AppStore((state) => ({
        setIsUpdate: state.setIsUpdate,
        setIsLoading: state.setIsLoading,
    }));

    const handleDocumentSelection = async () => {
        const response = await DocumentPicker.getDocumentAsync({
            type: 'text/*',
        });
        if (response && response.type === 'success') {
            try {
                setIsLoading(true);
                await importFile(userData._id, response.name, response.uri);
            } catch (error) {
                console.log(error);
            } finally {
                setIsUpdate();
                setIsLoading(false);
            }
        }
    };
    const handleUpdateLocal = async () => {
        const userStorage = await AsyncStorage.getItem(`noted-${userData._id}`);
        const temp = JSON.parse(userStorage);
        const reqData = temp
            ? temp.map((note) => ({
                  lastUpdated: note.lastUpdated,
                  local_id: note.local_id,
              }))
            : [];
        try {
            setIsLoading(true);
            // console.log('updateLocal:', {
            //     owner: userData._id,
            //     notes: [...reqData],
            // });
            const res = await updateLocal({
                owner: userData._id,
                notes: [...reqData],
            });
            await saveNoteToStorage(userData._id, res.data, 'noted');
            // console.log('res:', res.data);
        } catch (error) {
            console.log('error:', error);
        } finally {
            setIsLoading(false);
        }
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
                        <View style={tw`flex flex-row`}>
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
                            <TouchableOpacity
                                style={tw`pr-5`}
                                onPress={() => handleUpdateLocal()}
                            >
                                <Icon
                                    name="cloud-download"
                                    size={28}
                                    color={color}
                                ></Icon>
                            </TouchableOpacity>
                        </View>
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
            {/* <Drawer.Screen
                name="Settings"
                component={Settings}
                options={{
                    drawerIcon: ({ color }) => (
                        <Icon name="settings" size={22} color={color}></Icon>
                    ),
                }}
            /> */}
        </Drawer.Navigator>
    );
};

export default SideMenu;
