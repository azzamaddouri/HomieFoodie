import { Animated, ActivityIndicator, Image, Platform, StatusBar, Text, Touchable, TouchableOpacity, View} from 'react-native';
import CustomText from '@components/global/CustomText';
import BreakerText from '@components/ui/BreakerText';
import { loginStyles } from '@unistyles/authStyles';
import { useStyles } from 'react-native-unistyles';
import PhoneInput from '@components/ui/PhoneInput';
import { useEffect, useRef, useState } from 'react';
import { resetAndNavigate } from '@utils/NavigationUtils';
import SocialLogin from '@components/ui/SocialLogin';
import useKeyboardOffsetHeight from '@utils/useKeyboardOffsetHeight';

const LoginScreen: React.FC = () => {

   const animatedValue = useRef(new Animated.Value(0)).current;
   const keyboardOffsetHeight = useKeyboardOffsetHeight();


    const {styles} = useStyles(loginStyles);


    const [phone, setPhone] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
      if(keyboardOffsetHeight == 0) {
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(animatedValue, {
          toValue: -keyboardOffsetHeight * 0.25,
          duration: 500,  
          useNativeDriver: true,
        }).start();
      }
    }
    , [keyboardOffsetHeight]);

    const handleLogin = () => {
       setLoading(true);
       setTimeout(() => {
         setLoading(false); 
         resetAndNavigate('userBottomTab');
       }, 2000);
      }
   
    return (
      <View style={styles.container}>
       <StatusBar hidden={Platform.OS !== 'android'} />

        <Image
            source={require('@assets/images/login.png')}
            style={styles.cover}
        />

        <Animated.ScrollView
           bounces={false}
           keyboardShouldPersistTaps="handled"
           keyboardDismissMode= "on-drag"
           style={{transform: [{translateY: animatedValue}]}}
           contentContainerStyle={styles.bottomContainer}>
          <CustomText fontFamily='Okra-Bold' variant='h2' style={styles.title}>
            Tunisia's 1st Delivery & Dining App
           </CustomText>

          <BreakerText text='Login or Register' />
     
          <PhoneInput
          onFocus={() => {
          }}
          onBlur={() => {
          }}
          value={phone}
           onChangeText={ setPhone}
          />
          
          <TouchableOpacity
          style={styles.buttonContainer}
          disabled={loading}
          onPress={handleLogin}
          activeOpacity={0.8}>
          {loading ? (
            <ActivityIndicator
              size="small"
              color="#fff"
            />
          ) : (
            <CustomText fontFamily='Okra-Medium' variant='h5' color='#fff'>
              Continue
            </CustomText>
          )}
          </TouchableOpacity>

          <BreakerText text='or' />

          <SocialLogin />

        </Animated.ScrollView>


        <View style={styles.footer}>
          <CustomText>By continuing, you agree to our</CustomText>
           <View style={styles.footerTextContainer}>
            <CustomText style={styles.footerText}>Terms of service</CustomText>
            <CustomText style={styles.footerText}>Privacy of Policy</CustomText>
            <CustomText style={styles.footerText}>Content Policies</CustomText>
        </View>
      </View>     
      </View>     
);
};

export default LoginScreen;