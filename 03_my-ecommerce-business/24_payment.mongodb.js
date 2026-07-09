use("changhub-db");

// Clear existing data in the payment collection
db.payment.deleteMany({});

// Insert mock data into the payment collection with exactly 24-character ObjectIds
db.payment.insertMany(
[
  {
    "_id": ObjectId("11f800000000000000000001"),
    "order_id": ObjectId("11f700000000000000000001"),
    "amount": 180.00,
    "payslip": null,
    "paymentStatus": "pending",
    "escrowStatus": "none",
    "updateAt": "2026-07-14T08:30:00Z"
  },
  {
    "_id": ObjectId("11f800000000000000000002"),
    "order_id": ObjectId("11f700000000000000000002"),
    "amount": 450.00,
    "payslip": "https://storage.changhub.io/slips/slip_o002.png",
    "paymentStatus": "successful",
    "escrowStatus": "held",
    "updateAt": "2026-07-14T11:20:00Z"
  },
  {
    "_id": ObjectId("11f800000000000000000003"),
    "order_id": ObjectId("11f700000000000000000003"),
    "amount": 4500.00,
    "payslip": "https://storage.changhub.io/slips/slip_o003.png",
    "paymentStatus": "successful",
    "escrowStatus": "held",
    "updateAt": "2026-07-15T16:55:00Z"
  },
  {
    "_id": ObjectId("11f800000000000000000004"),
    "order_id": ObjectId("11f700000000000000000004"),
    "amount": 1800.00,
    "payslip": "https://storage.changhub.io/slips/slip_o004.png",
    "paymentStatus": "successful",
    "escrowStatus": "refunded",
    "updateAt": "2026-07-16T11:00:00Z"
  },
  {
    "_id": ObjectId("11f800000000000000000005"),
    "order_id": ObjectId("11f700000000000000000005"),
    "amount": 1200.00,
    "payslip": "https://storage.changhub.io/slips/slip_o005.png",
    "paymentStatus": "successful",
    "escrowStatus": "released",
    "updateAt": "2026-07-20T11:00:00Z"
  }
]
);

db.payment.aggregate([
  {
    $lookup: {
      from: "orders",
      localField: "order_id",
      foreignField: "_id",
      as: "orderDetails"
    }
  },
  {
    $unwind: "$orderDetails"
  }
]);