import { getRandomColor } from "@/utils/constants";

export const SKILLS = [
  "React JS",
  "Next Js",
  "GraphQL",
  "HTML",
  "CSS",
  "Tailwind",
  "SCSS",
  "JavaScript",
  "Typescript",
  "Git",
  "TDD",
  "A/B Testing",
  "Jest",
  "AWS",
  "Webpack",
  "Contentful",
];

export const getSvgTexture = (skill: string) => {
  return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><circle cx="40" cy="40" r="40" fill="%23${getRandomColor("dark").replace("#", "")}" stroke="black" stroke-width="2" /><text x="40" y="40" font-size="14" fill="%23fffffF" font-family="'Montserrat Alternates', 'Helvetica Neue', Arial, sans-serif" text-anchor="middle" alignment-baseline="central">${skill}</text></svg>`;
};
