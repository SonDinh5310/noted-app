import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ScrollView, Text, ActivityIndicator } from 'react-native';
import { AppStore } from '../../context/zustand';
import tw from 'twrnc';
const axios = require('axios');
import {
    emailRegex,
    nameRegex,
    usernameRegex,
    passwordRegex,
} from '../../utils/regex';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import CustomButton from '../../components/CustomButton/CustomButton';

const SignUp = ({ navigation }) => {
    const { control, watch, handleSubmit, reset } = useForm({
        defaultValues: {
            name: '',
            username: '',
            email: '',
            password: '',
        },
    });
    const { isLoading, setIsLoading } = AppStore((state) => ({
        isLoading: state.isLoading,
        setIsLoading: state.setIsLoading,
    }));
    const onSignUpPress = async (data) => {
        try {
            setIsLoading(true);
            delete data['confirm_password'];
            await axios.post(
                'https://noted-app-backend.herokuapp.com/api/user/register',
                data
            );
            reset();
            navigation.navigate('Sign In');
        } catch (error) {
            console.log('error: ', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <ScrollView style={tw.style(['p-5'])}>
                <Text style={tw`text-3xl`}>Sign Up</Text>
                <Text style={tw`text-base text-[#505050] mb-2`}>
                    Take the first step
                </Text>
                <CustomTextInput
                    placeholder="John Doe"
                    title="Name"
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
                    placeholder="example@gmail.com"
                    title="Email"
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
                    placeholder="•••••••••••"
                    title="Password"
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
                />

                <CustomTextInput
                    placeholder="•••••••••••"
                    title="Confirm Password"
                    name="confirm_password"
                    control={control}
                    rules={{
                        required: '*Please confirm your password!',
                        validate: (value) =>
                            value === watch('password') ||
                            'Both passwords must match',
                    }}
                />

                <CustomButton
                    title="Sign Up"
                    func={handleSubmit(onSignUpPress)}
                ></CustomButton>
                <Text style={tw`mt-2 mb-[-10px] text-base text-center`}>
                    Already have an account ?
                </Text>
                <CustomButton
                    title="Sign In"
                    func={() => navigation.navigate('Sign In')}
                ></CustomButton>
            </ScrollView>
        </>
    );
};

export default SignUp;
