// Original code from react-timer-hook (https://github.com/amrlabib/react-timer-hook)
// Copyright (c) 2018 Amr Labib
// Licensed under the MIT License - see LICENSE file for details.

export type TimeFromMillisecondsType = {
  totalMilliseconds: number;
  totalSeconds: number;
  milliseconds: number;
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
};

export type FormattedTimeFromMillisecondsType = {
  milliseconds: string;
  seconds: string;
  minutes: string;
  hours: string;
};

export default class Time {
  static getTimeFromMilliseconds(millisecs: number): TimeFromMillisecondsType {
    const totalSeconds = Math.floor(millisecs / 1000);
    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const milliseconds = Math.floor(millisecs % 1000);

    return {
      totalMilliseconds: millisecs,
      totalSeconds,
      milliseconds,
      seconds,
      minutes,
      hours,
      days,
    };
  }

  static getMillisecondsFromExpiry(expiry: Date): number {
    const now = new Date().getTime();
    const milliSecondsDistance = expiry?.getTime() - now;
    return milliSecondsDistance > 0 ? milliSecondsDistance : 0;
  }

  static getMillisecondsFromPrevTime(prevTime: number): number {
    const now = new Date().getTime();
    const milliSecondsDistance = now - prevTime;
    return milliSecondsDistance > 0 ? milliSecondsDistance : 0;
  }

  static getMillisecondsFromTimeNow(): number {
    const now = new Date();
    const currentTimestamp = now.getTime();
    const offset = now.getTimezoneOffset() * 60 * 1000;
    return currentTimestamp - offset;
  }

  static getFormattedTimeFromMilliseconds(
    milliseconds: number,
  ): FormattedTimeFromMillisecondsType {
    const {
      milliseconds: millisecVal,
      seconds: secondsValue,
      minutes,
      hours,
    } = Time.getTimeFromMilliseconds(milliseconds);

    return {
      milliseconds: millisecVal.toString().padStart(3, "0"),
      seconds: secondsValue.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      hours: hours.toString().padStart(2, "0"),
    };
  }
}
