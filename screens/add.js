import React, { useState, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useTheme } from "../src/themeContext";
import style from "../src/style";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

const Add = ({ navigation }) => {
  const { theme, toggleTheme } = useTheme();
  const [isStartDatePickerVisible, setStartDatePickerVisibility] =
    useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [dayDifference, setDayDifference] = useState(0);
  const [productBrand, setProductBrand] = useState("");
  const [productModel, setProductModel] = useState("");
  const [brandError, setBrandError] = useState(false);
  const brandInputRef = useRef(null);
  const modelInputRef = useRef(null);

  const darkmod = theme === "dark" ? true : false;
  const darkmodtxt = theme === "dark" ? "white" : "black";

  const bitis = new Date(endDate);
  const eday = bitis.getDate();
  const emonth = bitis.getMonth() + 1;
  const eyear = bitis.getFullYear();

  const baslangic = new Date(startDate);
  const sday = baslangic.getDate();
  const smonth = baslangic.getMonth() + 1;
  const syear = baslangic.getFullYear();

  const showStartDatePicker = () => {
    setStartDatePickerVisibility(true);
  };

  const hideStartDatePicker = () => {
    setStartDatePickerVisibility(false);
  };

  const showEndDatePicker = () => {
    setEndDatePickerVisibility(true);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisibility(false);
  };

  const onChangeStartDate = (date) => {
    const currentDate = date || startDate;
    setStartDate(currentDate);
    hideStartDatePicker();
  };

  const onChangeEndDate = (date) => {
    const currentDate = date || endDate;
    setEndDate(currentDate);
    calculateDayDifference(startDate, currentDate);
    hideEndDatePicker();
  };

  const calculateDayDifference = (start, end) => {
    const currentDate = new Date();
    const differenceInTime = end.getTime() - currentDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    setDayDifference(Math.ceil(differenceInDays));
  };

  const handleAdd = async () => {
    if (!productBrand) {
      setBrandError(true);
      brandInputRef.current.focus();
      return;
    } else if (dayDifference <= 0) {
      Alert.alert(
        "Bitiş tarihi!",
        "Bitiş tarihi bugünden farklı ve olmalıdır.",
        [{ text: "Tamam" }],
        { cancelable: false }
      );
      return;
    } else if (endDate <= startDate) {
      Alert.alert(
        "Başlangıç tarihi!",
        "Başlangıç tarihi bitiş tarihinden büyük veya eşit olamaz.",
        [{ text: "Tamam" }],
        { cancelable: false }
      );
      return;
    }

    setBrandError(false);

    try {
      const newData = {
        id: Date.now(),
        brand: productBrand,
        model: productModel,
        bitistarih: endDate,

        endgun: eday,
        enday: emonth,
        endyil: eyear,

        startgun: sday,
        startay: smonth,
        startyil: syear,
      };

      const existingData = await AsyncStorage.getItem("data");
      let parsedExistingData = [];

      if (existingData !== null) {
        parsedExistingData = JSON.parse(existingData);
      }

      const updatedData = [...parsedExistingData, newData];
      await AsyncStorage.setItem("data", JSON.stringify(updatedData));

      await AsyncStorage.setItem("bitisdate", endDate.toISOString());

      navigation.navigate("Home", { refresh: true });

      console.log("Veri kaydedildi: ", endDate);
    } catch (error) {
      console.error("Veri kaydedilirken bir hata oluştu:", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={[style.container, theme === "dark" ? style.darkContainer : null]}
      >
        <Text
          style={[
            style.brandAddPage,
            theme === "dark" ? style.darkbrandAddPage : null,
          ]}
        >
          Ürün adı
        </Text>

        <TextInput
          ref={brandInputRef}
          style={[
            style.brandBar,
            theme === "dark" ? style.darkBrandBar : null,
            brandError ? { borderColor: "#fa5254" } : null,
          ]}
          placeholder="Ürün bilgisi giriniz.."
          placeholderTextColor={"grey"}
          value={productBrand}
          onChangeText={(text) => {
            setProductBrand(text);
            setBrandError(false);
          }}
          returnKeyType="next"
          onSubmitEditing={() => modelInputRef.current.focus()}
        />

        <Text
          style={[
            style.descriptionAddPage,
            theme === "dark" ? style.darkDescriptionAddPage : null,
          ]}
        >
          Açıklama
        </Text>

        <TextInput
          ref={modelInputRef}
          style={[
            style.descriptionBar,
            theme === "dark" ? style.darkDescriptionBar : null,
          ]}
          placeholder="Açıklama giriniz.."
          placeholderTextColor={"grey"}
          value={productModel}
          onChangeText={(text) => setProductModel(text)}
          multiline
        />

        <Text
          style={[
            style.dateTitle,
            theme === "dark" ? style.darkDateTitle : null,
          ]}
        >
          Garanti
        </Text>

        <View style={style.datePicker}>
          <View>
            <View
              style={[
                style.bitisDate,
                theme === "dark" ? style.darkBitisDate : null,
              ]}
            >
              <TouchableOpacity onPress={showStartDatePicker}>
                <Text
                  style={[
                    style.deneme,
                    theme === "dark" ? style.darkdeneme : null,
                  ]}
                >
                  Başlangıç
                </Text>
                <Text
                  style={[
                    style.enddatee,
                    theme === "dark" ? style.darkenddatee : null,
                  ]}
                >
                  {syear}.{smonth}.{sday}
                </Text>
              </TouchableOpacity>

              <DateTimePickerModal
                isVisible={isStartDatePickerVisible}
                mode="date"
                locale="tr"
                isDarkModeEnabled={darkmod}
                textColor={darkmodtxt}
                confirmTextIOS="Seç"
                onConfirm={onChangeStartDate}
                cancelTextIOS="İptal"
                onCancel={hideStartDatePicker}
              />
            </View>
          </View>

          <View>
            <View
              style={[
                style.bitisDate,
                theme === "dark" ? style.darkBitisDate : null,
              ]}
            >
              <TouchableOpacity onPress={showEndDatePicker}>
                <Text
                  style={[
                    style.deneme,
                    theme === "dark" ? style.darkdeneme : null,
                  ]}
                >
                  Bitiş
                </Text>
                <Text
                  style={[
                    style.enddatee,
                    theme === "dark" ? style.darkenddatee : null,
                  ]}
                >
                  {eyear}.{emonth}.{eday}
                </Text>
              </TouchableOpacity>
            </View>
            <DateTimePickerModal
              isVisible={isEndDatePickerVisible}
              mode="date"
              locale="tr"
              isDarkModeEnabled={darkmod}
              textColor={darkmodtxt}
              confirmTextIOS="Seç"
              onConfirm={onChangeEndDate}
              cancelTextIOS="İptal"
              onCancel={hideEndDatePicker}
            />
          </View>
        </View>

        <View style={style.VazKayBtns}>
          <TouchableOpacity
            style={[style.vazBtn, theme === "dark" ? style.darkVazBtn : null]}
            onPress={() => navigation.navigate("Home")}
          >
            <Text
              style={[style.vazTxt, theme === "dark" ? style.darkVazTxt : null]}
            >
              Vazgeç
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[style.kayBtn, theme === "dark" ? style.DarkKayBtn : null]}
            onPress={handleAdd}
          >
            <Text
              style={[style.kayTxt, theme === "dark" ? style.DarkKayTxt : null]}
            >
              Ekle
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Add;
