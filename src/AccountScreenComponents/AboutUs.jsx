import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Linking,
  Alert,
  useColorScheme,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';

const AboutScreen = () => {
  const navigation = useNavigation();
  const theme = useTheme(); 
  const scheme = useColorScheme(); 

  const isDark = scheme === 'dark';

  const handleTermsPress = () => {
  navigation.navigate('WebViewScreen', {
    url: 'https://www.google.com/',
    title: 'Terms of Use',
  });
};

const handlePrivacyPress = () => {
  navigation.navigate('WebViewScreen', {
    url: 'https://www.google.com/',
    title: 'Privacy Policy',
  });
};

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={theme.colors.onBackground} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.onBackground }]}>
          About
        </Text>
      </View>

      {/* Menu Items */}
      <View style={styles.content}>
        <TouchableOpacity
          style={[styles.menuItem, { backgroundColor: theme.colors.background }]}
          onPress={handleTermsPress}
          activeOpacity={0.7}>
          <Text style={[styles.menuText, { color: theme.colors.onBackground }]}>
            Terms of Use
          </Text>
          <Icon name="chevron-right" size={24} color={theme.colors.onSurface} />
        </TouchableOpacity>

        <View style={[styles.separator, { backgroundColor: theme.colors.outline }]} />

        <TouchableOpacity
          style={[styles.menuItem, { backgroundColor: theme.colors.background }]}
          onPress={handlePrivacyPress}
          activeOpacity={0.7}>
          <Text style={[styles.menuText, { color: theme.colors.onBackground }]}>
            Privacy Policy
          </Text>
          <Icon name="chevron-right" size={24} color={theme.colors.onSurface} />
        </TouchableOpacity>

        <View style={[styles.separator, { backgroundColor: theme.colors.outline }]} />
      </View>
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
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingTop: 8,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingVertical: 20,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '400',
  },
  separator: {
    height: 1,
    marginLeft: 28,
  },
});

export default AboutScreen;
