use("changhub-db");

// Clear existing data in the chats collection
db.chats.deleteMany({});

// Insert mock data into the chats collection with exactly 24-character ObjectIds
db.chats.insertMany(
[
  {
    "_id": ObjectId("11f900000000000000000001"),
    "type": "order_support",
    "order_id": ObjectId("11f700000000000000000001"),
    "participant": [ObjectId("11f000000000000000000001"), ObjectId("11f100000000000000000001")],
    "lastMessageAt": "2026-07-14T08:32:00Z",
    "createdAt": "2026-07-14T08:30:00Z"
  },
  {
    "_id": ObjectId("11f900000000000000000002"),
    "type": "order_support",
    "order_id": ObjectId("11f700000000000000000003"),
    "participant": [ObjectId("11f000000000000000000005"), ObjectId("11f100000000000000000002")],
    "lastMessageAt": "2026-07-16T15:45:00Z",
    "createdAt": "2026-07-15T16:45:00Z"
  },
  {
    "_id": ObjectId("11f900000000000000000003"),
    "type": "order_support",
    "order_id": ObjectId("11f700000000000000000005"),
    "participant": [ObjectId("11f000000000000000000003"), ObjectId("11f100000000000000000001")],
    "lastMessageAt": "2026-07-17T09:45:00Z",
    "createdAt": "2026-07-17T09:20:00Z"
  },
  {
    "_id": ObjectId("11f900000000000000000004"),
    "type": "customer_admin",
    "order_id": null,
    "participant": [ObjectId("11f000000000000000000002"), ObjectId("11f200000000000000000001")],
    "lastMessageAt": "2026-07-18T11:05:00Z",
    "createdAt": "2026-07-18T11:00:00Z"
  },
  {
    "_id": ObjectId("11f900000000000000000005"),
    "type": "technician_admin",
    "order_id": null,
    "participant": [ObjectId("11f100000000000000000004"), ObjectId("11f200000000000000000002")],
    "lastMessageAt": "2026-07-19T14:22:00Z",
    "createdAt": "2026-07-19T14:15:00Z"
  }
]
);
db.chats.aggregate([
  {
    $lookup: {
      from: "orders",
      localField: "order_id",
      foreignField: "_id",
      as: "orderDetails"
    }
  },
  { 
    $unwind: { 
      path: "$orderDetails", 
      preserveNullAndEmptyArrays: true 
    } 
  },

  {
    $lookup: {
      from: "users",
      localField: "participant",
      foreignField: "_id",
      as: "customer_participants"
    }
  },
  {
    $lookup: {
      from: "technicians",
      localField: "participant",
      foreignField: "_id",
      as: "technician_participants"
    }
  },
  {
    $lookup: {
      from: "admins",
      localField: "participant",
      foreignField: "_id",
      as: "admin_participants"
    }
  },


  {
    $project: {
      _id: 1,
      type: 1,
      order_id: 1,
      lastMessageAt: 1,
      createdAt: 1,
      orderDetails: 1,
      participantDetails: {
        $concatArrays: [
          "$customer_participants",
          "$technician_participants",
          "$admin_participants"
        ]
      }
    }
  }
]);