import React, { useState, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { useTheme } from "../src/themeContext";
import style from "../src/style";
import Datepicker from "../src/components.js/datepicker";
import CustomText from "../src/components.js/text";
import CustomTextInput from "../src/components.js/CustomTextInput";

import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

const Add = ({ navigation }) => {
  const { theme } = useTheme();
  const [isStartDatePickerVisible, setStartDatePickerVisibility] =
    useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [dayDifference, setDayDifference] = useState(0);
  const [productBrand, setProductBrand] = useState("");
  const [productModel, setProductModel] = useState("");
  const brandInputRef = useRef(null);
  const modelInputRef = useRef(null);

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


  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={style.successToast}
        text1Style={style.successText1}
        text2Style={style.successText2}
      />
    ),
    error: (props) => (
      <ErrorToast
        {...props}
        style={style.errorToast}
        text1Style={style.errorText1}
        text2Style={style.errorText2}
      />
    ),
    info: (props) => (
      <ErrorToast
        {...props}
        style={style.infoToast}
        text1Style={style.infoText1}
        text2Style={style.infoText2}
      />
    ),
  };
  

  const showToast = (type) => {
    Toast.show({
      type: type,
      text1: type === 'success' ? 'Ürün bilgisi!' : type === 'error' ? 'Bitiş Tarihi!' : 'Başlangıç Tarihi!',
      text2: type === 'success' ? 'Ürün adı giriniz.' : type === 'error' ? 'Bitiş tarihi bugünden farklı ve ileri bir tarih olmalı.' : 'Başlangıç tarihi bitişten büyük veya eşit olamaz.',
      topOffset: 40,
      visibilityTime: 4000,
    });
  };
  
  const handleAdd = async () => {
    if (!productBrand) {
      brandInputRef.current.focus();
      showToast('success')
      return;
    } else if (dayDifference <= 0) {
      showToast('error')
      return;
    } else if (endDate <= startDate) {
      showToast('info')
      return;
    }

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
    Toast.hide();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={[style.container, theme === "dark" ? style.darkContainer : null]}
      >
      <CustomText text={'Ürün adı'}/>
        <TextInput
          ref={brandInputRef}
          style={[
            style.brandBar,
            theme === "dark" ? style.darkBrandBar : null
          ]}
          placeholder="Ürün bilgisi giriniz.."
          placeholderTextColor={"grey"}
          value={productBrand}
          onChangeText={(text) => {
            setProductBrand(text);
          }}
          returnKeyType="next"
          onSubmitEditing={() => modelInputRef.current.focus()}
        />
    

      <CustomText text={'Açıklama'}/>
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

      <CustomText text={'Garanti'}/>
        <View style={style.DatePickerMainView}>
          <Datepicker
             Title={'Başlangıç'}
             Tday={sday}
             Tmonth={smonth}
             Tyear={syear}
             onPress={showStartDatePicker}
             isVisible={isStartDatePickerVisible}
             onConfirm={onChangeStartDate}
             onCancel={hideStartDatePicker} />
          <Datepicker
             Title={'Bitiş'}
             Tday={eday}
             Tmonth={emonth}
             Tyear={eyear}
             onPress={showEndDatePicker}
             isVisible={isEndDatePickerVisible}
             onConfirm={onChangeEndDate}
             onCancel={hideEndDatePicker} />
        </View>

        <View style={style.VazKayBtns}>
          <TouchableOpacity
            style={[style.vazBtn, theme === "dark" ? style.darkVazBtn : null]}
            onPress={() => navigation.navigate("Home" , Toast.hide())}
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
