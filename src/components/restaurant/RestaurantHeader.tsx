import { useStyles } from 'react-native-unistyles';
import { TouchableOpacity, View } from 'react-native';
import { FC } from 'react';
import { restaurantHeaderStyles } from '@unistyles/restuarantStyles';
import CustomText from '@components/global/CustomText';
import { goBack } from '@utils/NavigationUtils';
import Icon from '@components/global/Icon';

const RestaurantHeader: FC<{title: string}> = ({title}) => {
  const { styles } = useStyles(restaurantHeaderStyles);

  return (
    <View style={[styles.headerContainer]}>
      <View style={styles.flexRowGap}>
        <TouchableOpacity onPress={() => goBack()}>
          <Icon name="arrow-left" 
          iconFamily="MaterialCommunityIcons" size={24} />
        </TouchableOpacity>
        <View>
          <CustomText fontFamily="Okra-Medium" fontSize={9.5} style={styles.title}>
            {title}
          </CustomText>
          <CustomText fontFamily="Okra-Bold" fontSize={11}>
            Recommended for you
          </CustomText>
        </View>
      </View>
      <TouchableOpacity onPress={() => {}}>
        <Icon name="ellipsis-vertical-sharp" iconFamily="Ionicons" size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default RestaurantHeader;