import React from 'react';
import { useForm } from 'react-hook-form';
import {
    ScrollView,
    View,
    TouchableOpacity,
    Text,
    ActivityIndicator,
} from 'react-native';
import shallow from 'zustand/shallow';
import tw from 'twrnc';

import { emailRegex } from '../../utils/regex';
import { AppStore } from '../../utils/zustand';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import CustomButton from '../../components/CustomButton/CustomButton';

const axios = require('axios');

const SignIn = ({ navigation }) => {
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
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

    const onSignInPress = async (data) => {
        setIsLoading(true);
        const result = await axios.post(
            'https://noted-app-backend.herokuapp.com/api/user/login',
            data
        );
        reset();
        setIsLoading(false);
        navigation.navigate('Profile');
        console.log(result);
    };
    return (
        <>
            {isLoading && (
                <ActivityIndicator
                    size="large"
                    color="#0000ff"
                    style={{ margin: 'auto' }}
                />
            )}
            {!isLoading && (
                <ScrollView style={tw.style(['p-5'])}>
                    <Text style={tw`text-3xl`}>Welcome!</Text>
                    <Text style={tw`text-base text-[#505050] mb-2`}>
                        Please sign in to continue
                    </Text>
                    <CustomTextInput
                        placeholder="example@gmail.com"
                        name="email"
                        title="Email"
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
                        name="password"
                        title="Password"
                        control={control}
                        rules={{ required: '*Password is required!' }}
                    />
                    <TouchableOpacity style={tw`mt-3 mb-[-5px]`}>
                        <Text style={tw`text-[#898989] text-base text-right`}>
                            Forgot password?
                        </Text>
                    </TouchableOpacity>
                    <CustomButton
                        title="Sign In"
                        func={handleSubmit(onSignInPress)}
                    ></CustomButton>
                    <Text style={tw`mt-2 mb-[-10px] text-base text-center`}>
                        Don't have an account yet?
                    </Text>
                    <CustomButton
                        title="Sign Up"
                        func={() => navigation.navigate('Sign Up')}
                    ></CustomButton>
                </ScrollView>
            )}
        </>
    );
};

export default SignIn;