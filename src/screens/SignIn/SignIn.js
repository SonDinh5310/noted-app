import React from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, View, TouchableOpacity, Text } from 'react-native';
import { AuthStore, AppStore } from '../../context/zustand';
import tw from 'twrnc';

import { emailRegex } from '../../utils/regex';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { handleUserStorageCheck } from '../../utils/helpers';

const axios = require('axios');

const SignIn = ({ navigation }) => {
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const { setIsLoading } = AppStore((state) => ({
        setIsLoading: state.setIsLoading,
    }));

    const { userToken, setUserToken } = AuthStore((state) => ({
        userToken: state.userToken,
        setUserToken: state.setUserToken,
    }));
    const { setUserData } = AppStore((state) => ({
        setUserData: state.setUserData,
    }));

    const onSignInPress = async (data) => {
        try {
            setIsLoading(true);
            const result = await axios.post(
                'https://noted-app-backend.herokuapp.com/api/user/login',
                data
            );
            setUserData(result.data);
            setUserToken(result.headers['auth-token']);
            handleUserStorageCheck(result.data._id);
            reset();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <ScrollView style={tw`p-5`}>
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
    );
};

export default SignIn;
