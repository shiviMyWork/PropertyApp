import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useThemedStyles } from "./styles";

const { height: screenHeight } = Dimensions.get('window');

const AmenitiesModal = ({ visible, onClose, selectedAmenities, onAmenitiesChange }) => {
  const styles = useThemedStyles();
  const [slideAnim] = useState(new Animated.Value(screenHeight));

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

export default AmenitiesModal;