import React from "react";
import { Controller } from "react-hook-form";
import { View, TextInput, Text, StyleSheet } from "react-native";
import tw from "twrnc";

const CustomTextInput = ({
    control,
    placeholder,
    name,
    title,
    rules = {},
    secureTextEntry,
}) => {
    const icons = {
        email: "mail-outline",
        hidePassword: "hide-outline",
        viewPassword: "show-outline",
        name: "people",
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
                            style={tw.style([
                                "bg-[#E8E8E8]",
                                "py-3.5",
                                "px-4",
                                "rounded-lg",
                            ])}
                        >
                            <TextInput
                                placeholder={placeholder}
                                onChangeText={(value) => onChange(value)}
                                value={value}
                                secureTextEntry={secureTextEntry}
                                style={tw.style("text-xl", {
                                    outlineStyle: "none",
                                })}
                            ></TextInput>
                        </View>
                        {error && (
                            <Text style={tw`text-red-500 text-left`}>
                                {error.message || "*Error."}
                            </Text>
                        )}
                    </View>
                )}
            ></Controller>
        </View>
    );
};

export default CustomTextInput;
