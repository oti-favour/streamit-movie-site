"use client";
import Image from "next/image";
import Button from "./Button";
import { useRouter } from "next/navigation";

interface SeriesCardProps {
  id: number;
  title: string;
  seasons: number;
  image: string;
  seriesId: number;
  mediaType: "movie" | "tv";
}

const SeriesCard: React.FC<SeriesCardProps> = ({
  id,
  title,
  seasons,
  image,

  mediaType,
}) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/${mediaType}/${id}`);
  };

  return (
    <div
      className="relative w-full h-64 overflow-hidden transition-transform duration-500 ease-in-out transform hover:scale-x-110 hover:scale-y-105 hover:border-l-4 hover:border-red-700 shadow-lg cursor-pointer"
      onClick={handleCardClick}
    >
      <Image
        src={image}
        alt={title}
        layout="fill"
        objectFit="cover"
        className=""
      />
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-start text-center px-10">
        <h3 className="text-white text-base font-semibold">{title}</h3>
        <p className="text-gray-300 text-sm mb-2">{seasons} Seasons</p>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Button seriesId={id} />
        </div>
      </div>
    </div>
  );
};

export default SeriesCard;
