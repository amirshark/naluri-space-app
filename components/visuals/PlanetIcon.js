import { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";

// Planet icon component
const PlanetIcon = ({ planet, size = 20 }) => {
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.2,
                    duration: 2000 + Math.random() * 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 2000 + Math.random() * 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    const getPlanetColor = (planetName) => {
        const colors = {
            mercury: '#8C7853',
            venus: '#FFC649',
            earth: '#6B93D6',
            mars: '#C1440E',
            jupiter: '#D8CA9D',
            saturn: '#FAD5A5',
            uranus: '#4FD0E7',
            neptune: '#4B70DD',
            sun: '#FDB813'
        };
        return colors[planetName.toLowerCase()] || '#ffffff';
    };

    return (
        <Animated.View
            style={[
                styles.planetIcon,
                {
                    width: size,
                    height: size,
                    backgroundColor: getPlanetColor(planet),
                    transform: [{ scale: pulseAnim }],
                    shadowColor: getPlanetColor(planet),
                },
            ]}
        />
    );
};

const styles = StyleSheet.create({
    planetIcon: {
        borderRadius: 12,
        marginRight: 15,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 6,
    },
})

export default PlanetIcon;