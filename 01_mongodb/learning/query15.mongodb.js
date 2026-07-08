use("sample_mflix");
db.movies.find({ 
  genres: { $all: ["Sci-Fi"] },
  released: { $gt: ISODate("1999-01-01T00:00:00Z") }
}).count()
// count of Sci-Fi movies released after 1999