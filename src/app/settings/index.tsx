import { useEffect, useState } from "react";
import { Link, Stack } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pressable, StyleSheet } from "react-native";
import BarcodeScannerIcon from "~/assets/images/barcodeScanner.svg";
import CheckIcon from "~/assets/images/check.svg";
import CrossIcon from "~/assets/images/cross.svg";
import { ExternalLink } from "~/components/ExternalLink";
import { Text, View } from "~/components/Themed";

const ScannerScreen = () => {
  const [parkrunId, setParkrunId] = useState<string | null>(null);

  const getParkrunIdFromStorage = async () => {
    try {
      const value = await AsyncStorage.getItem("parkrunId");

      if (!value) {
        setParkrunId(value);
      }
    } catch {
      alert("Failed to fetch the parkrunId from storage");
    }
  };

  useEffect(() => {
    getParkrunIdFromStorage();
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen
        name="settings"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#ffa300",
          },
          headerTitle: () => (
            <Text style={{ fontSize: 20, fontWeight: 600 }}>Settings</Text>
          ),
        }}
      />
      <Text style={styles.title}>Scan your parkrun barcode</Text>

      <View style={styles.idContainer}>
        {parkrunId ? (
          <>
            <CheckIcon width={20} height={20} fill="#00ceae" />
            <Text style={styles.idText}>A1129502</Text>
            <CrossIcon
              style={styles.cross}
              width={20}
              height={20}
              color="#9CA3AF"
            />
          </>
        ) : (
          <Link href="/" style={styles.link} asChild>
            <Pressable>
              <BarcodeScannerIcon width={20} height={20} fill="#00ceae" />
              <Text style={styles.idText}>Scan Now</Text>
            </Pressable>
          </Link>
        )}
      </View>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text>
        made by David Murdoch (
        <ExternalLink href="https://github.com/dsm23">dsm23</ExternalLink>)
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },
  idContainer: {
    alignItems: "center",
    marginTop: 16,
    flexDirection: "row",
  },
  idText: {
    marginLeft: 16,
    color: "#00ceae",
    fontSize: 18,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    flexDirection: "row",
    alignItems: "center",
  },
  cross: {
    marginLeft: "auto",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

export default ScannerScreen;
