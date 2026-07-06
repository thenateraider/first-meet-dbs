use("sample_mflix");
db.movies.find({}).sort({ runtime: -1 }).limit(10)
// top 10 runtime movies in the collection