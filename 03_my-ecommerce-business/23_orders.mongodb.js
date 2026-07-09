use("changhub-db");

// Clear existing data in the orders collection
db.orders.deleteMany({});

// Insert mock data into the orders collection with exactly 24-character ObjectIds
db.orders.insertMany(
[
  {
    "_id": ObjectId("11f700000000000000000001"),
    "customer_id": ObjectId("11f000000000000000000001"),
    "technician_id": ObjectId("11f100000000000000000001"),
    "orderInfo": "Repair dead electrical outlets in the bedroom and install additional power outlets (2 locations)",
    "orderDeadline": "2026-07-15T10:00:00Z",
    "orderCreated": "2026-07-14T08:30:00Z",
    "status": null,
    "presetPrice": 180.00,
    "addonItems": [],
    "extraCharges": 0.00,
    "totalPrice": 180.00
  },
  {
    "_id": ObjectId("11f700000000000000000002"),
    "customer_id": ObjectId("11f000000000000000000002"),
    "technician_id": ObjectId("11f100000000000000000003"),
    "orderInfo": "Clean wall-mounted air conditioner with 12,000 BTU capacity",
    "orderDeadline": "2026-07-16T13:00:00Z",
    "orderCreated": "2026-07-14T11:15:00Z",
    "status": "working",
    "presetPrice": 450.00,
    "addonItems": [],
    "extraCharges": 0.00,
    "totalPrice": 450.00
  },
  {
    "_id": ObjectId("11f700000000000000000003"),
    "customer_id": ObjectId("11f000000000000000000005"),
    "technician_id": ObjectId("11f100000000000000000002"),
    "orderInfo": "Inspect solar panel system - lights not entering inverter",
    "orderDeadline": "2026-07-17T09:00:00Z",
    "orderCreated": "2026-07-15T16:45:00Z",
    "status": "finished",
    "presetPrice": 4500.00,
    "addonItems": [
      { "item_name": "Replace burnt DC fuses and surge protectors (SPD)", "price": 850.00 },
      { "item_name": "Additional rooftop cable inspection fee", "price": 300.00 }
    ],
    "extraCharges": 1150.00,
    "totalPrice": 5650.00
  },
  {
    "_id": ObjectId("11f700000000000000000004"),
    "customer_id": ObjectId("11f000000000000000000007"),
    "technician_id": ObjectId("11f100000000000000000005"),
    "orderInfo": "Air conditioner not cooling, only warm air coming out",
    "orderDeadline": "2026-07-18T14:00:00Z",
    "orderCreated": "2026-07-16T10:00:00Z",
    "status": "cancelled",
    "presetPrice": 1800.00,
    "addonItems": [],
    "extraCharges": 0.00,
    "totalPrice": 1800.00
  },
  {
    "_id": ObjectId("11f700000000000000000005"),
    "customer_id": ObjectId("11f000000000000000000003"),
    "technician_id": ObjectId("11f100000000000000000001"),
    "orderInfo": "Install new Consumer Unit in the house",
    "orderDeadline": "2026-07-20T10:30:00Z",
    "orderCreated": "2026-07-17T09:20:00Z",
    "status": "completed",
    "presetPrice": 1200.00,
    "addonItems": [
      { "item_name": "Main Breaker 50A upgrade fee", "price": 350.00 }
    ],
    "extraCharges": 350.00,
    "totalPrice": 1550.00
  }
]
);

// Run Aggregation Pipeline
db.orders.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "customer_id",
      foreignField: "_id",
      as: "customer_info"
    }
  },
  { $unwind: "$customer_info" },
  {
    $lookup: {
      from: "technicians",
      localField: "technician_id",
      foreignField: "_id",
      as: "technician_info"
    }
  },
  { $unwind: "$technician_info" }
]);