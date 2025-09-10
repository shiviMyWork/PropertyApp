import { StyleSheet } from "react-native";
import { useColorScheme } from "react-native";
import { useTheme } from "react-native-paper";

// Create a function that returns styles based on theme
const createStyles = (scheme, theme) => {
  // Define color palettes for both themes
  const colors = {
    light: {
      background: '#f5f5f5',
      surface: '#FFFFFF',
      primary: '#0b154f',
      accent: '#FF5F06',
      text: '#333',
      textSecondary: '#666',
      textTertiary: '#999',
      border: '#e0e0e0',
      borderSecondary: '#d0d0d0',
      input: '#f8f8f8',
      shadow: '#000',
    },
    dark: {
      background: theme.colors.background || '#121212',
      surface: theme.colors.elevation?.level1 || '#1e1e1e',
      primary: '#4a5db8', // Lighter version of your primary for dark mode
      accent: '#FF7F36', // Slightly lighter orange for better contrast
      text: theme.colors.onSurface || '#ffffff',
      textSecondary: theme.colors.onSurfaceVariant || '#cccccc',
      textTertiary: '#999999',
      border: theme.colors.outline || '#404040',
      borderSecondary: '#505050',
      input: theme.colors.elevation?.level2 || '#2a2a2a',
      shadow: '#000',
    }
  };

  const currentColors = colors[scheme] || colors.light;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: currentColors.background,
      marginBottom: '14%',
    },
    header: {
      padding: 16,
      backgroundColor: currentColors.surface,
      shadowColor: currentColors.shadow,
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
      backgroundColor: currentColors.input,
      borderRadius: 10,
      paddingHorizontal: 16,
      height: 50,
      borderWidth: 1,
      borderColor: currentColors.border,
    },
    searchIcon: {
      marginRight: 12,
    },
    searchInput: {
      flex: 1,
      color: currentColors.text,
      fontSize: 16,
    },
    searchButton: {
      backgroundColor: currentColors.accent,
      borderRadius: 10,
      padding: 8,
      marginLeft: 8,
    },
    filterWrapper: {
      backgroundColor: currentColors.surface,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: currentColors.border,
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
      borderColor: currentColors.borderSecondary,
      minWidth: 80,
    },
    activeFilterTab: {
      backgroundColor: currentColors.primary,
      borderColor: currentColors.primary,
    },
    filterText: {
      color: currentColors.textSecondary,
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
      backgroundColor: currentColors.background,
    },
    resultsInfo: {
      flexDirection: 'col',
      gap: 2,
    },
    resultsCount: {
      color: currentColors.text,
      fontSize: 16,
      marginRight: 12,
    },
    newBadge: {
      backgroundColor: currentColors.primary,
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
      borderColor: currentColors.borderSecondary,
      paddingHorizontal: 16,
      paddingVertical: 6,
      borderRadius: 10,
      backgroundColor: currentColors.surface,
    },
    featuredButtonText: {
      color: currentColors.text,
      fontSize: 14,
    },
    propertiesList: {
      flex: 1,
      paddingHorizontal: 16,
    },
    propertyCard: {
      backgroundColor: currentColors.surface,
      borderRadius: 10,
      marginBottom: 16,
      overflow: 'hidden',
      shadowColor: currentColors.shadow,
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
      backgroundColor: currentColors.surface,
      padding: 2,
      shadowColor: currentColors.shadow,
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
      backgroundColor: currentColors.surface,
      borderColor: currentColors.border,
      borderWidth: 1,
    },
    propertyHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    propertyType: {
      color: currentColors.textSecondary,
      fontSize: 14,
    },
    listedTime: {
      color: currentColors.textTertiary,
      fontSize: 12,
    },
    price: {
      color: currentColors.text,
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    location: {
      color: currentColors.textSecondary,
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
      color: currentColors.textTertiary,
      fontSize: 12,
      marginBottom: 2,
    },
    specValue: {
      color: currentColors.text,
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
      gap: 10,
    },
    callButton: {
      backgroundColor: currentColors.primary,
    },
    whatsappButton: {
      backgroundColor: currentColors.primary,
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

    // Modal Styles
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
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
      backgroundColor: currentColors.surface,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      shadowColor: currentColors.shadow,
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
      backgroundColor: currentColors.surface,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomWidth: 1,
      borderBottomColor: currentColors.border,
    },
    filterTitle: {
      color: currentColors.text,
      fontSize: 18,
      fontWeight: '600',
    },
    filterContent: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 16,
      backgroundColor: currentColors.surface,
    },
    toggleContainer: {
      flexDirection: 'row',
      backgroundColor: currentColors.input,
      borderRadius: 25,
      marginBottom: 20,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: currentColors.border,
    },
    toggleButton: {
      flex: 1,
      paddingVertical: 12,
      alignItems: 'center',
    },
    activeToggle: {
      backgroundColor: currentColors.primary,
    },
    toggleText: {
      color: currentColors.textSecondary,
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
      color: currentColors.text,
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
      backgroundColor: currentColors.border,
      padding: 2,
    },
    switchActive: {
      backgroundColor: currentColors.primary,
    },
    switchThumb: {
      width: 26,
      height: 26,
      borderRadius: 13,
      backgroundColor: '#FFFFFF',
      shadowColor: currentColors.shadow,
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
      backgroundColor: currentColors.input,
      borderWidth: 1,
      borderColor: currentColors.border,
    },
    numberOption: {
      width: 60,
      height: 40,
      borderRadius: 8,
      backgroundColor: currentColors.input,
      borderWidth: 1,
      borderColor: currentColors.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    activeOption: {
      backgroundColor: currentColors.primary,
      borderColor: currentColors.primary,
    },
    optionText: {
      color: currentColors.text,
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
      color: currentColors.primary,
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
      backgroundColor: currentColors.input,
      borderWidth: 1,
      borderColor: currentColors.border,
    },
    activePeriod: {
      backgroundColor: currentColors.primary,
      borderColor: currentColors.primary,
    },
    periodText: {
      color: currentColors.text,
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
      backgroundColor: currentColors.primary,
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
      backgroundColor: currentColors.input,
      borderRadius: 8,
      paddingHorizontal: 16,
      color: currentColors.text,
      fontSize: 16,
      borderWidth: 1,
      borderColor: currentColors.border,
    },
    priceSeparator: {
      color: currentColors.textSecondary,
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
      backgroundColor: currentColors.input,
      borderWidth: 1,
      borderColor: currentColors.border,
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
      backgroundColor: currentColors.input,
      borderRadius: 8,
      paddingHorizontal: 16,
      height: 50,
      borderWidth: 1,
      borderColor: currentColors.border,
    },
    sizeInput: {
      flex: 1,
      color: currentColors.text,
      fontSize: 16,
    },
    sizeSeparator: {
      color: currentColors.textSecondary,
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
      backgroundColor: currentColors.input,
      borderWidth: 1,
      borderColor: currentColors.border,
      gap: 8,
    },
    activeAmenity: {
      backgroundColor: scheme === 'light' ? '#F0F7FF' : currentColors.primary + '20',
      borderColor: currentColors.primary,
    },
    amenityText: {
      color: currentColors.text,
      fontSize: 14,
    },
    activeAmenityText: {
      color: currentColors.primary,
    },
    daysInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: currentColors.input,
      borderRadius: 8,
      paddingHorizontal: 16,
      height: 50,
      borderWidth: 1,
      borderColor: currentColors.border,
    },
    daysInput: {
      flex: 1,
      color: currentColors.text,
      fontSize: 16,
    },
    keywordsInput: {
      backgroundColor: currentColors.input,
      borderRadius: 8,
      paddingHorizontal: 16,
      height: 50,
      color: currentColors.text,
      fontSize: 16,
      borderWidth: 1,
      borderColor: currentColors.border,
    },
    filterFooter: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: currentColors.surface,
      padding: 8,
      paddingBottom: 32,
    },
    applyButton: {
      backgroundColor: currentColors.accent,
      paddingVertical: 16,
      borderRadius: 8,
      alignItems: 'center',
    },
    applyButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },

    // Modal variations
    categoryModal: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: currentColors.surface,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingBottom: 50,
      shadowColor: currentColors.shadow,
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
      backgroundColor: currentColors.surface,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      shadowColor: currentColors.shadow,
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
      backgroundColor: currentColors.surface,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      shadowColor: currentColors.shadow,
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
      backgroundColor: currentColors.surface,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      shadowColor: currentColors.shadow,
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
      backgroundColor: currentColors.surface,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      shadowColor: currentColors.shadow,
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
      borderBottomColor: currentColors.border,
    },
    modalTitle: {
      color: currentColors.text,
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
      backgroundColor: currentColors.surface,
      borderTopWidth: 1,
      borderTopColor: currentColors.border,
    },

    // Category Modal
    categoryHeader: {
      alignItems: 'center',
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: currentColors.border,
    },
    categoryTitle: {
      color: currentColors.text,
      fontSize: 18,
      fontWeight: '600',
    },
    categoryContent: {
      paddingHorizontal: 16,
      paddingTop: 20,
    },
    categoryToggleContainer: {
      flexDirection: 'row',
      backgroundColor: currentColors.input,
      borderRadius: 12,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: currentColors.border,
    },
    categoryToggleButton: {
      flex: 1,
      paddingVertical: 16,
      alignItems: 'center',
    },
    activeCategoryToggle: {
      backgroundColor: currentColors.primary,
    },
    categoryToggleText: {
      color: currentColors.textSecondary,
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
      backgroundColor: currentColors.input,
      borderWidth: 1,
      borderColor: currentColors.border,
    },
    activePropertyOption: {
      backgroundColor: currentColors.primary,
      borderColor: currentColors.primary,
    },
    propertyOptionText: {
      color: currentColors.text,
      fontSize: 14,
    },
    activePropertyOptionText: {
      color: '#FFFFFF',
    },

    // Price Modal
    priceSection: {
      marginBottom: 24,
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
      backgroundColor: currentColors.input,
      borderRadius: 8,
      paddingHorizontal: 12,
      fontSize: 16,
      borderWidth: 1,
      borderColor: currentColors.border,
      color: currentColors.text,
    },

    // Beds & Baths Modal
    section: {
      marginBottom: 24,
    },
    numberOptionText: {
      color: currentColors.text,
      fontSize: 14,
      fontWeight: '500',
    },
  });
};

// Custom hook to use themed styles
export const useThemedStyles = () => {
  const scheme = useColorScheme();
  const theme = useTheme();
  
  return createStyles(scheme, theme);
};

// Export the function for direct usage if needed
export default createStyles;