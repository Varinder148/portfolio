export const refs = {
  About: "home",
  Experience: "experience",
  Skills: "skills",
  Contact: "contact",
  Education: "education",
};

const menuItems = [
  {
    name: "About Me",
    anchor: refs.About,
    index: 0,
  },
  {
    name: "Experience",
    anchor: refs.Experience,
    index: 1,
  },
  {
    name: "Skills",
    anchor: refs.Skills,
    index: 2,
  },
  {
    name: "Education",
    anchor: refs.Education,
    index: 4,
  },

  {
    name: "Let's Connect",
    anchor: refs.Contact,
    index: 5,
  },
];

export default menuItems;
