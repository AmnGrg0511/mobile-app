import React, { useRef } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
  Dimensions,
} from 'react-native';
import LottieView from 'lottie-react-native';
import ConfettiCannon from 'react-native-confetti-cannon';

interface SuccessAlertProps {
  visible: boolean;
  title: string;
  message: string;
  onClose: (event: GestureResponderEvent) => void;
}

const { width, height } = Dimensions.get('window');

const SuccessAlert: React.FC<SuccessAlertProps> = ({
  visible,
  title,
  message,
  onClose,
}) => {
  const confettiRef = useRef<ConfettiCannon | null>(null);

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        {visible && (
          <ConfettiCannon
            ref={confettiRef}
            count={60}
            origin={{ x: width / 2, y: -10 }}
            explosionSpeed={400}
            fallSpeed={3000}
            fadeOut
          />
        )}
        <View style={styles.alertBox}>
          <LottieView
            source={{ uri: 'https://lottie.host/da300752-ee7f-4826-9606-3a86393ac454/eJK7FzxTBu.lottie' }}
            autoPlay
            loop={false}
            style={styles.lottie}
          />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity onPress={onClose} style={styles.button}>
            <Text style={styles.buttonText}>Got it!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertBox: {
    backgroundColor: '#e6f9ec',
    padding: 30,
    borderRadius: 20,
    width: 300,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2e7d32',
    marginTop: 10,
  },
  message: {
    fontSize: 16,
    color: '#388e3c',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4caf50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  lottie: {
    width: 100,
    height: 100,
  },
});

export default SuccessAlert;
