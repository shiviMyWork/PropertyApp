// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   Dimensions,
//   StatusBar,
//   Linking,
//   FlatList,
//   useColorScheme,
// } from 'react-native';
// import { LineChart } from 'react-native-chart-kit';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useTheme } from 'react-native-paper';
// import { useRoute } from "@react-navigation/native";

// const { width } = Dimensions.get('window');

// const PropertyDetailsScreen = () => {
//   const route = useRoute();
//   const { id } = route.params;
//   const [selectedPeriod, setSelectedPeriod] = useState('1Y');
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isAutoScrolling, setIsAutoScrolling] = useState(true);
//   const imageSliderRef = useRef(null);
//   const autoScrollIntervalRef = useRef(null);
//   const theme = useTheme();
//   const scheme = useColorScheme();


//   const [propertyData, setPropertyData] = useState(null);
//   const [amenityNames, setAmenityNames] = useState([]);
//   const [companyData, setCompanyData] = useState(null);
//   const [companyProperties, setCompanyProperties] = useState(null);
//   const [coordinates, setCoordinates] = useState(null);

//   useEffect(() => {
//     fetch(`https://pestosoft.in/api/property/full/${id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Property API Response:", data);
//         setPropertyData(data);

//         // ✅ Fetch amenities
//         const amenityIds = data.amenities || [];
//         const amenityPromises = amenityIds.map((amenityId) =>
//           fetch(`https://pestosoft.in/api/amenity/${amenityId}`)
//             .then((res) => res.json())
//             .then((amenityData) => {
//               console.log("Amenity API Response:", amenityData);
//               return (
//                 amenityData.name ||
//                 amenityData.amenity_name ||
//                 amenityData[0]?.name
//               );
//             })
//         );

//         Promise.all(amenityPromises)
//           .then((amenityNames) => {
//             console.log("Amenity Names:", amenityNames);
//             setAmenityNames(amenityNames);
//           })
//           .catch((err) => console.error("Error fetching amenities:", err));

//         // ✅ Fetch company data
//         const companyId = data.company;
//         if (companyId) {
//           fetch(`https://pestosoft.in/api/company/${companyId}`)
//             .then((res) => res.json())
//             .then((companyArray) => {
//               console.log("Company Data Array:", companyArray);
//               if (companyArray.length > 0) {
//                 const company = companyArray[0];
//                 setCompanyData(company);

//                 // ✅ Fetch properties of the same company
//                 fetch(`https://pestosoft.in/api/properties/company/${companyId}`)
//                   .then((res) => res.json())
//                   .then((companyProperties) => {
//                     console.log("Properties of the company:", companyProperties);
//                     if (companyProperties.length > 0) {
//                       setCompanyProperties(companyProperties[0]);
//                     }
//                   })
//                   .catch((err) =>
//                     console.error("Error fetching company's properties:", err)
//                   );
//               }
//             })
//             .catch((err) => console.error("Error fetching company:", err));
//         }
//       })
//       .catch((err) => console.error("Error fetching property:", err));
//   }, [id]);

//   // ✅ Fetch coordinates after propertyData loads
//   useEffect(() => {
//     if (propertyData?.city) {
//       fetch(
//         `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
//           propertyData.city
//         )}`
//       )
//         .then((res) => res.json())
//         .then((data) => {
//           if (data.length > 0) {
//             setCoordinates([
//               parseFloat(data[0].lat),
//               parseFloat(data[0].lon),
//             ]);
//           }
//         })
//         .catch((err) => console.error("Geocoding error:", err));
//     }
//   }, [propertyData]);

//   // Dynamic styles based on theme
//   const dynamicStyles = {
//     container: {
//       backgroundColor: scheme === 'light' ? '#ffffff' : theme.colors.background,
//     },
//     priceSection: {
//       backgroundColor: scheme === 'light' ? '#f9fafb' : theme.colors.elevation.level1,
//     },
//     section: {
//       borderTopColor: scheme === 'light' ? '#e5e7eb' : theme.colors.outline,
//     },
//     primaryText: {
//       color: scheme === 'light' ? '#111827' : theme.colors.onSurface,
//     },
//     secondaryText: {
//       color: scheme === 'light' ? '#6b7280' : theme.colors.onSurfaceVariant,
//     },
//     cardBackground: {
//       backgroundColor: scheme === 'light' ? '#f9fafb' : theme.colors.elevation.level2,
//       borderColor: scheme === 'light' ? '#e5e7eb' : theme.colors.outline,
//     },
//     locationCard: {
//       backgroundColor: scheme === 'light' ? '#f3f4f6' : theme.colors.elevation.level1,
//       borderColor: scheme === 'light' ? '#e5e7eb' : theme.colors.outline,
//     },
//     detailRow: {
//       borderBottomColor: scheme === 'light' ? '#e5e7eb' : theme.colors.outline,
//     },
//     periodButton: {
//       backgroundColor: scheme === 'light' ? '#f3f4f6' : theme.colors.elevation.level1,
//       borderColor: scheme === 'light' ? '#e5e7eb' : theme.colors.outline,
//     },
//     bottomActions: {
//       backgroundColor: scheme === 'light' ? '#ffffff' : theme.colors.background,
//       borderTopColor: scheme === 'light' ? '#e5e7eb' : theme.colors.outline,
//     },
//     chartBackground: scheme === 'light' ? '#f9fafb' : theme.colors.elevation.level1,
//   };

//   // Sample property data
//   // const propertyData = {
//   //   price: '12M AED',
//   //   title: 'studio fully furnished for rent near by AUC',
//   //   images: [
//   //     'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
//   //     'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400',
//   //     'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400',
//   //     'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400',
//   //     'https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=400',
//   //     'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400',
//   //     'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400',
//   //     'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
//   //     'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400',
//   //     'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400',
//   //   ],
//   //   propertyType: 'Apartment',
//   //   size: '538 ft² (50 m²)',
//   //   bedrooms: 'Studio + Maid',
//   //   bathrooms: 1,
//   //   amenities: [
//   //     { name: 'Furnished', icon: '🛏️' },
//   //     { name: 'Maids Room', icon: '🏠' },
//   //     { name: 'Study', icon: '📚' },
//   //     { name: 'Central A/C', icon: '❄️' },
//   //     { name: 'Balcony', icon: '🏢' },
//   //     { name: 'Private Garden', icon: '🌿' },
//   //     { name: 'Private Pool', icon: '🏊‍♂️' },
//   //     { name: 'Shared Pool', icon: '🏊‍♀️' },
//   //     { name: 'Shared Spa', icon: '💆‍♀️' },
//   //     { name: 'Security', icon: '🔒' },
//   //     { name: 'Covered Parking', icon: '🚗' },
//   //     { name: 'Built in Wardrobes', icon: '🗄️' },
//   //     { name: 'Walk-in Closet', icon: '👔' },
//   //     { name: 'Kitchen Appliances', icon: '🍳' },
//   //     { name: 'View of Water', icon: '🌊' },
//   //     { name: 'View of Landmark', icon: '🏛️' },
//   //     { name: 'Shared Gym', icon: '🏋️‍♂️' },
//   //     { name: 'Lobby in Building', icon: '🏢' },
//   //     { name: "Children's Pool", icon: '👶' },
//   //   ],
//   //   location: 'American University Housing District, 5th Settlement Compounds, The 5th Settlement',
//   //   agent: {
//   //     name: 'Mohammed Mosbah',
//   //     properties: 94,
//   //     agency: 'The Light For Real Estate',
//   //     agencyProperties: 138,
//   //   },
//   //   reference: 'escanauc222',
//   //   listed: '29/08/2025',
//   //   brokerLicense: '70300',
//   // };

