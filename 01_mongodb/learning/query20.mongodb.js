use("sample_mflix");
db.movies.find(
  {
    year: 2010,              // condition #1
    genres: "Action"         // condition #2  → implicit AND
  },
  { _id: 0, title: 1, year: 1, genres: 1 },   // projection
  { sort:{"imdb_rating": -1, year: -1 }, limit: 5 }
);
// count of Action movies released in 2010 with their title, year and genres