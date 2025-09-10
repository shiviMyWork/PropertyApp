import React, { useEffect, useState } from 'react';
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

const PriceModal = ({ visible, onClose, priceRange, onPriceChange }) => {
  const styles = useThemedStyles();
  const scheme = useColorScheme();
  const theme = useTheme();
  const [slideAnim] = useState(new Animated.Value(screenHeight));

  // Dynamic colors for icons based on theme
  const iconColors = {
    primary: scheme === 'dark' ? theme.colors.onSurface || '#ffffff' : '#333',
    secondary: scheme === 'dark' ? '#cccccc' : '#666',
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
              <Icon name="close" size={24} color={iconColors.secondary} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Price Range</Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView style={styles.modalContent}>
            {/* Price Histogram + Inputs */}
            <View style={styles.priceSection}>
              <View style={styles.sectionHeader}>
                <Icon name="attach-money" size={20} color={iconColors.active} />
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
                  placeholderTextColor={iconColors.placeholder}
                  keyboardType="numeric"
                  value={priceRange.min}
                  onChangeText={(text) => onPriceChange({ ...priceRange, min: text })}
                />
                <Text style={styles.priceSeparator}>—</Text>
                <TextInput
                  style={styles.priceInputBox}
                  placeholder="No max."
                  placeholderTextColor={iconColors.placeholder}
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

export default PriceModal;