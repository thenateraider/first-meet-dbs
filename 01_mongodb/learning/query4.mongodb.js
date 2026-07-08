use("sample_mflix");
db.movies.findOne({ "type": "movie" ,"rated":"TV-MA" });
// find a movie with type "movie" and rated "TV-MA"