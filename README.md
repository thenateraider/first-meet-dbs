# First Meet Databases: MongoDB Queries, PostgreSQL & TCP Overview

โปรเจคนี้ประกอบด้วยไฟล์สคริปต์แบบฝึกหัดคำสั่งคิวรี MongoDB (`.mongodb.js`) บนฐานข้อมูลตัวอย่าง `sample_mflix` จำนวน 20 สคริปต์ ซึ่งได้รับการปรับโครงสร้างเข้าไปอยู่ในโฟลเดอร์เฉพาะ, โครงสร้างรองรับสำหรับ PostgreSQL และไฟล์ไดอะแกรมสรุปเรื่อง **TCP Connection Lifecycle & State Transitions** (`tcp-overview.excalidraw`)

---

## 📌 สารบัญ (Table of Contents)
1. [โครงสร้างโปรเจค (Project Structure)](#1-โครงสร้างโปรเจค-project-structure)
2. [ภาพรวมของคิวรี MongoDB (MongoDB Queries Overview)](#2-ภาพรวมของคิวรี-mongodb-mongodb-queries-overview)
3. [คลังคำสั่งที่สำคัญ (Core Databases Cheat Sheet)](#3-คลังคำสั่งที่สำคัญ-core-databases-cheat-sheet)
   - [🍃 MongoDB Cheatsheet](#-mongodb-cheatsheet)
   - [🐘 PostgreSQL / SQL Cheatsheet](#-postgresql--sql-cheatsheet)
4. [คำอธิบายของแต่ละไฟล์สคริปต์ (Detailed Script Explanations)](#4-คำอธิบายของแต่ละไฟล์สคริปต์-detailed-script-explanations)
5. [ไดอะแกรมสรุป TCP (TCP Overview Diagram - Excalidraw)](#5-ไดอะแกรมสรุป-tcp-tcp-overview-diagram---excalidraw)
6. [การเปรียบเทียบฐานข้อมูล (Database Comparison - MongoDB vs PostgreSQL)](#6-การเปรียบเทียบฐานข้อมูล-database-comparison---then)

---

## 1. โครงสร้างโปรเจค (Project Structure)

โปรเจคนี้ได้รับการจัดระเบียบโครงสร้างใหม่ (Refactored Structure) เพื่อแยกแยะเทคโนโลยีฐานข้อมูลแต่ละตัวอย่างชัดเจน และง่ายต่อการขยายผลแบบฝึกหัดในอนาคต:

```text
first-meet-dbs/
├── mongodb/                          # โฟลเดอร์เก็บสคริปต์คำสั่งคิวรี MongoDB (*.mongodb.js)
│   ├── query.mongodb.js              # ดึงข้อมูลความคิดเห็นทั้งหมด
│   ├── query2.mongodb.js             # ค้นหาภาพยนตร์ตามเงื่อนไข (type & rated)
│   ├── ...                           # แบบฝึกหัดคิวรีอื่นๆ (query3.mongodb.js - query19.mongodb.js)
│   └── query20.mongodb.js            # ค้นหาภาพยนตร์ Action ปี 2010 (Implicit AND + Projection)
├── postgresql/                       # โฟลเดอร์เก็บสคริปต์ SQL สำหรับ PostgreSQL (รองรับโจทย์ในอนาคต)
├── dbs-comparison.md                 # เอกสารเปรียบเทียบเชิงลึก MongoDB vs PostgreSQL (2 ภาษา TH/EN)
├── tcp-overview.excalidraw           # ไดอะแกรมจำลอง TCP Lifecycle & State Transitions
└── README.md                         # ไฟล์คำอธิบายโปรเจค เอกสารโครงสร้าง และคลังคำสั่ง (ไฟล์นี้)
```

---

## 2. ภาพรวมของคิวรี MongoDB (MongoDB Queries Overview)

สคริปต์ในโฟลเดอร์ [mongodb/](file:///C:/Users/HP/Desktop/coding/jsd13/week-02/first-meet-dbs/mongodb) ใช้ในการคิวรีข้อมูลบนคอลเลกชันในฐานข้อมูล `sample_mflix` (เช่น `movies`, `comments`, `theaters`) เพื่อเรียนรู้และฝึกฝนการดึงข้อมูลด้วยความต้องการที่หลากหลาย:
- **การค้นหาขั้นพื้นฐาน (Basic Queries):** การค้นหาแบบจับคู่ค่าตรงตัวและการใช้เงื่อนไขเบื้องต้น
- **การเปรียบเทียบและการคำนวณเงื่อนไข (Comparison & Logical Operators):** เช่น ช่วงตัวเลข, ช่วงเวลา, เงื่อนไขแบบ "และ/หรือ"
- **การจัดการกับอาร์เรย์และอ็อบเจกต์ย่อย (Array & Embedded Documents):** การค้นหาข้อมูลที่ฝังอยู่ข้างใน และการสืบค้นข้อมูลในสมาชิกอาร์เรย์
- **การควบคุมผลลัพธ์ (Output Control):** การทำ Sort, Limit, และการเลือกแสดงฟิลด์ข้อมูลที่ต้องการ (Projection)

---

## 3. คลังคำสั่งที่สำคัญ (Core Databases Cheat Sheet)

คลังข้อมูลสรุปตัวดำเนินการและคำสั่งที่มักใช้งานบ่อยๆ ในการพัฒนาและการสอบคิวรี ทั้งของ MongoDB และเชิงโครงสร้าง SQL (PostgreSQL):

### 🍃 MongoDB Cheatsheet

#### 1. Basic CRUD & Query Commands
| คำสั่ง | คำอธิบาย | ตัวอย่างการใช้งาน |
| :--- | :--- | :--- |
| `use("db_name")` | สลับการใช้งานฐานข้อมูลที่กำหนด | `use("sample_mflix");` |
| `db.col.find(query, proj)` | ค้นหาเอกสารทั้งหมดตามเงื่อนไขและเลือกฟิลด์ | `db.movies.find({ rated: "PG" }, { title: 1 })` |
| `db.col.findOne(query)` | ค้นหาและคืนค่าเพียง 1 เอกสารแรกที่พบ | `db.theaters.findOne({ "location.address.state": "CA" })` |
| `db.col.countDocuments(query)`| นับจำนวนเอกสารที่ตรงตามเงื่อนไข (แนะนำแทน `.count()`) | `db.movies.countDocuments({ year: 2000 })` |
| `.sort({ field: 1 / -1 })` | เรียงลำดับข้อมูล (`1` น้อยไปมาก, `-1` มากไปน้อย) | `db.movies.find().sort({ runtime: -1 })` |
| `.limit(n)` | จำกัดจำนวนเอกสารที่จะแสดงไม่เกิน `n` รายการ | `db.movies.find().limit(5)` |
| `.skip(n)` | ข้ามผลลัพธ์ `n` รายการแรก (ใช้ทำ Pagination) | `db.movies.find().skip(10).limit(10)` |

#### 2. Query Operators
* **Comparison Operators (เปรียบเทียบ)**
  - `$eq` / `$ne`: เท่ากับ / ไม่เท่ากับ
  - `$gt` / `$gte`: มากกว่า / มากกว่าหรือเท่ากับ
  - `$lt` / `$lte`: น้อยกว่า / น้อยกว่าหรือเท่ากับ
  - `$in` / `$nin`: ตรงกับค่าใดค่าหนึ่งในอาร์เรย์ / ไม่อยู่ในอาร์เรย์
  *ตัวอย่าง:* `db.movies.find({ year: { $gte: 2000, $lte: 2005 } })`
* **Logical Operators (ตรรกศาสตร์)**
  - `$and`: รวมเงื่อนไขแบบ "และ" (ต้องเป็นจริงทุกเงื่อนไข)
  - `$or`: รวมเงื่อนไขแบบ "หรือ" (เป็นจริงอย่างน้อยหนึ่งเงื่อนไข)
  - `$not`: ปฏิเสธเงื่อนไขตัวถัดไป
  - `$nor`: ไม่เข้าเงื่อนไขทั้งหมดที่ระบุ
  *ตัวอย่าง:* `db.movies.find({ $or: [ { genres: "Drama" }, { "imdb.rating": { $gte: 8.5 } } ] })`
* **Element Operators (องค์ประกอบ)**
  - `$exists`: ตรวจสอบว่ามีฟิลด์นั้นอยู่หรือไม่ (`true`/`false`)
  - `$type`: ตรวจสอบประเภทข้อมูลของฟิลด์
* **Array Operators (จัดการอาร์เรย์)**
  - `$all`: อาร์เรย์ต้องมีสมาชิกครบทุกตัวตามที่ระบุ
  - `$elemMatch`: สมาชิกในอาร์เรย์อย่างน้อยหนึ่งตัวต้องตรงตามทุกเงื่อนไขย่อย
  - `$size`: ความยาวของอาร์เรย์ต้องเท่ากับค่าที่กำหนด
  *ตัวอย่าง:* `db.movies.find({ cast: { $all: ["Hugh Jackman", "Christian Bale"] } })`
* **Evaluation Operators (ประเมินผล)**
  - `$regex`: ใช้ Regular Expression ในการสืบค้นข้อความ (`options: "i"` สำหรับ Case-Insensitive)
  *ตัวอย่าง:* `db.movies.find({ title: { $regex: "Batman", $options: "i" } })`

#### 3. Update Operators (คำสั่งแก้ไขข้อมูล)
- `$set`: กำหนดค่าให้กับฟิลด์
- `$unset`: ลบฟิลด์ออกจากเอกสาร
- `$inc`: เพิ่มหรือลดค่าที่เป็นตัวเลขตามระบุ
- `$push`: เพิ่มสมาชิกเข้าไปในอาร์เรย์
- `$pull`: ลบสมาชิกออกจากอาร์เรย์ที่ระบุ
*ตัวอย่าง:* `db.movies.updateOne({ title: "Avatar" }, { $inc: { "imdb.votes": 1 } })`

---

### 🐘 PostgreSQL / SQL Cheatsheet

#### 1. Basic Querying (ดึงข้อมูลพื้นฐาน)
```sql
-- เลือกทุกคอลัมน์จากตาราง movies โดยมีเงื่อนไขและเรียงลำดับ
SELECT * FROM movies 
WHERE year >= 2000 AND rated = 'PG-13'
ORDER BY imdb_rating DESC 
LIMIT 10 OFFSET 0;

-- ดึงข้อมูลแบบไม่ซ้ำกัน (Distinct)
SELECT DISTINCT genres FROM movies;
```

#### 2. SQL JOINs (การเชื่อมโยงตาราง)
```sql
-- INNER JOIN: ดึงข้อมูลที่จับคู่กันได้เท่านั้น
SELECT m.title, c.author, c.text 
FROM movies m
INNER JOIN comments c ON m.id = c.movie_id;

-- LEFT JOIN: ดึงข้อมูลฝั่งซ้ายทั้งหมด แม้ฝั่งขวาจะไม่มีข้อมูลจับคู่
SELECT t.name, t.city, s.show_time
FROM theaters t
LEFT JOIN showtimes s ON t.id = s.theater_id;
```

#### 3. Grouping & Aggregation (จัดกลุ่มและสรุปผลข้อมูล)
```sql
-- นับจำนวนภาพยนตร์ในแต่ละประเภทเรตติ้ง โดยหาเฉพาะกลุ่มที่มีคะแนนเฉลี่ย >= 7.0
SELECT rated, COUNT(*) as movie_count, AVG(imdb_rating) as avg_rating
FROM movies
WHERE year > 2010
GROUP BY rated
HAVING AVG(imdb_rating) >= 7.0;
```

#### 4. Data Modification (DML)
```sql
-- เพิ่มข้อมูลใหม่ (Insert)
INSERT INTO comments (movie_id, author, text, created_at)
VALUES (101, 'John Doe', 'Great movie!', NOW());

-- อัปเดตข้อมูล (Update)
UPDATE movies 
SET imdb_rating = 8.5 
WHERE id = 101;

-- ลบข้อมูล (Delete)
DELETE FROM comments 
WHERE author = 'Spammer';
```

---

## 4. คำอธิบายของแต่ละไฟล์สคริปต์ (Detailed Script Explanations)

สคริปต์ทั้งหมดในสัญญลักษณ์ด้านล่างตั้งอยู่ภายในโฟลเดอร์ [mongodb/](file:///C:/Users/HP/Desktop/coding/jsd13/week-02/first-meet-dbs/mongodb):

### 📄 [query.mongodb.js](file:///C:/Users/HP/Desktop/coding/jsd13/week-02/first-meet-dbs/mongodb/query.mongodb.js)
* **ฐานข้อมูล:** `sample_mflix` | **คอลเลกชัน:** `comments`
* **คำอธิบาย:** ดึงข้อมูลความคิดเห็น (Comments) ทั้งหมดที่มีในคอลเลกชัน

### 📄 [query2.mongodb.js](file:///C:/Users/HP/Desktop/coding/jsd13/week-02/first-meet-dbs/mongodb/query2.mongodb.js)
* **ฐานข้อมูล:** `sample_mflix` | **คอลเลกชัน:** `movies`
* **คำอธิบาย:** ดึงข้อมูลภาพยนตร์ที่มีประเภท (`type`) เป็น `"movie"` และมีเรตติ้งความเหมาะสม (`rated`) เป็น `"TV-G"`

### 📄 [query3.mongodb.js](file:///C:/Users/HP/Desktop/coding/jsd13/week-02/first-meet-dbs/mongodb/query3.mongodb.js)
* **ฐานข้อมูล:** `sample_mflix` | **คอลเลกชัน:** `theaters`
* **คำอธิบาย:** ค้นหาและดึงข้อมูลโรงภาพยนตร์เพียงโรงเดียวโดยระบุค่า `_id` เป็นแบบ `ObjectId`

### 📄 [query4.mongodb.js](file:///C:/Users/HP/Desktop/coding/jsd13/week-02/first-meet-dbs/mongodb/query4.mongodb.js)
* **ฐานข้อมูล:** `sample_mflix` | **คอลเลกชัน:** `movies`
* **คำอธิบาย:** ค้นหาภาพยนตร์รายการแรก (findOne) ที่มีประเภทเป็น `"movie"` และจัดเรตติ้งเป็น `"TV-MA"`

### 📄 [query5.mongodb.js](file:///C:/Users/HP/Desktop/coding/jsd13/week-02/first-meet-dbs/mongodb/query5.mongodb.js)
* **ฐานข้อมูล:** `sample_mflix` | **คอลเลกชัน:** `theaters`
* **คำอธิบาย:** นับจำนวนโรงภาพยนตร์ทั้งหมดที่ตั้งอยู่ในรัฐแคลิฟอร์เนีย (`location.address.state` เป็น `"CA"`)

### 📄 [query6.mongodb.js](file:///C:/Users/HP/Desktop/coding/jsd13/week-02/first-meet-dbs/mongodb/query6.mongodb.js)
* **ฐานข้อมูล:** `sample_mflix` | **คอลเลกชัน:** `theaters`
* **คำอธิบาย:** ค้นหาและดึงข้อมูลโรงภาพยนตร์ทั้งหมดในรัฐแคลิฟอร์เนีย (`"CA"`) ออกมาแสดงผล

### 📄 [query7.mongodb.js](file:///C:/Users/HP/Desktop/coding/jsd13/week-02/first-meet-dbs/mongodb/query7.mongodb.js)
* **ฐานข้อมูล:** `sample_mflix` | **คอลเลกชัน:** `theaters`
* **คำอธิบาย:** ดึงข้อมูลโรงภาพยนตร์รายการแรกที่อยู่ในเมือง Long Beach (`location.address.city` คือ `"Long Beach"`)

### 📄 [query8.mongodb.js](file:///C:/Users/HP/Desktop/coding/jsd13/week-02/first-meet-dbs/mongodb/query8.mongodb.js)
* **ฐานข้อมูล:** `sample_mflix` | **คอลเลกชัน:** `movies`
* **คำอธิบาย:** นับจำนวนภาพยนตร์ที่มีคำว่า `"Asia"` ปรากฏในบทเรื่องย่อ (`plot`) โดยใช้ `$regex` ร่วมกับออปชัน `i` (Case-Insensitive)

### 📄 [query9.mongodb.js](file:///C:/Users/HP/Desktop/coding/jsd13/week-02/first-meet-dbs/mongodb/query9.mongodb.js)
* **ฐานข้อมูล:** `sample_mflix` | **คอลเลกชัน:** `movies`
* **คำอธิบาย:** นับจำนวนภาพยนตร์ทั้งหมดที่มีเรื่องย่อลงท้ายด้วยคำว่า `"street."` โดยใช้สัญลักษณ์ `$` ใน Regex เพื่อระบุตำแหน่งท้ายบรรทัด

### 📄 [query10.mongodb.js](file:///C:/Users/HP/Desktop/coding/jsd13/week-02/first-meet-dbs/mongodb/query10.mongodb.js)
* **ฐานข้อมูล:** `sample_mflix` | **คอลเลกชัน:** `movies`
* **คำอธิบาย:** ค้นหาภาพยนตร์โดยเรียงลำดับจากความยาวภาพยนตร์ (`runtime`) จากยาวที่สุดไปหาสั้นที่สุด (`-1`) และจำกัดให้แสดงผลเพียง 10 อันดับแรก

### 📄 [query11.mongodb.js](file:///C:/Users/HP/Desktop/coding/jsd13/week-02/first-meet-dbs/mongodb/query11.mongodb.js)
* **ฐานข้อมูล:** `sample_mflix` | **คอลเลกชัน:** `movies`
* **คำอธิบาย:** นับจำนวนภาพยนตร์ที่ฉายระหว่างวันที่ 1 มกราคม 2000 (รวม) ถึง 1 มกราคม 2005 (ไม่รวม) โดยระบุรูปแบบวันที่เป็น `ISODate()`

### 📄 [query12.mongodb.js](file:///C:/Users/HP/Desktop/coding/jsd13/week-02/first-meet-dbs/mongodb/query12.mongodb.js)
* **ฐานข้อมูล:** `sample_mflix` | **คอลเลกชัน:** `movies`
* **คำอธิบาย:** ค้นหาภาพยนตร์ที่มีปีฉายในช่วงปี 1964 ถึง 1976 (ไม่รวมขอบ) เรียงลำดับปีจากน้อยไปหามาก และนำมาแสดงผลเพียง 3 รายการแรก

### 📄 [query13.mongodb.js](file:///C:/Users/HP/Desktop/coding/jsd13/week-02/first-meet-dbs/mongodb/query13.mongodb.js)
* **ฐานข้อมูล:** `sample_mflix` | **คอลเลกชัน:** `movies`
* **คำอธิบาย:** ค้นหาภาพยนตร์ที่มีการฉายในประเทศสหราชอาณาจักร (`"UK"`) และปีฉายอยู่ระหว่างปี 1970 ถึง 1990 (รวมขอบ)

### 📄 [query14.mongodb.js](file:///C:/Users/HP/Desktop/coding/jsd13/week-02/first-meet-dbs/mongodb/query14.mongodb.js)
* **ฐานข้อมูล:** `sample_mflix` | **คอลเลกชัน:** `movies`
* **คำอธิบาย:** นับจำนวนภาพยนตร์ที่มีนักแสดงนำหรือผู้ร่วมแสดงระบุเป็น `"Hugh Jackman"` อยู่ในรายชื่อนักแสดง (`cast`)

### 📄 [query15.mongodb.js](file:///C:/Users/HP/Desktop/coding/jsd13/week-02/first-meet-dbs/mongodb/query15.mongodb.js)
* **ฐานข้อมูล:** `sample_mflix` | **คอลเลกชัน:** `movies`
* **คำอธิบาย:** นับจำนวนภาพยนตร์ประเภทไซไฟ (`genres` มี `"Sci-Fi"`) ที่เข้าฉายหลังจากวันที่ 1 มกราคม 1999 เป็นต้นไป

### 📄 [query16.mongodb.js](file:///C:/Users/HP/Desktop/coding/jsd13/week-02/first-meet-dbs/mongodb/query16.mongodb.js)
* **ฐานข้อมูล:** `sample_mflix` | **คอลเลกชัน:** `movies`
* **คำอธิบาย:** ค้นหาภาพยนตร์ทั้งหมดที่กำกับโดยผู้กำกับภาพยนตร์ชื่อดัง `"Christopher Nolan"`

### 📄 [query17.mongodb.js](file:///C:/Users/HP/Desktop/coding/jsd13/week-02/first-meet-dbs/mongodb/query17.mongodb.js)
* **ฐานข้อมูล:** `sample_mflix` | **คอลเลกชัน:** `movies`
* **คำอธิบาย:** ค้นหาภาพยนตร์ที่กำกับโดย `"Hal Roach"` และทำ Projection เพื่อกรองเลือกแสดงเฉพาะชื่อเรื่อง (`title`) และจำนวนที่เคยได้รับรางวัล (`awards.wins`) พร้อมทั้งซ่อนฟิลด์ `_id`

### 📄 [query18.mongodb.js](file:///C:/Users/HP/Desktop/coding/jsd13/week-02/first-meet-dbs/mongodb/query18.mongodb.js)
* **ฐานข้อมูล:** `sample_mflix` | **คอลเลกชัน:** `movies`
* **คำอธิบาย:** ค้นหาภาพยนตร์ที่ออกฉายตั้งแต่ปี 2000 ขึ้นไป ซึ่งมีประเภทเป็น `"Sci-Fi"` **หรือ** มีเรตติ้งคะแนน IMDb มากกว่าหรือเท่ากับ `8.1` โดยเลือกแสดงผลเฉพาะฟิลด์ที่กำหนดและจำกัดที่ 10 รายการ

### 📄 [query19.mongodb.js](file:///C:/Users/HP/Desktop/coding/jsd13/week-02/first-meet-dbs/mongodb/query19.mongodb.js)
* **ฐานข้อมูล:** `sample_mflix` | **คอลเลกชัน:** `movies`
* **คำอธิบาย:** ค้นหาภาพยนตร์ประเภท Action ที่ฉายในปี 2010 โดยใช้ Implicit AND และกำหนด Projection เพื่อคัดเลือกข้อมูลเฉพาะฟิลด์หลักออกแสดงผล

### 📄 [query20.mongodb.js](file:///C:/Users/HP/Desktop/coding/jsd13/week-02/first-meet-dbs/mongodb/query20.mongodb.js)
* **ฐานข้อมูล:** `sample_mflix` | **คอลเลกชัน:** `movies`
* **คำอธิบาย:** ดึงข้อมูลภาพยนตร์ Action ปี 2010 ด้วยเงื่อนไขคิวรีแบบ Implicit AND และทำ Projection สำหรับฟิลด์ข้อมูลที่ต้องการนำไปใช้

---

## 5. ไดอะแกรมสรุป TCP (TCP Overview Diagram - Excalidraw)

โปรเจคนี้มีไฟล์ไดอะแกรมสรุป **TCP Connection Lifecycle** ไว้ในชื่อไฟล์ [tcp-overview.excalidraw](file:///C:/Users/HP/Desktop/coding/jsd13/week-02/first-meet-dbs/tcp-overview.excalidraw) ซึ่งออกแบบให้เห็นภาพรวมและเข้าใจได้ง่ายของสถานะการเชื่อมต่อ

### 🧩 เนื้อหาภายในไดอะแกรม:
1. **Phase 1: Connection Establishment (3-Way Handshake)**
   - กระบวนการสร้างการเชื่อมต่อระหว่าง Client และ Server โดยส่งสัญญาณ `SYN`, `SYN-ACK` และ `ACK`
   - การเปลี่ยนแปลงสถานะฝั่ง Client (`CLOSED` ➡️ `SYN_SENT` ➡️ `ESTABLISHED`)
   - การเปลี่ยนแปลงสถานะฝั่ง Server (`LISTEN` ➡️ `SYN_RCVD` ➡️ `ESTABLISHED`)
2. **Phase 2: Data Transfer Phase**
   - กระบวนการแลกเปลี่ยนแพ็กเกจข้อมูลจริง (DATA) และการตอบรับสถานะการรับส่งข้อมูล (ACK) แบบสองทิศทาง (Bi-directional)
3. **Phase 3: Connection Termination (4-Way Handshake)**
   - กระบวนการสิ้นสุดหรือปิดการเชื่อมต่อโดยส่งสัญญาณ `FIN` และ `ACK` ครบ 4 สเต็ป
   - การสลับสถานะของ Client เพื่อป้องกันปัญหาแพ็กเกจค้างหลงเหลือในระบบ (`ESTABLISHED` ➡️ `FIN_WAIT_1` ➡️ `FIN_WAIT_2` ➡️ `TIME_WAIT` ➡️ `CLOSED`)
   - การสลับสถานะของ Server (`ESTABLISHED` ➡️ `CLOSE_WAIT` ➡️ `LAST_ACK` ➡️ `CLOSED`)

### 🛠️ วิธีการเปิดใช้งานไฟล์ .excalidraw:
1. ไปที่เว็บไซต์เครื่องมือวาดไดอะแกรม [Excalidraw](https://excalidraw.com/)
2. กดที่ปุ่มเมนูหลัก (สัญลักษณ์ขีดสามขีดตรงมุมบนซ้าย) ➡️ เลือก **Open**
3. เลือกไฟล์ [tcp-overview.excalidraw](file:///C:/Users/HP/Desktop/coding/jsd13/week-02/first-meet-dbs/tcp-overview.excalidraw) ที่อยู่ในโปรเจคนี้เพื่อรับชมความต่อเนื่องและสีสันสถานะต่างๆ ได้ทันที

---

## 6. การเปรียบเทียบฐานข้อมูล (Database Comparison - TH/EN)

ศึกษาการเปรียบเทียบเชิงลึกระหว่าง MongoDB (NoSQL) และ PostgreSQL (SQL) ในเรื่องโครงสร้างข้อมูล การออกแบบข้อมูล (Normalization vs Denormalization) และความแตกต่างของไวยากรณ์คำสั่งคิวรีได้ที่:
*   📄 **[dbs-comparison.md](dbs-comparison.md)** (คู่มือเปรียบเทียบ 2 ภาษา Thai-English)

