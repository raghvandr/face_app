import { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { CameraView, CameraType } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';

interface CameraComponentProps {
  onPhotoCapture: (photo: string) => void;
}

export default function CameraComponent({ onPhotoCapture }: CameraComponentProps) {
  const [type, setType] = useState<CameraType>('front');
  const [photo, setPhoto] = useState<string | null>(null);
  const camera = useRef(null);

  const takePicture = async () => {
    if (camera.current) {
      const photo = await camera.current.takePictureAsync({
        quality: 0.5,
        base64: true,
      });
      setPhoto(photo.uri);
      onPhotoCapture(photo.uri);
    }
  };

  const toggleCameraType = () => {
    setType(current => (current === 'back' ? 'front' : 'back'));
  };

  if (photo) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: photo }} style={styles.preview} />
        <TouchableOpacity style={styles.retakeButton} onPress={() => setPhoto(null)}>
          <MaterialIcons name="replay" size={32} color="white" />
          <Text style={styles.buttonText}>Retake</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView ref={camera} style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.flipButton} onPress={toggleCameraType}>
            <MaterialIcons name="flip-camera-ios" size={32} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <View style={styles.captureInner} />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flipButton: {
    position: 'absolute',
    left: 30,
    padding: 15,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  preview: {
    flex: 1,
  },
  retakeButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    marginTop: 5,
  },
});