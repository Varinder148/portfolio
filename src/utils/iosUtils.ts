// iOS Safari detection and utility functions

export const isIOS = (): boolean => {
  if (typeof window === "undefined") return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
};

export const isSafari = (): boolean => {
  if (typeof window === "undefined") return false;
  return (
    /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)
  );
};

export const isIOSSafari = (): boolean => {
  return isIOS() && isSafari();
};

export const isChromeOnIOS = (): boolean => {
  if (typeof window === "undefined") return false;
  return /CriOS/.test(navigator.userAgent);
};

// Request device orientation permission for iOS Safari
export const requestDeviceOrientationPermission =
  async (): Promise<boolean> => {
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof (DeviceOrientationEvent as any).requestPermission === "function"
    ) {
      try {
        const permission = await (
          DeviceOrientationEvent as any
        ).requestPermission();
        return permission === "granted";
      } catch (err) {
        console.log(
          "Device orientation permission denied or not supported",
          err,
        );
        return false;
      }
    }
    return true; // No permission required for other browsers
  };

// iOS Safari safe date parsing
export const parseDateSafely = (dateString: string): Date | null => {
  try {
    // Try ISO format first
    const isoDate = new Date(dateString);
    if (!isNaN(isoDate.getTime())) {
      return isoDate;
    }

    // Try parsing with explicit format for iOS Safari
    const parts = dateString.split("-");
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
      const day = parseInt(parts[2], 10);

      if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
        const date = new Date(year, month, day);
        if (!isNaN(date.getTime())) {
          return date;
        }
      }
    }

    return null;
  } catch (error) {
    console.error("Error parsing date:", error);
    return null;
  }
};
