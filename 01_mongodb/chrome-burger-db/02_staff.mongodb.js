use("chrome-burger-db");

//clear existing data in the staff collection
db.staff.deleteMany({});

//insert mock data into the staff collection
db.staff.insertMany([
  {
    "_id": ObjectId("65f100000000000000000001"),
    "first_name": "Jane",
    "last_name": "Doe",
    "role": "Cashier"
  },
  {
    "_id": ObjectId("65f100000000000000000002"),
    "first_name": "John",
    "last_name": "Smith",
    "role": "Cook"
  },
  {
    "_id": ObjectId("65f100000000000000000003"),
    "first_name": "Emily",
    "last_name": "Jones",
    "role": "Cashier"
  },
  {
    "_id": ObjectId("65f100000000000000000004"),
    "first_name": "Chris",
    "last_name": "Williams",
    "role": "Cook"
  }
]);

// Finds all staff members in the staff collection
db.staff.find({});