import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const productImg = require('@/assets/images/react-logo.png'); // Replace with actual product image
const activityImg = require('@/assets/images/partial-react-logo.png'); // Replace with actual activity image

export default function AddReminderItemScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<'product' | 'activity' | null>(null);

  return (
    <View style={styles.container}>
      {/* Top Section with Back and Title */}
      <View style={styles.topSection}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#222" />
        </TouchableOpacity>
        <View style={styles.bgCircle1} />
        <View style={styles.bgCircle2} />
        <Text style={styles.title}>Add Reminder Items</Text>
        <Text style={styles.subtitle}>Create your own routine</Text>
      </View>
      {/* Progress Bar */}
      <View style={styles.progressBarRow}>
        <View style={styles.progressBarActive} />
        <View style={styles.progressBarInactive} />
        <View style={styles.progressBarInactive} />
      </View>
      <Text style={styles.sectionTitle}>Select Reminder Type</Text>
      {/* Product based card */}
      <TouchableOpacity
        // style={[styles.card, selected === 'product' && styles.cardSelected]}
        onPress={() => setSelected('product')}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={['#FFB90078', '#F5F5F5']}
          style={[styles.card, selected === 'product' && styles.cardSelected]}
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0 }}
        >
          <View style={styles.radioRow}>
            <View style={[styles.radio, selected === 'product' && styles.radioSelected]} />
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>Product based</Text>
              <Text style={styles.cardDesc}>Skincare products, medication and other essentials.</Text>
            </View>
            <Image source={productImg} style={styles.cardImg} />
          </View>
        </LinearGradient>
      </TouchableOpacity>
      {/* OR divider */}
      <View style={styles.orRow}>
        <View style={styles.orLine} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.orLine} />
      </View>
      {/* Activity based card */}
      <TouchableOpacity
        // style={[styles.card, selected === 'activity' && styles.cardSelected]}
        onPress={() => setSelected('activity')}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={['#92CA93', '#F5F5F5']}
          style={[styles.card, selected === 'activity' && styles.cardSelected]}
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0 }}
        >
          <View style={styles.radioRow}>
            <View style={[styles.radio, selected === 'activity' && styles.radioSelected]} />
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>Activity based</Text>
              <Text style={styles.cardDesc}>Yoga sessions, running, gym workouts, and reading books.</Text>
            </View>
            <Image source={activityImg} style={styles.cardImg} />
          </View>
        </LinearGradient>
      </TouchableOpacity>
      {/* Next Button */}
      <View style={styles.bottomBtnContainer}>
        <TouchableOpacity
          style={styles.saveBtn}
          disabled={!selected}
          onPress={() => selected && router.push('/add-reminder-item-details')}
        >
          <Text style={styles.saveBtnText}>Next (1/3)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7FAF6' },
  topSection: {
    backgroundColor: '#E6F2E6',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingTop: 48,
    paddingBottom: 32,
    alignItems: 'flex-start',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 8,
  },
  backBtn: { marginLeft: 16, marginBottom: 16 },
  title: { fontSize: 28, fontWeight: '700', color: '#222', marginLeft: 16, marginBottom: 4 },
  subtitle: { fontSize: 15, color: '#888', marginLeft: 16, marginBottom: 8 },
  bgCircle1: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 160,
    height: 80,
    borderRadius: 80,
    backgroundColor: '#D6EAD9',
    opacity: 0.5,
  },
  bgCircle2: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: 180,
    height: 80,
    borderRadius: 80,
    backgroundColor: '#D6EAD9',
    opacity: 0.5,
  },
  progressBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  progressBarActive: {
    flex: 1,
    height: 4,
    backgroundColor: '#386641',
    borderRadius: 2,
    marginRight: 4,
  },
  progressBarInactive: {
    flex: 1,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginLeft: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 16,
    marginLeft: 16,
    marginTop: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 32,
    marginHorizontal: 16,
    marginVertical: 32,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  cardSelected: {
    borderWidth: 2,
    borderColor: '#386641',
  },
  radioRow: { flexDirection: 'row', alignItems: 'center' },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#BDBDBD',
    marginRight: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: '#386641',
    backgroundColor: '#E6F2E6',
  },
  cardTitle: { fontSize: 17, fontWeight: '600', marginBottom: 4 },
  cardDesc: { fontSize: 14, color: '#888' },
  cardImg: { width: 80, height: 80, borderRadius: 12, marginLeft: 8 },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 64,
    marginBottom: 8,
  },
  orLine: { flex: 1, height: 2, backgroundColor: '#E0E0E0' },
  orText: { marginHorizontal: 8, color: '#888', fontWeight: '500' },
  bottomBtnContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    padding: 16,
  },
  saveBtn: {
    backgroundColor: '#386641',
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 16,
  },
  saveBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
}); 