//   const chartData = {
//     labels: ['Aug 24', 'Oct 24', 'Dec 24', 'Feb 25', 'Apr 25', 'Jun 25'],
//     datasets: [
//       {
//         data: [35, 36, 37, 38, 37, 38],
//         color: () => `rgba(239, 68, 68, 1)`, // New Cairo City - Red line
//         strokeWidth: 2,
//       },
//       {
//         data: [37, 38, 38, 39, 38, 39],
//         color: () => `rgba(107, 114, 128, 1)`, // Cairo - Gray line
//         strokeWidth: 2,
//         strokeDashArray: [5, 5],
//       },
//     ],
//   };

//   // Auto-scroll functionality
//   const startAutoScroll = () => {
//     if (autoScrollIntervalRef.current) {
//       clearInterval(autoScrollIntervalRef.current);
//     }

//     autoScrollIntervalRef.current = setInterval(() => {
//       if (isAutoScrolling) {
//         setCurrentImageIndex(prevIndex => {
//           const nextIndex = (prevIndex + 1) % propertyData.images.length;
//           imageSliderRef.current?.scrollToIndex({ 
//             index: nextIndex, 
//             animated: true 
//           });
//           return nextIndex;
//         });
//       }
//     }, 3000); // Change image every 3 seconds
//   };

//   const stopAutoScroll = () => {
//     if (autoScrollIntervalRef.current) {
//       clearInterval(autoScrollIntervalRef.current);
//       autoScrollIntervalRef.current = null;
//     }
//   };

//   // Toggle auto-scroll
//   const toggleAutoScroll = () => {
//     setIsAutoScrolling(prev => {
//       const newState = !prev;
//       if (newState) {
//         startAutoScroll();
//       } else {
//         stopAutoScroll();
//       }
//       return newState;
//     });
//   };

//   // Start auto-scroll when component mounts
//   useEffect(() => {
//     if (isAutoScrolling) {
//       startAutoScroll();
//     }

//     return () => {
//       stopAutoScroll();
//     };
//   }, [isAutoScrolling]);

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       stopAutoScroll();
//     };
//   }, []);

//   const handleCall = () => {
//     Linking.openURL('tel:+1234567890');
//   };

//   const handleWhatsApp = () => {
//     Linking.openURL('whatsapp://send?phone=1234567890');
//   };

//   const onImageScroll = (event) => {
//     const scrollPosition = event.nativeEvent.contentOffset.x;
//     const imageIndex = Math.round(scrollPosition / width);
//     setCurrentImageIndex(imageIndex);
//   };

//   const goToNextImage = () => {
//     // Stop auto-scroll temporarily when user manually navigates
//     stopAutoScroll();
//     setIsAutoScrolling(false);

//     const nextIndex = (currentImageIndex + 1) % propertyData.images.length;
//     imageSliderRef.current?.scrollToIndex({ index: nextIndex, animated: true });
//     setCurrentImageIndex(nextIndex);

//     // Restart auto-scroll after 5 seconds of inactivity
//     setTimeout(() => {
//       setIsAutoScrolling(true);
//     }, 2000);
//   };

//   const goToPrevImage = () => {
//     // Stop auto-scroll temporarily when user manually navigates
//     stopAutoScroll();
//     setIsAutoScrolling(false);

//     const prevIndex = currentImageIndex === 0 ? propertyData.images.length - 1 : currentImageIndex - 1;
//     imageSliderRef.current?.scrollToIndex({ index: prevIndex, animated: true });
//     setCurrentImageIndex(prevIndex);

//     // Restart auto-scroll after 5 seconds of inactivity
//     setTimeout(() => {
//       setIsAutoScrolling(true);
//     }, 5000);
//   };

//   const onTouchStart = () => {
//     // Pause auto-scroll when user starts touching the slider
//     stopAutoScroll();
//     setIsAutoScrolling(false);
//   };

//   const onTouchEnd = () => {
//     // Resume auto-scroll after 5 seconds when user stops touching
//     setTimeout(() => {
//       setIsAutoScrolling(true);
//     }, 5000);
//   };

//   const renderImageItem = ({ item }) => (
//     <View style={styles.imageSlideContainer}>
//       <Image
//         source={{ uri: item }}
//         style={styles.headerImage}
//         resizeMode="cover"
//       />
//     </View>
//   );

//   const renderAmenityItem = (amenity, index) => (
//     <View key={index} style={styles.amenityItem}>
//       <Text style={styles.amenityIcon}>{amenity.icon}</Text>
//       <Text style={[styles.amenityText, { color: scheme === 'light' ? '#4b5563' : theme.colors.onSurfaceVariant }]}>{amenity.name}</Text>
//     </View>
//   );

//   return (
//     <SafeAreaView style={[styles.container, dynamicStyles.container]}>
//       <StatusBar 
//         barStyle={scheme === 'light' ? 'dark-content' : 'light-content'} 
//         backgroundColor={scheme === 'light' ? '#ffffff' : theme.colors.background} 
//       />
//       {propertyData ? (
//         <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
//         {/* Header Image Slider */}
//         <View style={styles.imageContainer}>
//           <FlatList
//             ref={imageSliderRef}
//             data={propertyData.images}
//             renderItem={renderImageItem}
//             horizontal
//             pagingEnabled
//             showsHorizontalScrollIndicator={false}
//             onMomentumScrollEnd={onImageScroll}
//             onTouchStart={onTouchStart}
//             onTouchEnd={onTouchEnd}
//             keyExtractor={(item, index) => index.toString()}
//           />

//           {/* Image Counter */}
//           <View style={styles.imageCounter}>
//             <Text style={styles.imageCounterText}>
//               {currentImageIndex + 1} / {propertyData.images.length}
//             </Text>
//           </View>

//           {/* Dots Indicator */}
//           <View style={styles.dotsContainer}>
//             {propertyData.images.map((_, index) => (
//               <View
//                 key={index}
//                 style={[
//                   styles.dot,
//                   currentImageIndex === index ? styles.activeDot : styles.inactiveDot
//                 ]}
//               />
//             ))}
//           </View>
//         </View>

//         {/* Price Section */}
//         <View style={[styles.priceSection, dynamicStyles.priceSection]}>
//           <Text style={[styles.price, dynamicStyles.primaryText]}>{propertyData.expected_price}</Text>
//           <Text style={[styles.title, dynamicStyles.secondaryText]}>{propertyData.name}</Text>
//           <TouchableOpacity style={styles.mapButton}>
//             <Text style={styles.mapButtonText}>📍 View on map</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Description */}
//         <View style={[styles.section, dynamicStyles.section]}>
//           <Text style={[styles.sectionTitle, dynamicStyles.primaryText]}>Description</Text>
//           <Text style={[styles.description, dynamicStyles.secondaryText]}>
//             {propertyData.description}
//           </Text>
//           <TouchableOpacity>
//             <Text style={styles.readMore}>Read More</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Property Details */}
//         <View style={[styles.section, dynamicStyles.section]}>
//           <View style={[styles.detailRow, dynamicStyles.detailRow]}>
//             <Text style={[styles.detailLabel, dynamicStyles.secondaryText]}>🏠 Property Type:</Text>
//             <Text style={[styles.detailValue, dynamicStyles.primaryText]}>{propertyData.propertyType}</Text>
//           </View>
//           <View style={[styles.detailRow, dynamicStyles.detailRow]}>
//             <Text style={[styles.detailLabel, dynamicStyles.secondaryText]}>📐 Property Size:</Text>
//             <Text style={[styles.detailValue, dynamicStyles.primaryText]}>{propertyData.size}</Text>
//           </View>
//           <View style={[styles.detailRow, dynamicStyles.detailRow]}>
//             <Text style={[styles.detailLabel, dynamicStyles.secondaryText]}>🛏️ Bedrooms:</Text>
//             <Text style={[styles.detailValue, dynamicStyles.primaryText]}>{propertyData.bedrooms}</Text>
//           </View>
//           <View style={[styles.detailRow, dynamicStyles.detailRow]}>
//             <Text style={[styles.detailLabel, dynamicStyles.secondaryText]}>🚿 Bathrooms:</Text>
//             <Text style={[styles.detailValue, dynamicStyles.primaryText]}>{propertyData.bathrooms}</Text>
//           </View>
//         </View>

