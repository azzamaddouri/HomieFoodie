import { homeStyles } from "@unistyles/homeStyles";
import React from "react";
import { View } from "react-native";
import { useStyles } from "react-native-unistyles";
import LottieView from "lottie-react-native";

const Graphics: React.FC = () => {

    const {styles} = useStyles(homeStyles);
    
    return (
       <View style={styles.lottieContainer} pointerEvents="none">
           <LottieView
               enableMergePathsAndroidForKitKatAndAbove
               enableSafeModeAndroid
               source={require("@assets/animations/event.json")}
               autoPlay
               loop
               style={styles.lottie}
               hardwareAccelerationAndroid
           />
       </View>
    );
};

export default Graphics;