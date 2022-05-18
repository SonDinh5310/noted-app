import React, { useContext, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import Editor from './src/components/Editor/Editor';
import Preview from './src/components/Preview/Preview';
import { AppStore } from './src/context/zustand';

const NotedApp = () => {
    const [note, setNote] = useState('');
    const toggleEdit = AppStore((state) => state.toggleEdit);

    const handleChange = (value) => {
        setNote(value);
    };

    const { width } = useWindowDimensions();
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                keyboardDismissMode="interactive"
                style={{ height: '100%', width: width }}
            >
                {toggleEdit ? (
                    <Preview>{note}</Preview>
                ) : (
                    <Editor note={note} handleChange={handleChange}></Editor>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontFamily: 'sans-serif',
    },
});

export default NotedApp;
