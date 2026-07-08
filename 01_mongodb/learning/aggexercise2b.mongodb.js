use("sample_mflix");

db.comments.aggregate([
  {
    $group: {
      _id: "$movie_id",
      commentCount: { $sum: 1 }
    }
  },
  {
    $lookup: {
      from: "movies",
      localField: "_id",
      foreignField: "_id",
      as: "movie_info"
    }
  },
  { $unwind: "$movie_info" },
  {
    $project: {
      _id: 0,
      movie_id: "$_id",
      title: "$movie_info.title",
      commentCount: 1
    }
  },
  { $sort: { commentCount: -1 } }
]);
