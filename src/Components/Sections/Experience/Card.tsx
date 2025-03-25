import Image from "next/image";

const Card = () => {
  return (
    <div className="w-screen flex h-full items-center justify-center">
      <div className="w-2/3 bg-theme-ivory border-2 border-theme-ivory rounded-4xl flex flex-col">
        <div className="h-1/4 border-2 border-amber-100 overflow-clip">
          <Image
            src="./infosys.png"
            alt="infosys logo"
            width={-1}
            height={-1}
            className="object-contain object-center "
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
