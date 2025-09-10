import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
} from 'react-native';
import { useThemedStyles } from "./styles";

const { height: screenHeight } = Dimensions.get('window');

const CategoryModal = ({ visible, onClose, selectedCategory, onCategorySelect }) => {
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

export default CategoryModal;