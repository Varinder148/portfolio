// Define or import CardProps
interface CardProps {
  data: {
    position: string;
    from: string;
    to: string;
    location: string;
  };
}

const Overview: React.FC<{ data: CardProps["data"] }> = ({ data }) => {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="text-theme-2xl">{data.position}</div>
        <hr className="w-full my-5 shadow-theme-gray shadow-theme-spread-lg text-theme-gray bg-theme-gray h-0.5" />
      </div>
      <div className="flex items-center  gap-10">
        {/* <MdOutlineAccessTime className="text-theme-gray " /> */}
        {data.from}&nbsp;-&nbsp;{data.to}
      </div>
      <div className="flex items-center  gap-10">
        {/* <IoLocationOutline className="text-theme-gray" /> */}
        {data.location}
      </div>
    </>
  );
};

export default Overview;