//         {/* Amenities */}
//         <View style={[styles.section, dynamicStyles.section]}>
//           <Text style={[styles.sectionTitle, dynamicStyles.primaryText]}>Amenities</Text>
//           <View style={styles.amenitiesGrid}>
//             {propertyData.amenities.map((amenity, index) => 
//               renderAmenityItem(amenity, index)
//             )}
//           </View>
//         </View>

//         {/* Location */}
//         <View style={[styles.section, dynamicStyles.section]}>
//           <Text style={[styles.sectionTitle, dynamicStyles.primaryText]}>Location & nearby</Text>
//           <View style={[styles.locationCard, dynamicStyles.locationCard]}>
//             <Text style={[styles.locationTitle, dynamicStyles.primaryText]}>American University Housing District</Text>
//             <Text style={[styles.locationSubtitle, dynamicStyles.secondaryText]}>
//               📍 District, 5th Settlement Compounds, The 5th Settlement, ...
//             </Text>
//             <TouchableOpacity style={styles.viewMapButton}>
//               <Text style={styles.viewMapButtonText}>View on map</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Prices & Trends */}
//         <View style={[styles.section, dynamicStyles.section]}>
//           <Text style={[styles.sectionTitle, dynamicStyles.primaryText]}>Prices & Trends</Text>
//           <Text style={[styles.chartSubtitle, dynamicStyles.secondaryText]}>
//             Studio apartment rented in New Cairo City and Cairo
//           </Text>

//           <View style={styles.periodButtons}>
//             {['1Y', '2Y', '5Y'].map((period) => (
//               <TouchableOpacity
//                 key={period}
//                 style={[
//                   styles.periodButton,
//                   dynamicStyles.periodButton,
//                   selectedPeriod === period && styles.periodButtonActive
//                 ]}
//                 onPress={() => setSelectedPeriod(period)}
//               >
//                 <Text style={[
//                   styles.periodButtonText,
//                   { color: scheme === 'light' ? '#6b7280' : theme.colors.onSurfaceVariant },
//                   selectedPeriod === period && styles.periodButtonTextActive
//                 ]}>{period}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>

//           <View style={styles.chartLegend}>
//             <View style={styles.legendItem}>
//               <View style={[styles.legendColor, { backgroundColor: 'rgba(239, 68, 68, 1)' }]} />
//               <Text style={[styles.legendText, dynamicStyles.secondaryText]}>New Cairo City</Text>
//             </View>
//             <View style={styles.legendItem}>
//               <View style={[styles.legendColor, { backgroundColor: 'rgba(107, 114, 128, 1)' }]} />
//               <Text style={[styles.legendText, dynamicStyles.secondaryText]}>Cairo</Text>
//             </View>
//           </View>

//           <LineChart
//             data={chartData}
//             width={width - 40}
//             height={220}
//             chartConfig={{
//               backgroundColor: dynamicStyles.chartBackground,
//               backgroundGradientFrom: dynamicStyles.chartBackground,
//               backgroundGradientTo: dynamicStyles.chartBackground,
//               decimalPlaces: 0,
//               color: (opacity = 1) => scheme === 'light' 
//                 ? `rgba(107, 114, 128, ${opacity})` 
//                 : `rgba(156, 163, 175, ${opacity})`,
//               labelColor: (opacity = 1) => scheme === 'light' 
//                 ? `rgba(55, 65, 81, ${opacity})` 
//                 : `rgba(209, 213, 219, ${opacity})`,
//               style: { borderRadius: 16 },
//               propsForDots: { r: '4' },
//             }}
//             bezier
//             style={[styles.chart, { borderColor: scheme === 'light' ? '#e5e7eb' : theme.colors.outline }]}
//           />
//         </View>

//         {/* Agent Info */}
//         <View style={[styles.section, dynamicStyles.section]}>
//           <Text style={[styles.sectionTitle, dynamicStyles.primaryText]}>Provided by</Text>
//           <View style={[styles.agencyCard, dynamicStyles.cardBackground]}>
//             <View style={styles.agencyIcon}>
//               <Text style={styles.agencyIconText}>🏢</Text>
//             </View>
//             <View style={styles.agencyInfo}>
//               <Text style={[styles.agencyName, dynamicStyles.primaryText]}>{propertyData.agent.agency}</Text>
//               <Text style={[styles.agencyProperties, dynamicStyles.secondaryText]}>
//                 See agency properties ({propertyData.agent.agencyProperties})
//               </Text>
//             </View>
//           </View>

//           <View style={[styles.agentCard, dynamicStyles.cardBackground]}>
//             <Text style={[styles.agentName, dynamicStyles.primaryText]}>{propertyData.agent.name}</Text>
//             <TouchableOpacity style={[styles.agentPropertiesButton, { borderColor: scheme === 'light' ? '#d1d5db' : theme.colors.outline }]}>
//               <Text style={[styles.agentPropertiesText, dynamicStyles.secondaryText]}>
//                 See agent properties ({propertyData.agent.properties})
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Regulatory Information */}
//         <View style={[styles.section, dynamicStyles.section]}>
//           <Text style={[styles.sectionTitle, dynamicStyles.primaryText]}>Regulatory Information</Text>
//           <View style={[styles.regulatoryInfo, dynamicStyles.cardBackground]}>
//             <Text style={[styles.regulatoryLabel, dynamicStyles.secondaryText]}>Reference</Text>
//             <Text style={[styles.regulatoryValue, dynamicStyles.primaryText]}>{propertyData.reference}</Text>

//             <Text style={[styles.regulatoryLabel, dynamicStyles.secondaryText]}>Listed</Text>
//             <Text style={[styles.regulatoryValue, dynamicStyles.primaryText]}>{propertyData.listed}</Text>

//             <Text style={[styles.regulatoryLabel, dynamicStyles.secondaryText]}>Broker license</Text>
//             <Text style={[styles.regulatoryValue, dynamicStyles.primaryText]}>{propertyData.brokerLicense}</Text>
//           </View>
//         </View>

//         {/* Report Section */}
//         <View style={[styles.section, dynamicStyles.section]}>
//           <View style={styles.reportSection}>
//             <Text style={styles.reportIcon}>📋</Text>
//             <Text style={[styles.reportText, dynamicStyles.secondaryText]}>Is there anything wrong with this listing?</Text>
//           </View>
//           <TouchableOpacity style={[styles.reportButton, dynamicStyles.cardBackground]}>
//             <Text style={[styles.reportButtonText, dynamicStyles.secondaryText]}>🚨 Report</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={{ height: 100 }} />
//       </ScrollView>
//       ) : (
//         <Text>Loading property details...</Text>
//       )}

//       {/* Bottom Action Buttons */}
//       <View style={[styles.bottomActions, dynamicStyles.bottomActions]}>
//         <TouchableOpacity style={styles.callButton} onPress={handleCall}>
//           <Text style={styles.callButtonText}>📞{" "} Call</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.whatsappButton} onPress={handleWhatsApp}>
//           <Text style={styles.whatsappButtonText}>💬 WhatsApp</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   Dimensions,
//   StatusBar,
//   Linking,
//   FlatList,
//   useColorScheme,
// } from 'react-native';
// import { LineChart } from 'react-native-chart-kit';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useTheme } from 'react-native-paper';
// import { useRoute } from "@react-navigation/native";

// const { width } = Dimensions.get('window');

// const PropertyDetailsScreen = () => {
//   const route = useRoute();
//   const { id } = route.params;
//   const [selectedPeriod, setSelectedPeriod] = useState('1Y');
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isAutoScrolling, setIsAutoScrolling] = useState(true);
//   const imageSliderRef = useRef(null);
//   const autoScrollIntervalRef = useRef(null);
//   const theme = useTheme();
//   const scheme = useColorScheme();


