import React from "react";
import { useForm, Controller } from "react-hook-form";
import { ScrollView, View, TextInput, Button, Text } from "react-native";
import CustomTextInput from "../CustomTextInput";

const SignIn = () => {
    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const onSubmit = (data) => {
        console.log(data);
        reset(data);
    };
    // const onChange = (e) => {
    //     return {
    //         value: e.nativeEvent.text,
    //     };
    // };
    return (
        <ScrollView>
            <CustomTextInput
                placeholder="Email"
                name="email"
                control={control}
                // rules={{ required: '*Email is required!' }}
                rules={{
                    required: "*Email is required!",
                    pattern: {
                        value: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
                        message: "Invalid email",
                    },
                }}
            />

            <CustomTextInput
                placeholder="Password"
                name="password"
                control={control}
                rules={{ required: "*Password is required!" }}
                secureTextEntry={true}
            />

            <View>
                <Button title="Sign in" onPress={handleSubmit(onSubmit)} />
            </View>
        </ScrollView>
    );
};

export default SignIn;
