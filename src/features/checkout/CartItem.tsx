import CustomText from '@components/global/CustomText';
import Icon from '@components/global/Icon';
import { clearRestaurantCart } from '@states/reducers/cartSlice';
import { useAppDispatch } from '@states/reduxHook';
import { cartStyles } from '@unistyles/cartStyles';
import { Colors } from '@unistyles/Constants';
import { navigate } from '@utils/NavigationUtils';
import React, { FC, useMemo } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useStyles } from 'react-native-unistyles';

const CartItem: FC<{ item: any }> = ({ item }) => {
    const dispatch = useAppDispatch();
    const { styles } = useStyles(cartStyles);
    const deleteCart = async (id: any) =>
        dispatch(clearRestaurantCart({ restaurant_id: id }));

    const totalItems = useMemo(() => {
        return item.items.reduce((acc: any, item: any) => {
            acc += item.quantity;
            return acc;
        }, 0);
    }, [item.items]);

    return (
        <View style={styles.cartItemContainer}>
            <View style={styles.flexRowGap}>
                <Image
                    source={{ uri: item?.restaurant?.imageUrl }}
                    style={styles.image}
                />
                <View>
                    <CustomText fontFamily="Okra-Medium" fontSize={10}>
                        {item?.restaurant?.name}
                    </CustomText>
                    <TouchableOpacity
                        style={styles.flexRow}
                        onPress={() => {
                            navigate('RestaurantScreen', { item: item.restaurant })
                        }}>

                        <CustomText
                            style={{ top: -1 }}
                            fontSize={9}
                            fontFamily="Okra-Medium"
                            color={Colors.active}
                        >
                            View Menu
                        </CustomText>
                        <Icon
                            name="chevron-right"
                            iconFamily="MaterialIcons"
                            color={Colors.active}
                            size={12}
                        />

                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default CartItem;