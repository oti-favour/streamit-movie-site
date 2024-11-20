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
      <h1 className="text-3xl font-bold">{data.title || data.name}</h1>
      <p className="mt-4 text-gray-300">{data.overview}</p>
      <div className=" w-full mx-auto  flex justify-between gap-x-8">
        {data.poster_path && (
          <Image
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            alt={data.title || data.name}
            className="w-2/5  mt-6 rounded-lg"
            width={250}
            height={80}
          />
        )}
        <button className=" w-3/5 flex items-center text-gray-200 space-x-2">
          <AiOutlinePlayCircle size={90} className="hover:text-red-500" />
          <span className="text-2xl uppercase font-medium">Watch Trailer</span>
        </button>
      </div>
    </div>
  );
};

export default DetailsPage;
