import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Linking,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

const AboutScreen = () => {
  const navigation = useNavigation();

  const openURL = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', `Cannot open URL: ${url}`);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open the link');
      console.error('Error opening URL:', error);
    }
  };

  const handleTermsPress = () => {
    openURL('http://localhost:5173/termsandconditions');
  };

  const handlePrivacyPress = () => {
    openURL('http://localhost:5173/privacypolicy');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About</Text>
      </View>

      {/* Menu Items */}
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={handleTermsPress}
          activeOpacity={0.7}>
          <Text style={styles.menuText}>Terms of Use</Text>
          <Icon name="chevron-right" size={24} color="#666" />
        </TouchableOpacity>

        <View style={styles.separator} />

        <TouchableOpacity
          style={styles.menuItem}
          onPress={handlePrivacyPress}
          activeOpacity={0.7}>
          <Text style={styles.menuText}>Privacy Policy</Text>
          <Icon name="chevron-right" size={24} color="#666" />
        </TouchableOpacity>

        <View style={styles.separator} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 4,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '400',
    color: '#000',
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
    backgroundColor: '#fff',
  },
  menuText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginLeft: 28,
  },
});

export default AboutScreen;