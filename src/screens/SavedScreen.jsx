import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';
import { Svg, Circle, Path, G } from 'react-native-svg';

const { width } = Dimensions.get('window');

// Custom Moon and Star Icon Component
const MoonStarIcon = ({ isDark }) => (
  <Svg width="120" height="120" viewBox="0 0 100 100">
    <Circle cx="50" cy="50" r="45" fill={isDark ? "#374151" : "#4A5568"} opacity="0.3" />
    {/* Stars */}
    <Circle cx="30" cy="25" r="1.5" fill={isDark ? "#F9FAFB" : "white"} />
    <Circle cx="70" cy="20" r="1" fill={isDark ? "#F9FAFB" : "white"} />
    <Circle cx="75" cy="35" r="1.2" fill={isDark ? "#F9FAFB" : "white"} />
    <Circle cx="25" cy="40" r="1" fill={isDark ? "#F9FAFB" : "white"} />
    <Circle cx="80" cy="60" r="1.3" fill={isDark ? "#F9FAFB" : "white"} />
    <Circle cx="20" cy="65" r="1" fill={isDark ? "#F9FAFB" : "white"} />
    {/* Moon */}
    <Path
      d="M35 25 C35 40, 50 50, 65 50 C50 65, 30 55, 35 25 Z"
      fill={isDark ? "#F9FAFB" : "white"}
    />
    {/* House silhouette */}
    <Path
      d="M40 70 L40 85 L60 85 L60 70 L65 75 L50 60 L35 75 Z"
      fill={isDark ? "#6B7280" : "#9CA3AF"}
    />
  </Svg>
);

// Custom Search Alert Icon Component
const SearchAlertIcon = ({ isDark }) => (
  <Svg width="120" height="120" viewBox="0 0 120 100">
    {/* Magnifying glass */}
    <Circle cx="35" cy="35" r="20" fill={isDark ? "#4B5563" : "#6B7280"} stroke={isDark ? "#F9FAFB" : "white"} strokeWidth="2" />
    <Path d="M50 50 L60 60" stroke={isDark ? "#F9FAFB" : "white"} strokeWidth="3" strokeLinecap="round" />
    
    {/* Star inside magnifying glass */}
    <Path
      d="M35 25 L37 31 L43 31 L38 35 L40 41 L35 37 L30 41 L32 35 L27 31 L33 31 Z"
      fill="#FCD34D"
    />
    
    {/* House 1 */}
    <Path
      d="M70 55 L70 70 L85 70 L85 55 L90 60 L77.5 45 L65 60 Z"
      fill="#DC2626"
    />
    <Path d="M75 62 L75 68 L80 68 L80 62 Z" fill={isDark ? "#F9FAFB" : "white"} />
    
    {/* House 2 */}
    <Path
      d="M85 60 L85 75 L100 75 L100 60 L105 65 L92.5 50 L80 65 Z"
      fill="#EF4444"
    />
    
    {/* Tree */}
    <Circle cx="110" cy="65" r="8" fill="#10B981" />
    <Path d="M110 73 L110 80" stroke="#8B5A2B" strokeWidth="2" />
    
    {/* Notification dot */}
    <Circle cx="90" cy="30" r="8" fill="#FCD34D" />
    <Text x="90" y="35" textAnchor="middle" fill={isDark ? "#1F2937" : "white"} fontSize="10" fontWeight="bold">!</Text>
  </Svg>
);

const SavedScreen = () => {
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();
  const scheme = useColorScheme();

  // Dynamic styles based on theme
  const dynamicStyles = {
    container: {
      backgroundColor: scheme === 'light' ? '#FFFFFF' : theme.colors.background,
    },
    tabContainer: {
      backgroundColor: scheme === 'light' ? '#F9FAFB' : theme.colors.elevation.level1,
      borderBottomColor: scheme === 'light' ? '#E5E7EB' : theme.colors.outline,
    },
    contentContainer: {
      backgroundColor: scheme === 'light' ? '#FFFFFF' : theme.colors.background,
    },
    tabText: {
      color: scheme === 'light' ? '#6B7280' : theme.colors.onSurfaceVariant,
    },
    activeTabText: {
      color: scheme === 'light' ? '#1F2937' : theme.colors.onSurface,
    },
    mainTitle: {
      color: scheme === 'light' ? '#1F2937' : theme.colors.onSurface,
    },
    description: {
      color: scheme === 'light' ? '#6B7280' : theme.colors.onSurfaceVariant,
    },
    signInButton: {
      borderColor: scheme === 'light' ? '#D1D5DB' : theme.colors.outline,
    },
    signInButtonText: {
      color: scheme === 'light' ? '#374151' : theme.colors.onSurface,
    },
  };

  const TabButton = ({ title, isActive, onPress }) => (
    <TouchableOpacity
      style={[styles.tabButton, isActive && styles.activeTab]}
      onPress={onPress}
    >
      <Text style={[
        styles.tabText, 
        dynamicStyles.tabText,
        isActive && [styles.activeTabText, dynamicStyles.activeTabText]
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const SavesPropertiesTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.iconContainer}>
        <MoonStarIcon isDark={scheme === 'dark'} />
      </View>
      
      <Text style={[styles.mainTitle, dynamicStyles.mainTitle]}>Save your favorite homes</Text>
      
      <Text style={[styles.description, dynamicStyles.description]}>
        Start adding your favorite homes and stay updated on contacted agents and much more.
      </Text>
      
      <TouchableOpacity style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Search Now</Text>
      </TouchableOpacity>
    </View>
  );

  const SearchAlertTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.iconContainer}>
        <SearchAlertIcon isDark={scheme === 'dark'} />
      </View>
      
      <Text style={[styles.mainTitle, dynamicStyles.mainTitle]}>Never miss a property</Text>
      
      <Text style={[styles.description, dynamicStyles.description]}>
        Create an alert to be notified when there are new properties matching your criteria.
      </Text>
      
      <TouchableOpacity style={[styles.signInButton, dynamicStyles.signInButton]}>
        <Text style={[styles.signInButtonText, dynamicStyles.signInButtonText]}>Sign up or log in</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, dynamicStyles.container]}>
      <StatusBar 
        barStyle={scheme === 'light' ? 'dark-content' : 'light-content'} 
        backgroundColor={scheme === 'light' ? '#FFFFFF' : theme.colors.background} 
      />
      
      {/* Tab Headers */}
      <View style={[styles.tabContainer, dynamicStyles.tabContainer]}>
        <TabButton
          title="Saves properties"
          isActive={activeTab === 0}
          onPress={() => setActiveTab(0)}
        />
        <TabButton
          title="Search alert"
          isActive={activeTab === 1}
          onPress={() => setActiveTab(1)}
        />
      </View>

      {/* Tab Content */}
      <View style={[styles.contentContainer, dynamicStyles.contentContainer]}>
        {activeTab === 0 ? <SavesPropertiesTab /> : <SearchAlertTab />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingTop: 10,
    borderBottomWidth: 1,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#DC2626',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
  },
  activeTabText: {
    fontWeight: '600',
  },
  contentContainer: {
    flex: 1,
  },
  tabContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    marginBottom: 40,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  searchButton: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    minWidth: 150,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  signInButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    minWidth: 150,
  },
  signInButtonText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default SavedScreen;