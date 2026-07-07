use("sample_mflix");

db.comments.aggregate([
  {
    $lookup: {
      from: "movies",
      localField: "movie_id",
      foreignField: "_id",
      as: "movie_info"
    }
  },
  { $unwind: "$movie_info" },
  {
    $group: {
      _id: "$movie_info.title",
      comments: { $push: "$text" }
    }
  },
  {
    $project: {
      _id: 0,
      movieTitle: "$_id",
      comments: 1
    }
  }
]);
