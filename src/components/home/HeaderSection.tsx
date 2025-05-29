import React from "react";
import { View } from "react-native";
import LocationHeader from "./LocationHeader";
import SearchBar from "./SearchBar";

const HeaderSection = () => {
    return (
        <View>
            <LocationHeader />
            <SearchBar/>
        </View>
    );
};

export default HeaderSection;