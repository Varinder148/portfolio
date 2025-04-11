import Clock from "@/app/Svgs/Clock";
import MapPin from "@/app/Svgs/MapPin";
import Responsibilities from "./Responsibilities";

interface CardProps {
  data: {
    id: number;
    image: string;
    name: string;
    from: string;
    to: string;
    responsibilities: string[];
    location: string;
    position: string;
  };
}

const Overview: React.FC<{ data: CardProps["data"] }> = ({ data }) => {
  return (
    <div className="flex flex-col  gap-5 h-full px-2 md:px-10 ">
      <div className="flex flex-col  ">
        <div className="flex flex-col items-center">
          <div className="text-2xl md:text-3xl">{data.position}</div>
          <hr className="w-full my-4 md:my-5 shadow-theme-gray shadow-theme-spread-lg text-theme-gray bg-theme-gray h-0.5" />
        </div>
        <div className="flex items-center gap-10">
          <Clock height={16} width={16} className="text-theme-gray" />
          {data.from}&nbsp;-&nbsp;{data.to}
        </div>
        <div className="flex items-center gap-10">
          <MapPin height={16} className="text-theme-gray" width={16} />
          {data.location}
        </div>
      </div>
      <Responsibilities data={data}></Responsibilities>
    </div>
  );
};

export default Overview;
