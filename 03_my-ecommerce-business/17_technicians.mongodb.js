use("changhub-db");

// Clear existing data in the technicians collection
db.technicians.deleteMany({});

// Insert mock data into the technicians collection
db.technicians.insertMany([
  {
    "_id": ObjectId("000000000000000000000001"),
    "name": "Tony Stark",
    "birthdate": "1990-01-01",
    "email": "tony@example.com",
    "phone": "0812345678",
    "address": "123 Sukhumvit Road, Bangkok",
    "rating": 4.5, // rating is a number between 0 and 5
    "status": "approved", // status can be "approved", "pending", or "suspended"
    "username": "tonystark",
    "password": "hashed_password_123"
  },
  {
    "_id": ObjectId("000000000000000000000002"),
    "name": "Steve Rogers",
    "birthdate": "1992-05-15",
    "email": "steve@example.com",
    "phone": "0823456789",
    "address": "456 Ratchadapisek Road, Bangkok",
    "rating": 4.2,
    "status": "approved",
    "username": "steverogers",
    "password": "hashed_password_456"
  },
  {
    "_id": ObjectId("000000000000000000000003"),
    "name": "Thor Odinson",
    "birthdate": "1985-12-10",
    "email": "thor@example.com",
    "phone": "0834567890",
    "address": "789 Nimman Road, Chiang Mai",
    "rating": 4.8,
    "status": "approved",
    "username": "thorodinson",
    "password": "hashed_password_789"
  },
  {
    "_id": ObjectId("000000000000000000000004"),
    "name": "Bruce Banner",
    "birthdate": "1988-11-22",
    "email": "bruce@example.com",
    "phone": "0845678901",
    "address": "999 Phahonyothin Road, Lampang",
    "rating": 4.9,
    "status": "approved",
    "username": "brucebanner",
    "password": "hashed_password_bbb"
  },
  {
    "_id": ObjectId("000000000000000000000005"),
    "name": "Natasha Romanoff",
    "birthdate": "1994-03-03",
    "email": "natasha@example.com",
    "phone": "0856789012",
    "address": "77/1 Si Lom Road, Bangkok",
    "rating": 4.6,
    "status": "approved",
    "username": "natasharomanoff",
    "password": "hashed_password_nat"
  },
  {
    "_id": ObjectId("000000000000000000000006"),
    "name": "Clint Barton",
    "birthdate": "1989-07-07",
    "email": "clint@example.com",
    "phone": "0867890123",
    "address": "555 Mittraphap Road, Khon Kaen",
    "rating": 4.0,
    "status": "pending", 
    "username": "clintbarton",
    "password": "hashed_password_hawkeye"
  },
  {
    "_id": ObjectId("000000000000000000000007"),
    "name": "Peter Parker",
    "birthdate": "2001-08-10",
    "email": "peter@example.com",
    "phone": "0878901234",
    "address": "88 Charoen Krung Road, Bangkok",
    "rating": 4.4,
    "status": "approved",
    "username": "peterparker",
    "password": "hashed_password_spidey"
  },
  {
    "_id": ObjectId("000000000000000000000008"),
    "name": "Wanda Maximoff",
    "birthdate": "1998-02-10",
    "email": "wanda@example.com",
    "phone": "0889012345",
    "address": "12 Vibhavadi Rangsit Road, Bangkok",
    "rating": 4.7,
    "status": "approved",
    "username": "wandamaximoff",
    "password": "hashed_password_witch"
  },
  {
    "_id": ObjectId("000000000000000000000009"),
    "name": "Stephen Strange",
    "birthdate": "1980-11-11",
    "email": "stephen@example.com",
    "phone": "0890123456",
    "address": "404 Phetkasem Road, Phuket",
    "rating": 5.0,
    "status": "approved",
    "username": "stephenstrange",
    "password": "hashed_password_doctor"
  },
  {
    "_id": ObjectId("000000000000000000000010"),
    "name": "Arthur Curry",
    "birthdate": "1993-06-16",
    "email": "arthur@example.com",
    "phone": "0801234567",
    "address": "321 Beach Road, Pattaya",
    "rating": 3.9,
    "status": "suspended", 
    "username": "arthurcurry",
    "password": "hashed_password_aqua"
  }
]);
db.technicians.find({});