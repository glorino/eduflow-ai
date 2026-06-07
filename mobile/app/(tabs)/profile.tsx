import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>JS</Text>
        </View>
        <Text style={styles.name}>John Smith</Text>
        <Text style={styles.email}>john.smith@eduflow.ai</Text>
        <Text style={styles.role}>Student - SS2A</Text>
      </View>

      <View style={styles.section}>
        {[
          { label: 'My Details', icon: '👤' },
          { label: 'Academic Records', icon: '📊' },
          { label: 'Fee Payments', icon: '💰' },
          { label: 'Library', icon: '📖' },
          { label: 'Transport', icon: '🚌' },
          { label: 'Notifications', icon: '🔔' },
          { label: 'Settings', icon: '⚙️' },
          { label: 'Help & Support', icon: '❓' },
        ].map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <Text style={styles.menuLabel}>{item.label}</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { alignItems: 'center', padding: 24, backgroundColor: '#fff' },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#1e40af', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  avatarText: { color: '#fff', fontSize: 28, fontWeight: 'bold' },
  name: { fontSize: 20, fontWeight: 'bold', color: '#1e293b' },
  email: { fontSize: 14, color: '#64748b', marginTop: 4 },
  role: { fontSize: 14, color: '#1e40af', marginTop: 4 },
  section: { margin: 16, backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden' },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  menuIcon: { fontSize: 20, marginRight: 12 },
  menuLabel: { flex: 1, fontSize: 16, color: '#1e293b' },
  menuArrow: { fontSize: 20, color: '#94a3b8' },
  logoutButton: { margin: 16, backgroundColor: '#fee2e2', borderRadius: 12, padding: 16, alignItems: 'center' },
  logoutButtonText: { color: '#991b1b', fontSize: 16, fontWeight: 'bold' },
});
