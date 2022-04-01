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
import Editor from './components/editor';
import Preview from './components/preview';
import { AppContext } from './utils/context';

const NotedApp = () => {
    const [note, setNote] = useState('');
    const { togglePreview } = useContext(AppContext);

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
                {togglePreview ? (
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
