import Clock from "@/app/Svgs/Clock";
import MapPin from "@/app/Svgs/MapPin";

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
        <Clock height={16} width={16} className="text-theme-gray" />
        {data.from}&nbsp;-&nbsp;{data.to}
      </div>
      <div className="flex items-center  gap-10">
        <MapPin height={16} className="text-theme-gray" width={16} />

        {data.location}
      </div>
    </>
  );
};

export default Overview;
