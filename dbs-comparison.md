# PostgreSQL (SQL) vs. MongoDB (NoSQL) Comparison
## เปรียบเทียบฐานข้อมูล: PostgreSQL (SQL) ปะทะ MongoDB (NoSQL)

This document provides a comprehensive comparison between **PostgreSQL** (a Relational/SQL Database) and **MongoDB** (a Document/NoSQL Database), using the **Chrome Burger** project structure as a practical case study.

เอกสารฉบับนี้จัดทำขึ้นเพื่อเปรียบเทียบความแตกต่างระหว่าง **PostgreSQL** (ฐานข้อมูลเชิงสัมพันธ์ / SQL) และ **MongoDB** (ฐานข้อมูลแบบเอกสาร / NoSQL) อย่างครบถ้วน โดยใช้โครงสร้างข้อมูลจากโปรเจกต์ **Chrome Burger** ในเวิร์กสเปซนี้เป็นกรณีศึกษาเพื่อความเข้าใจที่ง่ายขึ้น

---

## 1. Terminology Mapping / ตารางเปรียบเทียบคำศัพท์
To understand the differences, let's first map the terms used in both database systems:

เพื่อทำความเข้าใจความแตกต่างอันดับแรกเรามาดูคำศัพท์ที่เทียบเคียงกันได้ของทั้งสองระบบ:

| PostgreSQL (SQL) | MongoDB (NoSQL) | Description / คำอธิบาย (EN/TH) |
| :--- | :--- | :--- |
| **Database** | **Database** | The container holding tables or collections. / ที่เก็บตาราง (Tables) หรือคอลเลกชัน (Collections) |
| **Table** | **Collection** | A set of records/documents. / กลุ่มของแถวข้อมูลหรือเอกสาร |
| **Row / Record** | **Document** | A single record. MongoDB stores this in BSON (Binary JSON). / ข้อมูล 1 รายการ โดย MongoDB จัดเก็บในรูปแบบ BSON |
| **Column** | **Field** | An attribute within a record/document. / คุณลักษณะย่อย (ฟิลด์) ภายในเอกสารหรือแถวข้อมูล |
| **Primary Key** | **Primary Key (`_id`)** | Unique identifier for each record/document. / ตัวระบุที่เป็นเอกลักษณ์เฉพาะสำหรับแต่ละแถวหรือเอกสาร |
| **Foreign Key** | **Reference ID (`ObjectId`)** | A link to reference another table/collection. / ตัวเชื่อมโยงเพื่ออ้างอิงไปยังตารางหรือคอลเลกชันอื่น |
| **JOIN** | **`$lookup` / Embedding** | Combining data from multiple tables/collections. / การเชื่อมและดึงข้อมูลจากหลายแหล่งมารวมกัน |
| **Group By** | **`$group` (Aggregation)** | Grouping records for calculation (SUM, AVG, etc.). / การจัดกลุ่มข้อมูลเพื่อคำนวณสรุป (เช่น หาผลรวม หรือค่าเฉลี่ย) |

---

## 2. Data Modeling & Case Study: Chrome Burger
## 2. การออกแบบโมเดลข้อมูลและกรณีศึกษา: Chrome Burger

The primary architectural difference lies in how data is structured and related:
- **PostgreSQL** uses **Normalization** (splitting data into multiple tables connected via Foreign Keys to prevent redundancy).
- **MongoDB** uses **Denormalization** (embedding related data directly inside a single document to optimize read speed, or referencing if needed).

ความแตกต่างหลักเชิงโครงสร้างคือวิธีการออกแบบความสัมพันธ์ของข้อมูล:
- **PostgreSQL** ใช้หลักการ **Normalization** (การแตกข้อมูลออกเป็นหลายตารางแล้วเชื่อมด้วย Foreign Key เพื่อลดความซ้ำซ้อนของข้อมูล)
- **MongoDB** นิยมใช้หลักการ **Denormalization** (การฝังข้อมูลที่เกี่ยวข้องกันไว้ในเอกสารตัวเดียวกันเพื่อลดขั้นตอนการเชื่อมโยงข้อมูล หรือสืบค้นได้เร็วขึ้น แต่บางครั้งก็อาจใช้การอ้างอิงไอดีหากจำเป็น)

