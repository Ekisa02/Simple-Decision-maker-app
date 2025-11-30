import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const style = StyleSheet.create({
  container: {
    flex: 1, // Takes up full screen height
    alignItems: "center", // Center items horizontally
    justifyContent: "center", // Center items vertically
    backgroundColor: "#1353d3", // Removed extra 'ff'
  },
  headercontainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40, // Separates header from the rest
  },
  image: {
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    marginRight: 15,
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  // Style for the main description text
  subText: {
    fontSize: 18, 
    color: "#e0e0e0", 
    marginBottom: 50,
    textAlign: 'center',
    paddingHorizontal: 20
  },
  // Button Styles
  mybutton: {
    backgroundColor: "#4CAF50",
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 40,
    elevation: 5, // Android Shadow
    shadowColor: "#000", // iOS Shadow
    shadowOffset: { width: 0, height: 2 }, // iOS Shadow
    shadowOpacity: 0.25, // iOS Shadow
    shadowRadius: 3.84, // iOS Shadow
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});