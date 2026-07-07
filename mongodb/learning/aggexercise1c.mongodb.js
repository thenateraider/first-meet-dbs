use("sample_mflix");

db.movies.aggregate([
  {
    $group: {
      _id: "$year",
      movieCount: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
]);