### 🍔 The Order Scenario / สถานการณ์: การสั่งอาหาร (Orders)
Let's see how an order containing multiple menu items and handled by a staff member is modeled in both databases:

มาดูตัวอย่างการเก็บข้อมูลการสั่งซื้อ (Order) ที่ประกอบไปด้วยรายการอาหารหลายรายการและพนักงานที่ดูแล ในฐานข้อมูลทั้งสองระบบ:

#### A. PostgreSQL Relational Approach (Normalized)
Data is divided into three distinct tables: `Orders`, `OrderItems` (a Join Table), and `MenuItems`.

ข้อมูลจะถูกแบ่งออกเป็น 3 ตารางแยกจากกัน ได้แก่ `Orders`, `OrderItems` (ตารางกลางสำหรับเชื่อมความสัมพันธ์) และ `MenuItems`:

```sql
-- 1. Orders Table: Holds metadata about the order
CREATE TABLE Orders (
    order_id SERIAL PRIMARY KEY,
    order_date TIMESTAMP NOT NULL DEFAULT NOW(),
    total_price DECIMAL(10, 2) NOT NULL,
    staff_id INTEGER REFERENCES Staff(staff_id)
);

-- 2. OrderItems Table: Links orders to menu items and records quantities
CREATE TABLE OrderItems (
    order_item_id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES Orders(order_id) ON DELETE CASCADE,
    item_id INTEGER NOT NULL REFERENCES MenuItems(item_id),
    quantity INTEGER NOT NULL
);
```

#### B. MongoDB Document Approach (Denormalized/Embedded)
Data is stored inside a single `orders` collection. The ordered items are embedded directly as an array of sub-documents.

ข้อมูลทรานแซกชันการสั่งอาหารทั้งหมดจะถูกเก็บเป็นเอกสารเดียวในคอลเลกชัน `orders` โดยรายการอาหารที่สั่งจะถูกฝังลงไปตรงๆ ในฟิลด์อาร์เรย์ (`items` array):

```javascript
// A single document inside the 'orders' collection
{
  "_id": ObjectId("65f400000000000000000001"),
  "order_date": ISODate("2024-03-13T10:00:00Z"),
  "total_price": 20.98,
  "staff_id": ObjectId("65f100000000000000000001"), // Reference to Staff collection
  "items": [
    {
      "menu_item_id": ObjectId("65f300000000000000000001"),
      "name": "Classic Burger",
      "price": 9.99,
      "quantity": 1
    },
    {
      "menu_item_id": ObjectId("65f300000000000000000002"),
      "name": "Cheeseburger",
      "price": 10.99,
      "quantity": 1
    }
  ]
}
```

> [!NOTE]
> **Why embed name and price in MongoDB?**
> By saving the item `name` and `price` at the exact moment of the purchase, we preserve historical purchase data. If the price of "Classic Burger" increases tomorrow, historical orders still show the price of $9.99. In SQL, this history is typically handled by either archiving or duplicating the price in `OrderItems`.
>
> **ทำไมจึงควรฝังชื่อและราคาอาหารลงไปใน MongoDB ตรงๆ?**
> การเก็บ `name` และ `price` ณ ขณะเกิดรายการสั่งซื้อ ช่วยให้ราคานั้นคงอยู่เป็นประวัติศาสตร์การซื้อขาย แม้วันพรุ่งนี้ราคาของ "Classic Burger" ในตารางหลักจะเพิ่มขึ้นก็ตาม ซึ่งหากเป็นระบบ SQL เรามักจะต้องบันทึกราคาลงไปในตาราง `OrderItems` เช่นกันเพื่อไม่ให้ค่าประวัติศาสตร์คลาดเคลื่อน

