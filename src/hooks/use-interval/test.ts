import { renderHook } from "@testing-library/react-native";
import useInterval from ".";

describe("hooks", () => {
  describe("useInterval", () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    });

    it("should call the callback function after the specified delay", () => {
      const callback = jest.fn();
      const delay = 1000;

      renderHook(() => useInterval(callback, delay));

      expect(callback).not.toHaveBeenCalled();

      jest.advanceTimersByTime(delay);

      expect(callback).toHaveBeenCalledTimes(1);

      jest.advanceTimersByTime(delay);

      expect(callback).toHaveBeenCalledTimes(2);
    });

    it("should not call the callback if delay is null", () => {
      const callback = jest.fn();
      const delay = null;

      renderHook(() => useInterval(callback, delay));

      jest.advanceTimersByTime(5000);

      expect(callback).not.toHaveBeenCalled();
    });

    it("should clear the interval when the component unmounts", () => {
      const callback = jest.fn();
      const delay = 1000;

      const { unmount } = renderHook(() => useInterval(callback, delay));

      jest.advanceTimersByTime(delay);
      expect(callback).toHaveBeenCalledTimes(1);

      unmount();

      jest.advanceTimersByTime(delay);
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it("should update the interval when the delay changes", () => {
      const callback = jest.fn();
      let delay = 1000;

      const { rerender } = renderHook(() => useInterval(callback, delay));

      jest.advanceTimersByTime(delay);
      expect(callback).toHaveBeenCalledTimes(1);

      delay = 500;
      rerender({
        delay,
      });

      jest.advanceTimersByTime(1000);

      // Should have been called at 1000, 1500, 2000
      expect(callback).toHaveBeenCalledTimes(3);

      jest.advanceTimersByTime(500);
      expect(callback).toHaveBeenCalledTimes(4);
    });

    it("should use the latest callback function", () => {
      let count = 0;
      const { rerender } = renderHook(
        ({ callback, delay }) => useInterval(callback, delay),
        {
          initialProps: {
            callback: () => {
              count++;
            },
            delay: 100,
          },
        },
      );

      jest.advanceTimersByTime(100);

      expect(count).toBe(1);

      rerender({
        callback: () => {
          count += 10;
        },
        delay: 100,
      });

      jest.advanceTimersByTime(100);

      expect(count).toBe(11);
    });
  });
});
