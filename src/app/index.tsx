import "@expo/metro-runtime";

import { Link } from "expo-router";
import Head from "expo-router/head";
import { Pressable, StyleSheet } from "react-native";
import BarcodeScannerIcon from "~/assets/images/barcodeScanner.svg";
import TimerIcon from "~/assets/images/timer.svg";
import { Text, View } from "~/components/Themed";

export default function TabOneScreen() {
  return (
    <View role="main" style={styles.container}>
      <Head>
        <title>David Murdoch{"'"}s Virtual Volunteer App</title>
        <meta
          name="description"
          content="A clone of Parkrun's official virtual volunteer app written in Expo"
        />
      </Head>
      <Text role="heading" style={styles.title}>
        Home
      </Text>
      <Link
        href="/scan"
        style={styles.scannerLink}
        aria-label="Scanner"
        asChild
      >
        <Pressable>
          <BarcodeScannerIcon width={100} height={100} fill="#fff" />
        </Pressable>
      </Link>
      <Link
        href="/stopwatch"
        style={styles.stopwatchLink}
        aria-label="Stopwatch"
        asChild
      >
        <Pressable>
          <TimerIcon width={100} height={100} fill="#fff" />
        </Pressable>
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00ceae",
  },
  stopwatchLink: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2b233d",
  },
});
