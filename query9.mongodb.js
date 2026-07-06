use("sample_mflix");
db.movies.find({ plot: { $regex: "street.$", $options: "i" } }).count()
// count of movies with plot ending with "street"
