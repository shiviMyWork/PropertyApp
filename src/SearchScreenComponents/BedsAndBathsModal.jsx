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

const BedsAndBathsModal = ({ visible, onClose, bedsAndBaths, onBedsAndBathsChange }) => {
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

export default BedsAndBathsModal;