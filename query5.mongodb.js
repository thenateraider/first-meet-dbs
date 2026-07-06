use("sample_mflix");
db.theaters.find({ "location.address.state": "CA" }).count()