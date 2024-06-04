import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import style from "../src/style";
import { useTheme } from "../src/themeContext";

import {
  StatusBar,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  RefreshControl,
} from "react-native";

import {
  green,
  greentxt,
  grey,
  greytxt,
  yellow,
  yellowtxt,
  red,
  redtxt,
} from "../src/color";

const Home = ({ navigation, route }) => {
  const { theme, toggleTheme } = useTheme();

  const [data, setData] = useState([]);
  const [refresh] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(null);
  const focus = () => setIsFocused(true);
  const blur = () => setIsFocused(false);

  const günkaldı = " gün kaldı";
  const doldu = "Doldu";
  const addicon = require("../assets/add.png");
  const x = require("../assets/close.png");
  const trash = require("../assets/trash2.png");

  useEffect(() => {
    gunfarki();
    fetchData();
    const intervalId = setInterval(gunfarki, 60000);
    return () => clearInterval(intervalId);
  }, [route.params?.refresh]);

  const gunfarki = async () => {
    try {
      const jsonData = await AsyncStorage.getItem("data");
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData).map((item) => {
          if (item.bitistarih) {
            const bitisTarihi = new Date(item.bitistarih);
            const simdikiTarih = new Date();
            const bitisGunAyYil = new Date(
              bitisTarihi.getFullYear(),
              bitisTarihi.getMonth(),
              bitisTarihi.getDate()
            );
            const simdikiGunAyYil = new Date(
              simdikiTarih.getFullYear(),
              simdikiTarih.getMonth(),
              simdikiTarih.getDate()
            );

            const oneDay = 1000 * 60 * 60 * 24;
            const farkMilisaniye = Math.abs(bitisGunAyYil - simdikiGunAyYil);
            const farkGun = Math.ceil(farkMilisaniye / oneDay);

            item.kalangün = farkGun > 0 ? farkGun : 0;
            console.log(item.kalangün);
          }
          return item;
        });
        await AsyncStorage.setItem("data", JSON.stringify(parsedData));
        setData(parsedData);
      }
    } catch (error) {
      console.error("Veri güncelleme hatası:", error);
    }
  };

  useEffect(() => {
    if (route.params?.refresh) {
      fetchData();
      gunfarki();
      navigation.setParams({ refresh: false });
    }
  });

  const fetchData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem("data");
      if (jsonData !== null) {
        setData(JSON.parse(jsonData));
      }
    } catch (error) {
      console.error("Veri getirme hatası:", error);
    }
  };

  const handleDelete = async (id) => {
    const newData = data.filter((item) => item.id !== id);
    await AsyncStorage.setItem("data", JSON.stringify(newData));
    setData(newData);
    console.log("Veri silindi:" + id);
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text && typeof text === "string") {
      const query = text.toLowerCase();
      const filteredData = data.filter((item) => {
        const brand = item.brand.toLowerCase();
        return brand.includes(query);
      });
      setData(filteredData);
    } else {
      fetchData();
    }
  };

  const handleToggleDetails = (item) => {
    setSelectedProduct(selectedProduct === item ? null : item);
  };

  const handleToggleDeleteMode = (id) => {
    setIsDeleteMode(isDeleteMode === id ? null : id);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    await gunfarki();
    handleToggleDeleteMode();
    setRefreshing(false);
  };

  return (
    <View
      style={[style.container, theme === "dark" ? style.darkContainer : null]}
    >
      <StatusBar />
      <View style={style.searchrow}>
        <TextInput
          style={[
            style.searchbar,
            theme === "dark" ? style.darksearchbar : null,
          ]}
          placeholder="Ara.."
          placeholderTextColor={"grey"}
          onFocus={focus}
          onBlur={blur}
          onChangeText={handleSearch}
          onKeyPress={handleSearch}
          value={searchQuery}
        />
      </View>

      <View style={style.productlist}>
        <Text
          style={[
            style.producttitle,
            theme === "dark" ? style.darkProducttitle : null,
          ]}
        >
          Ürünler
        </Text>

        {data.length > 0 ? (
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleToggleDetails(item)}>
                <View
                  style={[
                    style.product,
                    theme === "dark" ? style.darkProduct : null,
                  ]}
                >
                  <View style={style.productdetails}>
                    <Text
                      style={[
                        style.productbrand,
                        theme === "dark" ? style.darkProductbrand : null,
                      ]}
                    >
                      {item === selectedProduct ? "Garanti" : item.brand}
                    </Text>

                    <Text
                      style={[
                        style.productbrand,
                        item === selectedProduct
                          ? style.description
                          : { display: "none" },
                        theme === "dark" && style.selectedProductText,
                      ]}
                    >
                      {item === selectedProduct
                        ? `Başlangıç: ${item.startyil}.${
                            item.startay < 10
                              ? "0" + item.startay
                              : item.startay
                          }.${item.startgun}`
                        : null}
                    </Text>

                    <Text
                      style={[
                        style.description,
                        item === selectedProduct && style.selectedProductText,
                      ]}
                    >
                      {item === selectedProduct
                        ? `Bitiş: ${item.endyil}.${
                            item.enday < 10 ? "0" + item.enday : item.enday
                          }.${item.endgun}`
                        : item.model}
                    </Text>
                  </View>

                  <View style={style.deletebtn}>
                    <TouchableOpacity
                      onPress={() => handleToggleDeleteMode(item.id)}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        {isDeleteMode === item.id ? (
                          <View style={style.deleteBtns}>
                            <View
                              style={[
                                style.delete,
                                theme === "dark" ? style.darkDelete : null,
                              ]}
                            >
                              <TouchableOpacity
                                onPress={() => handleDelete(item.id)}
                              >
                                <Text style={style.yesDeleteBtn}>
                                  Evet, sil
                                </Text>
                              </TouchableOpacity>
                            </View>
                            <View
                              style={[
                                style.delete,
                                theme === "dark" ? style.darkDelete : null,
                              ]}
                            >
                              <Image
                                source={x}
                                style={[
                                  style.xicon,
                                  theme === "dark" ? style.darkXicon : null,
                                ]}
                              />
                            </View>
                          </View>
                        ) : (
                          <View
                            style={[
                              style.delete,
                              theme === "dark" ? style.darkDelete : null,
                            ]}
                          >
                            <Image source={trash} style={[style.trashicon]} />
                          </View>
                        )}
                      </View>
                    </TouchableOpacity>
                    <View
                      style={[
                        style.productTimeColor,
                        {
                          backgroundColor:
                            item.kalangün > 210
                              ? green
                              : item.kalangün > 90
                              ? grey
                              : item.kalangün > 30
                              ? yellow
                              : red,
                        },
                      ]}
                    >
                      <Image
                        style={[
                          style.calendar,
                          {
                            tintColor:
                              item.kalangün > 210
                                ? greentxt
                                : item.kalangün > 90
                                ? greytxt
                                : item.kalangün > 30
                                ? yellowtxt
                                : redtxt,
                          },
                        ]}
                        source={require("../assets/calendar.png")}
                      />
                      <Text
                        style={[
                          style.productTimeColor,
                          {
                            color:
                              item.kalangün > 210
                                ? greentxt
                                : item.kalangün > 90
                                ? greytxt
                                : item.kalangün > 30
                                ? yellowtxt
                                : redtxt,
                          },
                        ]}
                      >
                        {item.kalangün === 0
                          ? doldu
                          : `${item.kalangün + günkaldı}`}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        ) : (
          <View style={style.empty}>
            <Image
              source={require("../assets/file.png")}
              style={[
                style.fileicon,
                theme === "dark" ? style.darkFileicon : null,
              ]}
            />
            <Text
              style={[
                style.emptyTxt,
                theme === "dark" ? style.darkEmptyTxt : null,
              ]}
            >
              Ürün yok
            </Text>
          </View>
        )}
      </View>

      <View style={style.addBtn}>
        <TouchableOpacity
          style={style.addbtn}
          onPress={() => navigation.navigate("Add")}
        >
          <Image
            source={addicon}
            style={{ width: 20, height: 20, tintColor: "white" }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
