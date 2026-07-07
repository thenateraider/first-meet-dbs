use("sample_mflix");

db.movies.aggregate([
  { $unwind: "$genres" },
  { $unwind: "$imdb.rating" },
  {
    $group: {
      _id: "$genres",
      averageRating: { $avg: "$imdb.rating" }
    }
  },
  { $sort: { averageRating: -1 } }
]);
