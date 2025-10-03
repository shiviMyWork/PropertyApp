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
  Linking,
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
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showImprovementModal, setShowImprovementModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English (US)');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [countryError, setCountryError] = useState(null);
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedMeasurement, setSelectedMeasurement] = useState('Imperial (ft², mi)');
  const [showMeasurementModal, setShowMeasurementModal] = useState(false);
  const [showPropertyCard, setShowPropertyCard] = useState(true);
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

    if (item === 'Rate Us') {
      setShowRatingModal(true);
      return;
    }

    if (item === 'Need help?') {
      setShowHelpModal(true);
      return;
    }

    if (item === 'About') {
      navigation.navigate('About');
      return;
    }

    if (item === 'Notifications') {
      navigation.navigate('Notifications');
      return;
    }

    if (item === 'Measurement') {
      setShowMeasurementModal(true);
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

  const handleMeasurementSelect = (measurement) => {
    setSelectedMeasurement(measurement);
    setShowMeasurementModal(false);

    // Navigate to SearchScreen with measurement
    navigation.navigate('Search', {
      selectedMeasurement: measurement
    });
  };

  const handleRatingSelect = (rating) => {
    setSelectedRating(rating);
    // You can add your rating submission logic here
    console.log(`User rated: ${rating} stars`);

    // Optional: Add API call to submit rating
    // submitRating(rating);

    setTimeout(() => {
      setShowRatingModal(false);
      // Optionally reset the rating after submission
      // setSelectedRating(0);
    }, 500);
  };

  const handleReportBug = () => {
    setShowHelpModal(false);
    const email = 'support@propmatez.com'; // Replace with your support email
    const subject = 'Bug Report - PROPMATEZ App';
    const body = 'Please describe the bug you encountered:\n\n';
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    Linking.openURL(mailtoUrl).catch(err => {
      console.error('Failed to open email app:', err);
      // You can show an alert here if needed
    });
  };

  const handleSuggestImprovement = () => {
    setShowHelpModal(false);
    setShowImprovementModal(true);
  };

  const handleImprovementOptionSelect = (option) => {
    setShowImprovementModal(false);
    const email = 'support@propmatez.com'; // Replace with your support email
    const subject = `Improvement Suggestion - ${option}`;
    const body = `I would like to suggest an improvement for ${option}:\n\n`;
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    Linking.openURL(mailtoUrl).catch(err => {
      console.error('Failed to open email app:', err);
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
        {showPropertyCard && (
          <View style={styles.propertyCard}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                console.log('Close button pressed');
                setShowPropertyCard(false);
              }}

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
        )}

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
              subtitle={selectedMeasurement}
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
              title="Find an Agent"
              subtitle="Connect with local experts"
              icon="🏢"
              onPress={() => Linking.openURL('https://yourwebsite.com/find-agent')}
            />
            <View style={[styles.separator, dynamicStyles.separator]} />
            <MenuRow
              title="Rent vs Buy Calculator"
              subtitle="Compare renting and buying costs"
              icon="⚖️"
              onPress={() => Linking.openURL('https://yourwebsite.com/find-agent')}
            />
            <View style={[styles.separator, dynamicStyles.separator]} />
            <MenuRow
              title="Mortgage Calculator"
              subtitle="Estimate your monthly payments"
              icon="🧮"
              onPress={() => Linking.openURL('https://yourwebsite.com/find-agent')}
            />
            <View style={[styles.separator, dynamicStyles.separator]} />
            <MenuRow
              title="Find Developers"
              subtitle="Discover property developers"
              icon="🏗️"
              onPress={() => Linking.openURL('https://yourwebsite.com/find-agent')}
            />
          </View>
        </View>

        {/* Property Finder Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, dynamicStyles.primaryText]}>Support</Text>
          <View style={[styles.menuContainer, dynamicStyles.cardBackground]}>
            <MenuRow
              title="About"
              subtitle="Learn more about us"
              icon="ℹ️"
              onPress={handlePress}
            />
            <View style={[styles.separator, dynamicStyles.separator]} />
            <MenuRow
              title="Rate Us"
              subtitle="Share your feedback"
              icon="⭐"
              onPress={handlePress}
            />
            <View style={[styles.separator, dynamicStyles.separator]} />
            <MenuRow
              title="Need help?"
              subtitle="Get support and assistance"
              icon="❓"
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

      {/* Measurement Selection Modal */}
      <Modal
        visible={showMeasurementModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowMeasurementModal(false)}
      >
        <TouchableOpacity
          style={[styles.modalOverlay, dynamicStyles.modalOverlay]}
          activeOpacity={1}
          onPress={() => setShowMeasurementModal(false)}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={(e) => e.stopPropagation()}
            >
              <View style={[styles.modalContent, dynamicStyles.modalContent]}>
                <Text style={[styles.modalTitle, dynamicStyles.modalTitle]}>Select Measurement</Text>

                <TouchableOpacity
                  style={[
                    styles.languageOption,
                    selectedMeasurement === 'Metric (m², km)' && styles.selectedOption
                  ]}
                  onPress={() => handleMeasurementSelect('Metric (m², km)')}
                >
                  <Text style={styles.languageIcon}>📐</Text>
                  <Text style={[
                    styles.languageText,
                    dynamicStyles.primaryText,
                    selectedMeasurement === 'Metric (m², km)' && styles.selectedText
                  ]}>
                    Metric (m², km)
                  </Text>
                  {selectedMeasurement === 'Metric (m², km)' && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>

                <View style={[styles.modalSeparator, dynamicStyles.separator]} />

                <TouchableOpacity
                  style={[
                    styles.languageOption,
                    selectedMeasurement === 'Imperial (ft², mi)' && styles.selectedOption
                  ]}
                  onPress={() => handleMeasurementSelect('Imperial (ft², mi)')}
                >
                  <Text style={styles.languageIcon}>📏</Text>
                  <Text style={[
                    styles.languageText,
                    dynamicStyles.primaryText,
                    selectedMeasurement === 'Imperial (ft², mi)' && styles.selectedText
                  ]}>
                    Imperial (ft², mi)
                  </Text>
                  {selectedMeasurement === 'Imperial (ft², mi)' && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setShowMeasurementModal(false)}
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

      {/* Rating Modal */}
      <Modal
        visible={showRatingModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowRatingModal(false)}
      >
        <TouchableOpacity
          style={[styles.modalOverlay, dynamicStyles.modalOverlay]}
          activeOpacity={1}
          onPress={() => setShowRatingModal(false)}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={(e) => e.stopPropagation()}
            >
              <View style={[styles.modalContent, dynamicStyles.modalContent, styles.ratingModalContent]}>
                {/* Illustration */}
                <View style={styles.ratingIllustration}>
                  <View style={styles.ratingImageContainer}>
                    <Text style={styles.ratingEmoji}>📱</Text>
                    <View style={styles.reviewBubble}>
                      <Text style={styles.reviewStars}>⭐⭐⭐⭐⭐</Text>
                    </View>
                  </View>
                  <View style={styles.ratingPeople}>
                    <Text style={styles.personEmoji}>👤</Text>
                    <Text style={styles.personEmoji}>👤</Text>
                  </View>
                </View>

                <Text style={[styles.ratingModalTitle, dynamicStyles.modalTitle]}>
                  Enjoying PROPMATEZ?
                </Text>
                <Text style={[styles.ratingModalSubtitle, dynamicStyles.secondaryText]}>
                  Rate us and let us know what you think
                </Text>

                {/* Star Rating */}
                <View style={styles.starsContainer}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity
                      key={star}
                      onPress={() => handleRatingSelect(star)}
                      style={styles.starButton}
                    >
                      <Text style={[
                        styles.starIcon,
                        selectedRating >= star && styles.starIconSelected
                      ]}>
                        {selectedRating >= star ? '⭐' : '☆'}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Star Labels */}
                <View style={styles.starLabelsContainer}>
                  <Text style={[styles.starLabel, dynamicStyles.secondaryText]}>Terrible</Text>
                  <Text style={[styles.starLabel, dynamicStyles.secondaryText]}>Bad</Text>
                  <Text style={[styles.starLabel, dynamicStyles.secondaryText]}>Okay</Text>
                  <Text style={[styles.starLabel, dynamicStyles.secondaryText]}>Good</Text>
                  <Text style={[styles.starLabel, dynamicStyles.secondaryText]}>Great</Text>
                </View>

                <TouchableOpacity
                  style={styles.rateLaterButton}
                  onPress={() => setShowRatingModal(false)}
                >
                  <Text style={styles.rateLaterText}>Rate later</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Help Modal */}
      <Modal
        visible={showHelpModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowHelpModal(false)}
      >
        <TouchableOpacity
          style={[styles.modalOverlay, dynamicStyles.modalOverlay]}
          activeOpacity={1}
          onPress={() => setShowHelpModal(false)}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={(e) => e.stopPropagation()}
            >
              <View style={[styles.modalContent, dynamicStyles.modalContent, styles.helpModalContent]}>
                <Text style={[styles.helpModalTitle, dynamicStyles.modalTitle]}>Need help?</Text>

                <TouchableOpacity
                  style={styles.helpOption}
                  onPress={() => {
                    handleReportBug();
                  }}
                >
                  <View style={styles.helpIconContainer}>
                    <Text style={styles.helpIcon}>🐛</Text>
                  </View>
                  <View style={styles.helpTextContainer}>
                    <Text style={[styles.helpOptionTitle, dynamicStyles.primaryText]}>
                      Report a bug
                    </Text>
                    <Text style={[styles.helpOptionSubtitle, dynamicStyles.secondaryText]}>
                      Something in the app is broken or doesn't work as expected
                    </Text>
                  </View>
                  <View style={styles.helpArrowContainer}>
                    <Text style={[styles.arrow, dynamicStyles.arrow]}>›</Text>
                  </View>
                </TouchableOpacity>

                <View style={[styles.helpSeparator, dynamicStyles.separator]} />

                <TouchableOpacity
                  style={styles.helpOption}
                  onPress={() => {
                    handleSuggestImprovement();
                  }}
                >
                  <View style={styles.helpIconContainer}>
                    <Text style={styles.helpIcon}>📣</Text>
                  </View>
                  <View style={styles.helpTextContainer}>
                    <Text style={[styles.helpOptionTitle, dynamicStyles.primaryText]}>
                      Suggest an improvement
                    </Text>
                    <Text style={[styles.helpOptionSubtitle, dynamicStyles.secondaryText]}>
                      New ideas or desired enhancements for this app
                    </Text>
                  </View>
                  <View style={styles.helpArrowContainer}>
                    <Text style={[styles.arrow, dynamicStyles.arrow]}>›</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.helpCancelButton}
                  onPress={() => setShowHelpModal(false)}
                >
                  <Text style={styles.helpCancelText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Improvement Selection Modal */}
      <Modal
        visible={showImprovementModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowImprovementModal(false)}
      >
        <TouchableOpacity
          style={[styles.modalOverlay, dynamicStyles.modalOverlay]}
          activeOpacity={1}
          onPress={() => setShowImprovementModal(false)}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={(e) => e.stopPropagation()}
            >
              <View style={[styles.modalContent, dynamicStyles.modalContent, styles.improvementModalContent]}>
                <Text style={[styles.improvementModalTitle, dynamicStyles.modalTitle]}>Suggest an improvement</Text>

                <ScrollView style={styles.improvementList} showsVerticalScrollIndicator={true}>
                  {[
                    { label: 'Search results', icon: '🔍' },
                    { label: 'Filters', icon: '⚙️' },
                    { label: 'Property details', icon: '🏠' },
                    { label: 'Map', icon: '🗺️' },
                    { label: 'Login/Account', icon: '👤' },
                    { label: 'Saved properties', icon: '❤️' },
                    { label: 'Saved search alert', icon: '🔔' },
                    { label: 'Contacted properties', icon: '📞' },
                    { label: 'Darkmode', icon: '🌙' },
                  ].map((item, index, array) => (
                    <View key={index}>
                      <TouchableOpacity
                        style={styles.improvementOption}
                        onPress={() => handleImprovementOptionSelect(item.label)}
                      >
                        <Text style={[styles.improvementOptionText, dynamicStyles.primaryText]}>
                          {item.label}
                        </Text>
                      </TouchableOpacity>
                      {index < array.length - 1 && (
                        <View style={[styles.improvementSeparator, dynamicStyles.separator]} />
                      )}
                    </View>
                  ))}
                </ScrollView>

                <TouchableOpacity
                  style={styles.improvementCancelButton}
                  onPress={() => setShowImprovementModal(false)}
                >
                  <Text style={styles.improvementCancelText}>Cancel</Text>
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
    pointerEvents: 'box-none',
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
    zIndex: 999,
    elevation: 10,
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
  // Rating Modal Styles
  ratingModalContent: {
    paddingVertical: 30,
    paddingHorizontal: 24,
  },
  ratingIllustration: {
    alignItems: 'center',
    marginBottom: 24,
    position: 'relative',
  },
  ratingImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  ratingEmoji: {
    fontSize: 80,
    marginBottom: 8,
  },
  reviewBubble: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    position: 'absolute',
    top: 10,
    right: -20,
  },
  reviewStars: {
    fontSize: 12,
  },
  ratingPeople: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  personEmoji: {
    fontSize: 40,
  },
  ratingModalTitle: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 12,
    textAlign: 'center',
  },
  ratingModalSubtitle: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  starButton: {
    padding: 4,
  },
  starIcon: {
    fontSize: 36,
  },
  starIconSelected: {
    transform: [{ scale: 1.1 }],
  },
  starLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  starLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  rateLaterButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  rateLaterText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5e35b1',
  },
  // Help Modal Styles
  helpModalContent: {
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  helpModalTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'left',
  },
  helpOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  helpIconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  helpIcon: {
    fontSize: 24,
  },
  helpTextContainer: {
    flex: 1,
  },
  helpOptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  helpOptionSubtitle: {
    fontSize: 13,
    lineHeight: 18,
  },
  helpArrowContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  helpSeparator: {
    height: 1,
    marginVertical: 12,
  },
  helpCancelButton: {
    marginTop: 20,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  helpCancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5e35b1',
  },
  // Improvement Modal Styles
  improvementModalContent: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    maxHeight: '100%',
  },
  improvementModalTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'left',
  },
  improvementList: {
    maxHeight: 400,
  },
  improvementOption: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  improvementOptionText: {
    fontSize: 16,
    fontWeight: '400',
  },
  improvementSeparator: {
    height: 1,
  },
  improvementCancelButton: {
    marginTop: 20,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  improvementCancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5e35b1',
  },
});

export default AccountScreen;