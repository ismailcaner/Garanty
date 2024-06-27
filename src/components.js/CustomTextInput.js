import {  TextInput,focus,blur,handleSearch,searchQuery, StyleSheet } from 'react-native';
import { useTheme } from "../themeContext";
import color from '../color';

export default CustomTextInput = ({CustomPlaceholder, CustomonChangeText, CustomonKeyPress, Customvalue})  =>  {
    const { theme } = useTheme();
    
    return(
        <TextInput
          style={[
            styles.searchbar,
            theme === "dark" ? styles.darksearchbar : null,
          ]}
          placeholder={CustomPlaceholder}
          placeholderTextColor={"grey"}
          onFocus={focus}
          onBlur={blur}
          onChangeText={CustomonChangeText}
          onKeyPress={CustomonKeyPress}
          value={Customvalue}
        />
    );
};

const styles = StyleSheet.create({
    searchbar: {
        borderWidth: 1,
        borderColor: color.txtWhite,
        height: 50,
        flex: 1,
        borderRadius: 10,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        backgroundColor: color.WhiteBg,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
    
      darksearchbar: {
        backgroundColor: color.darkbg,
        borderColor: color.darkBorderColor,
        color: color.txtWhite,
      },

});

