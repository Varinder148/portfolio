export enum ThemeColors {
  RED = "RED",
  IVORY = "IVORY",
  OLIVE = "OLIVE",
  SANDY = "SANDY",
  GRAY = "GRAY",
  VIOLET = "VIOLET",
  ROSE = "ROSE",
  REDWOOD = "REDWOOD",
  GREEN = "GREEN",
}

export const THEME: { [key in ThemeColors]: string } = {
  [ThemeColors.RED]: "#F24236",
  [ThemeColors.IVORY]: "#FFFFFF",
  [ThemeColors.OLIVE]: "#9BC53D",
  [ThemeColors.SANDY]: "#E28413",
  [ThemeColors.GRAY]: "#757780",
  [ThemeColors.VIOLET]: "#8E94F2",
  [ThemeColors.ROSE]: "#CA2E55",
  [ThemeColors.REDWOOD]: "#AA5042",
  [ThemeColors.GREEN]: "#31572C",
};

// Helper function to calculate luminance and determine if a color is light or dark
function isLightColor(hex: string): boolean {
  // Remove '#' if present
  hex = hex.replace("#", "");

  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate luminance (relative brightness)
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  // If luminance > 128, it's light; otherwise, it's dark
  return luminance > 128;
}

export function getRandomColor(type?: "light" | "dark"): string {
  let filteredColors: ThemeColors[];

  // If no type is provided, use all colors
  if (!type) {
    filteredColors = Object.keys(THEME) as ThemeColors[];
  } else {
    // Filter the colors based on the type (light or dark)
    filteredColors = Object.keys(THEME).filter((key) => {
      const color = THEME[key as keyof typeof THEME];
      return type === "light" ? isLightColor(color) : !isLightColor(color);
    }) as ThemeColors[];
  }

  // Pick a random color from the filtered list
  const randomIndex = Math.floor(Math.random() * filteredColors.length);
  const randomColorKey = filteredColors[randomIndex];

  return THEME[randomColorKey];
}
