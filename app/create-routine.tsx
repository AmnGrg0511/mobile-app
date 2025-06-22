import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const categories = ['Lifestyle', 'Wellness', 'Fitness'];
const units = ['Weeks', 'Days', 'Months'];
const picks = [
  require('@/assets/images/react-logo.png'),
  require('@/assets/images/partial-react-logo.png'),
  require('@/assets/images/icon.png'),
  require('@/assets/images/react-logo.png'),
  require('@/assets/images/react-logo.png'),
];

export default function CreateRoutineScreen() {
  const router = useRouter();
  const [routineName, setRoutineName] = useState('Hair Care Routine');
  const [category, setCategory] = useState(categories[0]);
  const [pickedImage, setPickedImage] = useState(null);
  const [selectedPick, setSelectedPick] = useState(4);
  const [description, setDescription] = useState([
    'ed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    'ed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    'ed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
  ]);
  const [duration, setDuration] = useState('6');
  const [unit, setUnit] = useState(units[0]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showUnitDropdown, setShowUnitDropdown] = useState(false);

  return (
    <View style={styles.container}>
      {/* Top Section with Back and Title */}
      <View style={styles.topSection}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#222" />
        </TouchableOpacity>
        <View style={styles.bgCircle1} />
        <View style={styles.bgCircle2} />
        <Text style={styles.title}>Create Routine</Text>
        <Text style={styles.subtitle}>Create your own routine</Text>
      </View>
      {/* Progress Bar */}
      <View style={styles.progressBarRow}>
        <View style={styles.progressBarInactive} />
        <View style={styles.progressBarInactive} />
      </View>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Routine Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Routine Name</Text>
          <TextInput
            style={styles.input}
            value={routineName}
            onChangeText={setRoutineName}
            placeholder="Enter routine name"
          />
          <Text style={styles.inputHint}>This will be displayed as your Routine name.</Text>
        </View>
        {/* Category Dropdown */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Category</Text>
          <TouchableOpacity style={styles.input} onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}>
            <Text>{category}</Text>
            <Ionicons name="chevron-down" size={20} color="#888" style={{ position: 'absolute', right: 12, top: 16 }} />
          </TouchableOpacity>
          {showCategoryDropdown && (
            <View style={styles.dropdown}>
              {categories.map((cat) => (
                <TouchableOpacity key={cat} onPress={() => { setCategory(cat); setShowCategoryDropdown(false); }} style={styles.dropdownItem}>
                  <Text>{cat}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          <Text style={styles.inputHint}>Please select the category of your Routine.</Text>
        </View>
        {/* Upload Image */}
        <View style={styles.inputGroup}>
          <TouchableOpacity style={styles.uploadBox}>
            <Ionicons name="image-outline" size={40} color="#BDBDBD" />
            <Text style={styles.uploadText}>Upload Image</Text>
          </TouchableOpacity>
          <Text style={styles.inputHint}>This will be displayed as your Routine thumb nail.</Text>
        </View>
        {/* OR and Picks */}
        <View style={styles.orRow}>
          <View style={styles.orLine} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.orLine} />
        </View>
        <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Select from our picks</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
          {picks.map((img, idx) => (
            <TouchableOpacity key={idx} onPress={() => setSelectedPick(idx)}>
              <Image source={img} style={[styles.pickImage, selectedPick === idx && styles.selectedPick]} />
              {selectedPick === idx && (
                <Ionicons name="checkmark-circle" size={20} color="#386641" style={styles.checkIcon} />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
        </View>
        {/* Description */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Description</Text>
          <View style={styles.descBox}>
            {description.map((desc, idx) => (
              <View key={idx} style={styles.bulletRow}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.descText}>{desc}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.inputHint}>Please add at least 3 pointers about the Routine.</Text>
        </View>
        {/* Duration and Unit */}
        <View style={styles.row}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <Text style={styles.inputLabel}>Duration</Text>
            <TouchableOpacity style={styles.input} onPress={() => setShowUnitDropdown(false)}>
              <Text>{duration}</Text>
              <Ionicons name="chevron-down" size={20} color="#888" style={{ position: 'absolute', right: 12, top: 16 }} />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.inputLabel}>Unit</Text>
            <TouchableOpacity style={styles.input} onPress={() => setShowUnitDropdown(!showUnitDropdown)}>
              <Text>{unit}</Text>
              <Ionicons name="chevron-down" size={20} color="#888" style={{ position: 'absolute', right: 12, top: 16 }} />
            </TouchableOpacity>
            {showUnitDropdown && (
              <View style={styles.dropdown}>
                {units.map((u) => (
                  <TouchableOpacity key={u} onPress={() => { setUnit(u); setShowUnitDropdown(false); }} style={styles.dropdownItem}>
                    <Text>{u}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
        <View style={{ height: 32 }} />
      </ScrollView>
        {/* Save Button */}
        <TouchableOpacity style={styles.saveBtn} onPress={() => router.push('/create-routine-step2')}>
          <Text style={styles.saveBtnText}>Save and Proceed</Text>
        </TouchableOpacity>
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
    marginBottom: 16,
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
  inputGroup: { marginHorizontal: 16, marginBottom: 16 },
  inputLabel: { fontSize: 15, fontWeight: '500', marginBottom: 4 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D6EAD9',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    marginBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  inputHint: { fontSize: 12, color: '#888', marginLeft: 4 },
  uploadBox: {
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderStyle: 'dashed',
    borderRadius: 16,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    backgroundColor: '#F7FAF6',
  },
  uploadText: { color: '#888', fontSize: 15, marginTop: 8 },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  orLine: { flex: 1, height: 2, backgroundColor: '#E0E0E0' },
  orText: { marginHorizontal: 8, color: '#888', fontWeight: '500' },
  pickImage: {
    width: 56,
    height: 56,
    borderRadius: 12,
    marginHorizontal: 6,
    marginTop: 4,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedPick: {
    borderColor: '#386641',
    borderWidth: 2,
  },
  checkIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  descBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D6EAD9',
    padding: 12,
    marginBottom: 4,
  },
  bulletRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 4 },
  bullet: { fontSize: 18, color: '#386641', marginRight: 8, marginTop: -2 },
  descText: { fontSize: 15, color: '#222', flex: 1 },
  row: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginBottom: 16 },
  saveBtn: {
    backgroundColor: '#386641',
    borderRadius: 8,
    marginHorizontal: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  saveBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D6EAD9',
    borderRadius: 8,
    marginTop: 4,
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 10,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
}); 