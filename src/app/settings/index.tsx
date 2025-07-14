import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { Text, View } from "~/components/Themed";

const ScannerScreen = () => {
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
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text>made by David Murdoch</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    padding: 32,
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
