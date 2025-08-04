import { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";

// Timeline connector component
const TimelineConnector = ({ index, total }) => {
    const pulseAnim = useRef(new Animated.Value(0.5)).current;

    useEffect(() => {
        // Stagger the pulse animation based on index
        const delay = (index * 200) % 2000;

        setTimeout(() => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, {
                        toValue: 1,
                        duration: 1500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(pulseAnim, {
                        toValue: 0.5,
                        duration: 1500,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        }, delay);
    }, [index]);

    if (index === total - 1) return null; // Don't render connector for last item

    return (
        <Animated.View style={[styles.timelineConnector, { opacity: pulseAnim }]} />
    );
};

const styles = StyleSheet.create({
    timelineConnector: {
        width: 20,
        height: 2,
        backgroundColor: '#00ffff',
        marginRight: 15,
        shadowColor: '#00ffff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
    },
})

export default TimelineConnector;