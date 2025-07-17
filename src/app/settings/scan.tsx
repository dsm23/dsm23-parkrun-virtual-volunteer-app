import { useEffect, useRef } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Stack, useRouter } from "expo-router";
import type { CameraViewProps } from "expo-camera";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet } from "react-native";
import { Text, View } from "~/components/Themed";

const ScannerScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const ref = useRef<CameraView>(null);

  const router = useRouter();

  const handleBarcodeScanned: CameraViewProps["onBarcodeScanned"] = async ({
    data,
  }) => {
    try {
      if (!/A\d+/.test(data)) {
        throw new Error("Not a parkrunId");
      }

      await AsyncStorage.setItem("parkrunId", data);

      return router.back();
    } catch {
      alert("Failed to add the parkrunId to storage");
    }
  };

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  return (
    <View style={styles.container}>
      <Stack.Screen
        name="scanner"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#ffa300",
          },
          headerTitle: () => (
            <Text style={{ fontSize: 20, fontWeight: 600 }}>
              Scan your parkrun barcode
            </Text>
          ),
        }}
      />

      <Text style={styles.title}>Scan your parkrun barcode</Text>

      <CameraView
        ref={ref}
        onBarcodeScanned={handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417", "code128", "codabar"],
        }}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
};

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

export default ScannerScreen;
