use("changhub-db");

// Clear existing data in the admins collection
db.admins.deleteMany({});

// Insert mock data into the admins collection
db.admins.insertMany(
[
  {
    "_id": ObjectId("11f200000000000000000001"),
    "name": "Nick Fury",
    "birthdate": "1975-12-21",
    "email": "fury.n@changhub.io",
    "username": "nickfury_admin",
    "password": "hashed_admin_pwd_fury"
  },
  {
    "_id": ObjectId("11f200000000000000000002"),
    "name": "Maria Hill",
    "birthdate": "1982-04-04",
    "email": "hill.m@changhub.io",
    "username": "mariahill_admin",
    "password": "hashed_admin_pwd_hill"
  },
  {
    "_id": ObjectId("11f200000000000000000003"),
    "name": "Phil Coulson",
    "birthdate": "1979-07-08",
    "email": "coulson.p@changhub.io",
    "username": "philcoulson_admin",
    "password": "hashed_admin_pwd_phil"
  }
]
);
db.admins.find({});