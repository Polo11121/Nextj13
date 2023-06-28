export const Header = ({ name }: { name: string }) => {
  const formatTitle = (name: string) => {
    const words = name.split("-");

    return words.join(" ");
  };

  return (
    <div className="h-96 overflow-hidden">
      <div className="bg-center bg-gradient-to-r from-[#0f1f47] to-[#5f6984] h-full flex justify-center items-center">
        <h1 className="text-7xl text-white capitalize text-shadow text-center">
          {formatTitle(name)}
        </h1>
      </div>
    </div>
  );
};
