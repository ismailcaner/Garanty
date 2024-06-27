import {  Text, View, StyleSheet, Image } from 'react-native';
import { useTheme } from "../themeContext";

export default empty = ({text})  =>  {
    const { theme } = useTheme();
    
    return(
        <View style={styles.empty}>
        <Image
          source={require("../../assets/file.png")}
          style={[
            styles.fileicon,
            theme === "dark" ? styles.darkFileicon : null,
          ]}
        />
        <Text
          style={[
            styles.emptyTxt,
            theme === "dark" ? styles.darkEmptyTxt : null,
          ]}
        >
          {text}
        </Text>
      </View>
    );
};

const styles = StyleSheet.create({
    empty: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      },
    
      emptyTxt: {
        fontSize: 18,
        fontWeight: "bold",
        color: "rgba(0, 0, 0, 0.2)",
      },
    
      darkEmptyTxt: {
        color: "grey",
      },

      fileicon: {
        height: 20,
        width: 20,
        tintColor: "rgba(0, 0, 0, 0.2)",
      },
    
      darkFileicon: {
        tintColor: "grey",
      },

});

