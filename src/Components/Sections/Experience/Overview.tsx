import Clock from "@/app/Svgs/Clock";
import MapPin from "@/app/Svgs/MapPin";
import Responsibilities from "./Responsibilities";
import { useViewport } from "@/Providers/ViewportProvider";

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
  const { isMobile } = useViewport();

  return (
    <div className="flex justify-between gap-15 h-full ">
      <div className="flex flex-col gap-5 flex-1 px-10 ">
        <div className="flex flex-col items-center">
          <div className="text-4xl">{data.position}</div>
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
      </div>

      {!isMobile && (
        <>
          <hr className="bg-theme-gray h-full w-0.5"></hr>
          <div className="flex-1 px-10">
            <Responsibilities data={data}></Responsibilities>
          </div>
        </>
      )}
    </div>
  );
};

export default Overview;
