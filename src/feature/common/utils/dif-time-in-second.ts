function difTimeInSecond(timeZ: string) {
  let currentTime = new Date();
  let givenTimestamp = new Date(timeZ);
  let timeDifference = currentTime.getTime() - givenTimestamp.getTime();
  let timeDifferenceInSeconds = Math.floor(timeDifference / 1000);
  return timeDifferenceInSeconds;
}

export { difTimeInSecond };
