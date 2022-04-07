import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ScrollView, View, TextInput, Button, Text } from 'react-native';
import CustomTextInput from '../CustomTextInput';
import {
    emailRegex,
    nameRegex,
    usernameRegex,
    passwordRegex,
} from '../../utils/regex';

const SignUp = () => {
    const {
        control,
        watch,
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
                placeholder="Name"
                name="name"
                control={control}
                rules={{
                    required: '*Name is required!',
                    pattern: {
                        value: nameRegex,
                        message: 'Invalid Name',
                    },
                }}
            />

            <CustomTextInput
                placeholder="Username"
                name="username"
                control={control}
                rules={{
                    required: '*Username is required!',
                    pattern: {
                        value: usernameRegex,
                        message: 'Invalid Username',
                    },
                }}
            />

            <CustomTextInput
                placeholder="Email"
                name="email"
                control={control}
                rules={{
                    required: '*Email is required!',
                    pattern: {
                        value: emailRegex,
                        message: '*Invalid email',
                    },
                }}
            />

            <CustomTextInput
                placeholder="Password"
                name="password"
                control={control}
                rules={{
                    required: '*Password is required!',
                    pattern: {
                        value: passwordRegex,
                        message:
                            '*Password must have minimum 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character.',
                    },
                }}
                secureTextEntry={true}
            />

            <CustomTextInput
                placeholder="Confirm Password"
                name="confirm_password"
                control={control}
                rules={{
                    required: '*Please confirm your password!',
                    validate: (value) =>
                        value === watch('password') ||
                        'The passwords do not match',
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
