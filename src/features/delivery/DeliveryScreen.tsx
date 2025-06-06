import Graphics from '@components/home/Graphics';
import HeaderSection from '@components/home/HeaderSection';
import MainList from '@components/list/MainList';
import { useSharedState } from '@features/tabs/SharedContext';
import { homeStyles } from '@unistyles/homeStyles';
import React from 'react';
import { View, Platform } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStyles } from 'react-native-unistyles';

const DeliveryScreen = () => {

    const insets = useSafeAreaInsets();

    const {styles} = useStyles(homeStyles)

    const {scrollYGlobal} = useSharedState();

    const backgroundColorChanges = useAnimatedStyle(() => {
       const opacity = interpolate(
            scrollYGlobal.value,
            [0, 50],
            [0, 1],
       )
        return {
            backgroundColor: `rgba(255, 255, 255, ${opacity})`,
        };
    })

    const moveUpStyle = useAnimatedStyle(() => {
        const translateY = interpolate(
            scrollYGlobal.value,
            [0, 50],
            [0, -50],
            Extrapolate.CLAMP
        );
        return {
            transform: [{ translateY: translateY }],
        };
    });

    const moveUpStyleNotExtrapolation = useAnimatedStyle(() => {
        const translateY = interpolate(
            scrollYGlobal.value,
            [0, 50],    
            [0, -50],
        );
        return {
            transform: [{ translateY: translateY }],
        };
    }
    );

    return (
        <View style={styles.container}>
            <View style={{height: Platform.OS === 'android' ? insets.top:0}} />

            <Animated.View style={moveUpStyle}>
                <Animated.View style={moveUpStyleNotExtrapolation}>
                    <Graphics/>
                </Animated.View>


                <Animated.View style={[backgroundColorChanges, styles.topHeader]}>
                    <HeaderSection />
                </Animated.View>
                </Animated.View>

                <Animated.View style={moveUpStyle}>
                   <MainList/>
                </Animated.View>
        </View>
    );
};

export default DeliveryScreen;