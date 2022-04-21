import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { useSelector } from "react-redux";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";

import { IStoreState, LoginStackParamList, RootStackParamList } from "../types";

export default function Navigation() {
    return (
        <NavigationContainer>
            <RootNavigator />
        </NavigationContainer>
    );
}

const RootStack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
    const userData = useSelector<IStoreState, IStoreState["userData"]>(state => state.userData);

    return (
        <RootStack.Navigator initialRouteName="LoginStack">
            { !userData?.token ? <RootStack.Screen name="LoginStack" component={LoginScreenStack} options={{ headerShown: false }} /> : null}
        </RootStack.Navigator>
    );
}

const LoginStack = createNativeStackNavigator<LoginStackParamList>();

function LoginScreenStack() {
    return (
        <LoginStack.Navigator initialRouteName="Login">
            <LoginStack.Screen name="Login" component={LoginScreen} options={{ title: "Login", headerShown: false, contentStyle: {backgroundColor: "#fff"} }} />
            <LoginStack.Screen name="Signup" component={SignupScreen} options={{ title: "Sign Up", contentStyle: {backgroundColor: "#fff"} }} />
        </LoginStack.Navigator>
    );
}
