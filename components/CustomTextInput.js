import React from "react";
import { Controller } from "react-hook-form";
import { View, TextInput, Text, StyleSheet } from "react-native";

const CustomTextInput = ({
    control,
    placeholder,
    name,
    rules = {},
    secureTextEntry,
}) => {
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
                    <>
                        <View
                            style={[
                                styles.container,
                                { borderColor: error ? "red" : "#e8e8e8" },
                            ]}
                        >
                            <TextInput
                                placeholder={placeholder}
                                onChangeText={(value) => onChange(value)}
                                value={value}
                                secureTextEntry={secureTextEntry}
                            ></TextInput>
                        </View>
                        {error && (
                            <Text
                                style={{ color: "red", alignSelf: "stretch" }}
                            >
                                {error.message || "*Error."}
                            </Text>
                        )}
                    </>
                )}
            ></Controller>

            {/* {errors.name && (
                <Text style={{ color: 'red' }}>*This field is required.</Text>
            )} */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        borderColor: "#e8e8e8",
        width: "100%",
        borderRadius: 5,
        borderWidth: 1,
        padding: 10,
        marginVertical: 5,
    },
});

export default CustomTextInput;
