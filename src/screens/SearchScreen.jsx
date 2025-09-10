import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  Linking,
  Modal,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";

const { height: screenHeight } = Dimensions.get('window');

const PropertyCard = ({ property, onPress, onCall, onWhatsApp, isFavorite, onToggleFavorite }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.propertyCard}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: property.image }} style={styles.propertyImage} />
        <TouchableOpacity style={styles.favoriteButton} onPress={() => onToggleFavorite(property.id)}>
          <Icon name={isFavorite ? "favorite" : "favorite-border"} size={24} color="#FF5F06" />
        </TouchableOpacity>

        <View style={styles.profileAvatar}>
          <Image
            source={{ uri: property.profileImage || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face' }}
            style={styles.avatarImage}
          />
        </View>
      </View>

      <View style={styles.propertyDetails}>
        <View style={styles.propertyHeader}>
          <Text style={styles.propertyType}>{property.type}</Text>
          <Text style={styles.listedTime}>Listed {property.listedTime}</Text>
        </View>

        <Text style={styles.price}>{property.price}</Text>
        <Text style={styles.location}>{property.location}</Text>

        <View style={styles.propertySpecs}>
          <View style={styles.specItem}>
            <Text style={styles.specLabel}>Beds</Text>
            <Text style={styles.specValue}>{property.beds}</Text>
          </View>
          <View style={styles.specItem}>
            <Text style={styles.specLabel}>Baths</Text>
            <Text style={styles.specValue}>{property.baths}</Text>
          </View>
          <View style={styles.specItem}>
            <Text style={styles.specLabel}>Area</Text>
            <Text style={styles.specValue}>{property.area}</Text>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.callButton]}
            onPress={() => onCall(property.phone)}
          >
            <Icon name="phone" size={20} color="#FFF" />
            <Text style={styles.callButtonText}>Call</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.whatsappButton]}
            onPress={() => onWhatsApp(property.phone)}
          >
            <Icon name="chat" size={20} color="#FFF" />
            <Text style={styles.whatsappButtonText}>WhatsApp</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const FilterModal = ({ visible, onClose, filters, onFiltersChange }) => {
  const [slideAnim] = useState(new Animated.Value(screenHeight));

  React.useEffect(() => {
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
              <Icon name="arrow-back" size={24} />
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
                <Icon name="home" size={20} />
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
            <View style={[styles.filterSection, { borderTopColor: '#deddddff', borderTopWidth: 1 }]}>
              <View style={[styles.sectionHeader, { marginTop: 14 }]}>
                <Icon name="schedule" size={20} />
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
            <View style={[styles.filterSection, { borderTopColor: '#deddddff', borderTopWidth: 1 }]}>
              <View style={[styles.sectionHeader, { marginTop: 14 }]}>
                <Icon name="attach-money" size={20} />
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
                  placeholderTextColor="#999"
                  value={filters.minPrice}
                  onChangeText={(text) => updateFilter('minPrice', text)}
                />
                <Text style={styles.priceSeparator}>—</Text>
                <TextInput
                  style={styles.priceInput}
                  placeholder="No max."
                  placeholderTextColor="#999"
                  value={filters.maxPrice}
                  onChangeText={(text) => updateFilter('maxPrice', text)}
                />
              </View>
            </View>

            {/* Bedrooms */}
            <View style={[styles.filterSection, { borderTopColor: '#deddddff', borderTopWidth: 1 }]}>
              <View style={[styles.sectionHeader, { marginTop: 14 }]}>
                <Icon name="bed" size={20} />
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
            <View style={[styles.filterSection, { borderTopColor: '#deddddff', borderTopWidth: 1 }]}>
              <View style={[styles.sectionHeader, { marginTop: 14 }]}>
                <Icon name="bathtub" size={20} />
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
            <View style={[styles.filterSection, { borderTopColor: '#deddddff', borderTopWidth: 1 }]}>
              <View style={[styles.sectionHeader, { marginTop: 14 }]}>
                <Icon name="weekend" size={20} />
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
            <View style={[styles.filterSection, { borderTopColor: '#deddddff', borderTopWidth: 1 }]}>
              <View style={[styles.sectionHeader, { marginTop: 14 }]}>
                <Icon name="straighten" size={20} />
                <Text style={styles.sectionTitle}>Property Size (ft²)</Text>
              </View>
              <View style={styles.sizeInputs}>
                <View style={styles.sizeInputContainer}>
                  <TextInput
                    style={styles.sizeInput}
                    placeholder="Min. size"
                    placeholderTextColor="#999"
                    value={filters.minSize}
                    onChangeText={(text) => updateFilter('minSize', text)}
                  />
                  <Icon name="keyboard-arrow-down" size={20} color="#999" />
                </View>
                <Text style={styles.sizeSeparator}>to</Text>
                <View style={styles.sizeInputContainer}>
                  <TextInput
                    style={styles.sizeInput}
                    placeholder="Max. size"
                    placeholderTextColor="#999"
                    value={filters.maxSize}
                    onChangeText={(text) => updateFilter('maxSize', text)}
                  />
                  <Icon name="keyboard-arrow-down" size={20} color="#999" />
                </View>
              </View>
            </View>

            {/* Amenities */}
            <View style={[styles.filterSection, { borderTopColor: '#deddddff', borderTopWidth: 1 }]}>
              <View style={[styles.sectionHeader, { marginTop: 14 }]}>
                <Icon name="visibility" size={20} />
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
                      color={(filters.amenities || []).includes(amenity.key) ? "#0b154f" : "#999"}
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
            <View style={[styles.filterSection, { borderTopColor: '#deddddff', borderTopWidth: 1 }]}>
              <View style={[styles.sectionHeader, { marginTop: 14 }]}>
                <Icon name="calendar-today" size={20} />
                <Text style={styles.sectionTitle}>Days on Property Finder</Text>
              </View>
              <View style={styles.daysInputContainer}>
                <TextInput
                  style={styles.daysInput}
                  placeholder="Any"
                  placeholderTextColor="#999"
                  value={filters.daysOnSite}
                  onChangeText={(text) => updateFilter('daysOnSite', text)}
                />
                <Icon name="keyboard-arrow-down" size={20} color="#999" />
              </View>
            </View>

            {/* Keywords */}
            <View style={[styles.filterSection, { borderTopColor: '#deddddff', borderTopWidth: 1, marginBottom: 20 }]}>
              <View style={[styles.sectionHeader, { marginTop: 14 }]}>
                <Icon name="search" size={20} />
                <Text style={styles.sectionTitle}>Keywords</Text>
              </View>
              <TextInput
                style={styles.keywordsInput}
                placeholder="Beach, balcony, etc."
                placeholderTextColor="#999"
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

// 1. Category Modal (Rent/Buy)
const CategoryModal = ({ visible, onClose, selectedCategory, onCategorySelect }) => {
  const [slideAnim] = useState(new Animated.Value(screenHeight));

  React.useEffect(() => {
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

  return (
    <Modal visible={visible} transparent={true} animationType="none" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <TouchableOpacity style={styles.modalBackground} onPress={onClose} />
        <Animated.View style={[styles.categoryModal, { transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.categoryHeader}>
            <Text style={styles.categoryTitle}>Category</Text>
          </View>
          <View style={styles.categoryContent}>
            <View style={styles.categoryToggleContainer}>
              <TouchableOpacity
                style={[styles.categoryToggleButton, selectedCategory === 'Rent' && styles.activeCategoryToggle]}
                onPress={() => onCategorySelect('Rent')}
              >
                <Text style={[styles.categoryToggleText, selectedCategory === 'Rent' && styles.activeCategoryToggleText]}>
                  Rent
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.categoryToggleButton, selectedCategory === 'Buy' && styles.activeCategoryToggle]}
                onPress={() => onCategorySelect('Buy')}
              >
                <Text style={[styles.categoryToggleText, selectedCategory === 'Buy' && styles.activeCategoryToggleText]}>
                  Buy
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

// 2. Property Type Modal
const PropertyModal = ({ visible, onClose, selectedProperties, onPropertySelect }) => {
  const [slideAnim] = useState(new Animated.Value(screenHeight));

  React.useEffect(() => {
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

  const propertyTypes = [
    'Apartment', 'Villa', 'Townhouse', 'Penthouse', 'Duplex', 'Studio',
    'Office', 'Shop', 'Warehouse', 'Land', 'Building', 'Chalet'
  ];

  const toggleProperty = (property) => {
    const newSelection = selectedProperties.includes(property)
      ? selectedProperties.filter(p => p !== property)
      : [...selectedProperties, property];
    onPropertySelect(newSelection);
  };

  return (
    <Modal visible={visible} transparent={true} animationType="none" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <TouchableOpacity style={styles.modalBackground} onPress={onClose} />
        <Animated.View style={[styles.propertyModal, { transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color="#666" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Property Type</Text>
            <View style={{ width: 24 }} />
          </View>
          <ScrollView style={styles.modalContent}>
            <View style={styles.propertyGrid}>
              {propertyTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.propertyOption,
                    selectedProperties.includes(type) && styles.activePropertyOption
                  ]}
                  onPress={() => toggleProperty(type)}
                >
                  <Text style={[
                    styles.propertyOptionText,
                    selectedProperties.includes(type) && styles.activePropertyOptionText
                  ]}>
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.applyButton} onPress={onClose}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

// 3. Price Range Modal
const PriceModal = ({ visible, onClose, priceRange, onPriceChange }) => {
  const [slideAnim] = useState(new Animated.Value(screenHeight));

  React.useEffect(() => {
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

  const priceRanges = [
    '1,000 - 5,000 EGP',
    '5,000 - 10,000 EGP',
    '10,000 - 20,000 EGP',
    '20,000 - 50,000 EGP',
    '50,000 - 100,000 EGP',
    '100,000+ EGP'
  ];

  return (
    <Modal visible={visible} transparent={true} animationType="none" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <TouchableOpacity style={styles.modalBackground} onPress={onClose} />
        <Animated.View style={[styles.priceModal, { transform: [{ translateY: slideAnim }] }]}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color="#666" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Price Range</Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView style={styles.modalContent}>
            {/* Price Histogram + Inputs */}
            <View style={styles.priceSection}>
              <View style={styles.sectionHeader}>
                <Icon name="attach-money" size={20} color="#0b154f" />
                <Text style={styles.sectionTitle}>Monthly Price Range (EGP)</Text>
              </View>

              {/* Histogram */}
              <View style={styles.chartContainer}>
                <View style={styles.chartBars}>
                  {Array.from({ length: 20 }).map((_, index) => (
                    <View
                      key={index}
                      style={[
                        styles.chartBar,
                        { height: Math.random() * 60 + 20 }
                      ]}
                    />
                  ))}
                </View>
              </View>

              {/* Min-Max Inputs */}
              <View style={styles.priceInputsRow}>
                <TextInput
                  style={styles.priceInputBox}
                  placeholder="No min."
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                  value={priceRange.min}
                  onChangeText={(text) => onPriceChange({ ...priceRange, min: text })}
                />
                <Text style={styles.priceSeparator}>—</Text>
                <TextInput
                  style={styles.priceInputBox}
                  placeholder="No max."
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                  value={priceRange.max}
                  onChangeText={(text) => onPriceChange({ ...priceRange, max: text })}
                />
              </View>
            </View>
          </ScrollView>

          {/* Apply Button */}
          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.applyButton} onPress={onClose}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

// 4. Beds & Baths Modal
const BedsAndBathsModal = ({ visible, onClose, bedsAndBaths, onBedsAndBathsChange }) => {
  const [slideAnim] = useState(new Animated.Value(screenHeight));

  React.useEffect(() => {
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

  const bedroomOptions = ['Studio', '1', '2', '3', '4', '5', '6', '7+'];
  const bathroomOptions = ['1', '2', '3', '4', '5', '6', '7+'];

  const toggleOption = (type, value) => {
    const currentArray = bedsAndBaths[type] || [];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    onBedsAndBathsChange({ ...bedsAndBaths, [type]: newArray });
  };

  return (
    <Modal visible={visible} transparent={true} animationType="none" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <TouchableOpacity style={styles.modalBackground} onPress={onClose} />
        <Animated.View style={[styles.bedsAndBathsModal, { transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color="#666" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Beds & Baths</Text>
            <View style={{ width: 24 }} />
          </View>
          <ScrollView style={styles.modalContent}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Bedrooms</Text>
              <View style={styles.optionsGrid}>
                {bedroomOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.numberOption,
                      (bedsAndBaths.bedrooms || []).includes(option) && styles.activeOption
                    ]}
                    onPress={() => toggleOption('bedrooms', option)}
                  >
                    <Text style={[
                      styles.numberOptionText,
                      (bedsAndBaths.bedrooms || []).includes(option) && styles.activeOptionText
                    ]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Bathrooms</Text>
              <View style={styles.optionsGrid}>
                {bathroomOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.numberOption,
                      (bedsAndBaths.bathrooms || []).includes(option) && styles.activeOption
                    ]}
                    onPress={() => toggleOption('bathrooms', option)}
                  >
                    <Text style={[
                      styles.numberOptionText,
                      (bedsAndBaths.bathrooms || []).includes(option) && styles.activeOptionText
                    ]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.applyButton} onPress={onClose}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

// 5. Amenities Modal
const AmenitiesModal = ({ visible, onClose, selectedAmenities, onAmenitiesChange }) => {
  const [slideAnim] = useState(new Animated.Value(screenHeight));

  React.useEffect(() => {
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

  const amenities = [
    { key: 'balcony', label: 'Balcony', icon: 'balcony' },
    { key: 'ac', label: 'Central A/C', icon: 'ac-unit' },
    { key: 'parking', label: 'Parking', icon: 'local-parking' },
    { key: 'pool', label: 'Swimming Pool', icon: 'pool' },
    { key: 'gym', label: 'Gym', icon: 'fitness-center' },
    { key: 'security', label: 'Security', icon: 'security' },
    { key: 'elevator', label: 'Elevator', icon: 'elevator' },
    { key: 'garden', label: 'Garden', icon: 'local-florist' },
    { key: 'maid', label: 'Maid Room', icon: 'room' },
    { key: 'pets', label: 'Pets Allowed', icon: 'pets' },
    { key: 'furnished', label: 'Furnished', icon: 'weekend' },
    { key: 'waterView', label: 'Water View', icon: 'water' }
  ];

  const toggleAmenity = (amenityKey) => {
    const newSelection = selectedAmenities.includes(amenityKey)
      ? selectedAmenities.filter(a => a !== amenityKey)
      : [...selectedAmenities, amenityKey];
    onAmenitiesChange(newSelection);
  };

  return (
    <Modal visible={visible} transparent={true} animationType="none" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <TouchableOpacity style={styles.modalBackground} onPress={onClose} />
        <Animated.View style={[styles.amenitiesModal, { transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color="#666" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Amenities</Text>
            <View style={{ width: 24 }} />
          </View>
          <ScrollView style={styles.modalContent}>
            <View style={styles.amenitiesGrid}>
              {amenities.map((amenity) => (
                <TouchableOpacity
                  key={amenity.key}
                  style={[
                    styles.amenityButton,
                    selectedAmenities.includes(amenity.key) && styles.activeAmenity
                  ]}
                  onPress={() => toggleAmenity(amenity.key)}
                >
                  <Icon
                    name={amenity.icon}
                    size={20}
                    color={selectedAmenities.includes(amenity.key) ? "#0b154f" : "#999"}
                  />
                  <Text style={[
                    styles.amenityText,
                    selectedAmenities.includes(amenity.key) && styles.activeAmenityText
                  ]}>
                    {amenity.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.applyButton} onPress={onClose}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const App = () => {
  const navigation = useNavigation();

  const handleNavigateToDetails = (property) => {
    navigation.navigate("PropertyDetails", { property });
  };


  const [favorites, setFavorites] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Rent');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({
    type: 'Rent',
    commercial: false,
    pricePeriod: 'Monthly',
  });

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [showBedsAndBathsModal, setShowBedsAndBathsModal] = useState(false);
  const [showAmenitiesModal, setShowAmenitiesModal] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState('Rent');
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '', selected: '' });
  const [bedsAndBaths, setBedsAndBaths] = useState({ bedrooms: [], bathrooms: [] });
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id)
        : [...prevFavorites, id]
    );
  };

  // Update the filter tabs click handler:
  const handleFilterTabPress = (filter) => {
    setSelectedFilter(filter);

    switch (filter) {
      case 'Rent':
        setShowCategoryModal(true);
        break;
      case 'Property':
        setShowPropertyModal(true);
        break;
      case 'Price':
        setShowPriceModal(true);
        break;
      case 'Beds & Baths':
        setShowBedsAndBathsModal(true);
        break;
      case 'Amenities':
        setShowAmenitiesModal(true);
        break;
      default:
        break;
    }
  };

  const filterTabs = ['Rent', 'Property', 'Price', 'Beds & Baths', 'Amenities'];

  const properties = [
    {
      id: 1,
      type: 'Apartment',
      price: '2,900 EGP/month',
      location: 'Mandinaty, Cairo',
      beds: 2,
      baths: 2,
      area: '1292 Sqft',
      listedTime: '7 hours ago',
      phone: '+201234567890',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop',
      profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    },
    {
      id: 2,
      type: 'Apartment',
      price: '2,900 EGP/month',
      location: 'New Cairo',
      beds: 3,
      baths: 2,
      area: '1450 Sqft',
      listedTime: '7 hours ago',
      phone: '+201234567891',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    },
  ];

  const handleCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleWhatsApp = (phoneNumber) => {
    Linking.openURL(`whatsapp://send?phone=${phoneNumber}`);
  };


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="City, area or building"
            placeholderTextColor="#666"
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => setShowFilterModal(true)}
          >
            <Icon name="tune" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContainer}
        >
          {filterTabs.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterTab,
                selectedFilter === filter && styles.activeFilterTab
              ]}
              onPress={() => handleFilterTabPress(filter)}
            >
              <Text style={[
                styles.filterText,
                selectedFilter === filter && styles.activeFilterText
              ]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Properties Count & New Badge */}
      <View style={styles.resultsHeader}>
        <View style={styles.resultsInfo}>
          <Text style={styles.resultsCount}>45,718 properties</Text>
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>1,130 new</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.featuredButton}>
          <Text style={styles.featuredButtonText}>Featured</Text>
        </TouchableOpacity>
      </View>

      {/* Properties List */}
      <ScrollView style={styles.propertiesList} showsVerticalScrollIndicator={false}>
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onCall={handleCall}
            onWhatsApp={handleWhatsApp}
            isFavorite={favorites.includes(property.id)}
            onToggleFavorite={toggleFavorite}
            onPress={() => handleNavigateToDetails(property)}
          />
        ))}
      </ScrollView>

      {/* Filter Modal */}
      <FilterModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        filters={filters}
        onFiltersChange={setFilters}
      />

      <CategoryModal
        visible={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        selectedCategory={selectedCategory}
        onCategorySelect={(category) => {
          setSelectedCategory(category);
          setShowCategoryModal(false);
        }}
      />

      <PropertyModal
        visible={showPropertyModal}
        onClose={() => setShowPropertyModal(false)}
        selectedProperties={selectedProperties}
        onPropertySelect={setSelectedProperties}
      />

      <PriceModal
        visible={showPriceModal}
        onClose={() => setShowPriceModal(false)}
        priceRange={priceRange}
        onPriceChange={setPriceRange}
      />

      <BedsAndBathsModal
        visible={showBedsAndBathsModal}
        onClose={() => setShowBedsAndBathsModal(false)}
        bedsAndBaths={bedsAndBaths}
        onBedsAndBathsChange={setBedsAndBaths}
      />

      <AmenitiesModal
        visible={showAmenitiesModal}
        onClose={() => setShowAmenitiesModal(false)}
        selectedAmenities={selectedAmenities}
        onAmenitiesChange={setSelectedAmenities}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginTop: 16,
    marginBottom: '14%',
  },
  header: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    paddingHorizontal: 16,
    height: 50,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    color: '#333',
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#FF5F06',
    borderRadius: 10,
    padding: 8,
    marginLeft: 8,
  },
  filterWrapper: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filterContainer: {
    paddingHorizontal: 16,
    paddingRight: 32,
  },
  filterTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 10,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#d0d0d0',
    minWidth: 80,
  },
  activeFilterTab: {
    backgroundColor: '#0b154f',
    borderColor: '#0b154f',
  },
  filterText: {
    color: '#666',
    fontSize: 14,
    marginRight: 4,
  },
  activeFilterText: {
    color: '#FFF',
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f5f5f5',
  },
  resultsInfo: {
    flexDirection: 'col',
    gap: 2,
  },
  resultsCount: {
    color: '#333',
    fontSize: 16,
    marginRight: 12,
  },
  newBadge: {
    backgroundColor: '#0b154f',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    width: 75,
  },
  newBadgeText: {
    color: '#FFF',
    fontSize: 12,
  },
  featuredButton: {
    borderWidth: 1,
    borderColor: '#d0d0d0',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  featuredButtonText: {
    color: '#333',
    fontSize: 14,
  },
  propertiesList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  propertyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    position: 'relative',
  },
  propertyImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    padding: 8,
  },
  profileAvatar: {
    position: 'absolute',
    bottom: 28,
    left: 12,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    padding: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 23,
    resizeMode: 'cover',
  },
  propertyDetails: {
    padding: 16,
    borderRadius: 10,
    marginTop: -20,
    backgroundColor: '#FFFFFF',
    borderColor: '#e0e0e0',
    borderWidth: 1,
  },
  propertyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  propertyType: {
    color: '#666',
    fontSize: 14,
  },
  listedTime: {
    color: '#999',
    fontSize: 12,
  },
  price: {
    color: '#333',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  location: {
    color: '#666',
    fontSize: 14,
    marginBottom: 16,
  },
  propertySpecs: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  specItem: {
    flex: 1,
    alignItems: 'center',
  },
  specLabel: {
    color: '#999',
    fontSize: 12,
    marginBottom: 2,
  },
  specValue: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  callButton: {
    backgroundColor: '#0b154f',
  },
  whatsappButton: {
    backgroundColor: '#0b154f',
  },
  callButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  },
  whatsappButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  },



  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalBackground: {
    flex: 1,
  },
  filterModal: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '90%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  filterTitle: {
    color: '#1A1A1A',
    fontSize: 18,
    fontWeight: '600',
  },
  filterContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: '#FFFFFF',
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeToggle: {
    backgroundColor: '#0b154f',
  },
  toggleText: {
    color: '#666666',
    fontSize: 16,
    fontWeight: '500',
  },
  activeToggleText: {
    color: '#FFFFFF',
  },
  filterSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#1A1A1A',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  commercialToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  switch: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E5E5E5',
    padding: 2,
  },
  switchActive: {
    backgroundColor: '#0b154f',
  },
  switchThumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  switchThumbActive: {
    backgroundColor: '#FFFFFF',
    transform: [{ translateX: 20 }],
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  numberOption: {
    width: 60,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeOption: {
    backgroundColor: '#0b154f',
    borderColor: '#0b154f',
  },
  optionText: {
    color: '#333333',
    fontSize: 14,
  },
  activeOptionText: {
    color: '#FFFFFF',
  },
  showMoreButton: {
    marginTop: 12,
    alignItems: 'center',
  },
  showMoreText: {
    color: '#0b154f',
    fontSize: 14,
  },
  periodButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  periodButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  activePeriod: {
    backgroundColor: '#0b154f',
    borderColor: '#0b154f',
  },
  periodText: {
    color: '#333333',
    fontSize: 14,
  },
  activePeriodText: {
    color: '#FFFFFF',
  },
  chartContainer: {
    marginBottom: 16,
  },
  chartBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 80,
    gap: 2,
  },
  chartBar: {
    flex: 1,
    backgroundColor: '#0b154f',
    borderRadius: 1,
  },
  priceInputs: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  priceInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    paddingHorizontal: 16,
    color: '#1A1A1A',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  priceSeparator: {
    color: '#666666',
    fontSize: 16,
  },
  furnishingButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  furnishingButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  sizeInputs: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sizeInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 50,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  sizeInput: {
    flex: 1,
    color: '#1A1A1A',
    fontSize: 16,
  },
  sizeSeparator: {
    color: '#666666',
    fontSize: 16,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  amenityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    gap: 8,
  },
  activeAmenity: {
    backgroundColor: '#F0F7FF',
    borderColor: '#0b154f',
  },
  amenityText: {
    color: '#333333',
    fontSize: 14,
  },
  activeAmenityText: {
    color: '#0b154f',
  },
  daysInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 50,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  daysInput: {
    flex: 1,
    color: '#1A1A1A',
    fontSize: 16,
  },
  keywordsInput: {
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 50,
    color: '#1A1A1A',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  filterFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    padding: 8,
    paddingBottom: 32,

  },
  applyButton: {
    backgroundColor: '#FF5F06',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },


  categoryModal: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  propertyModal: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  priceModal: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  bedsAndBathsModal: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  amenitiesModal: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  modalTitle: {
    color: '#1A1A1A',
    fontSize: 18,
    fontWeight: '600',
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  modalFooter: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },

  // Category Modal
  categoryHeader: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  categoryTitle: {
    color: '#1A1A1A',
    fontSize: 18,
    fontWeight: '600',
  },
  categoryContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  categoryToggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  categoryToggleButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeCategoryToggle: {
    backgroundColor: '#0b154f',
  },
  categoryToggleText: {
    color: '#666666',
    fontSize: 16,
    fontWeight: '500',
  },
  activeCategoryToggleText: {
    color: '#FFFFFF',
  },

  // Property Modal
  propertyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  propertyOption: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  activePropertyOption: {
    backgroundColor: '#0b154f',
    borderColor: '#0b154f',
  },
  propertyOptionText: {
    color: '#333333',
    fontSize: 14,
  },
  activePropertyOptionText: {
    color: '#FFFFFF',
  },

  // Price Modal
  priceSection: {
    marginBottom: 24,
  },
  chartContainer: {
    marginVertical: 16,
  },
  chartBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 80,
    gap: 4,
  },
  chartBar: {
    flex: 1,
    backgroundColor: '#0b154f',
    borderRadius: 4,
  },
  priceInputsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  priceInputBox: {
    flex: 1,
    height: 48,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  priceSeparator: {
    marginHorizontal: 8,
    fontSize: 18,
    color: '#666',
  },

  // Beds & Baths Modal
  section: {
    marginBottom: 24,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 12,
  },
  numberOption: {
    width: 60,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberOptionText: {
    color: '#333333',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default App;