use("sample_mflix");
db.movies.find({ cast: "Hugh Jackman" }).count()
// count of movies with Hugh Jackman in the cast
