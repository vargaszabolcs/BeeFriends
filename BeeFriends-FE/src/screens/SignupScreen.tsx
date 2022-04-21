import { StyleSheet } from "react-native";
import React, { useState } from "react";
import InputField from "../components/login/InputField";
import { SafeAreaView } from "react-native-safe-area-context";
import SubmitButton from "../components/login/SubmitButton";
import axios, { AxiosResponse } from "axios";
import Network from "../constants/Network";
import { LoginResponse } from "../types";

const SignupScreen = () => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ passwordRepeat, setPasswordRepeat ] = useState("");
    const [ name, setName ] = useState("");

    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState("");

    const onSubmit = async () => {
        setIsLoading(true);
        const data = { email, password, name };
        try {
            const response: AxiosResponse<LoginResponse> = await axios.post(Network.API_URL + "/auth/login", data, { timeout: 5000 });
        } catch (err) {
            setError("Something went wrong. Please try again later and check your internet connection!");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <InputField value={email} onChangeText={setEmail} isDisabled={isLoading} type="email" placeholder="Email" />
            <InputField value={password} onChangeText={setPassword} isDisabled={isLoading} type="password" placeholder="Password" />
            <InputField value={passwordRepeat} onChangeText={setPasswordRepeat} isDisabled={isLoading} type="password" placeholder="Repeat Password" />
            <InputField value={name} onChangeText={setName} isDisabled={isLoading} type="name" placeholder="Name" />
            <SubmitButton text="Sign Up" onPress={onSubmit} isDisabled={isLoading} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    }
});

export default SignupScreen;
