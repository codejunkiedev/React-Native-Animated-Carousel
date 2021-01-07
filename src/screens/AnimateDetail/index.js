import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    Dimensions,
    FlatList,
    Animated,
    TouchableOpacity,
    SafeAreaView,
    Platform,
} from 'react-native';
import { NavigationContainer, NavigationHelpersContext } from '@react-navigation/native';
import 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable'

const { width, height } = Dimensions.get('window');
const letterSpacing = {
    0: { opacity: 0, translateY: -42 },
    1: { opacity: 1, translateY: 0 }
}
const detailAnimations = {
    0: { translateX: width, opacity: 0 },
    1: { translateX: 0, opacity: 1 }
}
const duration = 300;

export default function AnimateDetail({ navigation, route }) {
    const circleSize = Math.sqrt(Math.pow(height, 3) + Math.pow(width, 3));
    const { item } = route.params;
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View
                style={{
                    padding: 12,
                    position: 'absolute',
                    top: 5,
                    right: 0,
                }}
            >
                <TouchableOpacity
                    style={{
                        padding: 5,
                        zIndex: 99,
                    }}
                    activeOpacity={1}
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: '#333',
                        }}
                    >
                        X
                </Text>
                </TouchableOpacity>
            </View>
            <View
                style={[
                    StyleSheet.absoluteFillObject, {
                        alignItems: 'center',
                        justifyContent: 'center',
                    },
                ]}
            >
                <View
                    style={{
                        position: 'absolute',
                        width: circleSize,
                        height: circleSize,
                        borderRadius: circleSize,
                        opacity: .2,
                        backgroundColor: item.backgroundColor,
                    }}
                />
            </View>
            <Image
                source={item.imageUri}
                style={styles.image}
            />
            <View style={{ flexDirection: 'row', overflow: 'hidden' }}>
                {item.type.split('').map((letter, index) => {
                    return (
                        <View>
                            <Animatable.Text
                                useNativeDriver
                                animation={letterSpacing}
                                delay={duration + (index * 50)}
                                key={`${letter}-${index}`}
                                style={styles.heading}
                            >
                                {letter}
                            </Animatable.Text>
                        </View>
                    )
                })}
            </View>
            <View style={{ flex: 1, flexDirection: 'row', marginTop: height / 2, overflow: 'hidden', }}>
                <Animatable.View
                    animation={detailAnimations}
                    delay={duration + 100}
                    useNativeDriver
                    style={{
                        flex: .35,
                        marginBottom: 20,
                        backgroundColor: 'rgba(255,255,255,.5)',
                        overflow: 'hidden',
                        marginRight: 10
                    }}
                >
                    <Animated.Text
                        style={{
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            fontSize: 20,
                            color: '#000',
                            padding: 10,
                            zIndex: 9
                        }}
                    >
                        {item.detailText}
                    </Animated.Text>
                </Animatable.View>
                <Animatable.View
                    animation={detailAnimations}
                    delay={duration + 200}
                    useNativeDriver
                    style={{
                        flex: .65,
                        marginBottom: 20,
                        backgroundColor: item.detailBackgroundColor,
                        alignItems: 'center',
                        overflow: 'hidden',
                        justifyContent: 'center',
                    }}>
                    <Image
                        source={item.imageUri}
                        style={styles.detailImage}
                    />
                </Animatable.View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    heading: {
        color: '#444',
        textTransform: 'uppercase',
        fontSize: 38,
        height: 40,
        fontWeight: 'bold',
        marginBottom: 5,
        marginLeft: 10,
        marginTop: 5,
    },
    image: {
        width: width * 0.7,
        height: width * 0.7,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginVertical: 70,
        position: 'absolute'
    },
    detailImage: {
        width: width * 0.4,
        height: width * 0.4,
        resizeMode: 'contain',
        // position: 'absolute'
    }
});