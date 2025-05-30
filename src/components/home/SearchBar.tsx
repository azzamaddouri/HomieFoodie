import CustomText from '@components/global/CustomText';
import Icon from '@components/global/Icon';
import { useSharedState } from '@features/tabs/SharedContext';
import { Colors } from '@unistyles/Constants';
import { homeStyles } from '@unistyles/homeStyles';
import React from 'react';
import { Pressable, TouchableOpacity, View, Image } from 'react-native';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStyles } from 'react-native-unistyles';
import RollingContent from 'react-native-rolling-bar';
import { useAppDispatch, useAppSelector } from '@states/reduxHook';
import { setVegMode } from '@states/reducers/userSlice';

const searchItems : string[] = [
    'Search "chai samosa"',
    'Search "Cake"',
    'Search "ice cream"',
    'Search "pizza"',
    'Search "Biriyani"',
]


const SearchBar = () => {
    const dispatch = useAppDispatch();
    const isVegMode = useAppSelector(state => state.user.isVegMode);

    const {styles} = useStyles(homeStyles);
    const {scrollYGlobal} = useSharedState();

    const textColorAnimation = useAnimatedStyle(() => {
        const textColor = interpolate(
            scrollYGlobal.value,
            [0, 80],
            [255, 0],);
        return {
            color: `rgb(${textColor}, ${textColor}, ${textColor})`
        };
    });

    return (
        <>
         <SafeAreaView/>
            <View style={[styles.flexRowBetween,styles.padding]}>
                <TouchableOpacity
                style={styles.searchInputContainer}
                activeOpacity={0.8}>
                    <Icon
                        name="search"
                        size={20}
                       iconFamily='Ionicons'
                       color={isVegMode ? Colors.active : Colors.primary}
                    />

                    <RollingContent
                     interval={3000}
                    defaultStyle= {false}
                    customStyle = {styles.textContainer}>
                        {searchItems?.map((item, index) => {
                            return (
                                <CustomText
                                fontSize={12}
                                fontFamily='Okra-Medium'
                                key={index}
                                style={styles.rollingText}
                                >
                                    {item}
                                </CustomText>
                            );
                        })}
                    </RollingContent>

                    <Icon
                      iconFamily='Ionicons'
                      name="mic-outline"
                      size={20}
                      color={isVegMode ? Colors.active : Colors.primary}
                    />
                </TouchableOpacity>

                <Pressable
                    style={styles.vegMode}
                    onPress={() => dispatch(setVegMode(!isVegMode))
                    }
                >
                    <Animated.Text style={[styles.animatedText, textColorAnimation]}>
                        VEG
                    </Animated.Text>
                    <Animated.Text style={[styles.animatedText, textColorAnimation]}>
                        MODE
                    </Animated.Text>

                    <Image
                        source={ isVegMode 
                        ? require('@assets/icons/switch_on.png'):
                        require('@assets/icons/switch_off.png')
                        }
                        style={styles.switch}
                    />
                </Pressable>
            </View>
        </>
    );

};

export default SearchBar;