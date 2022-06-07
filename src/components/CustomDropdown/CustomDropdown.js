import React from 'react';
import { View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import tw from 'twrnc';

function CustomDropdown({ handleStatusChange, placeholder, status }) {
    const statusItems = [
        { label: 'Done', value: 'done' },
        { label: 'On Going', value: 'on going' },
        { label: 'On Hold', value: 'on hold' },
        { label: 'Abandoned', value: 'abandoned' },
    ];
    return (
        <View style={tw`w-full border-b-2 border-b-slate-200`}>
            <RNPickerSelect
                value={status}
                onValueChange={(value) => {
                    return handleStatusChange(value);
                }}
                style={tw`w-full mx-[-6px]`}
                pickerProps={{
                    style: {
                        overflow: 'hidden',
                        color: '#737a88',
                    },
                }}
                placeholder={placeholder}
                items={statusItems}
            />
        </View>
    );
}

export default CustomDropdown;