---

## 3. Schema Nature: Rigid vs. Flexible
## 3. ธรรมชาติของโครงสร้างข้อมูล (Schema): แบบคงที่ ปะทะ แบบยืดหยุ่น

| Aspect / ด้านการใช้งาน | PostgreSQL | MongoDB |
| :--- | :--- | :--- |
| **Schema enforcement** / **การบังคับใช้โครงสร้าง** | **Strict / Rigid**: Every row must follow the defined columns and types. Adding a column requires `ALTER TABLE`. / **เข้มงวด**: ทุกแถวข้อมูลต้องตรงตามคอลัมน์และประเภทข้อมูลที่กำหนด หากต้องการเพิ่มข้อมูลฟิลด์ใหม่ต้องแก้ไขตารางด้วย `ALTER TABLE` | **Dynamic / Flexible**: Documents in the same collection can have different fields and structures. No predefined columns needed. / **ยืดหยุ่นสูง**: เอกสารข้อมูลในคอลเลกชันเดียวกันสามารถมีโครงสร้างและฟิลด์ที่แตกต่างกันได้ ไม่จำเป็นต้องกำหนดโครงสร้างล่วงหน้า |
| **Validation** / **การตรวจสอบความถูกต้อง** | Checked at the database engine level (constraints, types, nullability). / ตรวจสอบความถูกต้องที่ระดับตัวฐานข้อมูล (เช่น Constraints, Data Types, NULL/NOT NULL) | Managed primarily at the application level (e.g., using Mongoose in Node.js) or through optional JSON Schema validation. / ตรวจสอบที่ระดับโค้ดแอปพลิเคชัน (เช่น Mongoose) หรือเขียนกฎ Schema Validation ครอบไว้ |
| **Data types** / **ประเภทข้อมูล** | Advanced built-in types (JSONB, Arrays, Geometric, UUID, Ranges). / มีประเภทข้อมูลที่ซับซ้อนในตัว (เช่น JSONB, Arrays, UUID, ช่วงข้อมูล) | BSON types (ObjectIds, Date, Binary data, Nested documents). / ประเภทข้อมูลแบบ BSON (เช่น ObjectIds, Date, อ็อบเจกต์ย่อยฝังในตัว) |

---

## 4. Query Comparison (SQL vs. MQL)
## 4. เปรียบเทียบไวยากรณ์คำสั่งคิวรี (SQL ปะทะ MQL)

Here is a side-by-side comparison of common database operations (CRUD) for the Chrome Burger project.

ตารางเปรียบเทียบคำสั่งในการจัดการข้อมูลทั่วไป (CRUD) ระหว่าง SQL ใน PostgreSQL และ MQL (MongoDB Query Language) ใน MongoDB:

### 1. Create (Insert Data / เพิ่มข้อมูล)
*   **PostgreSQL:**
    ```sql
    INSERT INTO Staff (first_name, last_name, role) 
    VALUES ('Jane', 'Doe', 'Cashier');
    ```
*   **MongoDB:**
    ```javascript
    db.staff.insertOne({
      first_name: "Jane",
      last_name: "Doe",
      role: "Cashier"
    });
    ```

### 2. Read (Query Data / ค้นหาและดึงข้อมูล)
#### A. Find all records / ดึงข้อมูลทั้งหมด
*   **PostgreSQL:**
    ```sql
    SELECT * FROM Staff;
    ```
*   **MongoDB:**
    ```javascript
    db.staff.find({});
    ```

#### B. Filter by a condition / กรองข้อมูลตามเงื่อนไข
*   **PostgreSQL:**
    ```sql
    SELECT * FROM Orders WHERE total_price >= 25.00;
    ```
*   **MongoDB:**
    ```javascript
    db.orders.find({ total_price: { $gte: 25.00 } });
    ```

