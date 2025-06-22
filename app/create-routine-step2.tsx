import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Simple event emitter for cross-screen communication
type RoutineEvent = { type: 'routine_saved'; routine: any };
type RoutineEventCallback = (data: RoutineEvent) => void;
export const routineEventEmitter = {
  listeners: [] as RoutineEventCallback[],
  emit(data: RoutineEvent) {
    this.listeners.forEach((cb) => cb(data));
  },
  subscribe(cb: RoutineEventCallback) {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== cb);
    };
  },
};

const reminderItems = [
  {
    id: 1,
    name: 'Amrutam Kuntal Hair C...',
    type: 'Consumable',
    image: require('@/assets/images/icon.png'),
  },
];

const channels = ['SMS', 'Whatsapp', 'Email'];

const caregiver = {
  name: 'Dr. Pooja',
  status: 'Recent Consultation',
  request: 'Request Pending',
  image: require('@/assets/images/icon.png'),
};

export default function CreateRoutineStep2() {
  const router = useRouter();
  const handleProceed = () => {
    // Emit event to add a new routine and show message
    routineEventEmitter.emit({
      type: 'routine_saved',
      routine: {
        id: Date.now().toString(),
        title: 'New Routine',
        image: require('@/assets/images/react-logo.png'),
        count: 0,
        reminders: 0,
      },
    });
    router.replace('/routine');
  };
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
        <View style={styles.progressBarActive} />
        <View style={styles.progressBarInactive} />
      </View>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Add Reminder Items */}
        <TouchableOpacity style={styles.addRow} onPress={() => router.push('/add-reminder-item')}>
          <Ionicons name="add" size={24} color="#386641" style={styles.addIcon} />
          <View>
            <Text style={styles.addTitle}>Add Reminder Items</Text>
            <Text style={styles.addDesc}>Add Items for your Routine</Text>
          </View>
        </TouchableOpacity>
        {/* Reminder Item Card */}
        <View style={styles.card}>
          <Image source={reminderItems[0].image} style={styles.cardImage} />
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>{reminderItems[0].name}</Text>
            <View style={styles.chip}><Text style={styles.chipText}>{reminderItems[0].type}</Text></View>
            <TouchableOpacity><Text style={styles.viewDetails}>View Details</Text></TouchableOpacity>
          </View>
          <TouchableOpacity><Ionicons name="close" size={20} color="#888" /></TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.moreRow}>
          <Text style={styles.moreText}>More Reminder Items (2)</Text>
          <Ionicons name="chevron-forward" size={18} color="#888" />
        </TouchableOpacity>
        {/* Add Weekly Benefits */}
        <TouchableOpacity style={styles.addRow}>
          <Ionicons name="add" size={24} color="#386641" style={styles.addIcon} />
          <View>
            <Text style={styles.addTitle}>Add Weekly Benefits</Text>
            <Text style={styles.addDesc}>Add weekly benefits of this Routine so that users can tally the progress</Text>
          </View>
        </TouchableOpacity>
        {/* Add Reminder Channels */}
        <TouchableOpacity style={styles.addRow}>
          <Ionicons name="add" size={24} color="#386641" style={styles.addIcon} />
          <View>
            <Text style={styles.addTitle}>Add Reminder Channels</Text>
            <Text style={styles.addDesc}>We will notify you about your Routine using channels.</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.channelRow}>
          {channels.map((ch) => (
            <View key={ch} style={styles.channelChip}>
              <Text style={styles.channelChipText}>{ch}</Text>
              <Ionicons name="close" size={14} color="#386641" style={{ marginLeft: 2 }} />
            </View>
          ))}
        </View>
        {/* Assign a Caregiver */}
        <TouchableOpacity style={styles.addRow}>
          <Ionicons name="add" size={24} color="#386641" style={styles.addIcon} />
          <View>
            <Text style={styles.addTitle}>Assign a Caregiver</Text>
            <Text style={styles.addDesc}>We will keep updating caregiver about your Routine.</Text>
          </View>
        </TouchableOpacity>
        {/* Caregiver Card */}
        <View style={styles.card}>
          <Image source={caregiver.image} style={styles.caregiverImage} />
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>{caregiver.name}</Text>
            <View style={styles.chipConsult}><Text style={styles.chipConsultText}>{caregiver.status}</Text></View>
            <Text style={styles.pendingText}>{caregiver.request} <Ionicons name="time-outline" size={14} color="#888" /></Text>
          </View>
          <TouchableOpacity><Ionicons name="close" size={20} color="#888" /></TouchableOpacity>
        </View>
        <View style={{ height: 32 }} />
      </ScrollView>
      
        {/* Proceed Button */}
        <TouchableOpacity style={styles.saveBtn} onPress={handleProceed}>
          <Text style={styles.saveBtnText}>Proceed</Text>
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
  addRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  addIcon: {
    borderWidth: 1,
    borderColor: '#386641',
    borderRadius: 8,
    padding: 4,
    marginRight: 12,
  },
  addTitle: { fontSize: 15, fontWeight: '600', color: '#386641' },
  addDesc: { fontSize: 13, color: '#888' },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  cardImage: { width: 64, height: 64, borderRadius: 12, marginRight: 12 },
  cardTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  chip: {
    backgroundColor: '#E6F2E6',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  chipText: { color: '#6BA368', fontSize: 13 },
  viewDetails: { color: '#386641', fontWeight: '500', fontSize: 14 },
  moreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  moreText: { color: '#888', fontSize: 13, flex: 1 },
  channelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  channelChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F2E6',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  channelChipText: { color: '#386641', fontWeight: '500', fontSize: 14 },
  caregiverImage: { width: 56, height: 56, borderRadius: 12, marginRight: 12 },
  chipConsult: {
    backgroundColor: '#E6F2E6',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  chipConsultText: { color: '#6BA368', fontSize: 13 },
  pendingText: { color: '#888', fontSize: 13 },
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
  bottomBtnContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    padding: 16,
  },
}); 