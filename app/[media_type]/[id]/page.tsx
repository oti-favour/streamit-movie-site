/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetServerSideProps } from "next";
import Image from "next/image";
import TrailerButton from "@/components/common/TrailerButton";

// Define types
type Params = { media_type: string; id: string };

interface DetailsPageProps {
  data: any; // Movie or TV details fetched from the API
  error?: string; // Error message, if any
}

// Fetch details function
async function fetchDetails(media_type: string, id: string) {
  const response = await fetch(
    `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch details");
  }

  return response.json();
}

// Server-side fetching with `getServerSideProps`
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { media_type, id } = context.params as Params;

  try {
    const data = await fetchDetails(media_type, id);
    return { props: { data } }; // Pass fetched data to the page
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      props: {
        data: null,
        error: "Could not load details.",
      },
    };
  }
};

// Component
const DetailsPage = ({ data, error }: DetailsPageProps) => {
  if (error) {
    return <div className="text-white text-center mt-32">{error}</div>;
  }

  if (!data) {
    return <div className="text-white text-center mt-32">Loading...</div>;
  }

  return (
    <div className="py-32 px-16 text-white min-h-screen">
      <h1 className="text-4xl font-bold">{data.title || data.name}</h1>
      <p className="mt-4 text-gray-300 text-sm sm:text-base md:text-base">
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
        <TrailerButton
          movieId={data.media_type === "movie" ? data.id : undefined}
          seriesId={data.media_type === "tv" ? data.id : undefined}
        />
      </div>
    </div>
  );
};

export default DetailsPage;
