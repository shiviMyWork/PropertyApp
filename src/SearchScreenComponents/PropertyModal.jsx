import React, { useEffect, useState } from 'react';
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

const PropertyModal = ({ visible, onClose, selectedProperties, onPropertySelect }) => {
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

export default PropertyModal;