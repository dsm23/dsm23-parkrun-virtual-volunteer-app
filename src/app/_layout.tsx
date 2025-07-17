import { useEffect } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Link, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Pressable, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SettingsLogo from "~/assets/images/settings.svg";

// import Colors from "~/constants/Colors";

import "react-native-reanimated";

import { useColorScheme } from "~/components/useColorScheme";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: "(tabs)",
// };

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerStyle: {
                backgroundColor: "#ffa300",
              },

              // header: (props) => (
              //   <View
              //     {...props}
              //     role="banner"
              //     style={{
              //       backgroundColor: "#ffa300",
              //       display: "flex",
              //       // alignItems: "center",
              //       justifyContent: "space-between",
              //       flexDirection: "row",
              //       padding: 16,
              //       flex: 1,
              //     }}
              //   >
              //     <Text style={{ fontSize: 20, fontWeight: 600 }}>
              //       Virtual Volunteer
              //     </Text>
              //     <Link href="/settings" asChild aria-label="Settings">
              //       <Pressable>
              //         {({ pressed }) => (
              //           <SettingsLogo
              //             width={28}
              //             height={28}
              //             style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
              //           />
              //         )}
              //       </Pressable>
              //     </Link>
              //   </View>
              // ),

              // headerBackground: () => (
              //   <View
              //     role="banner"
              //     style={{
              //       backgroundColor: "#ffa300",
              //       flex: 1,
              //     }}
              //   />
              // ),
              headerTitle: () => (
                <Text style={{ fontSize: 20, fontWeight: 600 }}>
                  Virtual Volunteer
                </Text>
              ),
              headerRight: () => (
                <Link href="/settings" asChild aria-label="Settings">
                  <Pressable>
                    {({ pressed }) => (
                      <SettingsLogo
                        width={28}
                        height={28}
                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                      />
                    )}
                  </Pressable>
                </Link>
              ),
            }}
          />
        </Stack>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
