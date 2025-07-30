import { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";

// Animated stars component
const AnimatedStars = () => {
    const stars = useRef([]);
    const animatedValues = useRef([]);
    const { width, height } = Dimensions.get('window');

    // Initialize stars
    if (stars.current.length === 0) {
        for (let i = 0; i < 50; i++) {
            stars.current.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 2 + 1,
            });
            animatedValues.current.push(new Animated.Value(Math.random()));
        }
    }

    useEffect(() => {
        // Animate stars twinkling
        const animations = animatedValues.current.map((animValue, index) => {
            return Animated.loop(
                Animated.sequence([
                    Animated.timing(animValue, {
                        toValue: 1,
                        duration: 1000 + Math.random() * 2000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(animValue, {
                        toValue: 0.2,
                        duration: 1000 + Math.random() * 2000,
                        useNativeDriver: true,
                    }),
                ])
            );
        });

        animations.forEach(anim => anim.start());

        return () => animations.forEach(anim => anim.stop());
    }, []);

    return (
        <View style={styles.starsContainer}>
            {stars.current.map((star, index) => (
                <Animated.View
                    key={index}
                    style={[
                        styles.star,
                        {
                            left: star.x,
                            top: star.y,
                            width: star.size,
                            height: star.size,
                            opacity: animatedValues.current[index],
                        },
                    ]}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    starsContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    star: {
        position: 'absolute',
        backgroundColor: '#ffffff',
        borderRadius: 1,
        shadowColor: '#ffffff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
})

export default AnimatedStars;