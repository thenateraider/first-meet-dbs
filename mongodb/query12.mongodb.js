use("sample_mflix");
db.movies.find({ year: { $gt: 1964, $lt: 1976 } }).sort({ year: 1 }).limit(3)
// count of movies released between 1965 and 1975