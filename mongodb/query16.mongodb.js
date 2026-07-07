use("sample_mflix");
db.movies.find({ directors: { $in: ["Christopher Nolan"] } });
// count of movies directed by Christopher Nolan