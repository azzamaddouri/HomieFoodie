import React, { FC } from 'react';
import Ionicons  from 'react-native-vector-icons/Ionicons';
import MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


interface IconProps {
    iconFamily:  "Ionicons" | "MaterialIcons" | "MaterialCommunityIcons";
    name: string;
    size?: number;
    color?: string;
}


export const Icon: FC<IconProps> = ({
    name,
    size,
    color,
    iconFamily,
    ...props
}) => (
   <>
    {iconFamily === "Ionicons" && (
        <Ionicons
            name={name}
            size={size}     
            color={color}
            {...props}
        />
    )}
    {iconFamily === "MaterialIcons" && (        
        <MaterialIcons
            name={name}
            size={size}     
            color={color}
            {...props}
        />
    )}
    {iconFamily === "MaterialCommunityIcons" && (        
        <MaterialCommunityIcons
            name={name}
            size={size}     
            color={color}
            {...props}
        />
    )}
   

   </>
);

export default Icon;