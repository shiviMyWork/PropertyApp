// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   StatusBar,
//   Linking,
//   Platform,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useTheme } from 'react-native-paper';

// const NotificationsScreen = ({ navigation }) => {
//   const [pushNotifications, setPushNotifications] = useState(false);
//   const theme = useTheme();
//   const scheme = useColorScheme(); 

//   const openAppSettings = () => {
//     if (Platform.OS === 'ios') {
//       Linking.openURL('app-settings:');
//     } else {
//       Linking.openSettings();
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity 
//           style={styles.backButton}
//           onPress={() => navigation.goBack()}
//         >
//           <Icon name="arrow-back" size={24} color="#000" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Notifications</Text>
//       </View>

//       {/* Content */}
//       <View style={styles.content}>
//         <TouchableOpacity 
//           style={styles.settingRow}
//           onPress={openAppSettings}
//         >
//           <Text style={styles.settingLabel}>Push Notifications</Text>
//           <View style={styles.settingRight}>
//             <Text style={styles.settingStatus}>Disabled</Text>
//             <Text style={styles.chevron}>›</Text>
//           </View>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   backButton: {
//     padding: 8,
//     marginLeft: -8,
//   },
//   backArrow: {
//     fontSize: 24,
//     color: '#000',
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: '400',
//     color: '#000',
//     marginLeft: 16,
//   },
//   content: {
//     flex: 1,
//   },
//   settingRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 28,
//     paddingVertical: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//   },
//   settingLabel: {
//     fontSize: 16,
//     color: '#000',
//     fontWeight: '400',
//   },
//   settingRight: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   settingStatus: {
//     fontSize: 16,
//     color: '#666',
//     marginRight: 8,
//   },
//   chevron: {
//     fontSize: 24,
//     color: '#666',
//     fontWeight: '300',
//   },
// });

// export default NotificationsScreen;

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Linking,
  Platform,
  useColorScheme,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';

const NotificationsScreen = ({ navigation }) => {
  const [pushNotifications] = useState(false);
  const theme = useTheme();
  const scheme = useColorScheme();

  const isDark = scheme === 'dark';

  const openAppSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />

      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.colors.outline }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={theme.colors.onBackground} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.onBackground }]}>
          Notifications
        </Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <TouchableOpacity
          style={[styles.settingRow, { borderBottomColor: theme.colors.outline }]}
          onPress={openAppSettings}
        >
          <Text style={[styles.settingLabel, { color: theme.colors.onBackground }]}>
            Push Notifications
          </Text>
          <View style={styles.settingRight}>
            <Text style={[styles.settingStatus, { color: theme.colors.onSurfaceVariant }]}>
              {pushNotifications ? 'Enabled' : 'Disabled'}
            </Text>
            <Text style={[styles.chevron, { color: theme.colors.onSurfaceVariant }]}>›</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 16,
  },
  content: {
    flex: 1,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingVertical: 20,
    borderBottomWidth: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '400',
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingStatus: {
    fontSize: 16,
    marginRight: 8,
  },
  chevron: {
    fontSize: 24,
    fontWeight: '300',
  },
});

export default NotificationsScreen;
