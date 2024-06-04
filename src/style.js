import { StyleSheet } from "react-native";
export default StyleSheet.create({
  container: {
    flex: 1,
  },

  darkContainer: {
    backgroundColor: "#18181b",
  },

  searchrow: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  searchbar: {
    borderWidth: 1,
    borderColor: "white",
    height: 50,
    flex: 1,
    borderRadius: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  darksearchbar: {
    backgroundColor: "#27272a",
    borderColor: "grey",
    color: "white",
  },

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

  addBtn: {
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "rgba(0,0,0,0)",
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },

  addbtn: {
    height: 50,
    width: 50,
    borderColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "#030081",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },

  productlist: {
    flex: 1,
    marginBottom: 20,
  },

  producttitle: {
    fontSize: 20,
    margin: 15,
    fontWeight: "bold",
    color: "rgba(0, 0, 0, 0.4)",
  },

  darkProducttitle: {
    color: "grey",
  },

  product: {
    height: 100,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: "center",
    padding: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  darkProduct: {
    backgroundColor: "#27272a",
    borderColor: "grey",
  },

  productdetails: {
    justifyContent: "space-evenly",
    flexDirection: "column",
    height: 100,
  },

  productbrand: {
    fontWeight: "bold",
    color: "black",
    fontSize: 15,
  },

  darkProductbrand: {
    fontWeight: "bold",
    color: "white",
    fontSize: 15,
  },

  description: {
    color: "grey",
    fontSize: 15,
    width: 200,
    fontWeight: "500",
  },

  deletebtn: {
    justifyContent: "space-evenly",
    alignItems: "flex-end",
    flexDirection: "column",
    height: 100,
  },

  delete: {
    backgroundColor: "rgba(128, 128, 128, 0.1)",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginLeft: 5,
    fontWeight: "bold",
  },

  darkDelete: {
    backgroundColor: "#18181b",
  },

  productTimeColor: {
    fontSize: 15,
    fontWeight: "bold",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
  },

  brandAddPage: {
    fontSize: 15,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginBottom: 5,
    marginTop: 20,
    color: "rgba(0, 0, 0, 0.4)",
  },

  darkbrandAddPage: {
    color: "grey",
  },

  brandBar: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    backgroundColor: "white",
    borderColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  darkBrandBar: {
    backgroundColor: "#27272a",
    borderColor: "grey",
    color: "white",
  },

  descriptionAddPage: {
    fontSize: 15,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginBottom: 5,
    marginTop: 20,
    color: "rgba(0, 0, 0, 0.4)",
  },

  darkDescriptionAddPage: {
    color: "grey",
  },

  descriptionBar: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    backgroundColor: "white",
    borderColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  darkDescriptionBar: {
    backgroundColor: "#27272a",
    borderColor: "grey",
    color: "white",
  },

  dateTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginBottom: 25,
    marginTop: 20,
    color: "rgba(0, 0, 0, 0.4)",
  },

  darkDateTitle: {
    color: "grey",
  },

  bitisDate: {
    alignItems: "center",
    flexDirection: "",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "white",
    borderColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.0,
    shadowRadius: 5,
  },

  darkBitisDate: {
    backgroundColor: "#27272a",
    borderColor: "grey",
    borderWidth: 1,
    shadowOpacity: 0,
  },

  VazKayBtns: {
    flexDirection: "row",
    marginTop: 100,
    justifyContent: "space-evenly",
  },

  vazBtn: {
    borderWidth: 1,
    borderColor: "white",
    width: 150,
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },

  darkVazBtn: {
    backgroundColor: "#27272a",
    borderColor: "grey",
  },

  vazTxt: {
    fontSize: 18,
    textAlign: "center",
    color: "grey",
  },

  darkVazTxt: {
    color: "white",
  },

  kayBtn: {
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.9)",
    padding: 10,
    borderRadius: 10,
    width: 150,
    marginLeft: 10,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },

  DarkKayBtn: {
    backgroundColor: "white",
  },

  kayTxt: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
  },

  DarkKayTxt: {
    color: "black",
  },

  calendar: {
    width: 15,
    height: 15,
  },

  calendarAddPage: {
    width: 22,
    height: 22,
    marginLeft: 6,
    tintColor: "grey",
  },

  datePicker: {
    justifyContent: "space-evenly",
    flexDirection: "row",
  },

  fileicon: {
    height: 20,
    width: 20,
    tintColor: "rgba(0, 0, 0, 0.2)",
  },

  darkFileicon: {
    tintColor: "grey",
  },

  selectedProductText: {
    color: "grey",
    fontSize: 15,
    fontWeight: "500",
  },

  datepicker: {
    marginBottom: 10,
    color: "grey",
    fontWeight: "500",
  },

  deleteBtns: {
    flexDirection: "row",
  },

  yesDeleteBtn: {
    fontWeight: "bold",
    color: "#fa5254",
  },

  xicon: {
    width: 11,
    height: 18,
    tintColor: "rgba(0, 0, 0, 0.6)",
    resizeMode: "contain",
  },

  darkXicon: {
    tintColor: "white",
  },

  trashicon: {
    width: 18,
    height: 18,
    tintColor: "#fa5254",
  },

  DarkLight: {
    marginRight: 20,
    borderWidth: 0,
    padding: 3,
    borderRadius: 5,
    borderColor: "black",
  },

  enddatee: {
    fontSize: 18,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },

  darkenddatee: {
    color: "white",
  },

  deneme: {
    textAlign: "center",
    fontWeight: "bold",
    paddingTop: 5,
  },

  darkdeneme: {
    color: "grey",
  },
});
