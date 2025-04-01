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
  return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><circle cx="40" cy="40" r="40" fill="%23F6F7EB" stroke="black" stroke-width="2" /><text x="40" y="40" font-size="14" fill="%230F0F0F" text-anchor="middle" alignment-baseline="central">${skill}</text></svg>`;
};
