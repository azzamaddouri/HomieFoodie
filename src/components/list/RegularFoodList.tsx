import ScalePress from '@components/ui/ScalePress';
import { cardStyles } from '@unistyles/cardStyles';
import { regularFoodData } from '@utils/dummyData';
import React from 'react';
import { FlatList, Image, ScrollView } from 'react-native';
import { useStyles } from 'react-native-unistyles';


const RegularFoodList: React.FC = () => {
   const {styles} = useStyles(cardStyles);

   const renderItem = ({item}: any) =>{
         return (
       <ScalePress
       style={styles.itemContainer}>
        <Image source={{ uri: item?.imageUrl }} style={styles.regularFoodImage} />
       </ScalePress>
   )}
    return (
       <ScrollView horizontal
       showsHorizontalScrollIndicator={false}>
        <FlatList 
          numColumns={Math.ceil(regularFoodData?.length/2)}
          data={regularFoodData}
          renderItem={renderItem}
          scrollEnabled={false}
          keyExtractor={item => item?.id?.toString()}
          showsHorizontalScrollIndicator = {false}
          contentContainerStyle = {styles.listContainer}
          style={styles.recommendedContainer}
          />
       </ScrollView>
    );
};

export default RegularFoodList;