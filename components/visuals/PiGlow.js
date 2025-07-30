import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

// Pulsing glow effect for Pi display
const PiGlow = ({ children, isRunning }) => {
    const glowAnimation = useRef(new Animated.Value(0.5)).current;

    useEffect(() => {
        if (isRunning) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(glowAnimation, {
                        toValue: 1,
                        duration: 1500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(glowAnimation, {
                        toValue: 0.5,
                        duration: 1500,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        } else {
            Animated.timing(glowAnimation, {
                toValue: 0.5,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }
    }, [isRunning]);

    return (
        <Animated.View style={[styles.piGlowContainer, { opacity: glowAnimation }]}>
            <View style={styles.piGlow} />
            {children}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    piGlowContainer: {
        position: 'relative',
        alignItems: 'center',
        marginBottom: 25,
    },
    piGlow: {
        position: 'absolute',
        width: 200,
        height: 100,
        backgroundColor: '#00ffff',
        borderRadius: 50,
        opacity: 0.1,
        top: 10,
    },
})

export default PiGlow;