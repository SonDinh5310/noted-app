import React from 'react';
import { Controller } from 'react-hook-form';
import { View, TextInput, Text } from 'react-native';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CustomTextInput = ({
    control,
    placeholder,
    name,
    title,
    rules = {},
    secureTextEntry,
}) => {
    const icons = {
        email: 'email',
        password: 'visibility-off',
        confirm_password: 'visibility-off',
        viewPassword: 'visibility',
        name: 'group',
    };
    const onChange = (e) => {
        return {
            value: e.nativeEvent.text,
        };
    };
    return (
        <View>
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({
                    field: { onChange, value },
                    fieldState: { error },
                }) => (
                    <View style={tw`mt-6`}>
                        <Text style={tw`text-xl mb-2`}>{title}</Text>
                        <View
                            style={tw.style(
                                [
                                    'bg-[#E8E8E8]',
                                    'py-3.5',
                                    'px-4',
                                    'rounded-lg',
                                    'flex',
                                    'flex-row',
                                    'justify-between',
                                ],
                                {
                                    'border-red-500': error ? true : false,
                                    'border-2': error ? true : false,
                                }
                            )}
                        >
                            <TextInput
                                placeholder={placeholder}
                                onChangeText={(value) => onChange(value)}
                                value={value}
                                secureTextEntry={secureTextEntry}
                                style={tw.style(['text-xl'], 'pr-1', 'w-[90%]')}
                            ></TextInput>
                            {icons[name] && (
                                <Icon name={icons[name]} size={22} />
                            )}
                        </View>
                        {error && (
                            <Text style={tw`text-red-500 text-left text-base`}>
                                {error.message || '*Error.'}
                            </Text>
                        )}
                    </View>
                )}
            ></Controller>
        </View>
    );
};

export default CustomTextInput;
