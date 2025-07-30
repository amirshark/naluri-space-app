import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

// Animated circuit lines
const CircuitLines = () => {
    const lineOpacity = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(lineOpacity, {
                    toValue: 0.8,
                    duration: 2000,
                    useNativeDriver: true,
                }),
                Animated.timing(lineOpacity, {
                    toValue: 0.3,
                    duration: 2000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    return (
        <Animated.View style={[styles.circuitContainer, { opacity: lineOpacity }]}>
            <View style={styles.circuitLine1} />
            <View style={styles.circuitLine2} />
            <View style={styles.circuitLine3} />
            <View style={styles.circuitNode1} />
            <View style={styles.circuitNode2} />
            <View style={styles.circuitNode3} />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    circuitContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    circuitLine1: {
        position: 'absolute',
        top: '20%',
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: '#00ffff',
        shadowColor: '#00ffff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
    },
    circuitLine2: {
        position: 'absolute',
        top: '60%',
        left: '30%',
        width: '40%',
        height: 1,
        backgroundColor: '#ff00ff',
        shadowColor: '#ff00ff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
    },
    circuitLine3: {
        position: 'absolute',
        right: 50,
        top: '10%',
        bottom: '10%',
        width: 1,
        backgroundColor: '#00ff00',
        shadowColor: '#00ff00',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
    },
    circuitNode1: {
        position: 'absolute',
        top: '19%',
        left: '30%',
        width: 6,
        height: 6,
        backgroundColor: '#00ffff',
        borderRadius: 3,
        shadowColor: '#00ffff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 6,
    },
    circuitNode2: {
        position: 'absolute',
        top: '59%',
        right: '30%',
        width: 6,
        height: 6,
        backgroundColor: '#ff00ff',
        borderRadius: 3,
        shadowColor: '#ff00ff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 6,
    },
    circuitNode3: {
        position: 'absolute',
        top: '40%',
        right: 47,
        width: 6,
        height: 6,
        backgroundColor: '#00ff00',
        borderRadius: 3,
        shadowColor: '#00ff00',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 6,
    },
})

export default CircuitLines;