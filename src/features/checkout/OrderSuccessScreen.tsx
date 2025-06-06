import { View, Text, StyleSheet } from 'react-native';
import React, { FC, useEffect } from 'react';
import { useAppDispatch } from '@states/reduxHook';
import { replace } from '@utils/NavigationUtils';
import { useRoute } from '@react-navigation/native';
import { clearRestaurantCart } from '@states/reducers/cartSlice';
import { Colors, screenWidth } from '@unistyles/Constants';
import LottieView from 'lottie-react-native';
import CustomText from '@components/global/CustomText';

const OrderSuccessScreen: FC = () => {
  const route = useRoute() as any;
  const dispatch = useAppDispatch();
  const restaurant = route?.params?.restaurant;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      replace('UserBottomTab');
      dispatch(clearRestaurantCart({ restaurant_id: restaurant?.id }))
    }, 2300);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('@assets/animations/confirm.json')}
        autoPlay
        duration={2000}
        loop={false}
        speed={1}
        style={styles.lottieView}
        enableMergePathsAndroidForKitKatAndAbove={true}
        hardwareAccelerationAndroid
      />
      <CustomText
        fontSize={12}
        fontFamily="Okra-Bold"
        style={styles.orderPlacedText}
      >
        ORDER PLACED
      </CustomText>

      <View style={styles.deliveryContainer}>
        <CustomText
          variant="h4"
          fontFamily="Okra-Bold"
          style={styles.deliveryText}>
          Delivering to Home
        </CustomText>
      </View>
      <CustomText
        fontSize={12}
        style={styles.addressText}
        fontFamily="Okra-Regular">
        Ariana, Tunis ({restaurant?.name})
      </CustomText>
    </View>

  );
};

export default OrderSuccessScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  lottieView: {
    width: screenWidth * 0.6,
    height: 150,
  },
  orderPlacedText: {
    opacity: 0.4,
  },
  deliveryContainer: {
    borderBottomWidth: 2,
    paddingBottom: 4,
    marginBottom: 5,
    borderColor: Colors.active,
  },
  deliveryText: {
    marginTop: 15,
    borderColor: Colors.active,
  },
  addressText: {
    opacity: 0.8,
  },
})