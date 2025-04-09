export const NEON = `0 0 2px ,
      0 0 4px ,
      0 0 8px ,
      0 0 16px ,
      0 0 32px `;

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

export function getRandomColor(): string {
  const colorKeys = Object.values(ThemeColors);
  const randomIndex = Math.floor(Math.random() * colorKeys.length);
  const randomColorKey = colorKeys[randomIndex];
  return THEME[randomColorKey];
}