//   const [propertyData, setPropertyData] = useState(null);
//   const [amenityNames, setAmenityNames] = useState([]);
//   const [companyData, setCompanyData] = useState(null);
//   const [companyProperties, setCompanyProperties] = useState(null);
//   const [coordinates, setCoordinates] = useState(null);

//   useEffect(() => {
//     fetch(`https://pestosoft.in/api/property/full/${id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Property API Response:", data);

//         // Process images to create full URLs
//         const processedData = {
//           ...data,
//           images: [
//             data.images ? `https://pestosoft.in${data.images}` : null,
//             data.images2 ? `https://pestosoft.in${data.images2}` : null,
//             data.images3 ? `https://pestosoft.in${data.images3}` : null,
//           ].filter(Boolean) // Remove null values
//         };

//         setPropertyData(processedData);

//         // ✅ Fetch amenities
//         const amenityIds = data.amenities || [];
//         const amenityPromises = amenityIds.map((amenityId) =>
//           fetch(`https://pestosoft.in/api/amenity/${amenityId}`)
//             .then((res) => res.json())
//             .then((amenityData) => {
//               console.log("Amenity API Response:", amenityData);
//               return (
//                 amenityData.name ||
//                 amenityData.amenity_name ||
//                 amenityData[0]?.name
//               );
//             })
//         );

//         Promise.all(amenityPromises)
//           .then((amenityNames) => {
//             console.log("Amenity Names:", amenityNames);
//             setAmenityNames(amenityNames);
//           })
//           .catch((err) => console.error("Error fetching amenities:", err));

//         // ✅ Fetch company data
//         const companyId = data.company;
//         if (companyId) {
//           fetch(`https://pestosoft.in/api/company/${companyId}`)
//             .then((res) => res.json())
//             .then((companyArray) => {
//               console.log("Company Data Array:", companyArray);
//               if (companyArray.length > 0) {
//                 const company = companyArray[0];
//                 setCompanyData(company);

//                 // ✅ Fetch properties of the same company
//                 fetch(`https://pestosoft.in/api/properties/company/${companyId}`)
//                   .then((res) => res.json())
//                   .then((companyProperties) => {
//                     console.log("Properties of the company:", companyProperties);
//                     if (companyProperties.length > 0) {
//                       setCompanyProperties(companyProperties[0]);
//                     }
//                   })
//                   .catch((err) =>
//                     console.error("Error fetching company's properties:", err)
//                   );
//               }
//             })
//             .catch((err) => console.error("Error fetching company:", err));
//         }
//       })
//       .catch((err) => console.error("Error fetching property:", err));
//   }, [id]);

//   // ✅ Fetch coordinates after propertyData loads
//   useEffect(() => {
//     if (propertyData?.city) {
//       fetch(
//         `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
//           propertyData.city
//         )}`
//       )
//         .then((res) => res.json())
//         .then((data) => {
//           if (data.length > 0) {
//             setCoordinates([
//               parseFloat(data[0].lat),
//               parseFloat(data[0].lon),
//             ]);
//           }
//         })
//         .catch((err) => console.error("Geocoding error:", err));
//     }
//   }, [propertyData]);

//   // Dynamic styles based on theme
//   const dynamicStyles = {
//     container: {
//       backgroundColor: scheme === 'light' ? '#ffffff' : theme.colors.background,
//     },
//     priceSection: {
//       backgroundColor: scheme === 'light' ? '#f9fafb' : theme.colors.elevation.level1,
//     },
//     section: {
//       borderTopColor: scheme === 'light' ? '#e5e7eb' : theme.colors.outline,
//     },
//     primaryText: {
//       color: scheme === 'light' ? '#111827' : theme.colors.onSurface,
//     },
//     secondaryText: {
//       color: scheme === 'light' ? '#6b7280' : theme.colors.onSurfaceVariant,
//     },
//     cardBackground: {
//       backgroundColor: scheme === 'light' ? '#f9fafb' : theme.colors.elevation.level2,
//       borderColor: scheme === 'light' ? '#e5e7eb' : theme.colors.outline,
//     },
//     locationCard: {
//       backgroundColor: scheme === 'light' ? '#f3f4f6' : theme.colors.elevation.level1,
//       borderColor: scheme === 'light' ? '#e5e7eb' : theme.colors.outline,
//     },
//     detailRow: {
//       borderBottomColor: scheme === 'light' ? '#e5e7eb' : theme.colors.outline,
//     },
//     periodButton: {
//       backgroundColor: scheme === 'light' ? '#f3f4f6' : theme.colors.elevation.level1,
//       borderColor: scheme === 'light' ? '#e5e7eb' : theme.colors.outline,
//     },
//     bottomActions: {
//       backgroundColor: scheme === 'light' ? '#ffffff' : theme.colors.background,
//       borderTopColor: scheme === 'light' ? '#e5e7eb' : theme.colors.outline,
//     },
//     chartBackground: scheme === 'light' ? '#f9fafb' : theme.colors.elevation.level1,
//   };

//   const chartData = {
//     labels: ['Aug 24', 'Oct 24', 'Dec 24', 'Feb 25', 'Apr 25', 'Jun 25'],
//     datasets: [
//       {
//         data: [35, 36, 37, 38, 37, 38],
//         color: () => `rgba(239, 68, 68, 1)`, // New Cairo City - Red line
//         strokeWidth: 2,
//       },
//       {
//         data: [37, 38, 38, 39, 38, 39],
//         color: () => `rgba(107, 114, 128, 1)`, // Cairo - Gray line
//         strokeWidth: 2,
//         strokeDashArray: [5, 5],
//       },
//     ],
//   };

//   // Auto-scroll functionality
//   const startAutoScroll = () => {
//     if (autoScrollIntervalRef.current) {
//       clearInterval(autoScrollIntervalRef.current);
//     }

//     autoScrollIntervalRef.current = setInterval(() => {
//       if (isAutoScrolling && propertyData?.images && propertyData.images.length > 0) {
//         setCurrentImageIndex(prevIndex => {
//           const nextIndex = (prevIndex + 1) % propertyData.images.length;
//           imageSliderRef.current?.scrollToIndex({
//             index: nextIndex,
//             animated: true
//           });
//           return nextIndex;
//         });
//       }
//     }, 3000); // Change image every 3 seconds
//   };

//   const stopAutoScroll = () => {
//     if (autoScrollIntervalRef.current) {
//       clearInterval(autoScrollIntervalRef.current);
//       autoScrollIntervalRef.current = null;
//     }
//   };

//   // Toggle auto-scroll
//   const toggleAutoScroll = () => {
//     setIsAutoScrolling(prev => {
//       const newState = !prev;
//       if (newState) {
//         startAutoScroll();
//       } else {
//         stopAutoScroll();
//       }
//       return newState;
//     });
//   };

//   // Start auto-scroll when component mounts
//   useEffect(() => {
//     if (isAutoScrolling && propertyData?.images && propertyData.images.length > 0) {
//       startAutoScroll();
//     }

//     return () => {
//       stopAutoScroll();
//     };
//   }, [isAutoScrolling, propertyData?.images]);

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       stopAutoScroll();
//     };
//   }, []);

//   const handleCall = () => {
//     Linking.openURL('tel:+1234567890');
//   };

//   const handleWhatsApp = () => {
//     Linking.openURL('whatsapp://send?phone=1234567890');
//   };

//   const onImageScroll = (event) => {
//     const scrollPosition = event.nativeEvent.contentOffset.x;
//     const imageIndex = Math.round(scrollPosition / width);
//     setCurrentImageIndex(imageIndex);
//   };

//   const goToNextImage = () => {
//     // Stop auto-scroll temporarily when user manually navigates
//     stopAutoScroll();
//     setIsAutoScrolling(false);

