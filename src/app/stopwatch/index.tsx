import { Stack } from "expo-router";
import { Button, Pressable, StyleSheet, VirtualizedList } from "react-native";
import TimerIcon from "~/assets/images/timer.svg";
import { Text, View } from "~/components/Themed";
import useStopwatch from "~/hooks/use-stopwatch";

import "@expo/metro-runtime";

type Result = {
  id: string;
  time: number;
  formattedTime: string;
};

const StopwatchScreen = () => {
  const {
    isRunning,
    startAndTakeResults,
    pause,
    reset,
    results,
    minutes,
    seconds,
    milliseconds,
  } = useStopwatch();

  return (
    <View style={styles.container}>
      <Stack.Screen
        name="stopwatch"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#ffa300",
          },
          headerTitle: () => (
            <Text style={{ fontSize: 20, fontWeight: 600 }}>
              {minutes}:{seconds}:{milliseconds}
            </Text>
          ),
          headerRight: () =>
            isRunning ? (
              <Button title="Stop" onPress={pause} />
            ) : (
              <Button title="Reset" onPress={() => reset()} />
            ),
        }}
      />
      <View style={styles.tableContainer}>
        <Text role="heading" style={styles.title}>
          Stopwatch
        </Text>
        <View style={{ padding: 16, flexDirection: "row" }}>
          <Text style={{ fontSize: 18, fontWeight: 600, flex: 1 }}>
            Position
          </Text>
          <Text style={{ fontSize: 18, fontWeight: 600, flex: 2 }}>Time</Text>
        </View>

        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />

        <VirtualizedList<Result>
          // initialNumToRender={10}
          renderItem={({ item }) => <Text>{item.formattedTime}</Text>}
          keyExtractor={(item) => item.id}
          getItemCount={() => results.length}
          getItem={(_, index) => results[index]}
        />
      </View>

      <Pressable style={styles.timerContainer} onPress={startAndTakeResults}>
        <TimerIcon width={100} height={100} fill="#fff" />
      </Pressable>
    </View>
  );
};

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
  separator: {
    // marginVertical: 30,
    marginHorizontal: 16,
    height: 1,
  },
  tableContainer: {
    flex: 1,
  },
  timerContainer: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2b233d",
  },
});

export default StopwatchScreen;
