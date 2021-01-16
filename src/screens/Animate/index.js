import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    FlatList,
    Animated,
    SafeAreaView,
    Platform,
} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { SharedElement } from 'react-navigation-shared-element';

const data = [
    {
        type: 'Pink',
        key: 'first',
        imageUri: require('../../../assets/images/airpods-max-select-pink.png'),
        heading: 'Sounds like an epiphany',
        description: 'Beamforming microphones help isolate your voice on phone calls, so it’s heard clearly — even in windy situations.',
        color: '#eb8899',
        backgroundColor: '#eb8899',
        detailBackgroundColor: 'rgba(235, 136, 153, 0.5)',
        detailText: 'Immersive listening',
          detailDescription:'AirPods Max combine high-fidelity audio with industry-leading Active Noise Cancellation to deliver an unparalleled listening experience. Each part of their custom-built driver works to produce sound with ultra-low distortion across the audible range. From deep, rich bass to accurate mids and crisp, clean highs, you’ll hear every note with a new sense of clarity.',
        detailImage: '',
    },
    {
        type: 'Sky Blue',
        key: 'second',
        imageUri: require('../../../assets/images/airpods-max-select-skyblue.png'),
        heading: 'Elaborately Simple',
        description: 'AirPods Max inherit all of the wireless, effortless magic of the AirPods family.',
        color: '#2D4B67',
        backgroundColor: '#2D4B67',
        detailBackgroundColor: 'rgba(45, 75, 103, 0.5)',
        detailText: 'One-tap setup',
        detailDescription:'AirPods Max inherit all of the wireless, effortless magic of the AirPods family. From setup to Siri commands, they make the listening experience completely fluid — day to day, device to device.',
        detailImage: '',
    },
    {
        type: 'Green',
        key: 'third',
        imageUri: require('../../../assets/images/airpods-max-select-green.png'),
        heading: 'More magic to play with',
        description: 'AirPods Max pause audio when you take them off, and resume playback when you put them back on.',
        color: '#9dcc96',
        backgroundColor: '#9dcc96',
        detailBackgroundColor: 'rgba(157, 204, 150, 0.5)',
        detailText: 'Always-on Siri',
          detailDescription:'Get directions, check the weather, schedule a meeting, and more with a simple “Hey Siri.” With an expansive set of commands, your favorite personal assistant is more helpful than ever.',
        detailImage: '',
    },
];

const { width, height } = Dimensions.get('window');
const LOGO_WIDTH = 220;
const LOGO_HEIGHT = 40;
const DOT_SIZE = 40;
const TICKER_HEIGHT = 40;
const CIRCLE_SIZE = width * 0.7;

const Circle = ({ scrollX }) => {
    return (
        <View style={[StyleSheet.absoluteFillObject, styles.circleContainer]}>
            {data.map((item, index) => {
                const inputRange = [
                    (index - 0.55) * width,
                    index * width,
                    (index + 0.55) * width,
                ];
                const scale = scrollX.interpolate({
                    inputRange,
                    outputRange: [0, 1, 0],
                    extrapolate: 'clamp',
                });
                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0, 0.2, 0],
                });
                return (
                    <SharedElement id={`item.${item.key}.circle`} style={styles.circle}>
                        <Animated.View
                            key={index}
                            style={[
                                styles.circle,
                                {
                                    top: 0,
                                    backgroundColor: item.backgroundColor,
                                    opacity,
                                    transform: [{ scale }],
                                },
                            ]}
                        />
                    </SharedElement>
                );
            })}
        </View>
    );
};

const Ticker = ({ scrollX }) => {
    const inputRange = [-width, 0, width];
    const translateY = scrollX.interpolate({
        inputRange,
        outputRange: [TICKER_HEIGHT, 0, -TICKER_HEIGHT],
    });
    return (
        <View style={styles.tickerContainer}>
            <Animated.View style={{ transform: [{ translateY }] }}>
                {data.map(({ type }, index) => {
                    return (
                        <Text key={index} style={styles.tickerText}>
                            {type}
                        </Text>
                    );
                })}
            </Animated.View>
        </View>
    );
};

