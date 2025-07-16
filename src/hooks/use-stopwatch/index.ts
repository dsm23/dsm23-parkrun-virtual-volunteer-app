import { useCallback, useState } from "react";
import useInterval from "~/hooks/use-interval";
import Time from "~/utils/Time";
import type { FormattedTimeFromMillisecondsType } from "~/utils/Time";

export type useStopwatchSettingsType = {
  offsetTimestamp?: Date;
  interval?: number;
};

type Result = {
  id: string;
  time: number;
  formattedTime: string;
};

export type useStopwatchResultType = FormattedTimeFromMillisecondsType & {
  results: Result[];
  startAndTakeResults: () => void;
  pause: () => void;
  reset: (offset?: Date, newAutoStart?: boolean) => void;
  isRunning: boolean;
};

const CUSTOM_INTERVAL = 1;

const useStopwatch = ({
  offsetTimestamp,
  interval: customInterval = CUSTOM_INTERVAL,
}: useStopwatchSettingsType = {}): useStopwatchResultType => {
  const offsetMilliseconds = offsetTimestamp
    ? Time.getMillisecondsFromExpiry(offsetTimestamp)
    : 0;
  const [prevTime, setPrevTime] = useState<number>(
    new Date().getTime() - new Date(offsetMilliseconds).getTime(),
  );
  const [milliseconds, setMilliseconds] = useState(
    Time.getMillisecondsFromPrevTime(prevTime || 0),
  );
  const [isRunning, setIsRunning] = useState(false);
  const millisecondsInitialOffset =
    CUSTOM_INTERVAL - (milliseconds % CUSTOM_INTERVAL);
  const [interval, setInterval] = useState(
    customInterval < millisecondsInitialOffset
      ? customInterval
      : millisecondsInitialOffset,
  );

  const [results, setResults] = useState<Result[]>([]);

  useInterval(
    () => {
      if (interval !== customInterval) {
        setInterval(customInterval);
      }

      setMilliseconds(Time.getMillisecondsFromPrevTime(prevTime));
    },
    isRunning ? interval : null,
  );

  const startAndTakeResults = useCallback(() => {
    if (!isRunning) {
      setPrevTime(new Date().getTime() - new Date(milliseconds).getTime());
      setIsRunning(true);
      return;
    }

    setResults((prevResults) => {
      const time = Time.getMillisecondsFromPrevTime(prevTime);

      const {
        minutes,
        seconds,
        milliseconds: formattedMilliseconds,
      } = Time.getFormattedTimeFromMilliseconds(time);

      return [
        ...prevResults,
        {
          id: crypto.randomUUID(),
          time,
          formattedTime: `${minutes}:${seconds}:${formattedMilliseconds}`,
        },
      ];
    });
  }, [isRunning, milliseconds, prevTime]);

  const pause = useCallback(() => {
    if (isRunning) {
      setMilliseconds(Time.getMillisecondsFromPrevTime(prevTime));
      setIsRunning(false);
    }
  }, [prevTime, isRunning]);

  const reset = useCallback(
    (offset?: Date) => {
      const newOffsetMilliseconds = offset
        ? Time.getMillisecondsFromExpiry(offset)
        : 0;
      const newPrevTime =
        new Date().getTime() - new Date(newOffsetMilliseconds).getTime();
      const newMilliseconds = Time.getMillisecondsFromPrevTime(newPrevTime);
      const millisecondsOffset =
        CUSTOM_INTERVAL - (newMilliseconds % CUSTOM_INTERVAL);
      setPrevTime(newPrevTime);
      setMilliseconds(newMilliseconds);
      setInterval(
        customInterval < millisecondsOffset
          ? customInterval
          : millisecondsOffset,
      );
      setIsRunning(false);
      setResults([]);
    },
    [customInterval],
  );

  return {
    ...Time.getFormattedTimeFromMilliseconds(milliseconds),
    results,
    startAndTakeResults,
    pause,
    reset,
    isRunning,
  };
};

export default useStopwatch;
