import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Face Attendance</Text>
        <Text style={styles.subtitle}>Welcome! Choose an option below</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Register')}
        >
          <MaterialIcons name="person-add" size={32} color="#007AFF" />
          <Text style={styles.buttonTitle}>Register</Text>
          <Text style={styles.buttonSubtitle}>Create new profile</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('MarkAttendance')}
        >
          <MaterialIcons name="face" size={32} color="#007AFF" />
          <Text style={styles.buttonTitle}>Mark Attendance</Text>
          <Text style={styles.buttonSubtitle}>Scan your face</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <MaterialIcons name="dashboard" size={32} color="#007AFF" />
          <Text style={styles.buttonTitle}>Dashboard</Text>
          <Text style={styles.buttonSubtitle}>View attendance records</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  buttonsContainer: {
    gap: 16,
  },
  button: {
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 8,
  },
  buttonTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  buttonSubtitle: {
    fontSize: 14,
    color: '#666',
  },
});