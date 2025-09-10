import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Linking,
  FlatList,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

const PropertyListingApp = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('1Y');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const imageSliderRef = useRef(null);
  const autoScrollIntervalRef = useRef(null);

  // Sample property data
  const propertyData = {
    price: '23,000 EGP/month',
    title: 'studio fully furnished for rent near by AUC',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400',
      'https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=400',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400',
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400',
    ],
    propertyType: 'Apartment',
    size: '538 ft² (50 m²)',
    bedrooms: 'Studio + Maid',
    bathrooms: 1,
    amenities: [
      { name: 'Furnished', icon: '🛏️' },
      { name: 'Maids Room', icon: '🏠' },
      { name: 'Study', icon: '📚' },
      { name: 'Central A/C', icon: '❄️' },
      { name: 'Balcony', icon: '🏢' },
      { name: 'Private Garden', icon: '🌿' },
      { name: 'Private Pool', icon: '🏊‍♂️' },
      { name: 'Shared Pool', icon: '🏊‍♀️' },
      { name: 'Shared Spa', icon: '💆‍♀️' },
      { name: 'Security', icon: '🔒' },
      { name: 'Covered Parking', icon: '🚗' },
      { name: 'Built in Wardrobes', icon: '🗄️' },
      { name: 'Walk-in Closet', icon: '👔' },
      { name: 'Kitchen Appliances', icon: '🍳' },
      { name: 'View of Water', icon: '🌊' },
      { name: 'View of Landmark', icon: '🏛️' },
      { name: 'Shared Gym', icon: '🏋️‍♂️' },
      { name: 'Lobby in Building', icon: '🏢' },
      { name: "Children's Pool", icon: '👶' },
    ],
    location: 'American University Housing District, 5th Settlement Compounds, The 5th Settlement',
    agent: {
      name: 'Mohammed Mosbah',
      properties: 94,
      agency: 'The Light For Real Estate',
      agencyProperties: 138,
    },
    reference: 'escanauc222',
    listed: '29/08/2025',
    brokerLicense: '70300',
  };

  const chartData = {
    labels: ['Aug 24', 'Oct 24', 'Dec 24', 'Feb 25', 'Apr 25', 'Jun 25'],
    datasets: [
      {
        data: [35, 36, 37, 38, 37, 38],
        color: () => `rgba(239, 68, 68, 1)`, // New Cairo City - Red line
        strokeWidth: 2,
      },
      {
        data: [37, 38, 38, 39, 38, 39],
        color: () => `rgba(107, 114, 128, 1)`, // Cairo - Gray line
        strokeWidth: 2,
        strokeDashArray: [5, 5],
      },
    ],
  };

  // Auto-scroll functionality
  const startAutoScroll = () => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
    }
    
    autoScrollIntervalRef.current = setInterval(() => {
      if (isAutoScrolling) {
        setCurrentImageIndex(prevIndex => {
          const nextIndex = (prevIndex + 1) % propertyData.images.length;
          imageSliderRef.current?.scrollToIndex({ 
            index: nextIndex, 
            animated: true 
          });
          return nextIndex;
        });
      }
    }, 3000); // Change image every 3 seconds
  };

  const stopAutoScroll = () => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
      autoScrollIntervalRef.current = null;
    }
  };

  // Toggle auto-scroll
  const toggleAutoScroll = () => {
    setIsAutoScrolling(prev => {
      const newState = !prev;
      if (newState) {
        startAutoScroll();
      } else {
        stopAutoScroll();
      }
      return newState;
    });
  };

  // Start auto-scroll when component mounts
  useEffect(() => {
    if (isAutoScrolling) {
      startAutoScroll();
    }
    
    return () => {
      stopAutoScroll();
    };
  }, [isAutoScrolling]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAutoScroll();
    };
  }, []);

  const handleCall = () => {
    Linking.openURL('tel:+1234567890');
  };

  const handleWhatsApp = () => {
    Linking.openURL('whatsapp://send?phone=1234567890');
  };

  const onImageScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const imageIndex = Math.round(scrollPosition / width);
    setCurrentImageIndex(imageIndex);
  };

  const goToNextImage = () => {
    // Stop auto-scroll temporarily when user manually navigates
    stopAutoScroll();
    setIsAutoScrolling(false);
    
    const nextIndex = (currentImageIndex + 1) % propertyData.images.length;
    imageSliderRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    setCurrentImageIndex(nextIndex);
    
    // Restart auto-scroll after 5 seconds of inactivity
    setTimeout(() => {
      setIsAutoScrolling(true);
    }, 2000);
  };

  const goToPrevImage = () => {
    // Stop auto-scroll temporarily when user manually navigates
    stopAutoScroll();
    setIsAutoScrolling(false);
    
    const prevIndex = currentImageIndex === 0 ? propertyData.images.length - 1 : currentImageIndex - 1;
    imageSliderRef.current?.scrollToIndex({ index: prevIndex, animated: true });
    setCurrentImageIndex(prevIndex);
    
    // Restart auto-scroll after 5 seconds of inactivity
    setTimeout(() => {
      setIsAutoScrolling(true);
    }, 5000);
  };

  const onTouchStart = () => {
    // Pause auto-scroll when user starts touching the slider
    stopAutoScroll();
    setIsAutoScrolling(false);
  };

  const onTouchEnd = () => {
    // Resume auto-scroll after 5 seconds when user stops touching
    setTimeout(() => {
      setIsAutoScrolling(true);
    }, 5000);
  };

  const renderImageItem = ({ item }) => (
    <View style={styles.imageSlideContainer}>
      <Image
        source={{ uri: item }}
        style={styles.headerImage}
        resizeMode="cover"
      />
    </View>
  );

  const renderAmenityItem = (amenity, index) => (
    <View key={index} style={styles.amenityItem}>
      <Text style={styles.amenityIcon}>{amenity.icon}</Text>
      <Text style={styles.amenityText}>{amenity.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Image Slider */}
        <View style={styles.imageContainer}>
          <FlatList
            ref={imageSliderRef}
            data={propertyData.images}
            renderItem={renderImageItem}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={onImageScroll}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            keyExtractor={(item, index) => index.toString()}
          />
          
          
       
          
          {/* Navigation Arrows */}
          <TouchableOpacity 
            style={[styles.navButton, styles.navButtonLeft]} 
            onPress={goToPrevImage}
          >
            <Text style={styles.navButtonText}>‹</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.navButton, styles.navButtonRight]} 
            onPress={goToNextImage}
          >
            <Text style={styles.navButtonText}>›</Text>
          </TouchableOpacity>

          {/* Image Counter */}
          <View style={styles.imageCounter}>
            <Text style={styles.imageCounterText}>
              {currentImageIndex + 1} / {propertyData.images.length}
            </Text>
          </View>

          {/* Dots Indicator */}
          <View style={styles.dotsContainer}>
            {propertyData.images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  currentImageIndex === index ? styles.activeDot : styles.inactiveDot
                ]}
              />
            ))}
          </View>
        </View>

        {/* Price Section */}
        <View style={styles.priceSection}>
          <Text style={styles.price}>{propertyData.price}</Text>
          <Text style={styles.title}>{propertyData.title}</Text>
          <TouchableOpacity style={styles.mapButton}>
            <Text style={styles.mapButtonText}>📍 View on map</Text>
          </TouchableOpacity>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>
            studio fully furnished for rent near by AUC{'\n'}
            one bedroom{'\n'}
            one bathroom{'\n'}
            living area{'\n'}
            kitchen appliance...
          </Text>
          <TouchableOpacity>
            <Text style={styles.readMore}>Read More</Text>
          </TouchableOpacity>
        </View>

        {/* Property Details */}
        <View style={styles.section}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>🏠 Property Type:</Text>
            <Text style={styles.detailValue}>{propertyData.propertyType}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>📐 Property Size:</Text>
            <Text style={styles.detailValue}>{propertyData.size}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>🛏️ Bedrooms:</Text>
            <Text style={styles.detailValue}>{propertyData.bedrooms}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>🚿 Bathrooms:</Text>
            <Text style={styles.detailValue}>{propertyData.bathrooms}</Text>
          </View>
        </View>

        {/* Amenities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Amenities</Text>
          <View style={styles.amenitiesGrid}>
            {propertyData.amenities.map((amenity, index) => 
              renderAmenityItem(amenity, index)
            )}
          </View>
        </View>

        {/* Location */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location & nearby</Text>
          <View style={styles.locationCard}>
            <Text style={styles.locationTitle}>American University Housing District</Text>
            <Text style={styles.locationSubtitle}>
              📍 District, 5th Settlement Compounds, The 5th Settlement, ...
            </Text>
            <TouchableOpacity style={styles.viewMapButton}>
              <Text style={styles.viewMapButtonText}>View on map</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Prices & Trends */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Prices & Trends</Text>
          <Text style={styles.chartSubtitle}>
            Studio apartment rented in New Cairo City and Cairo
          </Text>
          
          <View style={styles.periodButtons}>
            {['1Y', '2Y', '5Y'].map((period) => (
              <TouchableOpacity
                key={period}
                style={[
                  styles.periodButton,
                  selectedPeriod === period && styles.periodButtonActive
                ]}
                onPress={() => setSelectedPeriod(period)}
              >
                <Text style={[
                  styles.periodButtonText,
                  selectedPeriod === period && styles.periodButtonTextActive
                ]}>{period}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.chartLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: 'rgba(239, 68, 68, 1)' }]} />
              <Text style={styles.legendText}>New Cairo City</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: 'rgba(107, 114, 128, 1)' }]} />
              <Text style={styles.legendText}>Cairo</Text>
            </View>
          </View>

          <LineChart
            data={chartData}
            width={width - 40}
            height={220}
            chartConfig={{
              backgroundColor: '#f9fafb',
              backgroundGradientFrom: '#f9fafb',
              backgroundGradientTo: '#f9fafb',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(55, 65, 81, ${opacity})`,
              style: { borderRadius: 16 },
              propsForDots: { r: '4' },
            }}
            bezier
            style={styles.chart}
          />
        </View>

        {/* Agent Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Provided by</Text>
          <View style={styles.agencyCard}>
            <View style={styles.agencyIcon}>
              <Text style={styles.agencyIconText}>🏢</Text>
            </View>
            <View style={styles.agencyInfo}>
              <Text style={styles.agencyName}>{propertyData.agent.agency}</Text>
              <Text style={styles.agencyProperties}>
                See agency properties ({propertyData.agent.agencyProperties})
              </Text>
            </View>
          </View>
          
          <View style={styles.agentCard}>
            <Text style={styles.agentName}>{propertyData.agent.name}</Text>
            <TouchableOpacity style={styles.agentPropertiesButton}>
              <Text style={styles.agentPropertiesText}>
                See agent properties ({propertyData.agent.properties})
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Regulatory Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Regulatory Information</Text>
          <View style={styles.regulatoryInfo}>
            <Text style={styles.regulatoryLabel}>Reference</Text>
            <Text style={styles.regulatoryValue}>{propertyData.reference}</Text>
            
            <Text style={styles.regulatoryLabel}>Listed</Text>
            <Text style={styles.regulatoryValue}>{propertyData.listed}</Text>
            
            <Text style={styles.regulatoryLabel}>Broker license</Text>
            <Text style={styles.regulatoryValue}>{propertyData.brokerLicense}</Text>
          </View>
        </View>

        {/* Report Section */}
        <View style={styles.section}>
          <View style={styles.reportSection}>
            <Text style={styles.reportIcon}>📋</Text>
            <Text style={styles.reportText}>Is there anything wrong with this listing?</Text>
          </View>
          <TouchableOpacity style={styles.reportButton}>
            <Text style={styles.reportButtonText}>🚨 Report</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.callButton} onPress={handleCall}>
          <Text style={styles.callButtonText}>📞 Call</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.whatsappButton} onPress={handleWhatsApp}>
          <Text style={styles.whatsappButtonText}>💬 WhatsApp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginTop: 42,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    height: 250,
  },
  imageSlideContainer: {
    width: width,
  },
  headerImage: {
    width: width,
    height: 250,
  },
  autoScrollButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  autoScrollButtonText: {
    fontSize: 16,
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -25 }],
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  navButtonLeft: {
    left: 15,
  },
  navButtonRight: {
    right: 15,
  },
  navButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  imageCounter: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    zIndex: 1,
  },
  imageCounterText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#ffffff',
  },
  inactiveDot: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  priceSection: {
    padding: 20,
    backgroundColor: '#f9fafb',
  },
  price: {
    color: '#111827',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  title: {
    color: '#6b7280',
    fontSize: 16,
    marginBottom: 16,
  },
  mapButton: {
    backgroundColor: '#0b154f',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  mapButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  sectionTitle: {
    color: '#111827',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    color: '#6b7280',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
  },
  readMore: {
    color: '#0b154f',
    fontSize: 16,
    fontWeight: '600',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  detailLabel: {
    color: '#6b7280',
    fontSize: 16,
    flex: 1,
  },
  detailValue: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '600',
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    paddingVertical: 8,
  },
  amenityIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  amenityText: {
    color: '#4b5563',
    fontSize: 14,
    flex: 1,
  },
  locationCard: {
    backgroundColor: '#f3f4f6',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  locationTitle: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  locationSubtitle: {
    color: '#6b7280',
    fontSize: 14,
    marginBottom: 16,
  },
  viewMapButton: {
    backgroundColor: '#0b154f',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewMapButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  chartSubtitle: {
    color: '#6b7280',
    fontSize: 14,
    marginBottom: 16,
  },
  periodButtons: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  periodButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 6,
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  periodButtonActive: {
    backgroundColor: '#0b154f',
    borderColor: '#0b154f',
  },
  periodButtonText: {
    color: '#6b7280',
    fontSize: 14,
  },
  periodButtonTextActive: {
    color: 'white',
  },
  chartLegend: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  legendColor: {
    width: 20,
    height: 2,
    marginRight: 8,
  },
  legendText: {
    color: '#6b7280',
    fontSize: 12,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  agencyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  agencyIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#0b154f',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  agencyIconText: {
    fontSize: 24,
  },
  agencyInfo: {
    flex: 1,
  },
  agencyName: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  agencyProperties: {
    color: '#6b7280',
    fontSize: 14,
  },
  agentCard: {
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  agentName: {
    color: '#111827',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  agentPropertiesButton: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  agentPropertiesText: {
    color: '#6b7280',
    fontSize: 14,
  },
  regulatoryInfo: {
    backgroundColor: '#f9fafb',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  regulatoryLabel: {
    color: '#6b7280',
    fontSize: 14,
    marginTop: 12,
    marginBottom: 4,
  },
  regulatoryValue: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '600',
  },
  reportSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  reportIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  reportText: {
    color: '#6b7280',
    fontSize: 16,
    flex: 1,
  },
  reportButton: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  reportButtonText: {
    color: '#6b7280',
    fontSize: 16,
  },
  bottomActions: {
    marginBottom:60,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  callButton: {
    flex: 1,
    backgroundColor: '#ef4444',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 10,
  },
  callButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  whatsappButton: {
    flex: 1,
    backgroundColor: '#22c55e',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 10,
  },
  whatsappButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PropertyListingApp;
