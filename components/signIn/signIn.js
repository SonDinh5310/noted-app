import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ScrollView, View, TextInput, Button, Text } from 'react-native';
import CustomTextInput from '../CustomTextInput';
import { emailRegex } from '../../utils/regex';

const SignIn = () => {
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
                <Button title="Sign in" onPress={handleSubmit(onSubmit)} />
            </View>
        </ScrollView>
    );
};

export default SignIn;
