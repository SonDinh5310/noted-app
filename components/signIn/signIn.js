import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ScrollView, View, TextInput, Button, Text } from 'react-native';
import CustomTextInput from '../CustomTextInput';
import { emailRegex } from '../../utils/regex';
import { AppStore } from '../../utils/zustand';
import shallow from 'zustand/shallow';

const axios = require('axios');

const SignIn = ({ navigation }) => {
    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
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
        // console.log(data);
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

    const onToSignUp = () => {
        navigation.navigate('Sign Up');
    };

    return (
        <>
            {isLoading && (
                <View>
                    <Text>Loading...</Text>
                </View>
            )}
            {!isLoading && (
                <ScrollView>
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
                        rules={{ required: '*Password is required!' }}
                        secureTextEntry={true}
                    />

                    <View>
                        <Button
                            title="Sign In"
                            onPress={handleSubmit(onSignInPress)}
                        />
                    </View>

                    <Text>
                        Don't have an account yet ?{' '}
                        <Text
                            style={{ color: 'blue' }}
                            onPress={() => onToSignUp()}
                        >
                            Sign up
                        </Text>
                    </Text>
                </ScrollView>
            )}
        </>
    );
};

export default SignIn;
