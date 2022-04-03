import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ScrollView, View, TextInput, Button, Text } from 'react-native';
import CustomTextInput from '../CustomTextInput';

const SignUp = () => {
    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: '',
            username: '',
            email: '',
            password: '',
        },
    });
    const onSubmit = (data) => {
        console.log(data);
        reset(data);
    };
    return (
        <ScrollView>
            <CustomTextInput
                name="name"
                fieldName="Name"
                control={control}
                rules={{ required: '*Name is required!' }}
            />

            <CustomTextInput
                name="username"
                fieldName="Username"
                control={control}
                rules={{ required: '*Username is required!' }}
            />

            <CustomTextInput
                name="email"
                fieldName="Email"
                control={control}
                rules={{ required: '*Email is required!' }}
            />

            <CustomTextInput
                name="password"
                fieldName="Password"
                control={control}
                rules={{ required: '*Password is required!' }}
                secureTextEntry={true}
            />

            <CustomTextInput
                name="confirm_password"
                fieldName="Confirm Password"
                control={control}
                rules={{ required: '*Please confirm your password!' }}
                secureTextEntry={true}
            />

            <View>
                <Button title="Sign up" onPress={handleSubmit(onSubmit)} />
            </View>
        </ScrollView>
    );
};

export default SignUp;
