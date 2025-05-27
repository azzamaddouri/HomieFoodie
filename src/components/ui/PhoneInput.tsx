import CustomText from "@components/global/CustomText";
import Icon from "@components/global/Icon";
import { Colors } from "@unistyles/Constants";
import { phoneStyles } from "@unistyles/phoneStyles";
import React, { FC } from "react";
import { Pressable, TextInput, View } from "react-native";
import { useStyles } from "react-native-unistyles";

interface PhoneInputProps {
    value: string;
    onChangeText: (text: string) => void;
   onFocus?: () => void;
   onBlur?: () => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
    value,
    onChangeText,
    onFocus,
    onBlur
}) => {
    
    const {styles} = useStyles(phoneStyles);
    return (
        <View style={styles.container}>
            <Pressable
                style={styles.countryPickerContainer}>
                <CustomText variant="h2">🇹🇳</CustomText>
                <Icon 
                    iconFamily="Ionicons"
                    name="caret-down-sharp"
                    color={Colors.lightText}
                    size={18}/>
            </Pressable>

            <View style={styles.phoneInputContainer}>
                <CustomText fontFamily="Okra-Bold">
                    +216
                </CustomText>
                <TextInput
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
                style={styles.input}
                value={value}
                maxLength={10}
                onChangeText={onChangeText}
                placeholderTextColor={Colors.lightText}
                onFocus={onFocus}
                onBlur={onBlur}
                />
            </View>

        </View>
    );
};

export default PhoneInput;