use("changhub-db");

// Clear existing data in the service_types collection
db.service_types.deleteMany({});

// Insert mock data into the service_types collection
db.service_types.insertMany(
[
  { 
    "_id":  ObjectId("11f400000000000000000001") , 
    "category_id":ObjectId("11f300000000000000000001"), 
    "type_name": "Home Wiring & Socket Repair" 
  },
  { 
    "_id":  ObjectId("11f400000000000000000002") , 
    "category_id": ObjectId("11f300000000000000000001"), 
    "type_name": "Consumer Unit & Breaker Installation" 
  },
  { 
    "_id":  ObjectId("11f400000000000000000003") , 
    "category_id": ObjectId("11f300000000000000000001"), 
    "type_name": "Solar Cell & Inverter System Installation" 
  },
  { 
    "_id":  ObjectId("11f400000000000000000004") , 
    "category_id": ObjectId("11f300000000000000000001"), 
    "type_name": "Large Home Appliance Repair" 
  },
  { 
    "_id":  ObjectId("11f400000000000000000005") , 
    "category_id": ObjectId("11f300000000000000000002"), 
    "type_name": "Wall-Mounted AC Cleaning" 
  },
  { 
    "_id":  ObjectId("11f400000000000000000006") , 
    "category_id": ObjectId("11f300000000000000000002"), 
    "type_name": "AC Leak Repair & Gas Refill" 
  },
  { 
    "_id":  ObjectId("11f400000000000000000007") , 
    "category_id": ObjectId("11f300000000000000000002"), 
    "type_name": "AC Relocation & New Unit Installation" 
  },
  { 
    "_id":  ObjectId("11f400000000000000000008") , 
    "category_id": ObjectId("11f300000000000000000002"), 
    "type_name": "Factory & Central AC Maintenance" 
  }
]
);
db.service_types.aggregate([
  {
    $lookup: {
      from: "service_categories",
      localField: "category_id",
      foreignField: "_id",
      as: "category_info"
    }
  },
  {$unwind: "$category_info"},
]);