#### C. Multiple conditions (AND/OR) / กรองด้วยเงื่อนไขหลายข้อ
*   **PostgreSQL:**
    ```sql
    SELECT * FROM MenuItems 
    WHERE category = 'Burger' AND price <= 12.00;
    ```
*   **MongoDB:**
    ```javascript
    // Implicit AND
    db.menu_items.find({ 
      category: "Burger", 
      price: { $lte: 12.00 } 
    });
    ```

#### D. Sort, Limit, and Skip (Pagination) / เรียงลำดับ จำกัดจำนวน และข้ามข้อมูล
*   **PostgreSQL:**
    ```sql
    SELECT * FROM MenuItems 
    ORDER BY price DESC 
    LIMIT 5 OFFSET 10;
    ```
*   **MongoDB:**
    ```javascript
    db.menu_items.find()
      .sort({ price: -1 })
      .skip(10)
      .limit(5);
    ```

### 3. Update (Modify Data / แก้ไขข้อมูล)
*   **PostgreSQL:**
    ```sql
    UPDATE Ingredients 
    SET stock_level = stock_level + 10.00 
    WHERE name = 'Beef Patty';
    ```
*   **MongoDB:**
    ```javascript
    db.ingredients.updateOne(
      { name: "Beef Patty" },
      { $inc: { stock_level: 10.00 } }
    );
    ```

### 4. Delete (Remove Data / ลบข้อมูล)
*   **PostgreSQL:**
    ```sql
    DELETE FROM Staff WHERE staff_id = 4;
    ```
*   **MongoDB:**
    ```javascript
    db.staff.deleteOne({ _id: ObjectId("65f10000000000000004") });
    ```

---

## 5. Joining Data: JOIN vs. $lookup
## 5. การเชื่อมตารางข้อมูล: JOIN ปะทะ $lookup

Joining data is where these two systems differ the most. PostgreSQL handles joins very efficiently because it is optimized for relations, whereas MongoDB requires an aggregation pipeline `$lookup` operator.

การดึงข้อมูลข้ามตารางเป็นจุดที่แตกต่างกันอย่างสิ้นเชิง PostgreSQL จัดการเรื่องนี้ได้อย่างมีประสิทธิภาพสูงเพราะถูกออกแบบมาเพื่อระบบความสัมพันธ์ ในขณะที่ MongoDB จะต้องใช้ตัวดำเนินการ `$lookup` ภายใต้ Aggregation Pipeline

### Scenario: Get all orders including the staff member's name
### โจทย์: ดึงข้อมูลการสั่งซื้อทั้งหมด พร้อมแสดงชื่อของพนักงานที่รับออเดอร์นั้นๆ

#### A. PostgreSQL JOIN
```sql
SELECT 
    o.order_id, 
    o.order_date, 
    o.total_price, 
    s.first_name, 
    s.last_name,
    s.role
FROM Orders o
INNER JOIN Staff s ON o.staff_id = s.staff_id;
```
*Result:* Returns flat rows where each row contains both order and staff columns. Fast and memory-efficient.

*ผลลัพธ์:* จะได้ตารางผลลัพธ์แบบแบนราบ (Flat) ที่แต่ละแถวข้อมูลมีทั้งคอลัมน์ของคำสั่งซื้อและพนักงาน ซึ่งทำงานได้รวดเร็วและใช้ทรัพยากรหน่วยความจำอย่างคุ้มค่า

