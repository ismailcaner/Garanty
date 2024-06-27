import { useTheme } from "../themeContext";
import {Text, StyleSheet} from "react-native";

export default CustomText = ({text})  =>  {
    const { theme } = useTheme();
  
        return(
            <Text
            style={[
                styles.TitleTxt,
              theme === "dark" ? styles.TitleTxtDark : null,
            ]}
          >
                {text}
            </Text>

       );
};

const styles = StyleSheet.create({
    TitleTxt: {
        fontSize: 15,
        fontWeight: "bold",
        marginHorizontal: 20,
        marginBottom: 5,
        marginTop: 20,
        color: "rgba(0, 0, 0, 0.4)",
      },
    
      TitleTxtDark: {
        color: "grey",
      },
 
});