import Image from "next/image";

export const Images = ({ images }: { images: string[] }) => (
  <div>
    <h1 className="font-bold text-3xl mt-10 mb-7 border-b pb-5">
      {images.length > 1 ? `${images.length} Photos` : "Photo"}
    </h1>
    <div className="flex flex-wrap">
      {images.map((image) => (
        <Image
          key={image}
          width={224}
          height={176}
          className=" mr-1 mb-1"
          src={image}
          alt=""
        />
      ))}
    </div>
  </div>
);
