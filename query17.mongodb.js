use("sample_mflix");
db.movies.find(
    {
        directors: { $in: ["Hal Roach"] }
    },
    {
        title: 1,
        "awards.wins": 1,
        _id: 0
    }
);
// count of movies directed by Hal Roach with their title and number of awards won