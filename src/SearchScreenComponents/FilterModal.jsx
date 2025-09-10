import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
  useColorScheme,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import { useThemedStyles } from "./styles";

const { height: screenHeight } = Dimensions.get('window');

const FilterModal = ({ visible, onClose, filters, onFiltersChange }) => {
  const styles = useThemedStyles();
  const scheme = useColorScheme();
  const theme = useTheme();
  const [slideAnim] = useState(new Animated.Value(screenHeight));

  // Dynamic colors for icons based on theme
  const iconColors = {
    primary: scheme === 'dark' ? '#ffffff' : '#333',
    secondary: scheme === 'dark' ? '#cccccc' : '#999',
    active: scheme === 'dark' ? '#4a5db8' : '#0b154f',
    placeholder: scheme === 'dark' ? '#999999' : '#999',
  };

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const propertyTypes = ['Apartment', 'Villa', 'Townhouse', 'Penthouse', 'Compound', 'Duplex'];
  const bedroomOptions = ['Studio', '1', '2', '3', '4', '5', '6', '7', '7+'];
  const bathroomOptions = ['1', '2', '3', '4', '5', '6', '7', '7+'];
  const furnishingOptions = ['Furnished', 'Unfurnished', 'Partly furnished'];
  const amenities = [
    { key: 'balcony', label: 'Balcony', icon: 'balcony' },
    { key: 'ac', label: 'Central A/C', icon: 'ac-unit' },
    { key: 'maidRoom', label: 'Maids Room', icon: 'room' },
    { key: 'petsAllowed', label: 'Pets Allowed', icon: 'pets' },
    { key: 'privatePool', label: 'Private Pool', icon: 'pool' },
    { key: 'waterView', label: 'View of Water', icon: 'water' },
  ];

  const updateFilter = (key, value) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleArrayFilter = (key, value) => {
    const currentArray = filters[key] || [];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    updateFilter(key, newArray);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <TouchableOpacity style={styles.modalBackground} onPress={onClose} />
        <Animated.View
          style={[
            styles.filterModal,
            { transform: [{ translateY: slideAnim }] }
          ]}
        >
          {/* Header */}
          <View style={styles.filterHeader}>
            <TouchableOpacity onPress={onClose}>
              <Icon name="arrow-back" size={24} color={iconColors.primary} />
            </TouchableOpacity>
            <Text style={styles.filterTitle}>Filter</Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView style={styles.filterContent}>
            {/* Rent/Buy Toggle */}
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[styles.toggleButton, filters.type === 'Rent' && styles.activeToggle]}
                onPress={() => updateFilter('type', 'Rent')}
              >
                <Text style={[styles.toggleText, filters.type === 'Rent' && styles.activeToggleText]}>Rent</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.toggleButton, filters.type === 'Buy' && styles.activeToggle]}
                onPress={() => updateFilter('type', 'Buy')}
              >
                <Text style={[styles.toggleText, filters.type === 'Buy' && styles.activeToggleText]}>Buy</Text>
              </TouchableOpacity>
            </View>

            {/* Commercial Properties Toggle */}
            <View style={styles.filterSection}>
              <View style={styles.commercialToggle}>
                <Text style={styles.sectionTitle}>View commercial properties only</Text>
                <TouchableOpacity
                  style={[styles.switch, filters.commercial && styles.switchActive]}
                  onPress={() => updateFilter('commercial', !filters.commercial)}
                >
                  <View style={[styles.switchThumb, filters.commercial && styles.switchThumbActive]} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Property Type */}
            <View style={styles.filterSection}>
              <View style={styles.sectionHeader}>
                <Icon name="home" size={20} color={iconColors.primary} />
                <Text style={styles.sectionTitle}>Property Type</Text>
              </View>
              <View style={styles.optionsGrid}>
                {propertyTypes.map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.optionButton,
                      (filters.propertyTypes || []).includes(type) && styles.activeOption
                    ]}
                    onPress={() => toggleArrayFilter('propertyTypes', type)}
                  >
                    <Text style={[
                      styles.optionText,
                      (filters.propertyTypes || []).includes(type) && styles.activeOptionText
                    ]}>
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <TouchableOpacity style={styles.showMoreButton}>
                <Text style={styles.showMoreText}>Show more property types</Text>
              </TouchableOpacity>
            </View>

            {/* Price Period */}
            <View style={[styles.filterSection, { 
              borderTopColor: scheme === 'dark' ? '#404040' : '#deddddff', 
              borderTopWidth: 1 
            }]}>
              <View style={[styles.sectionHeader, { marginTop: 14 }]}>
                <Icon name="schedule" size={20} color={iconColors.primary} />
                <Text style={styles.sectionTitle}>Price Period</Text>
              </View>
              <View style={styles.periodButtons}>
                <TouchableOpacity
                  style={[styles.periodButton, filters.pricePeriod === 'Monthly' && styles.activePeriod]}
                  onPress={() => updateFilter('pricePeriod', 'Monthly')}
                >
                  <Text style={[styles.periodText, filters.pricePeriod === 'Monthly' && styles.activePeriodText]}>Monthly</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.periodButton, filters.pricePeriod === 'Daily' && styles.activePeriod]}
                  onPress={() => updateFilter('pricePeriod', 'Daily')}
                >
                  <Text style={[styles.periodText, filters.pricePeriod === 'Daily' && styles.activePeriodText]}>Daily</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Price Range */}
            <View style={[styles.filterSection, { 
              borderTopColor: scheme === 'dark' ? '#404040' : '#deddddff', 
              borderTopWidth: 1 
            }]}>
              <View style={[styles.sectionHeader, { marginTop: 14 }]}>
                <Icon name="attach-money" size={20} color={iconColors.primary} />
                <Text style={styles.sectionTitle}>Monthly Price Range (EGP)</Text>
              </View>

              {/* Price Chart Placeholder */}
              <View style={styles.chartContainer}>
                <View style={styles.chartBars}>
                  {Array.from({ length: 20 }).map((_, index) => (
                    <View
                      key={index}
                      style={[
                        styles.chartBar,
                        { height: Math.random() * 60 + 10 }
                      ]}
                    />
                  ))}
                </View>
              </View>

              <View style={styles.priceInputs}>
                <TextInput
                  style={styles.priceInput}
                  placeholder="No min."
                  placeholderTextColor={iconColors.placeholder}
                  value={filters.minPrice}
                  onChangeText={(text) => updateFilter('minPrice', text)}
                />
                <Text style={styles.priceSeparator}>—</Text>
                <TextInput
                  style={styles.priceInput}
                  placeholder="No max."
                  placeholderTextColor={iconColors.placeholder}
                  value={filters.maxPrice}
                  onChangeText={(text) => updateFilter('maxPrice', text)}
                />
              </View>
            </View>

            {/* Bedrooms */}
            <View style={[styles.filterSection, { 
              borderTopColor: scheme === 'dark' ? '#404040' : '#deddddff', 
              borderTopWidth: 1 
            }]}>
              <View style={[styles.sectionHeader, { marginTop: 14 }]}>
                <Icon name="bed" size={20} color={iconColors.primary} />
                <Text style={styles.sectionTitle}>Bedrooms</Text>
              </View>
              <View style={styles.optionsGrid}>
                {bedroomOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.numberOption,
                      (filters.bedrooms || []).includes(option) && styles.activeOption
                    ]}
                    onPress={() => toggleArrayFilter('bedrooms', option)}
                  >
                    <Text style={[
                      styles.optionText,
                      (filters.bedrooms || []).includes(option) && styles.activeOptionText
                    ]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Bathrooms */}
            <View style={[styles.filterSection, { 
              borderTopColor: scheme === 'dark' ? '#404040' : '#deddddff', 
              borderTopWidth: 1 
            }]}>
              <View style={[styles.sectionHeader, { marginTop: 14 }]}>
                <Icon name="bathtub" size={20} color={iconColors.primary} />
                <Text style={styles.sectionTitle}>Bathrooms</Text>
              </View>
              <View style={styles.optionsGrid}>
                {bathroomOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.numberOption,
                      (filters.bathrooms || []).includes(option) && styles.activeOption
                    ]}
                    onPress={() => toggleArrayFilter('bathrooms', option)}
                  >
                    <Text style={[
                      styles.optionText,
                      (filters.bathrooms || []).includes(option) && styles.activeOptionText
                    ]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Furnishings */}
            <View style={[styles.filterSection, { 
              borderTopColor: scheme === 'dark' ? '#404040' : '#deddddff', 
              borderTopWidth: 1 
            }]}>
              <View style={[styles.sectionHeader, { marginTop: 14 }]}>
                <Icon name="weekend" size={20} color={iconColors.primary} />
                <Text style={styles.sectionTitle}>Furnishings</Text>
              </View>
              <View style={styles.furnishingButtons}>
                {furnishingOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.furnishingButton,
                      (filters.furnishings || []).includes(option) && styles.activeOption
                    ]}
                    onPress={() => toggleArrayFilter('furnishings', option)}
                  >
                    <Text style={[
                      styles.optionText,
                      (filters.furnishings || []).includes(option) && styles.activeOptionText
                    ]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Property Size */}
            <View style={[styles.filterSection, { 
              borderTopColor: scheme === 'dark' ? '#404040' : '#deddddff', 
              borderTopWidth: 1 
            }]}>
              <View style={[styles.sectionHeader, { marginTop: 14 }]}>
                <Icon name="straighten" size={20} color={iconColors.primary} />
                <Text style={styles.sectionTitle}>Property Size (ft²)</Text>
              </View>
              <View style={styles.sizeInputs}>
                <View style={styles.sizeInputContainer}>
                  <TextInput
                    style={styles.sizeInput}
                    placeholder="Min. size"
                    placeholderTextColor={iconColors.placeholder}
                    value={filters.minSize}
                    onChangeText={(text) => updateFilter('minSize', text)}
                  />
                  <Icon name="keyboard-arrow-down" size={20} color={iconColors.secondary} />
                </View>
                <Text style={styles.sizeSeparator}>to</Text>
                <View style={styles.sizeInputContainer}>
                  <TextInput
                    style={styles.sizeInput}
                    placeholder="Max. size"
                    placeholderTextColor={iconColors.placeholder}
                    value={filters.maxSize}
                    onChangeText={(text) => updateFilter('maxSize', text)}
                  />
                  <Icon name="keyboard-arrow-down" size={20} color={iconColors.secondary} />
                </View>
              </View>
            </View>

            {/* Amenities */}
            <View style={[styles.filterSection, { 
              borderTopColor: scheme === 'dark' ? '#404040' : '#deddddff', 
              borderTopWidth: 1 
            }]}>
              <View style={[styles.sectionHeader, { marginTop: 14 }]}>
                <Icon name="visibility" size={20} color={iconColors.primary} />
                <Text style={styles.sectionTitle}>Amenities</Text>
              </View>
              <View style={styles.amenitiesGrid}>
                {amenities.map((amenity) => (
                  <TouchableOpacity
                    key={amenity.key}
                    style={[
                      styles.amenityButton,
                      (filters.amenities || []).includes(amenity.key) && styles.activeAmenity
                    ]}
                    onPress={() => toggleArrayFilter('amenities', amenity.key)}
                  >
                    <Icon
                      name={amenity.icon}
                      size={20}
                      color={(filters.amenities || []).includes(amenity.key) ? iconColors.active : iconColors.secondary}
                    />
                    <Text style={[
                      styles.amenityText,
                      (filters.amenities || []).includes(amenity.key) && styles.activeAmenityText
                    ]}>
                      {amenity.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <TouchableOpacity style={styles.showMoreButton}>
                <Text style={styles.showMoreText}>Show more amenities</Text>
              </TouchableOpacity>
            </View>

            {/* Days on Property Finder */}
            <View style={[styles.filterSection, { 
              borderTopColor: scheme === 'dark' ? '#404040' : '#deddddff', 
              borderTopWidth: 1 
            }]}>
              <View style={[styles.sectionHeader, { marginTop: 14 }]}>
                <Icon name="calendar-today" size={20} color={iconColors.primary} />
                <Text style={styles.sectionTitle}>Days on Property Finder</Text>
              </View>
              <View style={styles.daysInputContainer}>
                <TextInput
                  style={styles.daysInput}
                  placeholder="Any"
                  placeholderTextColor={iconColors.placeholder}
                  value={filters.daysOnSite}
                  onChangeText={(text) => updateFilter('daysOnSite', text)}
                />
                <Icon name="keyboard-arrow-down" size={20} color={iconColors.secondary} />
              </View>
            </View>

            {/* Keywords */}
            <View style={[styles.filterSection, { 
              borderTopColor: scheme === 'dark' ? '#404040' : '#deddddff', 
              borderTopWidth: 1, 
              marginBottom: 20 
            }]}>
              <View style={[styles.sectionHeader, { marginTop: 14 }]}>
                <Icon name="search" size={20} color={iconColors.primary} />
                <Text style={styles.sectionTitle}>Keywords</Text>
              </View>
              <TextInput
                style={styles.keywordsInput}
                placeholder="Beach, balcony, etc."
                placeholderTextColor={iconColors.placeholder}
                value={filters.keywords}
                onChangeText={(text) => updateFilter('keywords', text)}
              />
            </View>

            {/* Apply Button Footer */}
            <View style={styles.filterFooter}>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={onClose}
              >
                <Text style={styles.applyButtonText}>Show 46,561 properties</Text>
              </TouchableOpacity>
            </View>

            <View style={{ height: 100 }} />
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default FilterModal;