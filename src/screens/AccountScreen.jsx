// App.js
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';

const { width } = Dimensions.get('window');

const App = () => {
  const [pressedItem, setPressedItem] = useState(null);

  const handlePress = (item) => {
    console.log(`Pressed: ${item}`);
    setPressedItem(item);
    setTimeout(() => setPressedItem(null), 150);
  };

  const MenuRow = ({ title, subtitle, onPress, showArrow = true, icon }) => (
    <TouchableOpacity 
      style={[
        styles.menuRow,
        pressedItem === title && styles.menuRowPressed
      ]} 
      onPress={() => onPress(title)}
      activeOpacity={0.7}
    >
      <View style={styles.menuRowLeft}>
        {icon && (
          <View style={styles.iconContainer}>
            <Text style={styles.iconText}>{icon}</Text>
          </View>
        )}
        <View style={styles.menuRowContent}>
          <Text style={styles.menuTitle}>{title}</Text>
          {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {showArrow && (
        <View style={styles.arrowContainer}>
          <Text style={styles.arrow}>›</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fafbfc" />
      
      {/* Header */}
      {/* <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View> */}

      <ScrollView 
        contentInsetAdjustmentBehavior="automatic" 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        
        {/* Sign up/Log in Card */}
        <View style={styles.signupCard}>
          <View style={styles.profileSection}>
            <View style={styles.profileIcon}>
              <Text style={styles.profileText}>👤</Text>
            </View>
            <View style={styles.signupContent}>
              <Text style={styles.signupTitle}>UserName</Text>
              <Text style={styles.signupSubtitle}>
                Save searches, sync properties, and get personalized recommendations
              </Text>
            </View>
          </View>
          {/* <TouchableOpacity style={styles.signupButton} onPress={() => handlePress('signup')}>
            <Text style={styles.signupButtonText}>Get Started</Text>
          </TouchableOpacity> */}
        </View>

        {/* Property Listing Promotion */}
        <View style={styles.propertyCard}>
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={() => handlePress('close')}
          >
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
          <View style={styles.propertyContent}>
            <View style={styles.propertyTextSection}>
              <Text style={styles.propertyTitle}>Want to list your property with us?</Text>
              {/* <Text style={styles.propertySubtitle}>
                Reach millions of buyers and renters
              </Text> */}
              <TouchableOpacity 
                style={styles.getStartedButton} 
                onPress={() => handlePress('get started')}
              >
                <Text style={styles.getStartedText}>Get Started</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.houseIllustration}>
              <Text style={styles.houseEmoji}>🏡</Text>
            </View>
          </View>
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.menuContainer}>
            <MenuRow
              title="Language"
              subtitle="English (US)"
              icon="🌐"
              onPress={handlePress}
            />
            <View style={styles.separator} />
            <MenuRow
              title="Country"
              subtitle="Egypt"
              icon="🌍"
              onPress={handlePress}
            />
            <View style={styles.separator} />
            <MenuRow
              title="Measurement"
              subtitle="Imperial (ft², mi)"
              icon="📏"
              onPress={handlePress}
            />
            <View style={styles.separator} />
            <MenuRow
              title="Notifications"
              subtitle="Push, Email"
              icon="🔔"
              onPress={handlePress}
            />
          </View>
        </View>

        {/* Real Estate Resources Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Real Estate Services</Text>
          <View style={styles.menuContainer}>
            <MenuRow
              title="Find a Broker"
              subtitle="Connect with local experts"
              icon="🏢"
              onPress={handlePress}
            />
            <View style={styles.separator} />
            <MenuRow
              title="Market Insights"
              subtitle="Trends and analytics"
              icon="📊"
              onPress={handlePress}
            />
            <View style={styles.separator} />
            <MenuRow
              title="Mortgage Calculator"
              subtitle="Estimate your payments"
              icon="🧮"
              onPress={handlePress}
            />
          </View>
        </View>

        {/* Property Finder Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.menuContainer}>
            <MenuRow
              title="Help Center"
              subtitle="FAQs and guides"
              icon="❓"
              onPress={handlePress}
            />
            <View style={styles.separator} />
            <MenuRow
              title="Contact Us"
              subtitle="Get in touch"
              icon="📞"
              onPress={handlePress}
            />
            <View style={styles.separator} />
            <MenuRow
              title="About"
              subtitle="Learn more about us"
              icon="ℹ️"
              onPress={handlePress}
            />
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Property Finder v2.1.0</Text>
          <Text style={styles.footerSubtext}>Made with ❤️ for property seekers</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafbfc',
    marginTop:42,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsIcon: {
    fontSize: 20,
  },
  scrollView: {
    flex: 1,
  },
  signupCard: {
    backgroundColor: '#ffffff',
    margin: 20,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileText: {
    fontSize: 28,
  },
  signupContent: {
    flex: 1,
  },
  signupTitle: {
    color: '#1a1a1a',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
  },
  signupSubtitle: {
    color: '#666666',
    fontSize: 15,
    lineHeight: 22,
  },
  signupButton: {
    backgroundColor: '#2196f3',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#2196f3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  signupButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  propertyCard: {
    backgroundColor: '#cdc8e8',
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 26,
    paddingHorizontal: 14,
    borderRadius: 16,
    position: 'relative',
    shadowColor: '#cdc8e8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#cdc8e8',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#0b154f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  propertyContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  propertyTextSection: {
    flex: 1,
    paddingRight: 16,
  },
  propertyTitle: {
    color: '#0b154f',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },
  propertySubtitle: {
    color: '#0b154f',
    fontSize: 14,
    marginBottom: 18,
    lineHeight: 20,
  },
  getStartedButton: {
    marginBottom:60,
    backgroundColor: '#0b154f',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    alignSelf: 'flex-start',
    shadowColor: '#0b154f',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  getStartedText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  houseIllustration: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  houseEmoji: {
    fontSize: 48,
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    color: '#1a1a1a',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
    paddingLeft: 4,
  },
  menuContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 4,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  menuRowPressed: {
    backgroundColor: '#f5f5f5',
  },
  menuRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconText: {
    fontSize: 20,
  },
  menuRowContent: {
    flex: 1,
  },
  menuTitle: {
    color: '#1a1a1a',
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 3,
  },
  menuSubtitle: {
    color: '#666666',
    fontSize: 14,
    lineHeight: 18,
  },
  arrowContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    color: '#bbb',
    fontSize: 22,
    fontWeight: '300',
  },
  separator: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginLeft: 76,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  footerText: {
    color: '#999',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  footerSubtext: {
    color: '#bbb',
    fontSize: 13,
  },
});

export default App;
