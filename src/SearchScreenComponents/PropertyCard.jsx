import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useThemedStyles } from "./styles";

const API_BASE = "https://pestosoft.in/";

const PropertyCard = ({ property, onPress, onCall, onWhatsApp, isFavorite, onToggleFavorite }) => {
  const styles = useThemedStyles();

  

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.propertyCard}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: `${API_BASE}${property.images}` }} style={styles.propertyImage} />
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
            <Text style={styles.propertyType}>{property.name}</Text>
            {/* <Text style={styles.listedTime}>Listed {property.listedTime}</Text> */}
          </View>

          <Text style={styles.price}>{property.expected_price} M AED</Text>
          <Text style={styles.location}>{property.city}, {property.locality}</Text>

          <View style={styles.propertySpecs}>
            <View style={styles.specItem}>
              <Text style={styles.specLabel}>Beds</Text>
              <Text style={styles.specValue}>{property.bedrooms}</Text>
            </View>
            <View style={styles.specItem}>
              <Text style={styles.specLabel}>Baths</Text>
              <Text style={styles.specValue}>{property.bathrooms}</Text>
            </View>
            <View style={styles.specItem}>
              <Text style={styles.specLabel}>Area</Text>
              <Text style={styles.specValue}>{property.carpet_area}</Text>
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
  )
};

export default PropertyCard;