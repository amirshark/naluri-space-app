import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

// Orbital rings animation
const OrbitalRings = () => {
    const rotation1 = useRef(new Animated.Value(0)).current;
    const rotation2 = useRef(new Animated.Value(0)).current;
    const rotation3 = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(rotation1, {
                toValue: 1,
                duration: 20000,
                useNativeDriver: true,
            })
        ).start();

        Animated.loop(
            Animated.timing(rotation2, {
                toValue: 1,
                duration: 15000,
                useNativeDriver: true,
            })
        ).start();

        Animated.loop(
            Animated.timing(rotation3, {
                toValue: 1,
                duration: 25000,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    const spin1 = rotation1.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const spin2 = rotation2.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '-360deg'],
    });

    const spin3 = rotation3.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.orbitalContainer}>
            <Animated.View style={[styles.orbitalRing1, { transform: [{ rotate: spin1 }] }]} />
            <Animated.View style={[styles.orbitalRing2, { transform: [{ rotate: spin2 }] }]} />
            <Animated.View style={[styles.orbitalRing3, { transform: [{ rotate: spin3 }] }]} />
        </View>
    );
};

const styles = StyleSheet.create({
    orbitalContainer: {
        position: 'absolute',
        top: '20%',
        left: '10%',
        right: '10%',
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
    },
    orbitalRing1: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'rgba(0, 255, 255, 0.3)',
        shadowColor: '#00ffff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
    },
    orbitalRing2: {
        position: 'absolute',
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 1,
        borderColor: 'rgba(255, 0, 255, 0.3)',
        shadowColor: '#ff00ff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
    },
    orbitalRing3: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'rgba(0, 255, 0, 0.3)',
        shadowColor: '#00ff00',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
    },
})

export default OrbitalRings;