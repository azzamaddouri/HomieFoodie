import { emptyStyles } from '@unistyles/emptyStyles';
import React from 'react';
import { View, Text, Image } from 'react-native';
import { useStyles } from 'react-native-unistyles';

const LiveScreen: React.FC = () => {
     const {styles} = useStyles(emptyStyles);
        return (
            <View style={styles.container(true)}>
                <Image
                    source={require('@assets/images/coming_soon2.jpg')}
                    style={styles.emptyImage}
                />
               
            </View>
        );
};

export default LiveScreen;