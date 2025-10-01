import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";
import { useThemedStyles } from '../SearchScreenComponents/styles';

import FilterModal from '../SearchScreenComponents/FilterModal';
import CategoryModal from '../SearchScreenComponents/CategoryModal';
import PropertyModal from '../SearchScreenComponents/PropertyModal';
import PriceModal from '../SearchScreenComponents/PriceModal';
import BedsAndBathsModal from '../SearchScreenComponents/BedsAndBathsModal';
import AmenitiesModal from '../SearchScreenComponents/AmenitiesModal';
import PropertyCard from '../SearchScreenComponents/PropertyCard';

const API_BASE = "https://pestosoft.in/";

const API_ENDPOINTS = {
  Buy: `${API_BASE}/api/properties/type/1`,
  Rent: `${API_BASE}/api/properties/type/2`,
};

const SearchScreen = ({ route }) => {
  const navigation = useNavigation();
  const styles = useThemedStyles();

  const handleNavigateToDetails = (property) => {
    navigation.navigate("PropertyDetails", { id: property.id });
  };

  const [favorites, setFavorites] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({});

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [showBedsAndBathsModal, setShowBedsAndBathsModal] = useState(false);
  const [showAmenitiesModal, setShowAmenitiesModal] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState('');
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

  const handleFilterTabPress = async (filter) => {
    // If clicking the already selected Buy/Rent tab → deselect
    if (selectedFilter === filter && (filter === "Buy" || filter === "Rent")) {
      setSelectedFilter(""); // deselect tab
      // Fetch default properties
      try {
        const res = await fetch(`${API_BASE}/api/properties`);
        const data = await res.json();
        setProperties(data);
        console.log("Fetched Default Properties:", data);
      } catch (err) {
        console.error("Error fetching default properties:", err);
      }
      return;
    }

    setSelectedFilter(filter);

    switch (filter) {
      case "Buy":
      case "Rent":
        // Fetch Buy or Rent properties
        try {
          const res = await fetch(API_ENDPOINTS[filter]);
          const data = await res.json();
          setProperties(data);
          console.log(`${filter} Properties:`, data);
        } catch (err) {
          console.error(`Error fetching ${filter} properties:`, err);
        }
        break;

      case "Property":
        setShowPropertyModal(true);
        break;
      case "Price":
        setShowPriceModal(true);
        break;
      case "Beds & Baths":
        setShowBedsAndBathsModal(true);
        break;
      case "Amenities":
        setShowAmenitiesModal(true);
        break;
      default:
        break;
    }
  };

  const filterTabs = ['Buy', 'Rent', 'Property', 'Price', 'Beds & Baths', 'Amenities'];

  // const properties = [
  //   {
  //     id: 1,
  //     type: 'Apartment',
  //     price: '12M AED',
  //     location: 'Mandinaty, Cairo',
  //     beds: 2,
  //     baths: 2,
  //     area: '1292 Sqft',
  //     listedTime: '7 hours ago',
  //     phone: '+201234567890',
  //     image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop',
  //     profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  //   },
  //   {
  //     id: 2,
  //     type: 'Apartment',
  //     price: '7M AED',
  //     location: 'New Cairo',
  //     beds: 3,
  //     baths: 2,
  //     area: '1450 Sqft',
  //     listedTime: '7 hours ago',
  //     phone: '+201234567891',
  //     image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop',
  //     profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  //   },
  // ];

  const [properties, setProperties] = useState([]);

  // useEffect(() => {
  //   fetch(`${API_BASE}/api/properties`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setProperties(data);
  //       console.log("Fetched Properties:", data);
  //     })
  //     .catch((err) => console.error("Error fetching properties:", err));
  // }, []);

  const { countryId, countryName } = route.params || {};
  console.log("Received Country ID:", countryId);
  console.log("Received Country Name:", countryName);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const endpoint = countryId
          ? `${API_BASE}/api/properties/country/${countryId}`
          : `${API_BASE}/api/properties`;

        console.log("Fetching from:", endpoint);

        const res = await fetch(endpoint);

        if (!res.ok) {
          const text = await res.text();
          console.error("API returned error:", text);
          return;
        }

        const data = await res.json();
        setProperties(data);
        console.log("Fetched Properties:", data);
      } catch (err) {
        console.error("Error fetching properties:", err);
      }
    };

    fetchProperties();
  }, [countryId]);


  const filteredProperties = properties.filter((property) => {
    const text = searchText.toLowerCase();
    const cityMatch = property.city?.toLowerCase().includes(text);
    const carpetAreaMatch = property.carpet_area?.toString().toLowerCase().includes(text);

    // 🛏️ Bedrooms filtering
    const selectedBedrooms = bedsAndBaths.bedrooms || [];
    let bedroomsMatch = true;
    if (selectedBedrooms.length > 0) {
      if (selectedBedrooms.includes("Studio")) {
        bedroomsMatch = property.bedrooms === 0;
      } else if (selectedBedrooms.includes("7+")) {
        bedroomsMatch = property.bedrooms >= 7;
      } else {
        bedroomsMatch = selectedBedrooms.includes(property.bedrooms?.toString());
      }
    }

    // 🛁 Bathrooms filtering
    const selectedBathrooms = bedsAndBaths.bathrooms || [];
    let bathroomsMatch = true;
    if (selectedBathrooms.length > 0) {
      if (selectedBathrooms.includes("7+")) {
        bathroomsMatch = property.bathrooms >= 7;
      } else {
        bathroomsMatch = selectedBathrooms.includes(property.bathrooms?.toString());
      }
    }


    // 💰 Price filtering (using expected_price from API)
    let priceMatch = true;
    if (priceRange.min || priceRange.max) {
      const min = priceRange.min ? parseFloat(priceRange.min) : 0;
      const max = priceRange.max ? parseFloat(priceRange.max) : Infinity;

      priceMatch = property.expected_price >= min && property.expected_price <= max;
    }

    // ✅ Apply all filters together
    return (cityMatch || carpetAreaMatch) && bedroomsMatch && bathroomsMatch && priceMatch;
  });

  const handlePropertiesUpdate = (newProperties) => {
    setProperties(newProperties);
  };

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
            placeholder="Search city, area..."
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
          <Text style={styles.resultsCount}>{filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'}</Text>
          {/* <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>1,130 new</Text>
          </View> */}
        </View>
        <TouchableOpacity style={styles.featuredButton}>
          <Text style={styles.featuredButtonText}>Featured</Text>
        </TouchableOpacity>
      </View>

      {/* Properties List */}
      <ScrollView style={styles.propertiesList} showsVerticalScrollIndicator={false}>
        {filteredProperties.map((property) => (
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

        {filteredProperties.length === 0 && (
          <View style={{ alignItems: "center", padding: 20 }}>
            <Text>No properties found in this city</Text>
          </View>
        )}
      </ScrollView>


      {/* Filter Modal */}
      <FilterModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        filters={filters}
        onFiltersChange={setFilters}
        onPropertiesUpdate={handlePropertiesUpdate}
      />

      {/* <CategoryModal
        visible={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        selectedCategory={selectedCategory}
        onCategorySelect={(category) => {
          setSelectedCategory(category);
          setShowCategoryModal(false);
        }}
      /> */}

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

export default SearchScreen;