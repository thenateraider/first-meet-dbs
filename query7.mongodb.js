use("sample_mflix");
db.theaters.findOne({ "location.address.city": "Long Beach" })