import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { routineEventEmitter } from './create-routine-step2';
import CustomAlert from '@/components/CustomAlert';

const initialRoutines = [
  {
    id: '1',
    title: 'Focus & Work',
    image: require('@/assets/images/react-logo.png'),
    count: 47,
    reminders: 3,
  },
  {
    id: '2',
    title: 'Skin Care Rou..',
    image: require('@/assets/images/partial-react-logo.png'),
    count: 8,
    reminders: 3,
  },
];

const patients = [
  {
    id: '1',
    name: 'Meeta Sharma',
    concern: 'Migraines',
    avatar: require('@/assets/images/icon.png'),
  },
  {
    id: '2',
    name: 'Apana Jude',
    concern: 'Migraines',
    avatar: require('@/assets/images/icon.png'),
  },
  {
    id: '3',
    name: 'Ankit Tez',
    concern: 'Migraines',
    avatar: require('@/assets/images/icon.png'),
  },
];

export default function RoutineScreen() {
  const router = useRouter();
  const [routines, setRoutines] = useState(initialRoutines);

  useEffect(() => {
    const unsub = routineEventEmitter.subscribe((event) => {
      if (event.type === 'routine_saved') {
        setRoutines((prev) => [event.routine, ...prev]);
        setAlertVisible(true);
      }
    });
    return () => unsub();
  }, []);

  const [alertVisible, setAlertVisible] = useState(false);

  return (<>
    <CustomAlert
      visible={alertVisible}
      onClose={() => setAlertVisible(false)}
      title="Success"
      message="Your routine has been saved!"
    />
    <View style={styles.container}>
      {/* Custom Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Routine</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>My Routine</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
          {routines.map(routine => (
            <View key={routine.id} style={styles.routineCard}>
              <Image source={routine.image} style={styles.routineImage} />
              <Text style={styles.routineTitle}>{routine.title}</Text>
              <View style={styles.routineInfoRow}>
                <Text style={styles.routineCount}>{routine.count} </Text>
                <Ionicons name="sunny" size={16} color="#FFD700" />
              </View>
              <Text style={styles.routineReminders}>{routine.reminders} Reminder Items</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.patientsHeaderRow}>
          <Text style={styles.sectionTitle}>Patients yet to assign a routine</Text>
          <TouchableOpacity>
            <Text style={styles.seeMore}>See More</Text>
          </TouchableOpacity>
        </View>
        {patients.map(patient => (
          <View key={patient.id} style={styles.patientCard}>
            <Image source={patient.avatar} style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.patientName}>{patient.name}</Text>
              <Text style={styles.patientConcern}>Concern: <Text style={{ color: '#6BA368' }}>{patient.concern}</Text></Text>
              <TouchableOpacity onPress={() => router.push('/chat')}><Text style={styles.viewBtn}>View</Text></TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.assignBtn} onPress={() => router.push('/assign-routine')}>
              <Text style={styles.assignBtnText}>Assign Routine</Text>
            </TouchableOpacity>
          </View>
        ))}
        <View style={{ height: 80 }} />
      </ScrollView>
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </View></>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 48,
    paddingHorizontal: 16,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingHorizontal: 0,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    marginTop: 8,
  },
  routineCard: {
    width: 160,
    backgroundColor: '#F8F8F8',
    borderRadius: 16,
    padding: 12,
    marginRight: 12,
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
    marginBottom: 4,
  },
  routineInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  routineCount: {
    fontSize: 14,
    fontWeight: '500',
  },
  routineReminders: {
    fontSize: 12,
    color: '#888',
  },
  patientsHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 8,
  },
  seeMore: {
    color: '#6BA368',
    fontWeight: '500',
  },
  patientCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  patientName: {
    fontSize: 15,
    fontWeight: '600',
  },
  patientConcern: {
    fontSize: 13,
    color: '#888',
    marginBottom: 4,
  },
  viewBtn: {
    color: '#6BA368',
    fontWeight: '500',
    marginBottom: 4,
  },
  assignBtn: {
    borderWidth: 1,
    borderColor: '#6BA368',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginLeft: 8,
  },
  assignBtnText: {
    color: '#222',
    fontWeight: '500',
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 32,
    backgroundColor: '#386641',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
}); 