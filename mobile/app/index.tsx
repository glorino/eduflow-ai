import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>EduFlow AI</Text>
        <Text style={styles.subtitle}>Smart School Management</Text>
      </View>

      <View style={styles.grid}>
        {[
          { name: 'Dashboard', icon: '📊', href: '/(tabs)' },
          { name: 'Attendance', icon: '📋', href: '/(tabs)' },
          { name: 'CBT', icon: '💻', href: '/(tabs)' },
          { name: 'Library', icon: '📖', href: '/(tabs)' },
          { name: 'Finance', icon: '💰', href: '/(tabs)' },
          { name: 'Messages', icon: '💬', href: '/(tabs)' },
        ].map((item) => (
          <Link key={item.name} href={item.href} asChild>
            <TouchableOpacity style={styles.gridItem}>
              <Text style={styles.gridIcon}>{item.icon}</Text>
              <Text style={styles.gridLabel}>{item.name}</Text>
            </TouchableOpacity>
          </Link>
        ))}
      </View>

      <View style={styles.footer}>
        <Link href="/login" asChild>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e40af',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
  },
  grid: {
    flex: 1,
    paddingHorizontal: 16,
  },
  gridItem: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  gridIcon: {
    fontSize: 28,
  },
  gridLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  loginButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#1e40af',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
