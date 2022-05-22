import React, { useRef } from 'react';
import {
    StyleSheet,
    TextInput,
    Dimensions,
    Text,
    Platform,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import {
    actions,
    RichEditor,
    RichToolbar,
} from 'react-native-pell-rich-editor';

const height = Dimensions.get('window').height;

const Editor = ({ note, handleChange }) => {
    // return (
    //     <TextInput
    //         multiline={true}
    //         autoFocus={true}
    //         placeholder="write your code here"
    //         style={styles.editor}
    //         value={note}
    //         onChangeText={(text) => handleChange(text)}
    //     ></TextInput>
    // );
    const richText = useRef();
    const toolbarActions = [
        actions.setBold,
        actions.setItalic,
        actions.setUnderline,
        actions.setStrikeThrough,
        actions.insertBulletsList,
        actions.insertOrderedList,
        actions.insertImage,
        actions.insertVideo,
    ];
    return (
        <SafeAreaView>
            <ScrollView>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={useHeaderHeight() + 64}
                >
                    <RichEditor
                        onChange={(text) => handleChange(text)}
                    ></RichEditor>
                </KeyboardAvoidingView>
            </ScrollView>

            <RichToolbar editor={richText} actions={toolbarActions} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    editor: {
        height: height,
        textAlignVertical: 'top',
        backgroundColor: 'black',
        color: 'white',
        fontSize: 16,
        padding: 10,
    },
});

export default Editor;
