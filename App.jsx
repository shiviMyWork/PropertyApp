import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/screens/Login";
import Dashboard from "./src/screens/Dashboard";
import Attendance from "./src/screens/Attendance";
import Profile from "./src/screens/Profile";
import Feedback from "./src/screens/Feedback";
import { getAuthData } from "./src/utils/auth";

const Stack = createStackNavigator();

export default function App() {
  const [initialScreen, setInitialScreen] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { token, user } = await getAuthData();
      if (token && user) {
        global.authToken = token;
        global.currentUser = user;
        setInitialScreen("Dashboard");
      } else {
        setInitialScreen("Login");
      }
    };
    checkAuth();
  }, []);

  if (!initialScreen) return null; // Show loader if needed

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialScreen}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Attendance" component={Attendance} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Feedback" component={Feedback} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
