use("sample_mflix");
db.movies.find({ plot: { $regex: "Asia", $options: "i" } }).count()
// count of movies with plot containing "Asia"
