import Time from "./Time";

const About: React.FC = ({ className }) => {
  return (
    <section className={"w-full h-screen pl-20" + className}>
      <div className="w-1/2 pt-[15%]">
        <h2 className="text-4xl font-medium">
          <span className="text-green-light">Hey</span> there,
        </h2>
        <p className="text-4xl pt-4 pb-2 pl-6 font-medium">
          My name is <span className="text-green-light">Varinder</span>
        </p>
        <p className="text-2xl pl-6 text-orange-dark">
          I am a Frontend developer. I have been helping companies with their UI
          development needs from the past <Time></Time>.
        </p>
      </div>
    </section>
  );
};

export default About;
