import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
    ScrollView,
    View,
    TextInput,
    Button,
    Text,
    ActivityIndicator,
} from 'react-native';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import {
    emailRegex,
    nameRegex,
    usernameRegex,
    passwordRegex,
} from '../../utils/regex';
import { AppStore } from '../../utils/zustand';
import shallow from 'zustand/shallow';

const axios = require('axios');

const SignUp = ({ navigation }) => {
    const { control, watch, handleSubmit, reset } = useForm({
        defaultValues: {
            name: '',
            username: '',
            email: '',
            password: '',
        },
    });
    const { isLoading, setIsLoading } = AppStore(
        (state) => ({
            isLoading: state.isLoading,
            setIsLoading: state.setIsLoading,
        }),
        shallow
    );
    const onSignUpPress = async (data) => {
        setIsLoading(true);
        delete data['confirm_password'];
        await axios.post(
            'https://noted-app-backend.herokuapp.com/api/user/register',
            data
        );
        reset();
        setIsLoading(false);

        console.log(res);
        navigation.navigate('Sign In');
    };

    return (
        <>
            {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
            {!isLoading && (
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

                    {/* <CustomTextInput
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
                    /> */}

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

                    <Button
                        title="Sign Up"
                        onPress={handleSubmit(onSignUpPress)}
                    />

                    <Button
                        title="To Sign Up"
                        onPress={() => navigation.navigate('Sign In')}
                    />
                </ScrollView>
            )}
        </>
    );
};

export default SignUp;
