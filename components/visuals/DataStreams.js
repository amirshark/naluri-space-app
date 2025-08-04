import { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";
const { width } = Dimensions.get('window');

// Flowing data streams
const DataStreams = () => {
    const stream1 = useRef(new Animated.Value(0)).current;
    const stream2 = useRef(new Animated.Value(0)).current;
    const stream3 = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animateStream = (animValue, duration) => {
            Animated.loop(
                Animated.timing(animValue, {
                    toValue: 1,
                    duration: duration,
                    useNativeDriver: true,
                })
            ).start();
        };

        animateStream(stream1, 8000);
        animateStream(stream2, 12000);
        animateStream(stream3, 10000);
    }, []);

    const getStreamTransform = (animValue) => ({
        transform: [
            {
                translateX: animValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-width, width * 1.5],
                }),
            },
        ],
    });

    return (
        <View style={styles.dataStreamsContainer}>
            <Animated.View style={[styles.dataStream1, getStreamTransform(stream1)]} />
            <Animated.View style={[styles.dataStream2, getStreamTransform(stream2)]} />
            <Animated.View style={[styles.dataStream3, getStreamTransform(stream3)]} />
        </View>
    );
};
const styles = StyleSheet.create({
    dataStreamsContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    dataStream1: {
        position: 'absolute',
        top: '15%',
        width: 100,
        height: 1,
        backgroundColor: '#00ffff',
        shadowColor: '#00ffff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
    },
    dataStream2: {
        position: 'absolute',
        top: '60%',
        width: 80,
        height: 1,
        backgroundColor: '#ff00ff',
        shadowColor: '#ff00ff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
    },
    dataStream3: {
        position: 'absolute',
        top: '85%',
        width: 120,
        height: 1,
        backgroundColor: '#00ff00',
        shadowColor: '#00ff00',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
    },
})

export default DataStreams;