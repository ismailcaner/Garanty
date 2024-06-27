import { useTheme } from "../themeContext";
import {Text, TouchableOpacity, View, StyleSheet} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import color from "../color";

export default datepickerTxt = ({Title, Tday, Tmonth, Tyear, onPress, isVisible, onConfirm, onCancel})  =>  {
    const { theme } = useTheme();
    const darkmod = theme === "dark";
    const darkmodtxt = theme === "dark" ? "white" : "black";
  
        return(
            <View
            style={[
              styles.DatePickerView,
              theme === "dark" ? styles.DatePickerViewDark : null,
            ]}
          >
            <TouchableOpacity onPress={onPress}>
            <Text
              style={[
                styles.DatePickerTitle,
                theme === "dark" ? styles.DatePickerTitleDark : null,
              ]}
            >
             {Title}
            </Text>
            <Text
              style={[
                styles.DatePickerTime,
                theme === "dark" ? styles.DatePickerTimeDark : null,
              ]}
            >
              {Tyear}.{Tmonth}.{Tday}
            </Text>
          </TouchableOpacity>

          <DateTimePickerModal
          isVisible={isVisible}
          mode="date"
          locale="tr"
          isDarkModeEnabled={darkmod}
          textColor={darkmodtxt}
          confirmTextIOS="Seç"
          onConfirm={onConfirm}
          cancelTextIOS="İptal"
          onCancel={onCancel}
        />
          </View>
    );
};

const styles = StyleSheet.create({

  DatePickerView: {
    alignItems: "center",
    flexDirection: "",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: color.WhiteBg,
    borderColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.0,
    shadowRadius: 5,
  },

  DatePickerViewDark: {
    backgroundColor: color.darkbg,
    borderColor: color.darkBorderColor,
    borderWidth: 1,
    shadowOpacity: 0,
  },

  DatePickerTitle: {
    textAlign: "center",
    fontWeight: "bold",
    paddingTop: 5,
    color:'"rgba(0, 0, 0, 0.8)"'
  },

  DatePickerTitleDark: {
    color: "grey",
  },

  DatePickerTime: {
    fontSize: 18,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },

  DatePickerTimeDark: {
    color: color.txtWhite,
  },

});

