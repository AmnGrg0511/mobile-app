import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const productNames = ['Amrutam SkinKey Malt', 'Amrutam Kuntal Hair Oil'];
const productTypes = ['Consumable', 'Supplement'];
const units = ['TBSP', 'ML', 'Capsule'];
const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function AddReminderItemDetailsScreen() {
  const router = useRouter();
  const [productName, setProductName] = useState(productNames[0]);
  const [productType, setProductType] = useState(productTypes[0]);
  const [quantity, setQuantity] = useState(2);
  const [unit, setUnit] = useState(units[0]);
  const [frequency, setFrequency] = useState<'daily' | 'custom'>('custom');
  const [selectedDays, setSelectedDays] = useState(['Tue', 'Thu', 'Sat']);
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showUnitDropdown, setShowUnitDropdown] = useState(false);

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <View style={styles.container}>
      {/* Top Section with Back and Title */}
      <View style={styles.topSection}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#222" />
        </TouchableOpacity>
        <Text style={styles.title}>Add Reminder Items</Text>
      </View>
      {/* Progress Bar */}
      <View style={styles.progressBarRow}>
        <View style={styles.progressBarActive} />
        <View style={styles.progressBarActive} />
        <View style={styles.progressBarInactive} />
      </View>
      <Text style={styles.sectionTitle}>Enter Product Details</Text>
      {/* Product Name Dropdown */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Product Name</Text>
        <TouchableOpacity style={styles.input} onPress={() => setShowProductDropdown(!showProductDropdown)}>
          <Text>{productName}</Text>
          <Ionicons name="chevron-down" size={20} color="#888" style={{ position: 'absolute', right: 12, top: 16 }} />
        </TouchableOpacity>
        {showProductDropdown && (
          <View style={styles.dropdown}>
            {productNames.map((name) => (
              <TouchableOpacity key={name} onPress={() => { setProductName(name); setShowProductDropdown(false); }} style={styles.dropdownItem}>
                <Text>{name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <Text style={styles.inputHint}>Unable to find Product? Add your Product</Text>
      </View>
      {/* Product Type Dropdown */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Product Type</Text>
        <TouchableOpacity style={styles.input} onPress={() => setShowTypeDropdown(!showTypeDropdown)}>
          <Text>{productType}</Text>
          <Ionicons name="chevron-down" size={20} color="#888" style={{ position: 'absolute', right: 12, top: 16 }} />
        </TouchableOpacity>
        {showTypeDropdown && (
          <View style={styles.dropdown}>
            {productTypes.map((type) => (
              <TouchableOpacity key={type} onPress={() => { setProductType(type); setShowTypeDropdown(false); }} style={styles.dropdownItem}>
                <Text>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
      {/* Quantity and Unit */}
      <View style={styles.row}>
        <View style={{ flex: 1, marginRight: 8 }}>
          <Text style={styles.inputLabel}>Quantity</Text>
          <View style={styles.inputRow}>
            <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))}>
              <Ionicons name="chevron-down" size={20} color="#888" />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
              <Ionicons name="chevron-up" size={20} color="#888" />
            </TouchableOpacity>
          </View>
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
      {/* Frequency */}
      <View style={styles.freqRow}>
        <TouchableOpacity style={styles.radioFreq} onPress={() => setFrequency('daily')}>
          <View style={[styles.radio, frequency === 'daily' && styles.radioSelected]}>
            {frequency === 'daily' && <View style={styles.radioInner} />}
          </View>
          <Text style={styles.freqText}>Daily</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.radioFreq} onPress={() => setFrequency('custom')}>
          <View style={[styles.radio, frequency === 'custom' && styles.radioSelected]}>
            {frequency === 'custom' && <View style={styles.radioInner} />}
          </View>
          <Text style={styles.freqText}>Custom Days</Text>
        </TouchableOpacity>
      </View>
      {/* Days of week */}
      {frequency === 'custom' && (
        <View style={styles.daysRow}>
          {daysOfWeek.map((day) => (
            <TouchableOpacity
              key={day}
              style={[styles.dayBtn, selectedDays.includes(day) && styles.dayBtnSelected]}
              onPress={() => toggleDay(day)}
            >
              <Text style={[styles.dayText, selectedDays.includes(day) && styles.dayTextSelected]}>{day}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      {/* Next Button */}
      <View style={styles.bottomBtnContainer}>
        <TouchableOpacity style={styles.saveBtn} onPress={() => router.push('/add-reminder-item-review')}>
          <Text style={styles.saveBtnText}>Next (2/3)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7FAF6' },
  topSection: {
    backgroundColor: '#fff',
    paddingTop: 48,
    paddingBottom: 8,
    alignItems: 'flex-start',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 8,
  },
  backBtn: { marginLeft: 16, marginBottom: 16 },
  title: { fontSize: 22, fontWeight: '700', color: '#222', marginLeft: 16, marginBottom: 4 },
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
  row: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginBottom: 16 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D6EAD9',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 4,
    justifyContent: 'space-between',
  },
  quantityText: { fontSize: 16, fontWeight: '600', marginHorizontal: 8 },
  freqRow: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginBottom: 16 },
  radioFreq: { flexDirection: 'row', alignItems: 'center', marginRight: 24 },
  freqText: { fontSize: 15, marginLeft: 8 },
  daysRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#E6F2E6',
    borderRadius: 12,
    padding: 8,
  },
  dayBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    marginHorizontal: 2,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  dayBtnSelected: {
    backgroundColor: '#386641',
  },
  dayText: { color: '#888', fontWeight: '500' },
  dayTextSelected: { color: '#fff', fontWeight: '700' },
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
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#BDBDBD',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  radioSelected: {
    borderColor: '#386641',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#386641',
  },
}); 