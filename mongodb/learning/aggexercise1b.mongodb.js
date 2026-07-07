use("sample_mflix");

db.movies.aggregate([
  { $unwind: "$directors" },
  {
    $group: {
      _id: "$directors",
      movieCount: { $sum: 1 }
    }
  },
  { $sort: { movieCount: -1 } },
  { $limit: 5 }
]);
