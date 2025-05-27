import CustomText from '@components/global/CustomText';
import { loginStyles } from '@unistyles/authStyles';
import React from 'react';
import { View } from 'react-native';
import { useStyles } from 'react-native-unistyles';



const BreakerText: React.FC<{text: string}> = ({ text }) => {
    
    const {styles} = useStyles(loginStyles);

    return (
        <View style={styles.breakerContainer}>
            <View style={styles.horizontalLine}>
            </View>
       <CustomText
       fontSize={12}
       fontFamily='Okra-Medium'
       style={styles.breakerText}>
        {text}
       </CustomText>
       <View style={styles.horizontalLine} />
       </View>
    );
};

export default BreakerText;