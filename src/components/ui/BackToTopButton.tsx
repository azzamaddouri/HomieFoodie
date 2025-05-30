import CustomText from '@components/global/CustomText';
import Icon from '@components/global/Icon';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const BackToTopButton: React.FC<{onPress: () => void}> = ({onPress}) => {
   return (
    <TouchableOpacity onPress={onPress}
    style={{flexDirection:'row', alignItems:'center', gap:6}}>
        <Icon
        name='arrow-up-circle-outline'
        iconFamily='Ionicons'
        color='#fff'
        size={RFValue(12)}
        />
        <CustomText
        variant='h6'
        style={{color:'#fff'}}
        fontFamily='Okra-Bold'> Back to top</CustomText>
    </TouchableOpacity>
);
}

export default BackToTopButton;