//     const nextIndex = (currentImageIndex + 1) % propertyData.images.length;
//     imageSliderRef.current?.scrollToIndex({ index: nextIndex, animated: true });
//     setCurrentImageIndex(nextIndex);

//     // Restart auto-scroll after 5 seconds of inactivity
//     setTimeout(() => {
//       setIsAutoScrolling(true);
//     }, 2000);
//   };

//   const goToPrevImage = () => {
//     // Stop auto-scroll temporarily when user manually navigates
//     stopAutoScroll();
//     setIsAutoScrolling(false);

//     const prevIndex = currentImageIndex === 0 ? propertyData.images.length - 1 : currentImageIndex - 1;
//     imageSliderRef.current?.scrollToIndex({ index: prevIndex, animated: true });
//     setCurrentImageIndex(prevIndex);

//     // Restart auto-scroll after 5 seconds of inactivity
//     setTimeout(() => {
//       setIsAutoScrolling(true);
//     }, 5000);
//   };

//   const onTouchStart = () => {
//     // Pause auto-scroll when user starts touching the slider
//     stopAutoScroll();
//     setIsAutoScrolling(false);
//   };

//   const onTouchEnd = () => {
//     // Resume auto-scroll after 5 seconds when user stops touching
//     setTimeout(() => {
//       setIsAutoScrolling(true);
//     }, 5000);
//   };

//   const renderImageItem = ({ item }) => (
//     <View style={styles.imageSlideContainer}>
//       <Image
//         source={{ uri: item }}
//         style={styles.headerImage}
//         resizeMode="cover"
//         onError={(error) => console.log('Image load error:', error.nativeEvent.error)}
//       />
//     </View>
//   );

//   const renderAmenityItem = (amenity, index) => (
//   <View key={index} style={styles.amenityItem}>
//     <Text style={styles.amenityIcon}>🏠</Text>
//     <Text style={[styles.amenityText, { color: scheme === 'light' ? '#4b5563' : theme.colors.onSurfaceVariant }]}>
//       {amenity || 'Amenity'}
//     </Text>
//   </View>
// );

//   return (
//     <SafeAreaView style={[styles.container, dynamicStyles.container]}>
//       <StatusBar
//         barStyle={scheme === 'light' ? 'dark-content' : 'light-content'}
//         backgroundColor={scheme === 'light' ? '#ffffff' : theme.colors.background}
//       />
//       {propertyData ? (
//         <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
//           {/* Header Image Slider */}
//           <View style={styles.imageContainer}>
//             <FlatList
//               ref={imageSliderRef}
//               data={propertyData.images || []}
//               renderItem={renderImageItem}
//               horizontal
//               pagingEnabled
//               showsHorizontalScrollIndicator={false}
//               onMomentumScrollEnd={onImageScroll}
//               onTouchStart={onTouchStart}
//               onTouchEnd={onTouchEnd}
//               keyExtractor={(item, index) => index.toString()}
//             />

//             {/* Image Counter */}
//             <View style={styles.imageCounter}>
//               <Text style={styles.imageCounterText}>
//                 {currentImageIndex + 1} / {propertyData.images?.length || 0}
//               </Text>
//             </View>

//             {/* Dots Indicator */}
//             <View style={styles.dotsContainer}>
//               {(propertyData.images || []).map((_, index) => (
//                 <View
//                   key={index}
//                   style={[
//                     styles.dot,
//                     currentImageIndex === index ? styles.activeDot : styles.inactiveDot
//                   ]}
//                 />
//               ))}
//             </View>
//           </View>

//           {/* Price Section */}
//           <View style={[styles.priceSection, dynamicStyles.priceSection]}>
//             <Text style={[styles.price, dynamicStyles.primaryText]}>{propertyData.expected_price || 'Price not available'} M AED</Text>
//             <Text style={[styles.title, dynamicStyles.secondaryText]}>{propertyData.name || 'Property name not available'}</Text>
//             <TouchableOpacity style={styles.mapButton}>
//               <Text style={styles.mapButtonText}>📍 View on map</Text>
//             </TouchableOpacity>
//           </View>

//           {/* Description */}
//           <View style={[styles.section, dynamicStyles.section]}>
//             <Text style={[styles.sectionTitle, dynamicStyles.primaryText]}>Description</Text>
//             <Text style={[styles.description, dynamicStyles.secondaryText]}>
//               {propertyData.description || 'No description available'}
//             </Text>
//             <TouchableOpacity>
//               <Text style={styles.readMore}>Read More</Text>
//             </TouchableOpacity>
//           </View>

//           {/* Property Details */}
//           <View style={[styles.section, dynamicStyles.section]}>
//             <View style={[styles.detailRow, dynamicStyles.detailRow]}>
//               <Text style={[styles.detailLabel, dynamicStyles.secondaryText]}>🏠 Parking Type:</Text>
//               <Text style={[styles.detailValue, dynamicStyles.primaryText]}>{propertyData.parking_type || 'Not specified'}</Text>
//             </View>
//             <View style={[styles.detailRow, dynamicStyles.detailRow]}>
//               <Text style={[styles.detailLabel, dynamicStyles.secondaryText]}>📐 Property Size:</Text>
//               <Text style={[styles.detailValue, dynamicStyles.primaryText]}>{propertyData.carpet_area || 'Not specified'} Sq.ft</Text>
//             </View>
//             <View style={[styles.detailRow, dynamicStyles.detailRow]}>
//               <Text style={[styles.detailLabel, dynamicStyles.secondaryText]}>🛏️ Bedrooms:</Text>
//               <Text style={[styles.detailValue, dynamicStyles.primaryText]}>{propertyData.bedrooms || 'Not specified'}</Text>
//             </View>
//             <View style={[styles.detailRow, dynamicStyles.detailRow]}>
//               <Text style={[styles.detailLabel, dynamicStyles.secondaryText]}>🚿 Bathrooms:</Text>
//               <Text style={[styles.detailValue, dynamicStyles.primaryText]}>{propertyData.bathrooms || 'Not specified'}</Text>
//             </View>
//           </View>


//           {/* Amenities */}
//           <View style={[styles.section, dynamicStyles.section]}>
//             <Text style={[styles.sectionTitle, dynamicStyles.primaryText]}>Amenities</Text>
//             <View style={styles.amenitiesGrid}>
//               {amenityNames.length > 0 ? amenityNames.map((amenity, index) =>
//                 renderAmenityItem(amenity, index)
//               ) : (
//                 <Text style={[styles.description, dynamicStyles.secondaryText]}>Loading amenities...</Text>
//               )}
//             </View>
//           </View>

//           {/* Location */}
//           <View style={[styles.section, dynamicStyles.section]}>
//             <Text style={[styles.sectionTitle, dynamicStyles.primaryText]}>Location & nearby</Text>
//             <View style={[styles.locationCard, dynamicStyles.locationCard]}>
//               <Text style={[styles.locationTitle, dynamicStyles.primaryText]}>{propertyData.city || 'Location not specified'}</Text>
//               {/* <Text style={[styles.locationSubtitle, dynamicStyles.secondaryText]}>
//                 📍 {propertyData.address || 'Address not available'}
//               </Text> */}
//               <TouchableOpacity style={styles.viewMapButton}>
//                 <Text style={styles.viewMapButtonText}>View on map</Text>
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Prices & Trends */}
//           <View style={[styles.section, dynamicStyles.section]}>
//             <Text style={[styles.sectionTitle, dynamicStyles.primaryText]}>Prices & Trends</Text>
//             <Text style={[styles.chartSubtitle, dynamicStyles.secondaryText]}>
//               Studio apartment rented in New Cairo City and Cairo
//             </Text>

