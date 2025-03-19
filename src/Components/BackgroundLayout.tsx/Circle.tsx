const Circle = ({ className = "", fill = "", id = "" }) => {
  return (
    <svg
      width="585"
      height="585"
      viewBox="0 0 585 585"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      id={id}
    >
      <circle cx="292.5" cy="292.5" r="292.5" className={fill} />
    </svg>
  );
};

export default Circle;
