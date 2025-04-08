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

const Responsibilities: React.FC<{ data: CardProps["data"] }> = ({ data }) => {
  return (
    <ul className="text-overpass text-lg with-bullets font-overpass">
      {data.responsibilities.map((responsibilty, index) => (
        <li key={index}>{responsibilty}</li>
      ))}
    </ul>
  );
};

export default Responsibilities;
