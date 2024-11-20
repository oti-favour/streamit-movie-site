import Image from "next/image";
import { notFound } from "next/navigation";
import { AiOutlinePlayCircle } from "react-icons/ai";

// Define the type for params
type Params = Promise<{ media_type: string; id: string }>;

interface DetailsPageProps {
  params: Params;
}

async function fetchDetails(media_type: string, id: string) {
  const response = await fetch(
    `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  );

  if (!response.ok) {
    return null;
  }

  return response.json();
}

const DetailsPage = async ({ params }: DetailsPageProps) => {
  const { media_type, id } = await params;

  const data = await fetchDetails(media_type, id);

  if (!data) {
    notFound();
  }

  return (
    <div className="p-8 pt-28 px-16 text-white">
      <h1 className="text-6xl font-bold">{data.title || data.name}</h1>
      <p className="mt-4 text-gray-300 text-lg sm:text-xl md:text-2xl">
        {data.overview}
      </p>
      <div className="w-full mx-auto flex flex-col sm:flex-row justify-between gap-6 sm:gap-8 mt-6">
        {data.poster_path && (
          <Image
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            alt={data.title || data.name}
            className="w-full sm:w-2/5 mt-6 rounded-lg"
            width={250}
            height={375}
          />
        )}
        <button className="w-full sm:w-1/2 lg:w-1/3 flex items-center justify-center text-gray-200 space-x-2 py-3 px-6 mt-6 sm:mt-0 ">
          <AiOutlinePlayCircle size={90} className="hover:text-red-500" />
          <span className="text-xl sm:text-2xl uppercase font-medium">
            Watch Trailer
          </span>
        </button>
      </div>
    </div>
  );
};

export default DetailsPage;
