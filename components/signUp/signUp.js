import React from "react";
import { useForm, Controller } from "react-hook-form";
import { ScrollView, View, TextInput, Button, Text } from "react-native";
import CustomTextInput from "../CustomTextInput";

const SignUp = () => {
    const {
        control,
        watch,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: "",
            username: "",
            email: "",
            password: "",
        },
    });
    const onSubmit = (data) => {
        console.log(data);
        reset(data);
    };
    return (
        <ScrollView>
            <CustomTextInput
                placeholder="Name"
                name="name"
                control={control}
                rules={{
                    required: "*Name is required!",
                    pattern: {
                        value: /^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/,
                        message: "Invalid Name",
                    },
                }}
            />

            <CustomTextInput
                placeholder="Username"
                name="username"
                control={control}
                rules={{
                    required: "*Username is required!",
                    pattern: {
                        value: /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
                        message: "Invalid Username",
                    },
                }}
            />

            <CustomTextInput
                placeholder="Email"
                name="email"
                control={control}
                rules={{
                    required: "*Email is required!",
                    pattern: {
                        value: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
                        message: "*Invalid email",
                    },
                }}
            />

            <CustomTextInput
                placeholder="Password"
                name="password"
                control={control}
                rules={{
                    required: "*Password is required!",
                    pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message:
                            "*Password must have minimum 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character.",
                    },
                }}
                secureTextEntry={true}
            />

            <CustomTextInput
                placeholder="Confirm Password"
                name="confirm_password"
                control={control}
                rules={{
                    required: "*Please confirm your password!",
                    validate: (value) =>
                        value === watch("password") ||
                        "The passwords do not match",
                }}
                secureTextEntry={true}
            />

            <View>
                <Button title="Sign up" onPress={handleSubmit(onSubmit)} />
            </View>
        </ScrollView>
    );
};

export default SignUp;
