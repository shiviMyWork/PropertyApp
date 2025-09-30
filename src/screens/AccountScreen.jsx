import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Animated,
  useColorScheme,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get('window');

const AccountScreen = () => {
  const navigation = useNavigation();
  const [pressedItem, setPressedItem] = useState(null);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English (US)');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [countryError, setCountryError] = useState(null);
  const theme = useTheme();
  const scheme = useColorScheme();

  // Fetch countries from API
  const fetchCountries = async (apiUrl) => {
    setLoadingCountries(true);
    setCountryError(null);
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch countries');
      }
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error('Error fetching countries:', error);
      setCountryError(error.message);
    } finally {
      setLoadingCountries(false);
    }
  };

  const handlePress = (item) => {
    console.log(`Pressed: ${item}`);

    if (item === 'Language') {
      setShowLanguageModal(true);
      return;
    }

    if (item === 'Country') {
      setShowCountryModal(true);
      // Replace with your actual API endpoint
      const API_URL = 'https://pestosoft.in/api/countries/';
      fetchCountries(API_URL);
      return;
    }

    setPressedItem(item);
    setTimeout(() => setPressedItem(null), 150);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setShowLanguageModal(false);
  };


  const handleCountrySelect = (country) => {
    const selectedId = country.id;
    const selectedName = country.name;

    setSelectedCountry(country.name);
    setShowCountryModal(false);

    navigation.navigate("Search", {
      countryId: selectedId,
      countryName: selectedName,
    });
  };

  // Dynamic styles based on theme
  const dynamicStyles = {
    container: {
      backgroundColor: scheme === 'light' ? '#fafbfc' : theme.colors.background,
    },
    cardBackground: {
      backgroundColor: scheme === 'light' ? '#ffffff' : theme.colors.elevation.level1,
    },
    primaryText: {
      color: scheme === 'light' ? '#1a1a1a' : theme.colors.onSurface,
    },
    secondaryText: {
      color: scheme === 'light' ? '#666666' : theme.colors.onSurfaceVariant,
    },
    separator: {
      backgroundColor: scheme === 'light' ? '#f0f0f0' : theme.colors.outline,
    },
    pressedRow: {
      backgroundColor: scheme === 'light' ? '#f5f5f5' : theme.colors.elevation.level2,
    },
    iconContainer: {
      backgroundColor: scheme === 'light' ? '#f8f9fa' : theme.colors.elevation.level2,
    },
    profileIcon: {
      backgroundColor: scheme === 'light' ? '#e3f2fd' : theme.colors.primaryContainer,
    },
    arrow: {
      color: scheme === 'light' ? '#bbb' : theme.colors.outline,
    },
    modalOverlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: scheme === 'light' ? '#ffffff' : theme.colors.elevation.level2,
    },
    modalTitle: {
      color: scheme === 'light' ? '#1a1a1a' : theme.colors.onSurface,
    },
  };

  const MenuRow = ({ title, subtitle, onPress, showArrow = true, icon }) => (
    <TouchableOpacity
      style={[
        styles.menuRow,
        pressedItem === title && [styles.menuRowPressed, dynamicStyles.pressedRow]
      ]}
      onPress={() => onPress(title)}
      activeOpacity={0.7}
    >
      <View style={styles.menuRowLeft}>
        {icon && (
          <View style={[styles.iconContainer, dynamicStyles.iconContainer]}>
            <Text style={styles.iconText}>{icon}</Text>
          </View>
        )}
        <View style={styles.menuRowContent}>
          <Text style={[styles.menuTitle, dynamicStyles.primaryText]}>{title}</Text>
          {subtitle && <Text style={[styles.menuSubtitle, dynamicStyles.secondaryText]}>{subtitle}</Text>}
        </View>
      </View>
      {showArrow && (
        <View style={styles.arrowContainer}>
          <Text style={[styles.arrow, dynamicStyles.arrow]}>›</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, dynamicStyles.container]}>
      <StatusBar
        barStyle={scheme === 'light' ? 'dark-content' : 'light-content'}
        backgroundColor={scheme === 'light' ? '#fafbfc' : theme.colors.background}
      />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >

        {/* Profile Card */}
        <View style={[styles.signupCard, dynamicStyles.cardBackground]}>
          <View style={styles.profileSection}>
            <View style={[styles.profileIcon, dynamicStyles.profileIcon]}>
              <Text style={styles.profileText}>👤</Text>
            </View>
            <View style={styles.signupContent}>
              <Text style={[styles.signupTitle, dynamicStyles.primaryText]}>UserName</Text>
              <Text style={[styles.signupSubtitle, dynamicStyles.secondaryText]}>
                Save searches, sync properties, and get personalized recommendations
              </Text>
            </View>
          </View>
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
          <Text style={[styles.sectionTitle, dynamicStyles.primaryText]}>Preferences</Text>
          <View style={[styles.menuContainer, dynamicStyles.cardBackground]}>
            <MenuRow
              title="Language"
              subtitle={selectedLanguage}
              icon="🌐"
              onPress={handlePress}
            />
            <View style={[styles.separator, dynamicStyles.separator]} />
            <MenuRow
              title="Country"
              subtitle={selectedCountry}
              icon="🌍"
              onPress={handlePress}
            />
            <View style={[styles.separator, dynamicStyles.separator]} />
            <MenuRow
              title="Measurement"
              subtitle="Imperial (ft², mi)"
              icon="📏"
              onPress={handlePress}
            />
            <View style={[styles.separator, dynamicStyles.separator]} />
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
          <Text style={[styles.sectionTitle, dynamicStyles.primaryText]}>Real Estate Services</Text>
          <View style={[styles.menuContainer, dynamicStyles.cardBackground]}>
            <MenuRow
              title="Find a Broker"
              subtitle="Connect with local experts"
              icon="🏢"
              onPress={handlePress}
            />
            <View style={[styles.separator, dynamicStyles.separator]} />
            <MenuRow
              title="Market Insights"
              subtitle="Trends and analytics"
              icon="📊"
              onPress={handlePress}
            />
            <View style={[styles.separator, dynamicStyles.separator]} />
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
          <Text style={[styles.sectionTitle, dynamicStyles.primaryText]}>Support</Text>
          <View style={[styles.menuContainer, dynamicStyles.cardBackground]}>
            <MenuRow
              title="Help Center"
              subtitle="FAQs and guides"
              icon="❓"
              onPress={handlePress}
            />
            <View style={[styles.separator, dynamicStyles.separator]} />
            <MenuRow
              title="Contact Us"
              subtitle="Get in touch"
              icon="📞"
              onPress={handlePress}
            />
            <View style={[styles.separator, dynamicStyles.separator]} />
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
        </View>
      </ScrollView>

      {/* Language Selection Modal */}
      <Modal
        visible={showLanguageModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <TouchableOpacity
          style={[styles.modalOverlay, dynamicStyles.modalOverlay]}
          activeOpacity={1}
          onPress={() => setShowLanguageModal(false)}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={(e) => e.stopPropagation()}
            >
              <View style={[styles.modalContent, dynamicStyles.modalContent]}>
                <Text style={[styles.modalTitle, dynamicStyles.modalTitle]}>Select Language</Text>

                <TouchableOpacity
                  style={[
                    styles.languageOption,
                    selectedLanguage === 'English (US)' && styles.selectedOption
                  ]}
                  onPress={() => handleLanguageSelect('English (US)')}
                >
                  <Text style={styles.languageIcon}>🇺🇸</Text>
                  <Text style={[
                    styles.languageText,
                    dynamicStyles.primaryText,
                    selectedLanguage === 'English (US)' && styles.selectedText
                  ]}>
                    English (US)
                  </Text>
                  {selectedLanguage === 'English (US)' && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>

                <View style={[styles.modalSeparator, dynamicStyles.separator]} />

                <TouchableOpacity
                  style={[
                    styles.languageOption,
                    selectedLanguage === 'العربية' && styles.selectedOption
                  ]}
                  onPress={() => handleLanguageSelect('العربية')}
                >
                  <Text style={styles.languageIcon}>🇸🇦</Text>
                  <Text style={[
                    styles.languageText,
                    styles.arabicText,
                    dynamicStyles.primaryText,
                    selectedLanguage === 'العربية' && styles.selectedText
                  ]}>
                    العربية
                  </Text>
                  {selectedLanguage === 'العربية' && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setShowLanguageModal(false)}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Country Selection Modal */}
      <Modal
        visible={showCountryModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowCountryModal(false)}
      >
        <TouchableOpacity
          style={[styles.modalOverlay, dynamicStyles.modalOverlay]}
          activeOpacity={1}
          onPress={() => setShowCountryModal(false)}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={(e) => e.stopPropagation()}
            >
              <View style={[styles.modalContent, dynamicStyles.modalContent, styles.countryModalContent]}>
                <Text style={[styles.modalTitle, dynamicStyles.modalTitle]}>Select Country</Text>

                {loadingCountries ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#2196f3" />
                    <Text style={[styles.loadingText, dynamicStyles.secondaryText]}>
                      Loading countries...
                    </Text>
                  </View>
                ) : countryError ? (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>⚠️</Text>
                    <Text style={[styles.errorMessage, dynamicStyles.primaryText]}>
                      Failed to load countries
                    </Text>
                    <Text style={[styles.errorSubtext, dynamicStyles.secondaryText]}>
                      {countryError}
                    </Text>
                  </View>
                ) : (
                  <ScrollView
                    style={styles.countryList}
                    showsVerticalScrollIndicator={true}
                  >
                    {countries.map((country, index) => (
                      <View key={index}>
                        <TouchableOpacity
                          style={[
                            styles.languageOption,
                            selectedCountry === (country.name || country) && styles.selectedOption
                          ]}
                          onPress={() => handleCountrySelect(country)}
                        >
                          <Text style={styles.languageIcon}>
                            {country.flag || '🌍'}
                          </Text>
                          <Text style={[
                            styles.languageText,
                            dynamicStyles.primaryText,
                            selectedCountry === (country.name || country) && styles.selectedText
                          ]}>
                            {country.name || country}
                          </Text>
                          {selectedCountry === (country.name || country) && (
                            <Text style={styles.checkmark}>✓</Text>
                          )}
                        </TouchableOpacity>
                        {index < countries.length - 1 && (
                          <View style={[styles.modalSeparator, dynamicStyles.separator]} />
                        )}
                      </View>
                    ))}
                  </ScrollView>
                )}

                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setShowCountryModal(false)}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
  },
  signupSubtitle: {
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
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
    paddingLeft: 4,
  },
  menuContainer: {
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
    // Dynamic color applied via dynamicStyles
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
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 3,
  },
  menuSubtitle: {
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
    fontSize: 22,
    fontWeight: '300',
  },
  separator: {
    height: 1,
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
  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    maxWidth: 400,
  },
  modalContent: {
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  countryModalContent: {
    maxHeight: '100%',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  selectedOption: {
    backgroundColor: 'rgba(33, 150, 243, 0.08)',
  },
  languageIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  languageText: {
    fontSize: 17,
    fontWeight: '500',
    flex: 1,
  },
  arabicText: {
    textAlign: 'right',
    fontWeight: '600',
  },
  selectedText: {
    color: '#2196f3',
    fontWeight: '600',
  },
  checkmark: {
    fontSize: 20,
    color: '#2196f3',
    fontWeight: 'bold',
  },
  modalSeparator: {
    height: 1,
    marginVertical: 8,
  },
  cancelButton: {
    marginTop: 16,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  // Country Modal Specific Styles
  countryList: {
    maxHeight: 300,
  },
  loadingContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 15,
  },
  errorContainer: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  errorText: {
    fontSize: 40,
    marginBottom: 12,
  },
  errorMessage: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  errorSubtext: {
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default AccountScreen;