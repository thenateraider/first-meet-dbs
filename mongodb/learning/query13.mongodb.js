use("sample_mflix");
db.movies.find({
  countries: {$in: ["UK"]},
  year: {$gte: 1970, $lte: 1990}
})
// count of movies released between 1970 and 1990 in UK