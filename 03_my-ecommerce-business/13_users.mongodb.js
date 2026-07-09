use("changhub-db");

// Clear existing data in the users collection
db.users.deleteMany({});

// Insert mock data into the users collection
db.users.insertMany([
  {
    "_id": ObjectId("000000000000000000000001"),
    "name": "Clark Kent",
    "birthdate": "1993-02-28",
    "email": "clark.k@example.com",
    "phone": "0819998888",
    "address": "456 Sukhumvit Road, Klong Toei, Bangkok",
    "username": "clarkkent",
    "password": "hashed_user_pwd_001"
  },
  {
    "_id": ObjectId("000000000000000000000002"),
    "name": "Bruce Wayne",
    "birthdate": "1989-10-15",
    "email": "bruce.w@example.com",
    "phone": "0828887777",
    "address": "888 Sathorn Road, Thung Maha Mek, Bangkok",
    "username": "brucewayne",
    "password": "hashed_user_pwd_002"
  },
  {
    "_id": ObjectId("000000000000000000000003"),
    "name": "Diana Prince",
    "birthdate": "1995-04-04",
    "email": "diana.p@example.com",
    "phone": "0837776666",
    "address": "123 Nimmanahaeminda Road, Suthep, Chiang Mai",
    "username": "dianaprince",
    "password": "hashed_user_pwd_003"
  },
  {
    "_id": ObjectId("000000000000000000000004"),
    "name": "Barry Allen",
    "birthdate": "1999-09-09",
    "email": "barry.a@example.com",
    "phone": "0846665555",
    "address": "77/5 Mittraphap Road, Mueang, Khon Kaen",
    "username": "barryallen",
    "password": "hashed_user_pwd_004"
  },
  {
    "_id": ObjectId("000000000000000000000005"),
    "name": "Hal Jordan",
    "birthdate": "1991-03-20",
    "email": "hal.j@example.com",
    "phone": "0855554444",
    "address": "202 Phahonyothin Road, Mueang, Lampang",
    "username": "haljordan",
    "password": "hashed_user_pwd_005"
  },
  {
    "_id": ObjectId("000000000000000000000006"),
    "name": "Arthur Dent",
    "birthdate": "1982-11-12",
    "email": "arthur.d@example.com",
    "phone": "0864443333",
    "address": "99 Beach Road, Pattaya, Chon Buri",
    "username": "arthurdent",
    "password": "hashed_user_pwd_006"
  },
  {
    "_id": ObjectId("000000000000000000000007"),
    "name": "Lois Lane",
    "birthdate": "1994-07-19",
    "email": "lois.l@example.com",
    "phone": "0873332222",
    "address": "55 Ratchadapisek Road, Huai Khwang, Bangkok",
    "username": "loislane",
    "password": "hashed_user_pwd_007"
  },
  {
    "_id": ObjectId("000000000000000000000008"),
    "name": "Oliver Queen",
    "birthdate": "1988-05-16",
    "email": "oliver.q@example.com",
    "phone": "0882221111",
    "address": "14/2 Phetkasem Road, Patong, Phuket",
    "username": "oliverqueen",
    "password": "hashed_user_pwd_008"
  },
  {
    "_id": ObjectId("000000000000000000000009"),
    "name": "Selina Kyle",
    "birthdate": "1996-12-25",
    "email": "selina.k@example.com",
    "phone": "0891110000",
    "address": "33 Charoen Krung Road, Bang Rak, Bangkok",
    "username": "selinakyle",
    "password": "hashed_user_pwd_009"
  },
  {
    "_id": ObjectId("000000000000000000000010"),
    "name": "Iris West",
    "birthdate": "1997-01-30",
    "email": "iris.w@example.com",
    "phone": "0800001122",
    "address": "101 Vibhavadi Rangsit Road, Chatuchak, Bangkok",
    "username": "iriswest",
    "password": "hashed_user_pwd_010"
  }
]);
db.users.find({});