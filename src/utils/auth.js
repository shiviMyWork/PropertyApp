import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveAuthData = async (token, user) => {
  try {
    await AsyncStorage.setItem("authToken", token);
    await AsyncStorage.setItem("currentUser", JSON.stringify(user));
  } catch (err) {
    console.error("Error saving auth data:", err);
  }
};

export const getAuthData = async () => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    const user = await AsyncStorage.getItem("currentUser");
    return { token, user: user ? JSON.parse(user) : null };
  } catch (err) {
    console.error("Error fetching auth data:", err);
    return { token: null, user: null };
  }
};

export const clearAuthData = async () => {
  try {
    await AsyncStorage.removeItem("authToken");
    await AsyncStorage.removeItem("currentUser");
  } catch (err) {
    console.error("Error clearing auth data:", err);
  }
};
