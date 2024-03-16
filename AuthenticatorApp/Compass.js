import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Animated, BackHandler, TouchableOpacity } from "react-native";
import CompassHeading from "react-native-compass-heading";

const Compass = () => {
    const [heading, setHeading] = useState(0);
    const [authenticated, setAuthenticated] = useState(false);
    const [targetDegree, setTargetDegree] = useState(0);
    const [degreeTolerance, setDegreeTolerance] = useState(10);
    const rotateValue = new Animated.Value(0);
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        let timer;
        let successTimer;

        CompassHeading.start(3, ({ heading, accuracy }) => {
            console.log("CompassHeading: ", heading, accuracy);
            setHeading(heading);

            if (heading >= targetDegree - degreeTolerance && heading <= targetDegree + degreeTolerance) {
                if (!successTimer) {
                    successTimer = setTimeout(() => {
                        setAuthenticated(true);
                        setShowNotification(true);
                        timer = setTimeout(() => {
                            BackHandler.exitApp();
                        }, 3000);
                    }, 3000); // Wait for 3 seconds in the range
                }
            } else {
                clearTimeout(successTimer);
                successTimer = null;
                setShowNotification(false);
                setAuthenticated(false);
                clearTimeout(timer);
            }

            Animated.timing(rotateValue, {
                toValue: heading,
                duration: 100,
                useNativeDriver: false,
            }).start();
        });

        return () => {
            CompassHeading.stop();
            clearTimeout(successTimer);
            clearTimeout(timer);
        };
    }, [targetDegree, degreeTolerance]);

    const rotateStyle = {
        transform: [{ rotate: `${-heading}deg` }],
    };

    const getCardinalDirection = () => {
        const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
        const index = Math.round(heading / 45) % 8;
        return directions[index];
    };

    const generateRandomDegree = () => {
        const randomDegree = Math.floor(Math.random() * 360);
        setTargetDegree(randomDegree);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.appName}>Secureflod Authentication App</Text>
            <View style={styles.compassContainer}>
                <Image
                    source={require("./assets/compass_bg.png")}
                    style={[styles.compassImage, rotateStyle]}
                />
                <Image
                    source={require("./assets/compass_pointer.png")}
                    style={styles.arrowImage}
                />
                <Text style={styles.degreeText}>{heading.toFixed(2)}°</Text>
                <Text style={styles.cardinalDirection}>{`Direction: ${getCardinalDirection()}`}</Text>
            </View>

            <View style={styles.targetDegreeContainer}>
                <Text style={styles.targetDegreeLabel}>Target Degree: </Text>
                <Text style={styles.targetDegreeValue}>{`${targetDegree.toFixed(2)}°`}</Text>
            </View>
			<TouchableOpacity onPress={generateRandomDegree} style={styles.button}>
                <Text style={styles.buttonText}>Generate Random Degree</Text>
            </TouchableOpacity>
            <Text style={styles.waitText}>Wait for 6 seconds to complete all operations</Text>
            {showNotification && (
                <View style={styles.notification}>
                    <Text style={styles.notificationText}>Successfully authenticated</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#000",
        color: "#fff",
        paddingTop: 50,
        paddingBottom: 20,
    },
    appName: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
    },
    compassContainer: {
        position: "relative",
        width: 500,
        height: 250,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 125,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    compassImage: {
        width: 300,
        height: 300,
    },
    arrowImage: {
	
        position: "absolute",
        top: -80,
        transform: [{ translateX: 0 }],
    },
    degreeText: {
        position: "absolute",
        fontSize: 37,
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
        top: 105,
    },
    button: {
        backgroundColor: "#fff",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: "#000",
        fontSize: 16,
        fontWeight: "bold",
    },
    targetDegreeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    targetDegreeLabel: {
        color: '#fff',
        fontSize: 18,
    },
    targetDegreeValue: {
        color: 'red',
        fontSize: 18,
    },
    waitText: {
        fontSize: 16,
        color: "#fff",
        marginBottom: 20,
    },
    cardinalDirection: {
        fontSize: 18,
        color: "#fff",
    },
    notification: {
        position: "absolute",
        bottom: 20,
        backgroundColor: "green",
        padding: 10,
        borderRadius: 5,
    },
    notificationText: {
        color: "#fff",
        fontWeight: "bold",
    },
});

export default Compass;