//             <View style={styles.periodButtons}>
//               {['1Y', '2Y', '5Y'].map((period) => (
//                 <TouchableOpacity
//                   key={period}
//                   style={[
//                     styles.periodButton,
//                     dynamicStyles.periodButton,
//                     selectedPeriod === period && styles.periodButtonActive
//                   ]}
//                   onPress={() => setSelectedPeriod(period)}
//                 >
//                   <Text style={[
//                     styles.periodButtonText,
//                     { color: scheme === 'light' ? '#6b7280' : theme.colors.onSurfaceVariant },
//                     selectedPeriod === period && styles.periodButtonTextActive
//                   ]}>{period}</Text>
//                 </TouchableOpacity>
//               ))}
//             </View>

//             <View style={styles.chartLegend}>
//               <View style={styles.legendItem}>
//                 <View style={[styles.legendColor, { backgroundColor: 'rgba(239, 68, 68, 1)' }]} />
//                 <Text style={[styles.legendText, dynamicStyles.secondaryText]}>New Cairo City</Text>
//               </View>
//               <View style={styles.legendItem}>
//                 <View style={[styles.legendColor, { backgroundColor: 'rgba(107, 114, 128, 1)' }]} />
//                 <Text style={[styles.legendText, dynamicStyles.secondaryText]}>Cairo</Text>
//               </View>
//             </View>

//             <LineChart
//               data={chartData}
//               width={width - 40}
//               height={220}
//               chartConfig={{
//                 backgroundColor: dynamicStyles.chartBackground,
//                 backgroundGradientFrom: dynamicStyles.chartBackground,
//                 backgroundGradientTo: dynamicStyles.chartBackground,
//                 decimalPlaces: 0,
//                 color: (opacity = 1) => scheme === 'light'
//                   ? `rgba(107, 114, 128, ${opacity})`
//                   : `rgba(156, 163, 175, ${opacity})`,
//                 labelColor: (opacity = 1) => scheme === 'light'
//                   ? `rgba(55, 65, 81, ${opacity})`
//                   : `rgba(209, 213, 219, ${opacity})`,
//                 style: { borderRadius: 16 },
//                 propsForDots: { r: '4' },
//               }}
//               bezier
//               style={[styles.chart, { borderColor: scheme === 'light' ? '#e5e7eb' : theme.colors.outline }]}
//             />
//           </View>

//           {/* Agent Info */}
//           <View style={[styles.section, dynamicStyles.section]}>
//             <Text style={[styles.sectionTitle, dynamicStyles.primaryText]}>Provided by</Text>
//             <View style={[styles.agencyCard, dynamicStyles.cardBackground]}>
//               <View style={styles.agencyIcon}>
//                 <Text style={styles.agencyIconText}>🏢</Text>
//               </View>
//               <View style={styles.agencyInfo}>
//                 <Text style={[styles.agencyName, dynamicStyles.primaryText]}>{companyData?.name || 'Company name not available'}</Text>
//                 <Text style={[styles.agencyProperties, dynamicStyles.secondaryText]}>
//                   See agency properties ({companyProperties?.length || 0})
//                 </Text>
//               </View>
//             </View>

//             <View style={[styles.agentCard, dynamicStyles.cardBackground]}>
//               <Text style={[styles.agentName, dynamicStyles.primaryText]}>{propertyData.agent_name || 'Agent name not available'}</Text>
//               <TouchableOpacity style={[styles.agentPropertiesButton, { borderColor: scheme === 'light' ? '#d1d5db' : theme.colors.outline }]}>
//                 <Text style={[styles.agentPropertiesText, dynamicStyles.secondaryText]}>
//                   See agent properties
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Regulatory Information */}
//           <View style={[styles.section, dynamicStyles.section]}>
//             <Text style={[styles.sectionTitle, dynamicStyles.primaryText]}>Regulatory Information</Text>
//             <View style={[styles.regulatoryInfo, dynamicStyles.cardBackground]}>
//               <Text style={[styles.regulatoryLabel, dynamicStyles.secondaryText]}>Reference</Text>
//               <Text style={[styles.regulatoryValue, dynamicStyles.primaryText]}>{propertyData.id || 'Not available'}</Text>

//               <Text style={[styles.regulatoryLabel, dynamicStyles.secondaryText]}>Listed</Text>
//               <Text style={[styles.regulatoryValue, dynamicStyles.primaryText]}>{propertyData.created_at?.split('T')[0] || 'Not available'}</Text>

//               <Text style={[styles.regulatoryLabel, dynamicStyles.secondaryText]}>Parking Type</Text>
//               <Text style={[styles.regulatoryValue, dynamicStyles.primaryText]}>{propertyData.parking_type || 'Not available'}</Text>
//             </View>
//           </View>

//           {/* Report Section */}
//           <View style={[styles.section, dynamicStyles.section]}>
//             <View style={styles.reportSection}>
//               <Text style={styles.reportIcon}>📋</Text>
//               <Text style={[styles.reportText, dynamicStyles.secondaryText]}>Is there anything wrong with this listing?</Text>
//             </View>
//             <TouchableOpacity style={[styles.reportButton, dynamicStyles.cardBackground]}>
//               <Text style={[styles.reportButtonText, dynamicStyles.secondaryText]}>🚨 Report</Text>
//             </TouchableOpacity>
//           </View>

//           <View style={{ height: 100 }} />
//         </ScrollView>
//       ) : (
//         <View style={styles.loadingContainer}>
//           <Text style={[styles.loadingText, dynamicStyles.primaryText]}>Loading property details...</Text>
//         </View>
//       )}

//       {/* Bottom Action Buttons */}
//       <View style={[styles.bottomActions, dynamicStyles.bottomActions]}>
//         <TouchableOpacity style={styles.callButton} onPress={handleCall}>
//           <Text style={styles.callButtonText}>📞{" "} Call</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.whatsappButton} onPress={handleWhatsApp}>
//           <Text style={styles.whatsappButtonText}>💬 WhatsApp</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

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
  useColorScheme,
  Platform,
  Alert,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';
import { useRoute } from "@react-navigation/native";

const { width } = Dimensions.get('window');

