import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Animated } from 'react-native';
import { Text, Chip, Card } from 'react-native-paper';
import { usePiStore } from '../components/lib/store';
import AnimatedStars from '@/components/visuals/AnimatedStars';
import TimelineConnector from '@/components/visuals/TimelineConnector';
import DataStreams from '@/components/visuals/DataStreams';
import CircuitLines from '@/components/visuals/CircuitLines';


// Enhanced Pi Chip component
const PiChip = ({ value, index, total, isLatest }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    // Entrance animation with delay
    const delay = index * 100;

    setTimeout(() => {
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, delay);

    // Glow animation for latest value
    if (isLatest) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 0.5,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [index, isLatest]);

  return (
    <View style={styles.chipContainer}>
      <Animated.View
        style={[
          styles.chipWrapper,
          {
            transform: [{ scale: scaleAnim }],
            opacity: isLatest ? glowAnim : 1,
          },
        ]}
      >
        <Chip
          style={[
            styles.chip,
            isLatest && styles.latestChip,
          ]}
          textStyle={[
            styles.chipText,
            isLatest && styles.latestChipText,
          ]}
        >
          {value}
        </Chip>
        {isLatest && <View style={styles.latestGlow} />}
      </Animated.View>
      <TimelineConnector index={index} total={total} />
    </View>
  );
};

export default function PiHistory() {
  const { piHistory } = usePiStore();

  return (
    <View style={styles.container}>
      {/* Animated background */}
      <AnimatedStars />
      <DataStreams />
      <CircuitLines />

      <Card style={styles.mainCard}>
        <Card.Content style={styles.cardContent}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLine} />
            <Text variant="headlineSmall" style={styles.headerTitle}>
              π EVOLUTION TIMELINE
            </Text>
            <View style={styles.headerLine} />
          </View>

          {/* Stats display */}
          <View style={styles.statsContainer}>
            <View style={styles.statsBorder}>
              <View style={styles.statsGrid}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>TOTAL SAMPLES</Text>
                  <Text style={styles.statValue}>{piHistory.length}</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>LATEST VALUE</Text>
                  <Text style={styles.statValue}>
                    {piHistory.length > 0 ? piHistory[piHistory.length - 1] : 'N/A'}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Timeline description */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.subtitle}>
              Quantum π progression tracked through computational evolution:
            </Text>
          </View>

          {/* Timeline */}
          <View style={styles.timelineContainer}>
            <View style={styles.timelineBorder}>
              <Text style={styles.timelineLabel}>
                COMPUTATIONAL TIMELINE
              </Text>

              {piHistory.length === 0 ? (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyText}>
                    No π calculations recorded yet
                  </Text>
                  <Text style={styles.emptySubtext}>
                    Start the calculator to begin tracking
                  </Text>
                </View>
              ) : (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.timeline}
                  contentContainerStyle={styles.timelineContent}
                >
                  {piHistory.map((value, index) => (
                    <PiChip
                      key={index}
                      value={value}
                      index={index}
                      total={piHistory.length}
                      isLatest={index === piHistory.length - 1}
                    />
                  ))}
                </ScrollView>
              )}
            </View>
          </View>

          {/* Progress indicator */}
          {piHistory.length > 0 && (
            <View style={styles.progressContainer}>
              <View style={styles.progressBorder}>
                <Text style={styles.progressLabel}>
                  EVOLUTION PROGRESS
                </Text>
                <View style={styles.progressInfo}>
                  <Text style={styles.progressText}>
                    Precision improving over {piHistory.length} iterations
                  </Text>
                  <View style={styles.progressDots}>
                    {[...Array(Math.min(piHistory.length, 10))].map((_, i) => (
                      <View
                        key={i}
                        style={[
                          styles.progressDot,
                          i === Math.min(piHistory.length, 10) - 1 && styles.activeDot,
                        ]}
                      />
                    ))}
                  </View>
                </View>
              </View>
            </View>
          )}
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0f',
    justifyContent: 'center',
    padding: 20,
  },
  mainCard: {
    backgroundColor: 'rgba(10, 20, 40, 0.9)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#00ffff',
    shadowColor: '#00ffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    marginTop: 20,
  },
  cardContent: {
    padding: 25,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  headerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#00ffff',
    shadowColor: '#00ffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  headerTitle: {
    color: '#00ffff',
    fontWeight: 'bold',
    marginHorizontal: 15,
    textAlign: 'center',
    textShadowColor: '#00ffff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  statsContainer: {
    marginBottom: 25,
  },
  statsBorder: {
    borderWidth: 1,
    borderColor: '#ff00ff',
    borderRadius: 15,
    padding: 20,
    backgroundColor: 'rgba(255, 0, 255, 0.05)',
    shadowColor: '#ff00ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#ff00ff',
    marginHorizontal: 20,
    shadowColor: '#ff00ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  statLabel: {
    color: '#ff00ff',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
    textShadowColor: '#ff00ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  statValue: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  descriptionContainer: {
    marginBottom: 25,
  },
  subtitle: {
    color: '#aaaaaa',
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  timelineContainer: {
    marginBottom: 25,
  },
  timelineBorder: {
    borderWidth: 1,
    borderColor: '#00ff00',
    borderRadius: 15,
    padding: 20,
    backgroundColor: 'rgba(0, 255, 0, 0.05)',
    shadowColor: '#00ff00',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  timelineLabel: {
    color: '#00ff00',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: '#00ff00',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  timeline: {
    marginTop: 10,
  },
  timelineContent: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  chipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chipWrapper: {
    position: 'relative',
  },
  chip: {
    backgroundColor: 'rgba(0, 255, 255, 0.1)',
    marginRight: 15,
    borderColor: '#00ffff',
    borderWidth: 1,
    paddingHorizontal: 8,
    shadowColor: '#00ffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
  chipText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  latestChip: {
    backgroundColor: 'rgba(0, 255, 0, 0.2)',
    borderColor: '#00ff00',
    shadowColor: '#00ff00',
  },
  latestChipText: {
    color: '#00ff00',
    textShadowColor: '#00ff00',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  latestGlow: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    backgroundColor: '#00ff00',
    borderRadius: 20,
    opacity: 0.2,
    zIndex: -1,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  emptyText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  emptySubtext: {
    color: '#aaaaaa',
    fontSize: 14,
  },
  progressContainer: {
    marginTop: 10,
  },
  progressBorder: {
    borderWidth: 1,
    borderColor: '#ffaa00',
    borderRadius: 15,
    padding: 15,
    backgroundColor: 'rgba(255, 170, 0, 0.05)',
    shadowColor: '#ffaa00',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  progressLabel: {
    color: '#ffaa00',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: '#ffaa00',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  progressInfo: {
    alignItems: 'center',
  },
  progressText: {
    color: '#ffffff',
    fontSize: 12,
    marginBottom: 10,
  },
  progressDots: {
    flexDirection: 'row',
    gap: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 170, 0, 0.3)',
    borderWidth: 1,
    borderColor: '#ffaa00',
  },
  activeDot: {
    backgroundColor: '#ffaa00',
    shadowColor: '#ffaa00',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
});