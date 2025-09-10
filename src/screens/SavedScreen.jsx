import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { Svg, Circle, Path, G } from 'react-native-svg';

const { width } = Dimensions.get('window');

// Custom Moon and Star Icon Component
const MoonStarIcon = () => (
  <Svg width="120" height="120" viewBox="0 0 100 100">
    <Circle cx="50" cy="50" r="45" fill="#4A5568" opacity="0.3" />
    {/* Stars */}
    <Circle cx="30" cy="25" r="1.5" fill="white" />
    <Circle cx="70" cy="20" r="1" fill="white" />
    <Circle cx="75" cy="35" r="1.2" fill="white" />
    <Circle cx="25" cy="40" r="1" fill="white" />
    <Circle cx="80" cy="60" r="1.3" fill="white" />
    <Circle cx="20" cy="65" r="1" fill="white" />
    {/* Moon */}
    <Path
      d="M35 25 C35 40, 50 50, 65 50 C50 65, 30 55, 35 25 Z"
      fill="white"
    />
    {/* House silhouette */}
    <Path
      d="M40 70 L40 85 L60 85 L60 70 L65 75 L50 60 L35 75 Z"
      fill="#9CA3AF"
    />
  </Svg>
);

// Custom Search Alert Icon Component
const SearchAlertIcon = () => (
  <Svg width="120" height="120" viewBox="0 0 120 100">
    {/* Magnifying glass */}
    <Circle cx="35" cy="35" r="20" fill="#6B7280" stroke="white" strokeWidth="2" />
    <Path d="M50 50 L60 60" stroke="white" strokeWidth="3" strokeLinecap="round" />
    
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
    <Path d="M75 62 L75 68 L80 68 L80 62 Z" fill="white" />
    
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
    <Text x="90" y="35" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">!</Text>
  </Svg>
);

const PropertySearchApp = () => {
  const [activeTab, setActiveTab] = useState(0);

  const TabButton = ({ title, isActive, onPress }) => (
    <TouchableOpacity
      style={[styles.tabButton, isActive && styles.activeTab]}
      onPress={onPress}
    >
      <Text style={[styles.tabText, isActive && styles.activeTabText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const SavesPropertiesTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.iconContainer}>
        <MoonStarIcon />
      </View>
      
      <Text style={styles.mainTitle}>Save your favorite homes</Text>
      
      <Text style={styles.description}>
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
        <SearchAlertIcon />
      </View>
      
      <Text style={styles.mainTitle}>Never miss a property</Text>
      
      <Text style={styles.description}>
        Create an alert to be notified when there are new properties matching your criteria.
      </Text>
      
      <TouchableOpacity style={styles.signInButton}>
        <Text style={styles.signInButtonText}>Sign up or log in</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      {/* Tab Headers */}
      <View style={styles.tabContainer}>
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
      <View style={styles.contentContainer}>
        {activeTab === 0 ? <SavesPropertiesTab /> : <SearchAlertTab />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop:42,

  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
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
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#1F2937',
    fontWeight: '600',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    color: '#1F2937',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    color: '#6B7280',
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
    borderColor: '#D1D5DB',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    minWidth: 150,
  },
  signInButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default PropertySearchApp;