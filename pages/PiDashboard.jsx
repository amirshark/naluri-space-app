import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, ProgressBar, Card } from 'react-native-paper';
import { usePiStore } from '@/components/lib/store';
import PiGlow from '@/components/visuals/PiGlow';
import AnimatedStars from '@/components/visuals/AnimatedStars';
import CircuitLines from '@/components/visuals/CircuitLines';

export default function PiDashboard() {
  const { pi, accuracy, isRunning, fetchPi, start, pause, reset } = usePiStore();

  // Poll every 2 seconds
  useEffect(() => {
    fetchPi(); // initial fetch
    const interval = setInterval(() => {
      fetchPi();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: '#0a0a0f' }]}>
      {/* Animated starfield background */}
      <AnimatedStars />
      
      {/* Circuit pattern overlay */}
      <CircuitLines />
      
      {/* Main dashboard card */}
      <Card style={styles.mainCard}>
        <Card.Content style={styles.cardContent}>
          {/* Header with sci-fi styling */}
          <View style={styles.header}>
            <View style={styles.headerLine} />
            <Text variant="headlineSmall" style={styles.headerTitle}>
              π QUANTUM PRECISION MONITOR
            </Text>
            <View style={styles.headerLine} />
          </View>

          {/* Pi display with glow effect */}
          <PiGlow isRunning={isRunning}>
            <View style={styles.piContainer}>
              <Text variant="displaySmall" style={styles.piSymbol}>π</Text>
              <Text variant="headlineLarge" style={styles.piValue}>
                {pi}
              </Text>
            </View>
          </PiGlow>

          {/* Accuracy display with holographic styling */}
          <View style={styles.accuracyContainer}>
            <View style={styles.accuracyBorder}>
              <Text variant="titleMedium" style={styles.accuracyLabel}>
                QUANTUM ACCURACY
              </Text>
              <Text variant="headlineMedium" style={styles.accuracyValue}>
                {accuracy} DECIMAL PLACES
              </Text>
            </View>
          </View>

          {/* Enhanced progress bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressLabels}>
              <Text style={styles.progressLabel}>0</Text>
              <Text style={styles.progressLabel}>17</Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBarBg} />
              <ProgressBar
                progress={Math.min(accuracy / 17, 1)}
                style={styles.progressBar}
                color="#00ffff"
              />
              <View style={styles.progressGlow} />
            </View>
          </View>

          {/* Control buttons with sci-fi styling */}
          <View style={styles.controlPanel}>
            <View style={styles.controlBorder}>
              <Text style={styles.controlLabel}>QUANTUM CONTROLS</Text>
              <View style={styles.buttons}>
                <Button
                  mode="contained"
                  onPress={start}
                  disabled={isRunning}
                  style={[styles.button, styles.startButton]}
                  labelStyle={styles.buttonLabel}
                  icon={isRunning ? undefined : "play"}
                >
                  {isRunning ? "Active" : "Start"}
                </Button>
                <Button
                  mode="contained-tonal"
                  onPress={pause}
                  disabled={!isRunning}
                  style={[styles.button, styles.pauseButton]}
                  labelStyle={styles.buttonLabel}
                  icon="pause"
                >
                  Pause
                </Button>
                <Button
                  mode="outlined"
                  onPress={reset}
                  style={[styles.button, styles.resetButton]}
                  labelStyle={styles.buttonLabel}
                  icon="refresh"
                >
                  Reset
                </Button>
              </View>
            </View>
          </View>

          {/* Status indicator */}
          <View style={styles.statusContainer}>
            <View style={[styles.statusIndicator, { 
              backgroundColor: isRunning ? '#00ff00' : '#ff6b00',
              shadowColor: isRunning ? '#00ff00' : '#ff6b00'
            }]} />
            <Text style={styles.statusText}>
              STATUS: {isRunning ? 'CALCULATING' : 'STANDBY'}
            </Text>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  cardContent: {
    padding: 25,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
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
  piContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
  },
  piSymbol: {
    color: '#00ffff',
    fontWeight: 'bold',
    marginRight: 10,
    textShadowColor: '#00ffff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  piValue: {
    color: '#ffffff',
    fontWeight: 'bold',
    textShadowColor: '#00ffff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  accuracyContainer: {
    marginBottom: 25,
  },
  accuracyBorder: {
    borderWidth: 1,
    borderColor: '#ff00ff',
    borderRadius: 15,
    padding: 15,
    backgroundColor: 'rgba(255, 0, 255, 0.05)',
    shadowColor: '#ff00ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  accuracyLabel: {
    color: '#ff00ff',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 5,
    textShadowColor: '#ff00ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  accuracyValue: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  progressContainer: {
    marginBottom: 30,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  progressLabel: {
    color: '#888',
    fontSize: 12,
  },
  progressBarContainer: {
    position: 'relative',
    height: 8,
  },
  progressBarBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 8,
    backgroundColor: 'rgba(0, 255, 255, 0.1)',
    borderRadius: 4,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'transparent',
  },
  progressGlow: {
    position: 'absolute',
    top: -2,
    left: 0,
    right: 0,
    height: 12,
    backgroundColor: 'rgba(0, 255, 255, 0.1)',
    borderRadius: 6,
  },
  controlPanel: {
    marginBottom: 20,
  },
  controlBorder: {
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
  controlLabel: {
    color: '#00ff00',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    textShadowColor: '#00ff00',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  button: {
    flex: 1,
    borderRadius: 10,
    elevation: 5,
  },
  startButton: {
    backgroundColor: '#00ff00',
    shadowColor: '#00ff00',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  pauseButton: {
    backgroundColor: '#ff6b00',
    shadowColor: '#ff6b00',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  resetButton: {
    borderColor: '#ff3333',
    shadowColor: '#ff3333',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  buttonLabel: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});