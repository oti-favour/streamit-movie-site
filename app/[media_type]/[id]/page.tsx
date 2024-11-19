import Image from "next/image";
import { notFound } from "next/navigation";

// Function to fetch details based on media_type and id
async function fetchDetails(media_type: string, id: string) {
  const response = await fetch(
    `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  );

  // If the response isn't ok, return null
  if (!response.ok) {
    return null;
  }

  return response.json();
}

// Next.js Page Component
const DetailsPage = async ({
  params,
}: {
  params: { media_type: string; id: string };
}) => {
  // Destructure media_type and id from params
  const { media_type, id } = params;

  // Fetch data using the provided media_type and id
  const data = await fetchDetails(media_type, id);

  // If no data is found, trigger a 404 page
  if (!data) {
    notFound();
  }

  // Return the details page with data
  return (
    <div className="p-8 px-16 text-white">
      <h1 className="text-3xl font-bold">{data.title || data.name}</h1>
      <p className="mt-4 text-gray-300">{data.overview}</p>
      {data.poster_path && (
        <Image
          src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
          alt={data.title || data.name}
          className="mt-6 rounded-lg"
          width={250}
          height={150}
        />
      )}
    </div>
  );
};

export default DetailsPage;
