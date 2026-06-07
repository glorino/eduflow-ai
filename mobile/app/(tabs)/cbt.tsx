import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function CBTScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>CBT Exams</Text>
        <Text style={styles.subtitle}>Computer-Based Testing</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Exams</Text>
        {[
          { subject: 'Mathematics', date: '2026-06-10', time: '10:00 AM', duration: '60 mins', marks: 50 },
          { subject: 'English Language', date: '2026-06-12', time: '2:00 PM', duration: '45 mins', marks: 40 },
          { subject: 'Physics', date: '2026-06-15', time: '9:00 AM', duration: '60 mins', marks: 50 },
        ].map((exam, index) => (
          <View key={index} style={styles.examCard}>
            <View style={styles.examHeader}>
              <Text style={styles.examSubject}>{exam.subject}</Text>
              <View style={styles.examBadge}>
                <Text style={styles.examBadgeText}>Upcoming</Text>
              </View>
            </View>
            <View style={styles.examDetails}>
              <View style={styles.examDetail}>
                <Text style={styles.examDetailLabel}>Date</Text>
                <Text style={styles.examDetailValue}>{exam.date}</Text>
              </View>
              <View style={styles.examDetail}>
                <Text style={styles.examDetailLabel}>Time</Text>
                <Text style={styles.examDetailValue}>{exam.time}</Text>
              </View>
              <View style={styles.examDetail}>
                <Text style={styles.examDetailLabel}>Duration</Text>
                <Text style={styles.examDetailValue}>{exam.duration}</Text>
              </View>
              <View style={styles.examDetail}>
                <Text style={styles.examDetailLabel}>Marks</Text>
                <Text style={styles.examDetailValue}>{exam.marks}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Results</Text>
        {[
          { subject: 'Chemistry', score: 85, total: 100, grade: 'A', date: '2026-06-01' },
          { subject: 'Biology', score: 72, total: 100, grade: 'B', date: '2026-05-28' },
        ].map((result, index) => (
          <View key={index} style={styles.resultCard}>
            <View style={styles.resultHeader}>
              <Text style={styles.resultSubject}>{result.subject}</Text>
              <Text style={styles.resultGrade}>{result.grade}</Text>
            </View>
            <View style={styles.resultBar}>
              <View style={[styles.resultFill, { width: `${result.score}%` }]} />
            </View>
            <Text style={styles.resultScore}>{result.score}/{result.total}</Text>
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
  section: {
    margin: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
  },
  examCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  examHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  examSubject: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  examBadge: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  examBadgeText: {
    color: '#1e40af',
    fontSize: 12,
    fontWeight: '600',
  },
  examDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  examDetail: {
    minWidth: 80,
  },
  examDetailLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  examDetailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  resultSubject: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  resultGrade: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e40af',
  },
  resultBar: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  resultFill: {
    height: '100%',
    backgroundColor: '#1e40af',
    borderRadius: 4,
  },
  resultScore: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
    textAlign: 'right',
  },
});
