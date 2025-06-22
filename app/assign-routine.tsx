import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const patient = {
  name: 'Geetanjali shah',
  avatar: require('@/assets/images/icon.png'),
  status: 'online',
};

const routines = [
  {
    id: '1',
    title: 'Skin Care Routine (Acne Reduction)',
    image: require('@/assets/images/partial-react-logo.png'),
    weeks: 12,
    reminders: 3,
    by: 'You',
  },
  {
    id: '2',
    title: 'Skin Care Routine (Acne Reduction)',
    image: require('@/assets/images/react-logo.png'),
    weeks: 12,
    reminders: 3,
    by: 'You',
  },
];

export default function AssignRoutineScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      {/* Custom Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#222" />
        </TouchableOpacity>
        <Image source={patient.avatar} style={styles.avatarLarge} />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.patientNameLarge}>{patient.name}</Text>
          <Text style={styles.statusLarge}>{patient.status}</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.assignText}>
          Assign a routine to <Text style={{ fontWeight: '700' }}>{patient.name}</Text>? Assign through your pre build Routines
        </Text>
        <View style={styles.routineRow}>
          {routines.map((routine) => (
            <View key={routine.id} style={styles.routineCard}>
              <Image source={routine.image} style={styles.routineImage} />
              <Text style={styles.routineTitle}>{routine.title}</Text>
              <View style={styles.routineInfoRow}>
                <Ionicons name="calendar-outline" size={16} color="#888" style={{ marginRight: 4 }} />
                <Text style={styles.routineInfoText}>{routine.weeks} Weeks</Text>
              </View>
              <View style={styles.routineInfoRow}>
                <Ionicons name="list-outline" size={16} color="#888" style={{ marginRight: 4 }} />
                <Text style={styles.routineInfoText}>{routine.reminders} reminder Items</Text>
              </View>
              <View style={styles.routineInfoRow}>
                <Ionicons name="person-outline" size={16} color="#888" style={{ marginRight: 4 }} />
                <Text style={styles.routineInfoText}>By {routine.by}</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.suggestionBox}>
          <Ionicons name="help-circle-outline" size={20} color="#6BA368" style={{ marginRight: 8 }} />
          <Text style={styles.suggestionText}>Unable to find a perfect routine for {patient.name}?</Text>
        </View>
        <TouchableOpacity style={styles.createBtn} onPress={() => router.push('/create-routine')}>
          <Text style={styles.createBtnText}>Create a New Routine</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.learnMore}>Learn more about Routine</Text>
        </TouchableOpacity>
        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  avatarLarge: { width: 40, height: 40, borderRadius: 20, marginLeft: 12 },
  patientNameLarge: { fontSize: 16, fontWeight: '600' },
  statusLarge: { fontSize: 13, color: '#6BA368' },
  assignText: {
    fontSize: 15,
    color: '#222',
    marginTop: 24,
    marginBottom: 16,
    marginHorizontal: 16,
    textAlign: 'center',
  },
  routineRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  routineCard: {
    width: 160,
    backgroundColor: '#F8F8F8',
    borderRadius: 16,
    padding: 12,
    marginHorizontal: 6,
    alignItems: 'flex-start',
  },
  routineImage: {
    width: 136,
    height: 90,
    borderRadius: 12,
    marginBottom: 8,
  },
  routineTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  routineInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  routineInfoText: {
    fontSize: 13,
    color: '#888',
    marginBottom: 2,
  },
  suggestionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F2E6',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  suggestionText: {
    color: '#6BA368',
    fontSize: 14,
    flex: 1,
  },
  createBtn: {
    backgroundColor: '#386641',
    borderRadius: 8,
    marginHorizontal: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  createBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  learnMore: {
    color: '#386641',
    fontWeight: '500',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 16,
  },
}); 