use("sample_mflix");
db.movies.find(
  {
    year: { $gte: 2000 },                         
    $or: [
      { genres: "Sci-Fi" },                       
      { "imdb.rating": { $gte: 8.1 } }             
    ]
  },
  { _id: 0, title: 1, year: 1, genres: 1, "imdb.rating": 1 }
).limit(10);
