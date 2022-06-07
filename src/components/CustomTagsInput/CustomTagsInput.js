import React from 'react';
import { View } from 'react-native';
import TagInput from 'react-native-tags-input';
import tw from 'twrnc';

function CustomTagsInput({ tags, handleTagsChange }) {
    return (
        <View
            style={tw`w-full flex justify-center items-center mt-2 border-b-2 border-b-slate-200`}
        >
            <TagInput
                updateState={handleTagsChange}
                tags={tags}
                autoCorrect={false}
                placeholder="Give your note some tags ..."
                // label="Press enter or space to add a tag"
                inputStyle={tw`mx-[-2px]`}
                containerStyle={tw`w-full`}
                labelStyle={tw`text-[14px]`}
                tagStyle={tw`h-8.5 mb-3`}
                tagTextStyle={tw`text-white text-[16px] font-bold`}
                deleteIconStyle={tw`bg-white`}
            />
        </View>
    );
}

export default CustomTagsInput;
