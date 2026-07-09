use("changhub-db");

// Clear existing data in the  collection
db.technician_services.deleteMany({});

// Insert mock data into the technician_services collection
db.technician_services.insertMany(
[
  { 
    "_id": ObjectId("11f500000000000000000001"), 
    "technician_id": ObjectId("11f100000000000000000001"), 
    "service_type_id": ObjectId("11f400000000000000000001"), 
    "custom_price": 180.00
  },
  { 
    "_id": ObjectId("11f500000000000000000002"), 
    "technician_id": ObjectId("11f100000000000000000001"), 
    "service_type_id": ObjectId("11f400000000000000000003"), 
    "custom_price": 1200.00
  },
  { 
    "_id": ObjectId("11f500000000000000000003"), 
    "technician_id": ObjectId("11f100000000000000000002"), 
    "service_type_id": ObjectId("11f400000000000000000001"), 
    "custom_price": 150.00
  },
  { 
    "_id": ObjectId("11f500000000000000000004"), 
    "technician_id": ObjectId("11f100000000000000000002"), 
    "service_type_id": ObjectId("11f400000000000000000003"), 
    "custom_price": 4500.00
  },
  { 
    "_id": ObjectId("11f500000000000000000005"), 
    "technician_id": ObjectId("11f100000000000000000003"), 
    "service_type_id": ObjectId("11f400000000000000000005"), 
    "custom_price": 450.00
  },
  { 
    "_id": ObjectId("11f500000000000000000006"), 
    "technician_id": ObjectId("11f100000000000000000004"), 
    "service_type_id": ObjectId("11f400000000000000000003"), 
    "custom_price": 5000.00
  },
  { 
    "_id": ObjectId("11f500000000000000000007"), 
    "technician_id": ObjectId("11f100000000000000000005"), 
    "service_type_id": ObjectId("11f400000000000000000005"), 
    "custom_price": 550.00
  },
  { 
    "_id": ObjectId("11f500000000000000000008"), 
    "technician_id": ObjectId("11f100000000000000000006"), 
    "service_type_id": ObjectId("11f400000000000000000006"), 
    "custom_price": 1800.00
  },
  { 
    "_id": ObjectId("11f500000000000000000009"), 
    "technician_id": ObjectId("11f100000000000000000007"), 
    "service_type_id": ObjectId("11f400000000000000000007"), 
    "custom_price": 2200.00
  },
  { 
    "_id": ObjectId("11f500000000000000000010"), 
    "technician_id": ObjectId("11f100000000000000000008"), 
    "service_type_id": ObjectId("11f400000000000000000008"), 
    "custom_price": 8500.00
  }
]
);

db.technician_services.aggregate([
  {
    $lookup: {
      from: "technicians",
      localField: "technician_id",
      foreignField: "_id",
      as: "technician_info"
    }
  },
  {$unwind: "$technician_info"},
  {
    $lookup: {
      from: "service_types",
      localField: "service_type_id",
      foreignField: "_id",
      as: "service_type_info"
    }
  },
  {$unwind: "$service_type_info"},
]);