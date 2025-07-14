import "@expo/metro-runtime";

import { Link } from "expo-router";
import { StyleSheet } from "react-native";
import BarcodeScannerIcon from "~/assets/images/barcodeScanner.svg";
import TimerIcon from "~/assets/images/timer.svg";
import { Text, View } from "~/components/Themed";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Link href="/scan">
        <BarcodeScannerIcon width={100} height={100} />
      </Link>
      <Link href="/stopwatch">
        <TimerIcon width={100} height={100} />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
