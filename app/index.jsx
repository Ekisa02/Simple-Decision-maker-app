import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { style } from "../assets/styles/index.js";
function index() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={style.container}>
        <View style={style.headercontainer}>
          <Image
            style={style.image}
            source={require("../assets/images/icon.png")}
          ></Image>
          <Text style={style.text}> plan today </Text>
        </View>
        <Text style={{ fontSize: 24, color: "#fff", marginBottom: 20 }}>
          Welcome to AutoExpense Agent App
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default index;
