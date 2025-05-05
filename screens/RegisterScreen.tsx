import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CameraComponent from '../components/CameraComponent';
import { MaterialIcons } from '@expo/vector-icons';
import { toast } from 'sonner-native';

export default function RegisterScreen({ navigation }) {
  const [step, setStep] = useState(1);
  const [attendanceId, setAttendanceId] = useState('');
  const [fullName, setFullName] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);

  const handleNext = () => {
    if (step === 1) {
      if (!attendanceId.trim() || !fullName.trim()) {
        toast.error('Please fill in all fields');
        return;
      }
      setStep(2);
    }
  };

  const handlePhotoCapture = (photoUri: string) => {
    setPhoto(photoUri);
    toast.success('Photo captured successfully!');
    // Here we would typically upload to Firebase
  };

  const handleRegister = () => {
    if (!photo) {
      toast.error('Please capture a photo first');
      return;
    }
    // Here we would handle the registration with Firebase
    toast.success('Registration successful!');
  };

  return (
    <SafeAreaView style={styles.container}>
      {step === 1 ? (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Register</Text>
            <Text style={styles.subtitle}>Create your attendance profile</Text>
          </View>
          
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <MaterialIcons name="badge" size={24} color="#666" />
              <TextInput
                style={styles.input}
                placeholder="Attendance ID"
                value={attendanceId}
                onChangeText={setAttendanceId}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <MaterialIcons name="person" size={24} color="#666" />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>
            
            <TouchableOpacity style={styles.button} onPress={handleNext}>
              <Text style={styles.buttonText}>Next</Text>
              <MaterialIcons name="arrow-forward" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.cameraContainer}>
          <CameraComponent onPhotoCapture={handlePhotoCapture} />
          {photo && (
            <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
              <Text style={styles.buttonText}>Complete Registration</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
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
  form: {
    gap: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 12,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  cameraContainer: {
    flex: 1,
  },
  registerButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
});