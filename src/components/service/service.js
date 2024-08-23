import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzE3NDEzYjBjZmY2MTI5NzgyNjU2Y2Q1M2EyNjRjYyIsIm5iZiI6MTcyNDIzMTc2MC4yNDQzMiwic3ViIjoiNjZjNGFlZDdlZjMwN2JmZGJiZDE4YzYzIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.pUIkrW9YuubBhy7xDiwF0CO5T5jYQzLHOxHCHQ2yXf0";

export const trendingMovieDay = async () => {
  const data = await axios.get("/trending/movie/day", {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
    params: {
      language: "en-US",
    },
  });
  return data;
};

export const detailseMovie = async (id) => {
  const data = await axios.get(`/movie/${id}`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
    params: {
      language: "en-US",
    },
  });
  return data;
};

export const movieCast = async (id) => {
  const data = await axios.get(`/movie/${id}/credits`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
    params: {
      language: "en-US",
    },
  });
  return data;
};

export const movieReviews = async (id) => {
  const data = await axios.get(`/movie/${id}/reviews`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
    params: {
      language: "en-US",
    },
  });
  return data;
};

export const movieSearch = async (query) => {
  try {
    const { data } = await axios.get(
      `/search/movie?query=${encodeURIComponent(query)}&page=1`,
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
        params: {
          language: "en-US",
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Error during movie search:", error.message);
    throw error;
  }
};
