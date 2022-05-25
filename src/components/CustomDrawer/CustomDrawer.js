import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import { AuthStore } from '../../context/zustand';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CustomDrawer = (props) => {
    const { userToken, setUserToken } = AuthStore((state) => ({
        userToken: state.userToken,
        setUserToken: state.setUserToken,
    }));
    const handleSignOut = () => {
        setUserToken(null);
    };
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{ backgroundColor: 'lightblue' }}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 10,
                    }}
                >
                    <Image
                        source={{
                            uri: 'https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png',
                        }}
                        style={{
                            height: 50,
                            width: 50,
                            borderRadius: 25,
                            marginBottom: 10,
                        }}
                    />
                    <Text
                        style={{
                            color: '#fff',
                            fontSize: 18,
                            marginLeft: 15,
                            marginTop: -10,
                        }}
                    >
                        ANON
                    </Text>
                </View>
                <View
                    style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}
                >
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <View
                style={{
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderTopWidth: 1,
                    borderTopColor: '#ccc',
                }}
            >
                <TouchableOpacity
                    style={{ paddingVertical: 15 }}
                    onPress={() => handleSignOut()}
                >
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        <MaterialIcons
                            name="logout"
                            size={22}
                            color
                        ></MaterialIcons>
                        <Text style={{ fontSize: 15, marginLeft: 15 }}>
                            Sign out
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CustomDrawer;
