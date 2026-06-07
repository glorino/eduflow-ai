import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function DashboardScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.welcomeCard}>
        <Text style={styles.welcomeText}>Welcome, Student!</Text>
        <Text style={styles.welcomeSubtext}>Here&apos;s your overview for today</Text>
      </View>

      <View style={styles.statsGrid}>
        {[
          { label: 'Attendance', value: '92%', icon: '📋' },
          { label: 'Assignments', value: '3', icon: '📝' },
          { label: 'Library Books', value: '2', icon: '📖' },
          { label: 'Fees Due', value: '₦50,000', icon: '💰' },
        ].map((stat) => (
          <View key={stat.label} style={styles.statCard}>
            <Text style={styles.statIcon}>{stat.icon}</Text>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming</Text>
        {[
          { title: 'Mathematics CBT', time: 'Tomorrow, 10:00 AM', type: 'exam' },
          { title: 'English Assignment', time: 'Due in 2 days', type: 'assignment' },
          { title: 'School Fees', time: 'Due in 5 days', type: 'fee' },
        ].map((item, index) => (
          <View key={index} style={styles.listItem}>
            <View style={styles.listDot} />
            <View style={styles.listContent}>
              <Text style={styles.listTitle}>{item.title}</Text>
              <Text style={styles.listTime}>{item.time}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  welcomeCard: {
    backgroundColor: '#1e40af',
    margin: 16,
    borderRadius: 16,
    padding: 24,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  welcomeSubtext: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    gap: 8,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
  section: {
    margin: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  listDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1e40af',
    marginRight: 12,
  },
  listContent: {
    flex: 1,
  },
  listTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  listTime: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
});