const Item = ({ item, scrollX, index }) => {
    const { imageUri, heading, description } = item;
    const navigation = useNavigation();
    const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
    const inputRangeOpacity = [
        (index - 0.3) * width,
        index * width,
        (index + 0.3) * width,
    ];
    const scale = scrollX.interpolate({
        inputRange,
        outputRange: [0, 1, 0],
    });
    const translateXHeading = scrollX.interpolate({
        inputRange,
        outputRange: [width * 0.1, 0, -width * 0.1],
    });
    const translateXDescription = scrollX.interpolate({
        inputRange,
        outputRange: [width * 0.7, 0, -width * 0.7],
    });
    const opacity = scrollX.interpolate({
        inputRange: inputRangeOpacity,
        outputRange: [0, 1, 0],
    });

    return (
        <TouchableOpacity onPress={() => navigation.push('AnimateDetail', { item })} activeOpacity={.8} style={styles.itemStyle}>
            <SharedElement id={`item.${item.key}.image`} style={styles.imageStyle}>
                <Animated.Image
                    source={imageUri}
                    style={[
                        styles.imageStyle,
                        {
                            transform: [{ scale }],
                        },
                    ]}
                />
            </SharedElement>
            <View style={styles.textContainer}>
                <Animated.Text
                    style={[
                        styles.heading,
                        {
                            opacity,
                            transform: [{ translateX: translateXHeading }],
                        },
                    ]}
                >
                    {heading}
                </Animated.Text>
                <Animated.Text
                    style={[
                        styles.description,
                        {
                            opacity,
                            transform: [
                                {
                                    translateX: translateXDescription,
                                },
                            ],
                        },
                    ]}
                >
                    {description}
                </Animated.Text>
            </View>
        </TouchableOpacity>
    );
};

const Pagination = ({ scrollX }) => {
    const inputRange = [-width, 0, width];
    const translateX = scrollX.interpolate({
        inputRange,
        outputRange: [-DOT_SIZE, 0, DOT_SIZE],
    });
    return (
        <View style={[styles.pagination]}>
            <Animated.View
                style={[
                    styles.paginationIndicator,
                    {
                        position: 'absolute',
                        // backgroundColor: 'red',
                        transform: [{ translateX }],
                    },
                ]}
            />
            {data.map((item) => {
                return (
                    <View key={item.key} style={styles.paginationDotContainer}>
                        <View
                            style={[styles.paginationDot, { backgroundColor: item.color }]}
                        />
                    </View>
                );
            })}
        </View>
    );
};

export default function Animate({ navigation }) {
    const scrollX = React.useRef(new Animated.Value(0)).current;

    return (
        <View style={styles.container}>
            <StatusBar style='auto'  />
            <Circle scrollX={scrollX} />
            <Animated.FlatList
                keyExtractor={(item) => item.key}
                data={data}
                renderItem={({ item, index }) => (
                    <Item item={item} index={index} navigation={navigation} scrollX={scrollX} />
                )}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                horizontal
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
            />
            <Image
                style={styles.logo}
                source={require('../../../assets/images/black_logo.png')}
            />
            <Pagination scrollX={scrollX} />
            <Ticker scrollX={scrollX} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemStyle: {
        width,
        height,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageStyle: {
        marginBottom: Platform.OS == 'ios' ? 50 : 0,
        marginTop:50,
        width: width -100 ,
        height: width -100,
        resizeMode: 'contain',
        flex: 1,
    },
    textContainer: {
        alignItems: 'flex-start',
        alignSelf: 'flex-end',
        flex: 0.5,
    },
    heading: {
        color: '#444',
        textTransform: 'uppercase',
        fontSize: 26,
        fontWeight: '800',
        width: width * 0.75,
        letterSpacing: 0,
        marginBottom: 5,
    },
    description: {
        color: '#b7b7b7',
        fontWeight: 'normal',
        textAlign: 'left',
        width: width * 0.75,
        marginRight: 10,
        fontSize: 16,
        lineHeight: 17,
    },
    logo: {
        opacity: 0.9,
        height: LOGO_HEIGHT,
        width: LOGO_WIDTH,
        resizeMode: 'contain',
        position: 'absolute',
        left: 10,
        bottom: 10,
        transform: [
            { translateX: -LOGO_WIDTH / 2 },
            { translateY: -LOGO_HEIGHT / 2 },
            { rotateZ: '-90deg' },
            { translateX: LOGO_WIDTH / 2 },
            { translateY: LOGO_HEIGHT / 2 },
        ],
    },
    pagination: {
        position: 'absolute',
        right: 20,
        bottom: 40,
        flexDirection: 'row',
        height: DOT_SIZE,
    },
    paginationDot: {
        width: DOT_SIZE * 0.3,
        height: DOT_SIZE * 0.3,
        borderRadius: DOT_SIZE * 0.15,
    },
    paginationDotContainer: {
        width: DOT_SIZE,
        alignItems: 'center',
        justifyContent: 'center',
    },
    paginationIndicator: {
        width: DOT_SIZE,
        height: DOT_SIZE,
        borderRadius: DOT_SIZE / 2,
        borderWidth: 2,
        borderColor: '#ddd',
    },
    tickerContainer: {
        position: 'absolute',
        top: 50,
        left: 20,
        overflow: 'hidden',
        height: TICKER_HEIGHT,
    },
    tickerText: {
        fontSize: TICKER_HEIGHT,
        lineHeight: TICKER_HEIGHT,
        textTransform: 'uppercase',
        fontWeight: '800',
    },

    circleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    circle: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE / 2,
        position: 'absolute',
        top: '18%',
    },
});
