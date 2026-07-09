use("changhub-db");

// Clear existing data in the bankaccounts collection
db.bankaccounts.deleteMany({});

// Insert mock data into the bankaccounts collection
db.bankaccounts.insertMany(
[
  {
    "_id": ObjectId("11f600000000000000000001"),
    "technician_id": ObjectId("11f100000000000000000001"),
    "bank_name": "Bangkok Bank",
    "account_number": "1234567890",
    "accountName": "Tony Stark"
  },
  {
    "_id": ObjectId("11f600000000000000000002"),
    "technician_id": ObjectId("11f100000000000000000002"),
    "bank_name": "Kasikorn Bank",
    "account_number": "0987654321",
    "accountName": "Steve Rogers"
  },
  {
    "_id": ObjectId("11f600000000000000000003"),
    "technician_id": ObjectId("11f100000000000000000003"),
    "bank_name": "Krungthai Bank",
    "account_number": "1122334455",
    "accountName": "Thor Odinson"
  },
  {
    "_id": ObjectId("11f600000000000000000004"),
    "technician_id": ObjectId("11f100000000000000000004"),
    "bank_name": "Siam Commercial Bank",
    "account_number": "5566778899",
    "accountName": "Bruce Banner"
  },
  {
    "_id": ObjectId("11f600000000000000000005"),
    "technician_id": ObjectId("11f100000000000000000005"),
    "bank_name": "TMB Bank",
    "account_number": "6677889900",
    "accountName": "Natasha Romanoff"
  },
  {
    "_id": ObjectId("11f600000000000000000006"),
    "technician_id": ObjectId("11f100000000000000000006"),
    "bank_name": "UOB Bank",
    "account_number": "7788990011",
    "accountName": "Clint Barton"
  },
  {
    "_id": ObjectId("11f600000000000000000007"),
    "technician_id": ObjectId("11f100000000000000000007"),
    "bank_name": "Citi Bank",
    "account_number": "8899001122",
    "accountName": "Peter Parker"
  },
  {
    "_id": ObjectId("11f600000000000000000008"),
    "technician_id": ObjectId("11f100000000000000000008"),
    "bank_name": "Standard Chartered Bank",
    "account_number": "9900112233",
    "accountName": "Wanda Maximoff"
  },
  {
    "_id": ObjectId("11f600000000000000000009"),
    "technician_id": ObjectId("11f100000000000000000009"),
    "bank_name": "HSBC Bank",
    "account_number": "0011223344",
    "accountName": "Stephen Strange"
  },
  {
    "_id": ObjectId("11f600000000000000000010"),
    "technician_id": ObjectId("11f100000000000000000010"),
    "bank_name": "Bank of America",
    "account_number": "2233445566",
    "accountName": "Arthur Curry"
  }
]
);

db.bankaccounts.aggregate([
  {
    $lookup: {
      from: "technicians",
      localField: "technician_id",
      foreignField: "_id",
      as: "technician_info"
    }
  },
  {$unwind: "$technician_info"}
]);