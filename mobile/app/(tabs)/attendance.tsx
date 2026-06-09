import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';

export default function AttendanceScreen() {
  const handleViewFullReport = () => {
    Alert.alert('Full Report', 'Full attendance report coming soon!');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Attendance</Text>
        <Text style={styles.subtitle}>Your attendance record</Text>
      </View>

      <View style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>92%</Text>
          <Text style={styles.summaryLabel}>Attendance Rate</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>184</Text>
          <Text style={styles.summaryLabel}>Days Present</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>16</Text>
          <Text style={styles.summaryLabel}>Days Absent</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Attendance</Text>
        {[
          { date: '2026-06-07', status: 'PRESENT', time: '8:00 AM' },
          { date: '2026-06-06', status: 'PRESENT', time: '8:05 AM' },
          { date: '2026-06-05', status: 'LATE', time: '8:20 AM' },
          { date: '2026-06-04', status: 'PRESENT', time: '7:55 AM' },
          { date: '2026-06-03', status: 'ABSENT', time: '-' },
        ].map((record, index) => (
          <View key={index} style={styles.attendanceRow}>
            <View style={styles.dateColumn}>
              <Text style={styles.dateText}>{record.date}</Text>
              <Text style={styles.timeText}>{record.time}</Text>
            </View>
            <View style={[
              styles.statusBadge,
              record.status === 'PRESENT' && styles.statusPresent,
              record.status === 'ABSENT' && styles.statusAbsent,
              record.status === 'LATE' && styles.statusLate,
            ]}>
              <Text style={[
                styles.statusText,
                record.status === 'PRESENT' && styles.statusTextPresent,
                record.status === 'ABSENT' && styles.statusTextAbsent,
                record.status === 'LATE' && styles.statusTextLate,
              ]}>
                {record.status}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.reportButton} onPress={handleViewFullReport}>
        <Text style={styles.reportButtonText}>View Full Report</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  summaryCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e40af',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#e2e8f0',
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
  attendanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  dateColumn: {
    flex: 1,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  timeText: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusPresent: {
    backgroundColor: '#dcfce7',
  },
  statusAbsent: {
    backgroundColor: '#fee2e2',
  },
  statusLate: {
    backgroundColor: '#fef3c7',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusTextPresent: {
    color: '#166534',
  },
  statusTextAbsent: {
    color: '#991b1b',
  },
  statusTextLate: {
    color: '#92400e',
  },
  reportButton: {
    backgroundColor: '#1e40af',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  reportButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
