import { useRef } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useKeepAwake } from "expo-keep-awake";
import { Link, Stack } from "expo-router";
import type { CameraViewProps } from "expo-camera";
import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "~/components/Themed";

const ScannerScreen = () => {
  /* eslint-disable */
  const [status, requestPermission] = useCameraPermissions();
  const ref = useRef<CameraView>(null);
  /* eslint-enable */

  useKeepAwake();

  const handleBarcodeScanned: CameraViewProps["onBarcodeScanned"] = ({
    type,
    data,
  }) => {
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  // if (hasPermission === null) {
  //   return <Text>Requesting for camera permission</Text>;
  // }
  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }

  return (
    <View style={styles.container}>
      <Stack.Screen
        name="scanner"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#ffa300",
          },
          headerTitle: (props) => (
            <Text style={{ fontSize: 20, fontWeight: 600 }}>Scan</Text>
          ),
          headerRight: () => (
            <Link href="/settings" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Text
                    role="button"
                    style={{
                      marginRight: 15,
                      opacity: pressed ? 0.5 : 1,
                      backgroundColor: "#FFDA4F",
                      padding: 12,
                      cursor: "pointer",
                    }}
                  >
                    RESET
                  </Text>
                )}
              </Pressable>
            </Link>
          ),
        }}
      />

      <Text style={styles.title}>Scanner</Text>
      <View style={{ flex: 1 }}>
        <CameraView
          onBarcodeScanned={handleBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "pdf417"],
          }}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View
        style={{
          flex: 1,
        }}
      >
        hello
      </View>
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
