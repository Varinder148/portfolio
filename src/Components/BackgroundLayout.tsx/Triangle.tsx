const Triangle = ({ className = "", fill = "fill-olive-light" }) => {
  return (
    <svg
      width="789"
      height="800"
      viewBox="0 0 789 800"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M336.173 36.5853C359.987 -11.8305 429.013 -11.8305 452.827 36.5853L781.865 705.562C803.109 748.754 771.673 799.25 723.538 799.25H65.4618C17.3275 799.25 -14.1092 748.754 7.1351 705.562L336.173 36.5853Z"
        className={fill}
      />
    </svg>
  );
};

export default Triangle;
