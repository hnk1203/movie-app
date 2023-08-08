import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Movie from "../components/Movie";

function Detail() {
  const [Loading, setLoading] = useState(true);
  const [infos, setInfos] = useState();
  const { id } = useParams();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setInfos(json.data.movie);
    setLoading(false);
  };
  console.log(infos);
  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div>
      {Loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
            <Movie
              key={infos.id}
              id={infos.id}
              coverImg={infos.medium_cover_image}
              title={infos.title}
              genres={infos.genres}
            />
        </div>
      )}
    </div>
  );
}

export default Detail;