const PropertyDetailsScreen = () => {
  const route = useRoute();
  const { id } = route.params;
  const [selectedPeriod, setSelectedPeriod] = useState('1Y');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const imageSliderRef = useRef(null);
  const autoScrollIntervalRef = useRef(null);
  const theme = useTheme();
  const scheme = useColorScheme();

  const [propertyData, setPropertyData] = useState(null);
  const [amenityNames, setAmenityNames] = useState([]);
  const [companyData, setCompanyData] = useState(null);
  const [companyProperties, setCompanyProperties] = useState(null);
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    fetch(`https://pestosoft.in/api/property/full/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Property API Response:", data);

        // Process images to create full URLs
        const processedData = {
          ...data,
          images: [
            data.images ? `https://pestosoft.in${data.images}` : null,
            data.images2 ? `https://pestosoft.in${data.images2}` : null,
            data.images3 ? `https://pestosoft.in${data.images3}` : null,
          ].filter(Boolean) // Remove null values
        };

        setPropertyData(processedData);

        // ✅ Fetch amenities
        const amenityIds = data.amenities || [];
        const amenityPromises = amenityIds.map((amenityId) =>
          fetch(`https://pestosoft.in/api/amenity/${amenityId}`)
            .then((res) => res.json())
            .then((amenityData) => {
              console.log("Amenity API Response:", amenityData);
              return (
                amenityData.name ||
                amenityData.amenity_name ||
                amenityData[0]?.name
              );
            })
        );

        Promise.all(amenityPromises)
          .then((amenityNames) => {
            console.log("Amenity Names:", amenityNames);
            setAmenityNames(amenityNames);
          })
          .catch((err) => console.error("Error fetching amenities:", err));

        // ✅ Fetch company data
        const companyId = data.company;
        if (companyId) {
          fetch(`https://pestosoft.in/api/company/${companyId}`)
            .then((res) => res.json())
            .then((companyArray) => {
              console.log("Company Data Array:", companyArray);
              if (companyArray.length > 0) {
                const company = companyArray[0];
                setCompanyData(company);

                // ✅ Fetch properties of the same company
                fetch(`https://pestosoft.in/api/properties/company/${companyId}`)
                  .then((res) => res.json())
                  .then((companyProperties) => {
                    console.log("Properties of the company:", companyProperties);
                    if (companyProperties.length > 0) {
                      setCompanyProperties(companyProperties);
                    }
                  })
                  .catch((err) =>
                    console.error("Error fetching company's properties:", err)
                  );
              }
            })
            .catch((err) => console.error("Error fetching company:", err));
        }
      })
      .catch((err) => console.error("Error fetching property:", err));
  }, [id]);

  // ✅ Fetch coordinates after propertyData loads
  useEffect(() => {
    if (propertyData?.city) {
      fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          propertyData.city
        )}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            setCoordinates([
              parseFloat(data[0].lat),
              parseFloat(data[0].lon),
            ]);
          }
        })
        .catch((err) => console.error("Geocoding error:", err));
    }
  }, [propertyData]);

  // Function to open maps with property location
  const openMaps = async () => {
    if (!propertyData?.city && !coordinates) {
      Alert.alert('Location not available', 'Location information is not available for this property.');
      return;
    }

    let mapUrl = '';
    const location = propertyData?.address || propertyData?.city || '';
    
    if (coordinates) {
      // Use coordinates if available
      const [lat, lng] = coordinates;
      
      if (Platform.OS === 'ios') {
        // iOS Maps
        mapUrl = `http://maps.apple.com/?q=${encodeURIComponent(location)}&ll=${lat},${lng}`;
        
        // Alternative: Open directly to coordinates
        // mapUrl = `http://maps.apple.com/?ll=${lat},${lng}&q=${encodeURIComponent(location)}`;
      } else {
        // Android Google Maps
        mapUrl = `geo:${lat},${lng}?q=${lat},${lng}(${encodeURIComponent(location)})`;
        
        // Alternative: Open Google Maps app if installed
        // mapUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
      }
    } else {
      // Fallback to location name if coordinates not available
      if (Platform.OS === 'ios') {
        mapUrl = `http://maps.apple.com/?q=${encodeURIComponent(location)}`;
      } else {
        mapUrl = `geo:0,0?q=${encodeURIComponent(location)}`;
      }
    }

    try {
      const canOpen = await Linking.canOpenURL(mapUrl);
      if (canOpen) {
        await Linking.openURL(mapUrl);
      } else {
        // Fallback to web maps
        const webMapUrl = coordinates 
          ? `https://www.google.com/maps/search/?api=1&query=${coordinates[0]},${coordinates[1]}`
          : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
        
        await Linking.openURL(webMapUrl);
      }
    } catch (error) {
      console.error('Error opening maps:', error);
      Alert.alert('Error', 'Unable to open maps application.');
    }
  };

  // Dynamic styles based on theme
  const dynamicStyles = {
    container: {
      backgroundColor: scheme === 'light' ? '#ffffff' : theme.colors.background,
    },
    priceSection: {
      backgroundColor: scheme === 'light' ? '#f9fafb' : theme.colors.elevation.level1,
    },
    section: {
      borderTopColor: scheme === 'light' ? '#e5e7eb' : theme.colors.outline,
    },
    primaryText: {
      color: scheme === 'light' ? '#111827' : theme.colors.onSurface,
    },
    secondaryText: {
      color: scheme === 'light' ? '#6b7280' : theme.colors.onSurfaceVariant,
    },
    cardBackground: {
      backgroundColor: scheme === 'light' ? '#f9fafb' : theme.colors.elevation.level2,
      borderColor: scheme === 'light' ? '#e5e7eb' : theme.colors.outline,
    },
    locationCard: {
      backgroundColor: scheme === 'light' ? '#f3f4f6' : theme.colors.elevation.level1,
      borderColor: scheme === 'light' ? '#e5e7eb' : theme.colors.outline,
    },
    detailRow: {
      borderBottomColor: scheme === 'light' ? '#e5e7eb' : theme.colors.outline,
    },
    periodButton: {
      backgroundColor: scheme === 'light' ? '#f3f4f6' : theme.colors.elevation.level1,
      borderColor: scheme === 'light' ? '#e5e7eb' : theme.colors.outline,
    },
    bottomActions: {
      backgroundColor: scheme === 'light' ? '#ffffff' : theme.colors.background,
      borderTopColor: scheme === 'light' ? '#e5e7eb' : theme.colors.outline,
    },
    chartBackground: scheme === 'light' ? '#f9fafb' : theme.colors.elevation.level1,
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
      if (isAutoScrolling && propertyData?.images && propertyData.images.length > 0) {
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
    if (isAutoScrolling && propertyData?.images && propertyData.images.length > 0) {
      startAutoScroll();
    }

    return () => {
      stopAutoScroll();
    };
  }, [isAutoScrolling, propertyData?.images]);

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
        onError={(error) => console.log('Image load error:', error.nativeEvent.error)}
      />
    </View>
  );

  const renderAmenityItem = (amenity, index) => (
    <View key={index} style={styles.amenityItem}>
      <Text style={styles.amenityIcon}>🏠</Text>
      <Text style={[styles.amenityText, { color: scheme === 'light' ? '#4b5563' : theme.colors.onSurfaceVariant }]}>
        {amenity || 'Amenity'}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, dynamicStyles.container]}>
      <StatusBar
        barStyle={scheme === 'light' ? 'dark-content' : 'light-content'}
        backgroundColor={scheme === 'light' ? '#ffffff' : theme.colors.background}
      />
      {propertyData ? (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header Image Slider */}
          <View style={styles.imageContainer}>
            <FlatList
              ref={imageSliderRef}
              data={propertyData.images || []}
              renderItem={renderImageItem}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={onImageScroll}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              keyExtractor={(item, index) => index.toString()}
            />

            {/* Image Counter */}
            <View style={styles.imageCounter}>
              <Text style={styles.imageCounterText}>
                {currentImageIndex + 1} / {propertyData.images?.length || 0}
              </Text>
            </View>

            {/* Dots Indicator */}
            <View style={styles.dotsContainer}>
              {(propertyData.images || []).map((_, index) => (
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
          <View style={[styles.priceSection, dynamicStyles.priceSection]}>
            <Text style={[styles.price, dynamicStyles.primaryText]}>{propertyData.expected_price || 'Price not available'} M AED</Text>
            <Text style={[styles.title, dynamicStyles.secondaryText]}>{propertyData.name || 'Property name not available'}</Text>
            <TouchableOpacity style={styles.mapButton} onPress={openMaps}>
              <Text style={styles.mapButtonText}>📍 View on map</Text>
            </TouchableOpacity>
          </View>

          {/* Description */}
          <View style={[styles.section, dynamicStyles.section]}>
            <Text style={[styles.sectionTitle, dynamicStyles.primaryText]}>Description</Text>
            <Text style={[styles.description, dynamicStyles.secondaryText]}>
              {propertyData.description || 'No description available'}
            </Text>
            <TouchableOpacity>
              <Text style={styles.readMore}>Read More</Text>
            </TouchableOpacity>
          </View>

          {/* Property Details */}
          <View style={[styles.section, dynamicStyles.section]}>
            <View style={[styles.detailRow, dynamicStyles.detailRow]}>
              <Text style={[styles.detailLabel, dynamicStyles.secondaryText]}>🏠 Parking Type:</Text>
              <Text style={[styles.detailValue, dynamicStyles.primaryText]}>{propertyData.parking_type || 'Not specified'}</Text>
            </View>
            <View style={[styles.detailRow, dynamicStyles.detailRow]}>
              <Text style={[styles.detailLabel, dynamicStyles.secondaryText]}>📐 Property Size:</Text>
              <Text style={[styles.detailValue, dynamicStyles.primaryText]}>{propertyData.carpet_area || 'Not specified'} Sq.ft</Text>
            </View>
            <View style={[styles.detailRow, dynamicStyles.detailRow]}>
              <Text style={[styles.detailLabel, dynamicStyles.secondaryText]}>🛏️ Bedrooms:</Text>
              <Text style={[styles.detailValue, dynamicStyles.primaryText]}>{propertyData.bedrooms || 'Not specified'}</Text>
            </View>
            <View style={[styles.detailRow, dynamicStyles.detailRow]}>
              <Text style={[styles.detailLabel, dynamicStyles.secondaryText]}>🚿 Bathrooms:</Text>
              <Text style={[styles.detailValue, dynamicStyles.primaryText]}>{propertyData.bathrooms || 'Not specified'}</Text>
            </View>
          </View>

          {/* Amenities */}
          <View style={[styles.section, dynamicStyles.section]}>
            <Text style={[styles.sectionTitle, dynamicStyles.primaryText]}>Amenities</Text>
            <View style={styles.amenitiesGrid}>
              {amenityNames.length > 0 ? amenityNames.map((amenity, index) =>
                renderAmenityItem(amenity, index)
              ) : (
                <Text style={[styles.description, dynamicStyles.secondaryText]}>Loading amenities...</Text>
              )}
            </View>
          </View>

          {/* Location */}
          <View style={[styles.section, dynamicStyles.section]}>
            <Text style={[styles.sectionTitle, dynamicStyles.primaryText]}>Location & nearby</Text>
            <View style={[styles.locationCard, dynamicStyles.locationCard]}>
              <Text style={[styles.locationTitle, dynamicStyles.primaryText]}>{propertyData.city || 'Location not specified'}</Text>
              {/* <Text style={[styles.locationSubtitle, dynamicStyles.secondaryText]}>
                📍 {propertyData.address || 'Address not available'}
              </Text> */}
              <TouchableOpacity style={styles.viewMapButton} onPress={openMaps}>
                <Text style={styles.viewMapButtonText}>View on map</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Prices & Trends */}
          <View style={[styles.section, dynamicStyles.section]}>
            <Text style={[styles.sectionTitle, dynamicStyles.primaryText]}>Prices & Trends</Text>
            <Text style={[styles.chartSubtitle, dynamicStyles.secondaryText]}>
              Studio apartment rented in New Cairo City and Cairo
            </Text>

            <View style={styles.periodButtons}>
              {['1Y', '2Y', '5Y'].map((period) => (
                <TouchableOpacity
                  key={period}
                  style={[
                    styles.periodButton,
                    dynamicStyles.periodButton,
                    selectedPeriod === period && styles.periodButtonActive
                  ]}
                  onPress={() => setSelectedPeriod(period)}
                >
                  <Text style={[
                    styles.periodButtonText,
                    { color: scheme === 'light' ? '#6b7280' : theme.colors.onSurfaceVariant },
                    selectedPeriod === period && styles.periodButtonTextActive
                  ]}>{period}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.chartLegend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: 'rgba(239, 68, 68, 1)' }]} />
                <Text style={[styles.legendText, dynamicStyles.secondaryText]}>New Cairo City</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: 'rgba(107, 114, 128, 1)' }]} />
                <Text style={[styles.legendText, dynamicStyles.secondaryText]}>Cairo</Text>
              </View>
            </View>

            <LineChart
              data={chartData}
              width={width - 40}
              height={220}
              chartConfig={{
                backgroundColor: dynamicStyles.chartBackground,
                backgroundGradientFrom: dynamicStyles.chartBackground,
                backgroundGradientTo: dynamicStyles.chartBackground,
                decimalPlaces: 0,
                color: (opacity = 1) => scheme === 'light'
                  ? `rgba(107, 114, 128, ${opacity})`
                  : `rgba(156, 163, 175, ${opacity})`,
                labelColor: (opacity = 1) => scheme === 'light'
                  ? `rgba(55, 65, 81, ${opacity})`
                  : `rgba(209, 213, 219, ${opacity})`,
                style: { borderRadius: 16 },
                propsForDots: { r: '4' },
              }}
              bezier
              style={[styles.chart, { borderColor: scheme === 'light' ? '#e5e7eb' : theme.colors.outline }]}
            />
          </View>

          {/* Agent Info */}
          <View style={[styles.section, dynamicStyles.section]}>
            <Text style={[styles.sectionTitle, dynamicStyles.primaryText]}>Provided by</Text>
            <View style={[styles.agencyCard, dynamicStyles.cardBackground]}>
              <View style={styles.agencyIcon}>
                <Text style={styles.agencyIconText}>🏢</Text>
              </View>
              <View style={styles.agencyInfo}>
                <Text style={[styles.agencyName, dynamicStyles.primaryText]}>{companyData?.name || 'Company name not available'}</Text>
                <Text style={[styles.agencyProperties, dynamicStyles.secondaryText]}>
                  See agency properties ({companyProperties?.length || 0})
                </Text>
              </View>
            </View>

            <View style={[styles.agentCard, dynamicStyles.cardBackground]}>
              <Text style={[styles.agentName, dynamicStyles.primaryText]}>{propertyData.agent_name || 'Agent name not available'}</Text>
              <TouchableOpacity style={[styles.agentPropertiesButton, { borderColor: scheme === 'light' ? '#d1d5db' : theme.colors.outline }]}>
                <Text style={[styles.agentPropertiesText, dynamicStyles.secondaryText]}>
                  See agent properties
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Regulatory Information */}
          <View style={[styles.section, dynamicStyles.section]}>
            <Text style={[styles.sectionTitle, dynamicStyles.primaryText]}>Regulatory Information</Text>
            <View style={[styles.regulatoryInfo, dynamicStyles.cardBackground]}>
              <Text style={[styles.regulatoryLabel, dynamicStyles.secondaryText]}>Reference</Text>
              <Text style={[styles.regulatoryValue, dynamicStyles.primaryText]}>{propertyData.id || 'Not available'}</Text>

              <Text style={[styles.regulatoryLabel, dynamicStyles.secondaryText]}>Listed</Text>
              <Text style={[styles.regulatoryValue, dynamicStyles.primaryText]}>{propertyData.created_at?.split('T')[0] || 'Not available'}</Text>

              <Text style={[styles.regulatoryLabel, dynamicStyles.secondaryText]}>Parking Type</Text>
              <Text style={[styles.regulatoryValue, dynamicStyles.primaryText]}>{propertyData.parking_type || 'Not available'}</Text>
            </View>
          </View>

          {/* Report Section */}
          <View style={[styles.section, dynamicStyles.section]}>
            <View style={styles.reportSection}>
              <Text style={styles.reportIcon}>📋</Text>
              <Text style={[styles.reportText, dynamicStyles.secondaryText]}>Is there anything wrong with this listing?</Text>
            </View>
            <TouchableOpacity style={[styles.reportButton, dynamicStyles.cardBackground]}>
              <Text style={[styles.reportButtonText, dynamicStyles.secondaryText]}>🚨 Report</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>
      ) : (
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, dynamicStyles.primaryText]}>Loading property details...</Text>
        </View>
      )}

      {/* Bottom Action Buttons */}
      <View style={[styles.bottomActions, dynamicStyles.bottomActions]}>
        <TouchableOpacity style={styles.callButton} onPress={handleCall}>
          <Text style={styles.callButtonText}>📞{" "} Call</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.whatsappButton} onPress={handleWhatsApp}>
          <Text style={styles.whatsappButtonText}>💬 WhatsApp</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  title: {
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
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
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
  },
  detailLabel: {
    fontSize: 16,
    flex: 1,
  },
  detailValue: {
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
    fontSize: 14,
    flex: 1,
  },
  locationCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  locationSubtitle: {
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
    borderWidth: 1,
  },
  periodButtonActive: {
    backgroundColor: '#0b154f',
    borderColor: '#0b154f',
  },
  periodButtonText: {
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
    fontSize: 12,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
  },
  agencyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
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
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  agencyProperties: {
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

export default PropertyDetailsScreen;