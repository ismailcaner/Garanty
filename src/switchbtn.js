import React, { useState, useEffect } from 'react';
import {  Text, View, StyleSheet } from 'react-native';
import { useTheme } from "../src/themeContext";
import ToggleSwitch from 'toggle-switch-react-native';

const switchbtn = () => {
    const { theme, toggleTheme } = useTheme();
    const [isOn, setIsOn] = useState(theme === 'dark');
  
    useEffect(() => {
      setIsOn(theme === 'dark');
    }, [theme]);
  
    const handleToggle = (isOn) => {
      setIsOn(isOn);
      toggleTheme();
    };
return(
<View style={styles.switchbtn }>
        <Text style={[styles.setTxt, theme === 'dark' ? styles.setTxtDark : null]}>
            Koyu mod
        </Text>
        <ToggleSwitch
            isOn={isOn}
            onColor="#12b981"
            offColor="grey"
            animationSpeed={10}
            size="medium"
            onToggle={handleToggle}
        />
</View>
);
};

export default switchbtn;

const styles = StyleSheet.create({
  setTxt:{
    fontSize:16
  },

  setTxtDark:{
    color:'white',
  },

  switchbtn:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop:10
  },

});