use("sample_mflix");

db.comments.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "email",
      foreignField: "email",
      as: "user_info"
    }
  },
  { $unwind: "$user_info" },
  { $match: { "user_info.email": "jason_momoa@gameofthron.es" } },
  { $project: { text: 1, date: 1, _id: 0 } }
]);
