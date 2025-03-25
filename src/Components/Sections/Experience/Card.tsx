import Image from "next/image";

interface CardProps {
  data: {
    logo: string;
  };
}

const Card: React.FC<CardProps> = ({ data }) => {
  return (
    <div className="w-screen flex h-full items-start justify-center">
      <div className="w-2/3 bg-theme-ivory h-1/2  flex flex-col border-2 border-theme-black">
        <div className="grid place-items-center">
          <Image
            src={data.logo}
            alt="infosys logo"
            width={300}
            height={-1}
            className="object-contain object-center bg-theme-black py-5 px-15 rounded-b-4xl "
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
