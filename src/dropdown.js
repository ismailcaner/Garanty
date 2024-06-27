import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from "../src/themeContext";
import style from './style';
import color from './color';

const data = [
  { label: 'Gün', value: 'day' },
  { label: 'Ay', value: 'month' },
];

const DropdownComponent = ({ onChange }) => {
  const [value, setValue] = useState();
  const { theme } = useTheme();

  const handleValueChange = async (item) => {
    setValue(item.value);
    try {
      await AsyncStorage.setItem('selectedFormat', item.value);
      if (onChange) {
        onChange(item.value);
      }
    } catch (error) {
      console.error('AsyncStorage kaydetme hatası:', error);
    }
  };

  console.log(value)

  useEffect(() => {
    const fetchSelectedFormat = async () => {
      try {
        const storedFormat = await AsyncStorage.getItem('selectedFormat');
        if (storedFormat !== null) {
          setValue(storedFormat);
          if (onChange) {
            onChange(storedFormat);
          }
        }
      } catch (error) {
        console.error('AsyncStorage hatası:', error);
      }
    };
    fetchSelectedFormat();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={[styles.setTxt, theme === 'dark' ? styles.setTxtDark : null]}>
        Tarih formatı
      </Text>
      <Dropdown
        style={[styles.dropdown, theme === 'dark' ? styles.dropdownDark : null]}
        selectedTextStyle={[styles.selectedTextStyle, theme === 'dark' ? styles.selectedTextStyleDark : null]} 
        iconStyle={styles.iconStyle} 
        data={data}
        labelField="label"
        valueField="value"
        value={value}
        onChange={handleValueChange}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',  
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:10
  },

  setTxt:{
    fontSize:16
  },

  setTxtDark:{
    color:'white',
  },

  selectedTextStyle:{
    fontSize: 16,
    color:'black',
    textAlign:'center',
    fontWeight:'600'
  },

  selectedTextStyleDark:{
    color:color.darkWhiteTxt,
  },

  dropdown: {
    height: 35,
    width: 70,
    alignItems: 'flex-start',
    borderColor: 'gray',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 5,
  },

  dropdownDark:{
    backgroundColor:color.darkbg,
  },

  iconStyle: {
    display:'none'
   },

});
