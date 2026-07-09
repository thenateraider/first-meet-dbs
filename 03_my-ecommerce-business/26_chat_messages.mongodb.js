use("changhub-db");

// Clear existing data in the chat_messages collection
db.chat_messages.deleteMany({});

// Insert mock data into the chat_messages collection with exactly 24-character ObjectIds
db.chat_messages.insertMany(
[
  {
    "_id":ObjectId("11fa00000000000000000001"),
    "chat_id": ObjectId("11f900000000000000000001"),
    "sender_id": ObjectId("11f000000000000000000001"),
    "message": "Hello Tony, the bedroom outlets completely stopped working. Could you please check them?",
    "sentAt": "2026-07-14T08:31:00Z"
  },
  {
    "_id":ObjectId("11fa00000000000000000002"),
    "chat_id": ObjectId("11f900000000000000000001"),
    "sender_id": ObjectId("11f100000000000000000001"),
    "message": "Hi Clark, I received your request. Once you process the escrow payment, I will head over to your location.",
    "sentAt": "2026-07-14T08:32:00Z"
  },

  {
    "_id":ObjectId("11fa00000000000000000003"),
    "chat_id": ObjectId("11f900000000000000000002"),
    "sender_id": ObjectId("11f100000000000000000002"),
    "message": "Hi Hal, I have inspected your solar system. The DC fuses and SPD are burnt, but the panels are fine.",
    "sentAt": "2026-07-16T15:40:00Z"
  },
  {
    "_id":ObjectId("11fa00000000000000000004"),
    "chat_id": ObjectId("11f900000000000000000002"),
    "sender_id": ObjectId("11f000000000000000000005"),
    "message": "Thanks Steve! I will approve the additional costs and release the escrow funds right away.",
    "sentAt": "2026-07-16T15:45:00Z"
  },

  {
    "_id":ObjectId("11fa00000000000000000005"),
    "chat_id": ObjectId("11f900000000000000000003"),
    "sender_id": ObjectId("11f000000000000000000003"),
    "message": "Tony, can we upgrade the main breaker to a 50A unit instead of the regular one?",
    "sentAt": "2026-07-17T09:30:00Z"
  },
  {
    "_id":ObjectId("11fa00000000000000000006"),
    "chat_id": ObjectId("11f900000000000000000003"),
    "sender_id": ObjectId("11f100000000000000000001"),
    "message": "Sure Diana, I've updated the order with an add-on item of 350 Baht for the breaker upgrade.",
    "sentAt": "2026-07-17T09:45:00Z"
  },

  {
    "_id":ObjectId("11fa00000000000000000007"),
    "chat_id": ObjectId("11f900000000000000000004"),
    "sender_id": ObjectId("11f000000000000000000002"),
    "message": "Hello support, I was charged twice during my last credit card payment transaction.",
    "sentAt": "2026-07-18T11:02:00Z"
  },
  {
    "_id":ObjectId("11fa00000000000000000008"),
    "chat_id": ObjectId("11f900000000000000000004"),
    "sender_id": ObjectId("11f200000000000000000001"),
    "message": "Hello Bruce, Nick here from support. I am reviewing the payment gateway logs to issue a refund.",
    "sentAt": "2026-07-18T11:05:00Z"
  },

  {
    "_id":ObjectId("11fa00000000000000000009"),
    "chat_id": ObjectId("11f900000000000000000005"),
    "sender_id": ObjectId("11f100000000000000000004"),
    "message": "Hi, I am unable to upload my national ID card copy for account verification. It gives an error.",
    "sentAt": "2026-07-19T14:18:00Z"
  },
  {
    "_id":ObjectId("11fa00000000000000000010"),
    "chat_id": ObjectId("11f900000000000000000005"),
    "sender_id": ObjectId("11f200000000000000000002"),
    "message": "Hi Bruce, Maria here. Please ensure the image size is under 5MB. Alternatively, you can send it here.",
    "sentAt": "2026-07-19T14:22:00Z"
  }
]
);
use("changhub-db");

db.chat_messages.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "sender_id",
      foreignField: "_id",
      as: "user_sender"
    }
  },
  {
    $unwind: {
      path: "$user_sender",
      preserveNullAndEmptyArrays: true
    }
  },
  {
    $lookup: {
      from: "technicians",
      localField: "sender_id",
      foreignField: "_id",
      as: "technician_sender"
    }
  },
  {
    $unwind: {
      path: "$technician_sender",
      preserveNullAndEmptyArrays: true
    }
  },
  {
    $lookup: {
      from: "admins",
      localField: "sender_id",
      foreignField: "_id",
      as: "admin_sender"
    }
  },
  {
    $unwind: {
      path: "$admin_sender",
      preserveNullAndEmptyArrays: true
    }
  },

  {
    $project: {
      _id: 1,
      chat_id: 1,
      sender_id: 1,
      message: 1,
      sentAt: 1,
      sender_details: {
        $ifNull: [
          "$user_sender",
          "$technician_sender",
          "$admin_sender"
        ]
      },
      sender_type: {
        $cond: {
          if: "$user_sender", then: "user",
          else: {
            $cond: {
              if: "$technician_sender", then: "technician",
              else: "admin"
            }
          }
        }
      }
    }
  }
]);