#### B. MongoDB Aggregation Pipeline (`$lookup`)
```javascript
db.orders.aggregate([
  {
    $lookup: {
      from: "staff",                 // The target collection to join / คอลเลกชันปลายทางที่จะไปเชื่อม
      localField: "staff_id",        // Field in the orders collection / ฟิลด์ในฝั่งต้นทาง (orders)
      foreignField: "_id",           // Field in the staff collection / ฟิลด์ในฝั่งปลายทาง (staff)
      as: "staff_info"               // Output array field name / ชื่อฟิลด์อาร์เรย์ใหม่ที่จะบันทึกข้อมูลที่เชื่อมมาได้
    }
  },
  { 
    $unwind: "$staff_info"           // Deconstruct the array to an object / แปลงผลลัพธ์จากอาร์เรย์ให้เป็นอ็อบเจกต์เดี่ยว
  },
  {
    $project: {                      // Select fields to show / เลือกฟิลด์ที่ต้องการแสดงในผลลัพธ์สุดท้าย
      order_date: 1,
      total_price: 1,
      "staff_info.first_name": 1,
      "staff_info.last_name": 1,
      "staff_info.role": 1
    }
  }
]);
```
*Result:* Returns hierarchical JSON objects containing embedded staff detail objects.

*ผลลัพธ์:* จะคืนค่าออกมาเป็นอ็อบเจกต์ JSON ที่มีความสัมพันธ์เป็นลำดับขั้น (Hierarchical) โดยมีรายละเอียดข้อมูลพนักงานฝังซ้อนเป็นอ็อบเจกต์ย่อยอยู่ภายในออเดอร์นั้นๆ

---

## 6. ACID Transactions & Reliability
## 6. ทรานแซกชันและความถูกต้องของข้อมูล (ACID)

> [!IMPORTANT]
> **ACID Requirements**
> - **Atomicity (ความทำทั้งหมดหรือไม่มีเลย):** Either all operations in a transaction succeed, or all are rolled back.
> - **Consistency (ความสอดคล้องของข้อมูล):** Transactions transition the database from one valid state to another.
> - **Isolation (ความเป็นเอกเทศ):** Transactions running concurrently do not interfere with each other.
> - **Durability (ความคงทน):** Once committed, transactions survive system failures.

*   **PostgreSQL:** 
    *   Designed from day one to be strictly ACID-compliant.
    *   Supports complex, multi-table transactions natively with robust lock mechanisms.
    *   Ideal for finance, billing, inventory control, and core e-commerce orders.
*   **MongoDB:**
    *   Historically prioritized performance and horizontal scalability over multi-document transactions.
    *   Single-document operations are always atomic (since you embed items in an order, updating the order is atomic by nature).
    *   Supports multi-document ACID transactions since version 4.0 (Replica Sets) and 4.2 (Sharded Clusters), but they incur higher performance costs compared to SQL.

---

## 7. Scaling: Scale-Up vs. Scale-Out
## 7. การขยายขีดความสามารถ (Scaling)

```mermaid
graph TD
    subgraph Vertical Scaling [Vertical Scaling (Scale-Up)]
        A[Single Server] --> B[Upgrade Server: Add More CPU, RAM, SSD]
    end
    subgraph Horizontal Scaling [Horizontal Scaling (Scale-Out)]
        C[Server 1] --- D[Server 2]
        C --- E[Server 3]
        D --- F[Server 4 (Sharding / Partitioning Data)]
    end
```

*   **PostgreSQL (Vertical Scaling / Scale-up):**
    *   Typically scaled by adding more power (CPU, RAM, Storage) to a single database server.
    *   Horizontal read scaling is possible using Read Replicas, but write scaling horizontally is complex to set up.
*   **MongoDB (Horizontal Scaling / Scale-out):**
    *   Designed to scale out natively by dividing data across multiple servers (**Sharding**).
    *   Ideal for massive volumes of data and write-heavy applications, as traffic can be distributed easily.

---

## 8. Summary Comparison Matrix
## 8. ตารางสรุปเปรียบเทียบ

