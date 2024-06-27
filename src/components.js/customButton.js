import {  Text, View, StyleSheet } from 'react-native';
import { useTheme } from "../themeContext";
import color from '../color';

export default customButton = ({text})  =>  {
    const { theme } = useTheme();
    
    return(
        <View style= {[styles.setSaveBtn, theme === 'dark' ? styles.setSaveBtnDark : null]}>
        <Text style={[styles.setSaveTxt, theme === 'dark' ? styles.setSaveTxtDark : null]}>{text}</Text>
      </View>
    );
};

const styles = StyleSheet.create({
  setSaveBtn: {
    padding:20,
    alignItems:'center',
    backgroundColor: color.WhiteBg,
    marginVertical:20,
    borderRadius:15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },

  setSaveBtnDark: {
    borderColor:color.darkBorderColor,
    backgroundColor: color.darkbg,
    borderWidth:1,
    borderColor: color.darkBorderColor
  },

  setSaveTxt:{
    color: color.txtBlack,
    fontSize: 18,
  },

  setSaveTxtDark:{
    color: color.txtWhite,
  },

});

