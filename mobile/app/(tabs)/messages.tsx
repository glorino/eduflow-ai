import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';

export default function MessagesScreen() {
  const [message, setMessage] = useState('');

  const messages = [
    { sender: 'School Admin', message: 'School fees reminder: Payment due in 5 days', time: '2:30 PM', unread: true },
    { sender: 'Math Teacher', message: 'Assignment submitted successfully', time: '11:00 AM', unread: false },
    { sender: 'Library', message: 'Book return reminder: 2 days overdue', time: 'Yesterday', unread: true },
    { sender: 'Principal', message: 'School resumption notice', time: 'Jun 5', unread: false },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
      </View>

      <ScrollView style={styles.messageList}>
        {messages.map((msg, index) => (
          <TouchableOpacity key={index} style={[styles.messageItem, msg.unread && styles.messageUnread]}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{msg.sender[0]}</Text>
            </View>
            <View style={styles.messageContent}>
              <View style={styles.messageHeader}>
                <Text style={[styles.senderName, msg.unread && styles.senderNameUnread]}>{msg.sender}</Text>
                <Text style={styles.messageTime}>{msg.time}</Text>
              </View>
              <Text style={styles.messageText}>{msg.message}</Text>
            </View>
            {msg.unread && <View style={styles.unreadDot} />}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { padding: 24, paddingBottom: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1e293b' },
  messageList: { flex: 1 },
  messageItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  messageUnread: { backgroundColor: '#f0f7ff' },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#1e40af', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  avatarText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  messageContent: { flex: 1 },
  messageHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  senderName: { fontSize: 14, color: '#64748b' },
  senderNameUnread: { fontWeight: 'bold', color: '#1e293b' },
  messageTime: { fontSize: 12, color: '#94a3b8' },
  messageText: { fontSize: 14, color: '#64748b', lineHeight: 20 },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#1e40af', marginLeft: 8 },
  inputContainer: { flexDirection: 'row', padding: 16, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#e2e8f0' },
  input: { flex: 1, backgroundColor: '#f1f5f9', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, marginRight: 8 },
  sendButton: { backgroundColor: '#1e40af', borderRadius: 20, paddingHorizontal: 20, justifyContent: 'center' },
  sendButtonText: { color: '#fff', fontWeight: 'bold' },
});
