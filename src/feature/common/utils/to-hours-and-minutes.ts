export type TimeHMSObject = { h: number; m: number; s: number };

export function toHoursAndMinutes(totalSeconds: number, asString: true): string;
export function toHoursAndMinutes(
  totalSeconds: number,
  asString: false
): TimeHMSObject;

export function toHoursAndMinutes(totalSeconds: number, asString: boolean) {
  const totalMinutes = Math.floor(totalSeconds / 60);

  const seconds = Math.ceil(totalSeconds % 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.floor(totalMinutes % 60);

  if (asString) {
    return [
      String(hours).padStart(2, "0"),
      String(minutes).padStart(2, "0"),
      String(seconds).padStart(2, "0"),
    ].join(" : ");
  }

  return { h: hours, m: minutes, s: seconds };
}
