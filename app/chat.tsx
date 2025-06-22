import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const patient = {
  name: 'Geetanjali Shah',
  avatar: require('@/assets/images/icon.png'),
  status: 'online',
};

const messages = [
  { id: 1, type: 'info', text: 'Your 30/32 conversational messages is completed', time: 'Today at 16:35 PM' },
  { id: 2, type: 'patient', text: 'Hi, Dr. Prerna, here are my details:\nName: Geetanjali Shah\nAge: 34\nGender: Female\nHeight: 134 cm\nWeight: 64 kg\nConcern: Immunity', time: '16:35 PM' },
  { id: 3, type: 'info', text: 'Download Call Recording\nYour call recording with Dr. Prerna is available', time: 'Today at 16:45 PM', download: true },
  { id: 4, type: 'info', text: 'Geetanjali booked 30 conversational messages with you.', time: 'Today at 17:21 PM' },
  { id: 5, type: 'patient', text: 'Hi, Dr. Prerna, here are my details:\nName: Geetanjali Shah\nAge: 34\nGender: Female\nHeight: 134 cm\nWeight: 64 kg\nConcern: Immunity', time: 'Just Now' },
  { id: 6, type: 'patient', text: 'How likely are you to recommend this product to your patients?', time: 'Just Now' },
  { id: 7, type: 'doctor', text: 'Hi, Lorem ipsum dolor sit amet consectetur. In elit nisi laoreet nisi nulla scelerisque in ultrices. Interdum hac lacus purus id amet eget laoreet amet id.', time: 'Just Now' },
  { id: 8, type: 'info', text: 'Your 30/30 conversational messages is completed', time: '' },
  { id: 9, type: 'info', text: 'You have extended 2 more extra conversational messages', time: '' },
];

export default function ChatScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#222" />
        </TouchableOpacity>
        <Image source={patient.avatar} style={styles.avatar} />
        <View style={{ flex: 1, marginLeft: 8 }}>
          <Text style={styles.patientName}>{patient.name}</Text>
          <Text style={styles.status}>{patient.status}</Text>
        </View>
      </View>
      {/* Messages */}
      <ScrollView style={styles.messages} showsVerticalScrollIndicator={false}>
        {messages.map((msg) => {
          if (msg.type === 'info') {
            return (
              <View key={msg.id} style={styles.infoMsg}>
                <Text style={styles.infoMsgText}>{msg.text}</Text>
                {msg.download && (
                  <TouchableOpacity style={styles.downloadBtn}>
                    <Ionicons name="download-outline" size={20} color="#386641" />
                  </TouchableOpacity>
                )}
                {msg.time ? <Text style={styles.time}>{msg.time}</Text> : null}
              </View>
            );
          }
          if (msg.type === 'patient') {
            return (
              <View key={msg.id} style={styles.patientMsg}>
                <Text style={styles.patientMsgText}>{msg.text}</Text>
                <Text style={styles.time}>{msg.time}</Text>
              </View>
            );
          }
          if (msg.type === 'doctor') {
            return (
              <View key={msg.id} style={styles.doctorMsg}>
                <Text style={styles.doctorMsgText}>{msg.text}</Text>
              </View>
            );
          }
          return null;
        })}
      </ScrollView>
      {/* Input */}
      <View style={styles.inputRow}>
        <Ionicons name="happy-outline" size={24} color="#BDBDBD" style={{ marginRight: 8 }} />
        <TextInput style={styles.input} placeholder="Type your message" />
        <Ionicons name="attach" size={24} color="#BDBDBD" style={{ marginHorizontal: 8 }} />
        <TouchableOpacity style={styles.sendBtn}>
          <Ionicons name="send" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  patientName: { fontSize: 16, fontWeight: '600' },
  status: { fontSize: 13, color: '#6BA368' },
  messages: { flex: 1, padding: 16 },
  infoMsg: {
    backgroundColor: '#FFF7E6',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    alignSelf: 'flex-start',
    maxWidth: '80%',
  },
  infoMsgText: { color: '#A68B00', fontSize: 13 },
  downloadBtn: { position: 'absolute', right: 8, top: 8 },
  patientMsg: {
    backgroundColor: '#E6F2E6',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    alignSelf: 'flex-start',
    maxWidth: '80%',
  },
  patientMsgText: { color: '#222', fontSize: 15 },
  doctorMsg: {
    backgroundColor: '#386641',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    alignSelf: 'flex-end',
    maxWidth: '80%',
  },
  doctorMsgText: { color: '#fff', fontSize: 15 },
  time: { fontSize: 11, color: '#888', marginTop: 2 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 15,
    marginRight: 8,
  },
  sendBtn: {
    backgroundColor: '#386641',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 