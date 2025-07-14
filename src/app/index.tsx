import "@expo/metro-runtime";

import { Link } from "expo-router";
import { StyleSheet } from "react-native";
import BarcodeScannerIcon from "~/assets/images/barcodeScanner.svg";
import TimerIcon from "~/assets/images/timer.svg";
import { Text, View } from "~/components/Themed";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text role="heading" style={styles.title}>
        Home
      </Text>
      <Link href="/scan" style={styles.scannerLink}>
        <BarcodeScannerIcon width={100} height={100} fill="#fff" />
      </Link>
      <Link href="/stopwatch" style={styles.stopwatchLink}>
        <TimerIcon width={100} height={100} fill="#fff" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    position: "absolute",
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    borderWidth: 0,
  },
  scannerLink: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00ceae",
  },
  stopwatchLink: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2b233d",
  },
});
