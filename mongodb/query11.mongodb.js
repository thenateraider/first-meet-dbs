use("sample_mflix");
db.movies.find({ released: { $gte: ISODate("2000-01-01T00:00:00Z"), $lt: ISODate("2005-01-01T00:00:00Z") } }).count()
// count of movies released between 2000 and 2005