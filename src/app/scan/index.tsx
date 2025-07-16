import { Link, Stack } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import EditScreenInfo from "~/components/EditScreenInfo";
import { Text, View } from "~/components/Themed";

const ScannerScreen = () => {
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
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(tabs)/two.tsx" />
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
