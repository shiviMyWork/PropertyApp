import React from 'react';
import { StyleSheet, TouchableOpacity, View, useColorScheme, } from 'react-native';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const WebViewScreen = ({ route }) => {
    const { url, title } = route.params;
    const theme = useTheme();
    const scheme = useColorScheme();
    const isDark = scheme === 'dark';
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color={theme.colors.onBackground} />
                </TouchableOpacity>
            </View>
            <WebView source={{ uri: url }} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    backButton: {
        padding: 4,
        marginRight: 16,
    },
});

export default WebViewScreen;
