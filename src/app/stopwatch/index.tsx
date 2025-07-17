import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";
import { Stack } from "expo-router";
import { Button, Pressable, StyleSheet, VirtualizedList } from "react-native";
import PlayIcon from "~/assets/images/play.svg";
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

  const handlePressCircleIconSection = async () => {
    startAndTakeResults();

    await impactAsync(ImpactFeedbackStyle.Heavy);
  };

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
          <Text style={{ fontSize: 18, fontWeight: 600, flex: 2 }}>
            Position
          </Text>
          <Text style={{ fontSize: 18, fontWeight: 600, flex: 3 }}>Time</Text>
        </View>

        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />

        <VirtualizedList<Result>
          style={styles.list}
          // initialNumToRender={10}
          renderItem={({ item, index }) => (
            <View style={styles.listItem}>
              <Text style={{ flex: 2 }}>{results.length - index}</Text>

              <Text style={{ flex: 3 }}>{item.formattedTime}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
          getItemCount={() => results.length}
          getItem={(_, index) => results.at(-index - 1)!}
        />
      </View>

      <Pressable
        style={styles.timerContainer}
        onPress={handlePressCircleIconSection}
      >
        {isRunning ? (
          <TimerIcon width={100} height={100} fill="#fff" />
        ) : (
          <PlayIcon width={100} height={100} fill="#fff" />
        )}
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
  list: {
    marginHorizontal: 16,
  },
  listItem: {
    flexDirection: "row",
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
