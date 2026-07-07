use("sample_mflix");

[
  db.movies.find({ plot: { $regex: "princess", $options: "i" } }).count(),
  db.movies.find({ plot: { $regex: "prince", $options: "i" } }).count()
]
// count of movies with plot containing "princess" and "prince"