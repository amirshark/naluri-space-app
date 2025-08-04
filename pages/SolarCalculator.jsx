import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Switch, Card } from 'react-native-paper';
import { usePiStore } from '@/components/lib/store';
import { PLANET_RADII } from '@/components/utils/planets';
import AnimatedStars from '@/components/visuals/AnimatedStars';
import OrbitalRings from '@/components/visuals/OrbitalRings';
import PlanetIcon from '@/components/visuals/PlanetIcon';
import DataStreams from '@/components/visuals/DataStreams';
import PiGlow from '@/components/visuals/PiGlow';

export default function SolarCalculator() {
  const { pi, isRunning } = usePiStore();
  const [isMiles, setIsMiles] = useState(false);

  const unit = isMiles ? 'mi' : 'km';
  const factor = isMiles ? 0.621371 : 1;
  const circumference = (r) => (2 * parseFloat(pi) * r * factor).toFixed(2);

  // Format large numbers with commas
  const formatNumber = (num) => {
    return parseFloat(num).toLocaleString();
  };

  return (
    <View style={[styles.container, { backgroundColor: '#0a0a0f' }]}>
      {/* Animated background */}
      <AnimatedStars />
      <OrbitalRings />
      <DataStreams />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Card style={styles.mainCard}>
          <Card.Content style={styles.cardContent}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerLine} />
              <Text variant="headlineSmall" style={styles.headerTitle}>
                SOLAR SYSTEM ANALYZER
              </Text>
              <View style={styles.headerLine} />
            </View>

            {/* Pi display */}
            <PiGlow isRunning={isRunning}>
              <View style={styles.piContainer}>
                {/* <View style={styles.piGlow} /> */}
                <Text variant="titleLarge" style={styles.piLabel}>
                  QUANTUM π VALUE
                </Text>
                <Text variant="headlineLarge" style={styles.piValue}>
                  π ≈ {pi}
                </Text>
              </View>
            </PiGlow>

            {/* Unit switcher */}
            <View style={styles.unitContainer}>
              <View style={styles.unitBorder}>
                <Text style={styles.unitLabel}>MEASUREMENT UNITS</Text>
                <View style={styles.switchRow}>
                  <Text style={styles.unitText}>
                    KILOMETERS
                  </Text>
                  <View style={styles.switchContainer}>
                    <Switch
                      value={isMiles}
                      onValueChange={setIsMiles}
                      thumbColor={isMiles ? '#00ff00' : '#ffffff'}
                      trackColor={{ false: '#333', true: '#00ff0055' }}
                    />
                  </View>
                  <Text style={styles.unitText}>
                    MILES
                  </Text>
                </View>
                <Text style={styles.currentUnit}>
                  ACTIVE UNIT: {unit.toUpperCase()}
                </Text>
              </View>
            </View>

            {/* Planetary calculations */}
            <View style={styles.planetsContainer}>
              <View style={styles.planetsBorder}>
                <Text style={styles.planetsLabel}>
                  CIRCUMFERENCE CALCULATIONS
                </Text>

                {Object.entries(PLANET_RADII).map(([planet, radius], index) => (
                  <View key={planet} style={styles.planetRow}>
                    <View style={styles.planetInfo}>
                      <PlanetIcon planet={planet} size={24} />
                      <View style={styles.planetDetails}>
                        <Text style={styles.planetName}>
                          {planet.toUpperCase()}
                        </Text>
                        <Text style={styles.planetRadius}>
                          Radius: {formatNumber((radius * factor).toFixed(0))} {unit}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.circumferenceContainer}>
                      <Text style={styles.circumferenceValue}>
                        {formatNumber(circumference(radius))}
                      </Text>
                      <Text style={styles.circumferenceUnit}>
                        {unit}
                      </Text>
                    </View>
                    <View style={styles.planetDivider} />
                  </View>
                ))}
              </View>
            </View>

            {/* Formula display */}
            <View style={styles.formulaContainer}>
              <View style={styles.formulaBorder}>
                <Text style={styles.formulaLabel}>CALCULATION FORMULA</Text>
                <Text style={styles.formulaText}>
                  Circumference = 2 × π × radius
                </Text>
                <Text style={styles.formulaNote}>
                  Using quantum-precision π value
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
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
    marginTop: 50,
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
  piContainer: {
    position: 'relative',
    alignItems: 'center',
    padding: 20,
  },
  piLabel: {
    color: '#00ffff',
    fontWeight: 'bold',
    marginBottom: 8,
    textShadowColor: '#00ffff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  piValue: {
    color: '#ffffff',
    fontWeight: 'bold',
    textShadowColor: '#00ffff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    textAlign: "center",
  },
  unitContainer: {
    marginBottom: 30,
  },
  unitBorder: {
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
  unitLabel: {
    color: '#ff00ff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    textShadowColor: '#ff00ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  switchContainer: {
    paddingHorizontal: 10,
  },
  unitText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  currentUnit: {
    color: '#ff00ff',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold',
    textShadowColor: '#ff00ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  planetsContainer: {
    marginBottom: 25,
  },
  planetsBorder: {
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
  planetsLabel: {
    color: '#00ff00',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: '#00ff00',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  planetRow: {
    position: 'relative',
    marginBottom: 15,
  },
  planetInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  planetDetails: {
    flex: 1,
  },
  planetName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  planetRadius: {
    color: '#aaaaaa',
    fontSize: 12,
  },
  circumferenceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'flex-end',
    marginTop: 5,
  },
  circumferenceValue: {
    color: '#00ffff',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: '#00ffff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  circumferenceUnit: {
    color: '#ffffff',
    fontSize: 14,
    marginLeft: 5,
  },
  planetDivider: {
    height: 1,
    backgroundColor: 'rgba(0, 255, 0, 0.2)',
    marginTop: 10,
  },
  formulaContainer: {
    marginTop: 10,
  },
  formulaBorder: {
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
  formulaLabel: {
    color: '#ffaa00',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: '#ffaa00',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  formulaText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  formulaNote: {
    color: '#ffaa00',
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});