| Feature / ฟีเจอร์ | PostgreSQL | MongoDB |
| :--- | :--- | :--- |
| **Database Type** / **ประเภทระบบ** | Relational (RDBMS) / เชิงสัมพันธ์ | Document-based (NoSQL) / แบบเอกสาร |
| **Query Language** / **ภาษาคิวรี** | SQL (Structured Query Language) | MQL (MongoDB Query Language) + JSON |
| **Data Structure** / **โครงสร้างข้อมูล** | Rows & Columns (Tables) / แถวและคอลัมน์ (ตาราง) | JSON-like Documents (BSON) / เอกสาร JSON |
| **Schema Type** / **รูปแบบโครงสร้าง** | Rigid & Pre-defined / คงที่และต้องออกแบบไว้ก่อน | Dynamic & Flexible / เปลี่ยนแปลงง่ายและยืดหยุ่น |
| **Relationships** / **ความสัมพันธ์** | JOINs, Foreign Keys (Highly Optimized) / ดึงข้อมูลข้ามตารางประสิทธิภาพสูง | Reference ID, Embedding (Nested Arrays) / การฝังข้อมูลด้านในหรือใส่ไอดีอ้างอิง |
| **ACID Compliance** / **การรับรอง ACID** | Native & Strict / สมบูรณ์แบบและเคร่งครัดตามมาตรฐาน | Supported since v4.0 (optimized for single document) / รองรับตั้งแต่เวอร์ชัน 4.0 ขึ้นไป |
| **Primary Scaling** / **การขยายขนาดหลัก** | Vertical (Scale-Up) / แนวดิ่ง (เพิ่มแรม/ซีพียู) | Horizontal (Scale-Out via Sharding) / แนวราบ (กระจายหลายเซิร์ฟเวอร์) |

---

## 9. Decision Guide: When to choose which?
## 9. แนวทางการตัดสินใจ: ควรเลือกใช้ตัวไหนเมื่อไร?

### 🐘 Choose PostgreSQL if... / เลือกใช้ PostgreSQL เมื่อ...
1.  **Strict Relations:** Your data has natural, complex relationships with high consistency requirements (e.g., Accounting, ERP, Billing systems).
    *   *ข้อมูลมีความสัมพันธ์ซับซ้อนและเชื่อมโยงกันอย่างเป็นระบบ ต้องการความแม่นยำสูงมาก เช่น ระบบการเงิน บัญชี และสินค้าคงคลัง*
2.  **Strict Schema:** You want to enforce data integrity at the database level and prevent incorrect data formats from being saved.
    *   *ต้องการบังคับใช้โครงสร้างข้อมูลแบบเข้มงวด ป้องกันความผิดพลาดของข้อมูลในระดับฐานข้อมูล*
3.  **Complex Joins:** Your application performs multiple complex queries and aggregations across many tables daily.
    *   *ระบบจำเป็นต้องจอยตารางข้อมูลจำนวนมากสม่ำเสมอ เพื่อออกรายงานผลลัพธ์ที่มีความซับซ้อน*

### 🍃 Choose MongoDB if... / เลือกใช้ MongoDB เมื่อ...
1.  **Rapid Prototyping:** Your schema is continuously changing, and you want to deploy features without performing complex migrations.
    *   *ต้องการพัฒนาโปรเจกต์อย่างรวดเร็ว (Agile/Prototype) เนื่องจากโครงสร้างข้อมูลเปลี่ยนบ่อยและไม่อยากทำ Database Migration ทุกครั้งที่ปรับฟีเจอร์*
2.  **Hierarchical / Document Data:** Your data naturally maps to JSON (e.g., catalog items with varying specs, user profiles with dynamic social links, nested blog posts with comments).
    *   *ข้อมูลมีลักษณะเป็นลำดับชั้นหรือโครงสร้างไม่แน่นอน เช่น ข้อมูลสินค้าที่มีสเปกต่างกัน, โปรไฟล์ผู้ใช้ที่มีข้อมูลไม่เหมือนกัน*
3.  **High Write Loads & Big Data:** You need horizontal scaling out-of-the-box to handle millions of operations per second and terabytes of data.
    *   *ต้องการประสิทธิภาพสูงในการบันทึกข้อมูล (Write-heavy) และระบบจำเป็นต้องรองรับการจัดเก็บข้อมูลระดับบิ๊กดาต้าที่ต้องขยายเซิร์ฟเวอร์แบบกระจายตัว*
