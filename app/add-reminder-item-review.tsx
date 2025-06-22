import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const meals = ['Breakfast', 'Lunch', 'Dinner'];
const hours = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
const minutes = ['00', '15', '30', '45'];
const ampm = ['AM', 'PM'];

export default function AddTimeSlotScreen() {
  const router = useRouter();
  const [meal, setMeal] = useState('Lunch');
  const [showMealDropdown, setShowMealDropdown] = useState(false);
  const [beforeAfter, setBeforeAfter] = useState<'before' | 'after'>('after');
  const [selectedHour, setSelectedHour] = useState('02');
  const [selectedMinute, setSelectedMinute] = useState('30');
  const [selectedAMPM, setSelectedAMPM] = useState('AM');
  const [slots, setSlots] = useState([
    { meal: 'Lunch', beforeAfter: 'after', hour: '02', minute: '30', ampm: 'AM' },
  ]);

  const addSlot = () => {
    setSlots([...slots, { meal, beforeAfter, hour: selectedHour, minute: selectedMinute, ampm: selectedAMPM }]);
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
        <View style={styles.progressBarActive} />
      </View>
      <Text style={styles.sectionTitle}>Add Time Slot</Text>
      {/* Meal Dropdown */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Meal</Text>
        <TouchableOpacity style={styles.input} onPress={() => setShowMealDropdown(!showMealDropdown)}>
          <Text>{meal}</Text>
          <Ionicons name="chevron-down" size={20} color="#888" style={{ position: 'absolute', right: 12, top: 16 }} />
        </TouchableOpacity>
        {showMealDropdown && (
          <View style={styles.dropdown}>
            {meals.map((m) => (
              <TouchableOpacity key={m} onPress={() => { setMeal(m); setShowMealDropdown(false); }} style={styles.dropdownItem}>
                <Text>{m}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
      {/* Before/After Meal Radio */}
      <View style={styles.radioRow}>
        <TouchableOpacity style={styles.radioFreq} onPress={() => setBeforeAfter('before')}>
          <View style={[styles.radio, beforeAfter === 'before' && styles.radioSelected]}>
            {beforeAfter === 'before' && <View style={styles.radioInner} />}
          </View>
          <Text style={styles.freqText}>Before Meal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.radioFreq} onPress={() => setBeforeAfter('after')}>
          <View style={[styles.radio, beforeAfter === 'after' && styles.radioSelected]}>
            {beforeAfter === 'after' && <View style={styles.radioInner} />}
          </View>
          <Text style={styles.freqText}>After Meal</Text>
        </TouchableOpacity>
      </View>
      {/* Time Picker (dummy scroll) */}
      <View style={styles.timePickerBox}>
        <View style={styles.timeCol}>
          {ampm.map((ap) => (
            <Text key={ap} style={[styles.timeVal, selectedAMPM === ap && styles.timeValSelected]} onPress={() => setSelectedAMPM(ap)}>{ap}</Text>
          ))}
        </View>
        <View style={styles.timeCol}>
          {hours.map((h) => (
            <Text key={h} style={[styles.timeVal, selectedHour === h && styles.timeValSelected]} onPress={() => setSelectedHour(h)}>{h}</Text>
          ))}
        </View>
        <View style={styles.timeCol}>
          {minutes.map((m) => (
            <Text key={m} style={[styles.timeVal, selectedMinute === m && styles.timeValSelected]} onPress={() => setSelectedMinute(m)}>{m}</Text>
          ))}
        </View>
      </View>
      {/* Add More Slots */}
      <TouchableOpacity style={styles.addMoreRow} onPress={addSlot}>
        <Ionicons name="add" size={20} color="#386641" style={styles.addMoreIcon} />
        <Text style={styles.addMoreText}>Add More slots</Text>
      </TouchableOpacity>
      {/* Done Button */}
      <View style={styles.bottomBtnContainer}>
        <TouchableOpacity style={styles.saveBtn} onPress={() => router.replace('/create-routine-step2')}>
          <Text style={styles.saveBtnText}>Done (3/3)</Text>
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
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  radioFreq: { flexDirection: 'row', alignItems: 'center', marginRight: 24 },
  freqText: { fontSize: 15, marginLeft: 8 },
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
  timePickerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D6EAD9',
    marginHorizontal: 16,
    marginBottom: 24,
    paddingVertical: 16,
    maxHeight: 100,
    overflow: "scroll",
  },
  timeCol: {
    flex: 1,
    alignItems: 'center',
  },
  timeVal: {
    fontSize: 18,
    color: '#888',
    paddingVertical: 2,
  },
  timeValSelected: {
    color: '#222',
    fontWeight: '700',
    fontSize: 22,
    paddingVertical: 2,
  },
  addMoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 24,
  },
  addMoreIcon: {
    borderWidth: 1,
    borderColor: '#386641',
    borderRadius: 8,
    padding: 4,
    marginRight: 8,
  },
  addMoreText: { color: '#386641', fontWeight: '500', fontSize: 15 },
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