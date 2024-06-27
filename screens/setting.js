import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { useTheme } from "../src/themeContext";
import color from '../src/color';
import DropdownComponent from '../src/dropdown';
import Switchbtn from '../src/switchbtn';
import CustomButton from '../src/components.js/customButton';

const SettingsScreen = ({ navigation }) => {
  const { theme } = useTheme();
  
  return (
  <View style={[styles.setContainer, theme === "dark" ? styles.setContainerDark : null]}>

    <Text style={[styles.tercihTxt, theme === 'dark' ? styles.tercihTxtDark : null]}>
      Tercihler
    </Text>

    <View style={[styles.setComponent, theme === 'dark' ? styles.setComponentDark : null]}>
      <DropdownComponent />
      <Switchbtn />
    </View>
  
    <TouchableOpacity  onPress={() => navigation.navigate("Home", { refresh: true })}>
      <CustomButton text={'Kaydet'} />
    </TouchableOpacity>

  </View>
  );
};

export default SettingsScreen;
const styles = StyleSheet.create({
  setContainer:{
    flex:1,
    padding:20
  },

  setContainerDark: {
    backgroundColor: "#18181b",
  },

  tercihTxt:{
    fontWeight:'bold',
    fontSize:20,
    color:'grey'
  },

  tercihTxtDark:{
    color:'white',
  },

  setComponent: {
    backgroundColor: color.WhiteBg,
    borderRadius:15,
    marginVertical:10,
    padding:20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  setComponentDark: {
    backgroundColor:color.darkbg,
    borderWidth:1,
    borderColor:color.darkBorderColor
  }
});
