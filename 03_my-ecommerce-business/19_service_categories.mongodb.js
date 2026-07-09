use("changhub-db");

// Clear existing data in the service_categories collection
db.service_categories.deleteMany({});

// Insert mock data into the service_categories collection
db.service_categories.insertMany(
[
  { 
    "_id": "cat001", 
    "category_name": "Electrical System Services" 
  },
  { 
    "_id": "cat002", 
    "category_name": "Air Conditioning Services" 
  }
]
);
db.service_categories.find({});