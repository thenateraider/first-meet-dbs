# First Meet Databases: MongoDB Queries & TCP Overview

โปรเจคนี้ประกอบด้วยไฟล์สคริปต์แบบฝึกหัดคำสั่งคิวรี MongoDB (`.mongodb.js`) บนฐานข้อมูลตัวอย่าง `sample_mflix` จำนวน 20 สคริปต์ และไฟล์ไดอะแกรมสรุปเรื่อง **TCP Lifecycle & State Transitions** (`tcp-overview.excalidraw`)

---

## 📌 สารบัญ (Table of Contents)
1. [ภาพรวมของคิวรี MongoDB (MongoDB Queries Overview)](#1-ภาพรวมของคิวรี-mongodb-mongodb-queries-overview)
2. [สรุปคำสั่งที่สำคัญ (Core MongoDB Operators Cheat Sheet)](#2-สรุปคำสั่งที่สำคัญ-core-mongodb-operators-cheat-sheet)
3. [คำอธิบายของแต่ละไฟล์สคริปต์ (Detailed Script Explanations)](#3-คำอธิบายของแต่ละไฟล์สคริปต์-detailed-script-explanations)
4. [ไดอะแกรมสรุป TCP (TCP Overview Diagram - Excalidraw)](#4-ไดอะแกรมสรุป-tcp-tcp-overview-diagram---excalidraw)

---

## 1. ภาพรวมของคิวรี MongoDB (MongoDB Queries Overview)

สคริปต์ทั้งหมดในโปรเจคนี้ใช้คิวรีข้อมูลบนคอลเลกชันในฐานข้อมูล `sample_mflix` (เช่น `movies`, `comments`, `theaters`) เพื่อเรียนรู้และฝึกฝนการดึงข้อมูลตามเงื่อนไขที่ซับซ้อน ตั้งแต่การค้นหาแบบง่ายไปจนถึงการใช้ตัวดำเนินการเงื่อนไข, อาร์เรย์, ออบเจกต์ย่อย (Embedded Documents), และการกำหนดฟิลด์แสดงผล (Projection)

---

## 2. สรุปคำสั่งที่สำคัญ (Core MongoDB Operators Cheat Sheet)

นี่คือคำสั่งและตัวดำเนินการ (Operators) ที่นำมาใช้ในสคริปต์ต่างๆ:

| ตัวดำเนินการ / คำสั่ง | การทำงาน | ไฟล์ที่นำไปใช้ |
| :--- | :--- | :--- |
| `db.collection.find()` | ค้นหาข้อมูลทั้งหมดที่ตรงตามเงื่อนไข | `query.mongodb.js`, `query2.mongodb.js` และอื่นๆ |
| `db.collection.findOne()` | ค้นหาข้อมูลเพียงรายการเดียวที่พบเป็นอันดับแรก | `query3.mongodb.js`, `query4.mongodb.js`, `query7.mongodb.js` |
| `.count()` | นับจำนวนเอกสาร (Documents) ที่ตรงตามเงื่อนไข | `query5.mongodb.js`, `query8.mongodb.js`, `query11.mongodb.js`, `query14.mongodb.js`, `query15.mongodb.js` |
| `.sort({ field: 1 / -1 })` | เรียงลำดับข้อมูล (`1` จากน้อยไปมาก, `-1` จากมากไปน้อย) | `query10.mongodb.js`, `query12.mongodb.js` |
| `.limit(N)` | จำกัดจำนวนผลลัพธ์ที่จะดึงข้อมูลสูงสุด `N` รายการ | `query10.mongodb.js`, `query12.mongodb.js`, `query18.mongodb.js` |
| `$gt` / `$gte` / `$lt` / `$lte`| ตรวจสอบเงื่อนไขเปรียบเทียบตัวเลขหรือวันที่ | `query11.mongodb.js`, `query12.mongodb.js`, `query13.mongodb.js`, `query15.mongodb.js`, `query18.mongodb.js` |
| `$in` | ค้นหาค่าที่ตรงกับหนึ่งในสมาชิกในอาร์เรย์ที่กำหนด | `query13.mongodb.js`, `query16.mongodb.js`, `query17.mongodb.js` |
| `$all` | ค้นหาอาร์เรย์ในเอกสารที่มีสมาชิกตรงกับเงื่อนไขทั้งหมด | `query15.mongodb.js` |
| `$regex` | การค้นหาแบบจับคู่แพทเทิร์น (Regular Expression) | `query8.mongodb.js`, `query9.mongodb.js` |
| `$or` | ตรวจสอบเงื่อนไขแบบ "หรือ" (Logical OR) | `query18.mongodb.js` |
| **Projection** | การระบุฟิลด์ที่ต้องการดึง (`1`) หรือไม่ต้องการ (`0`) | `query17.mongodb.js`, `query18.mongodb.js`, `query19.mongodb.js`, `query20.mongodb.js` |

---

## 3. คำอธิบายของแต่ละไฟล์สคริปต์ (Detailed Script Explanations)

### [query.mongodb.js](file:///C:/Users/HP/Desktop/coding/jsd13/week-02/first-meet-dbs/query.mongodb.js)
* **ฐานข้อมูล:** `sample_mflix` | **คอลเลกชัน:** `comments`
* **คำอธิบาย:** ดึงข้อมูลความคิดเห็น (Comments) ทั้งหมดในคอลเลกชัน

### [query2.mongodb.js](file:///C:/Users/HP/Desktop/coding/jsd13/week-02/first-meet-dbs/query2.mongodb.js)
* **ฐานข้อมูล:** `sample_mflix` | **คอลเลกชัน:** `movies`
* **คำอธิบาย:** ดึงข้อมูลภาพยนตร์ที่มีประเภท (`type`) เป็น `"movie"` และเรตติ้งความเหมาะสม (`rated`) เป็น `"TV-G"` (มีตัวอย่างสคริปต์คอมเมนต์ในการหาคอมเมนต์ด้วยอีเมล)

### [query3.mongodb.js](file:///C:/Users/HP/Desktop/coding/jsd13/week-02/first-meet-dbs/query3.mongodb.js)
* **ฐานข้อมูล:** `sample_mflix` | **คอลเลกชัน:** `theaters`
* **คำอธิบาย:** ดึงข้อมูลโรงภาพยนตร์เพียงโรงเดียวโดยอ้างอิง `_id` ที่มีประเภทเป็น `ObjectId`

### [query4.mongodb.js](file:///C:/Users/HP/Desktop/coding/jsd13/week-02/first-meet-dbs/query4.mongodb.js)
* **ฐานข้อมูล:** `sample_mflix` | **คอลเลกชัน:** `movies`
* **คำอธิบาย:** ดึงข้อมูลภาพยนตร์รายการแรกที่มีประเภทเป็น `"movie"` และเรตติ้งเป็น `"TV-MA"`

### [query5.mongodb.js](file:///C:/Users/HP/Desktop/coding/jsd13/week-02/first-meet-dbs/query5.mongodb.js)
* **ฐานข้อมูล:** `sample_mflix` | **คอลเลกชัน:** `theaters`
* **คำอธิบาย:** นับจำนวนโรงภาพยนตร์ที่ตั้งอยู่ในรัฐแคลิฟอร์เนีย (`location.address.state` คือ `"CA"`)

### [query6.mongodb.js](file:///C:/Users/HP/Desktop/coding/jsd13/week-02/first-meet-dbs/query6.mongodb.js)
* **ฐานข้อมูล:** `sample_mflix` | **คอลเลกชัน:** `theaters`
* **คำอธิบาย:** ดึงข้อมูลโรงภาพยนตร์ทั้งหมดที่อยู่ในรัฐแคลิฟอร์เนีย (`"CA"`)

### [query7.mongodb.js](file:///C:/Users/HP/Desktop/coding/jsd13/week-02/first-meet-dbs/query7.mongodb.js)
* **ฐานข้อมูล:** `sample_mflix` | **คอลเลกชัน:** `theaters`
* **คำอธิบาย:** ดึงข้อมูลโรงภาพยนตร์รายการแรกที่ตั้งอยู่ในเมือง Long Beach (`location.address.city` คือ `"Long Beach"`)

### [query8.mongodb.js](file:///C:/Users/HP/Desktop/coding/jsd13/week-02/first-meet-dbs/query8.mongodb.js)
* **ฐานข้อมูล:** `sample_mflix` | **คอลเลกชัน:** `movies`
* **คำอธิบาย:** นับจำนวนภาพยนตร์ที่มีคำว่า `"Asia"` ปรากฏอยู่ในบทเรื่องย่อ (`plot`) โดยใช้ `$regex` ร่วมกับออปชัน `i` (Case-Insensitive - ไม่แยกตัวพิมพ์ใหญ่-เล็ก)

### [query9.mongodb.js](file:///C:/Users/HP/Desktop/coding/jsd13/week-02/first-meet-dbs/query9.mongodb.js)
* **ฐานข้อมูล:** `sample_mflix` | **คอลเลกชัน:** `movies`
* **คำอธิบาย:** นับจำนวนภาพยนตร์ที่มีเนื้อเรื่องย่อ (`plot`) ลงท้ายด้วยคำว่า `"street."` โดยใช้สัญลักษณ์ `$` ใน Regex

### [query10.mongodb.js](file:///C:/Users/HP/Desktop/coding/jsd13/week-02/first-meet-dbs/query10.mongodb.js)
* **ฐานข้อมูล:** `sample_mflix` | **คอลเลกชัน:** `movies`
* **คำอธิบาย:** ดึงข้อมูลภาพยนตร์ทั้งหมด เรียงลำดับตามความยาวภาพยนตร์ (`runtime`) จากมากไปน้อย (`-1`) และจำกัดแสดงผลเพียง 10 อันดับแรก

### [query11.mongodb.js](file:///C:/Users/HP/Desktop/coding/jsd13/week-02/first-meet-dbs/query11.mongodb.js)
* **ฐานข้อมูล:** `sample_mflix` | **คอลเลกชัน:** `movies`
* **คำอธิบาย:** นับจำนวนภาพยนตร์ที่ออกฉายระหว่างวันที่ 1 มกราคม 2000 (รวม) ถึง 1 มกราคม 2005 (ไม่รวม) โดยใช้วัตถุ `ISODate()` เพื่อระบุรูปแบบวันที่

### [query12.mongodb.js](file:///C:/Users/HP/Desktop/coding/jsd13/week-02/first-meet-dbs/query12.mongodb.js)
* **ฐานข้อมูล:** `sample_mflix` | **คอลเลกชัน:** `movies`
* **คำอธิบาย:** ค้นหาภาพยนตร์ที่มีปีที่ออกฉายอยู่ระหว่างปี 1964 ถึง 1976 (ไม่รวมขอบ) เรียงลำดับปีจากน้อยไปมาก และแสดงผลลัพธ์ 3 รายการแรก

### [query13.mongodb.js](file:///C:/Users/HP/Desktop/coding/jsd13/week-02/first-meet-dbs/query13.mongodb.js)
* **ฐานข้อมูล:** `sample_mflix` | **คอลเลกชัน:** `movies`
* **คำอธิบาย:** ค้นหาภาพยนตร์ที่เข้าฉายในสหราชอาณาจักร (`countries` มี `"UK"`) และปีฉายอยู่ระหว่างปี 1970 ถึง 1990 (รวมขอบ)

### [query14.mongodb.js](file:///C:/Users/HP/Desktop/coding/jsd13/week-02/first-meet-dbs/query14.mongodb.js)
* **ฐานข้อมูล:** `sample_mflix` | **คอลเลกชัน:** `movies`
* **คำอธิบาย:** นับจำนวนภาพยนตร์ที่มีนักแสดงชื่อ `"Hugh Jackman"` อยู่ในรายชื่อนักแสดง (`cast`)

### [query15.mongodb.js](file:///C:/Users/HP/Desktop/coding/jsd13/week-02/first-meet-dbs/query15.mongodb.js)
* **ฐานข้อมูล:** `sample_mflix` | **คอลเลกชัน:** `movies`
* **คำอธิบาย:** นับจำนวนภาพยนตร์ประเภท Sci-Fi (`genres` มี `"Sci-Fi"`) ที่ออกฉายหลังจากวันที่ 1 มกราคม 1999

### [query16.mongodb.js](file:///C:/Users/HP/Desktop/coding/jsd13/week-02/first-meet-dbs/query16.mongodb.js)
* **ฐานข้อมูล:** `sample_mflix` | **คอลเลกชัน:** `movies`
* **คำอธิบาย:** ค้นหาภาพยนตร์ที่กำกับโดยผู้กำกับชื่อ `"Christopher Nolan"`

### [query17.mongodb.js](file:///C:/Users/HP/Desktop/coding/jsd13/week-02/first-meet-dbs/query17.mongodb.js)
* **ฐานข้อมูล:** `sample_mflix` | **คอลเลกชัน:** `movies`
* **คำอธิบาย:** ค้นหาภาพยนตร์ที่กำกับโดย `"Hal Roach"` และทำการเลือกแสดงฟิลด์เฉพาะชื่อเรื่องภาพยนตร์ (`title`) และจำนวนที่ได้รับรางวัล (`awards.wins`) โดยยกเว้นไม่แสดง `_id` (`_id: 0`)

### [query18.mongodb.js](file:///C:/Users/HP/Desktop/coding/jsd13/week-02/first-meet-dbs/query18.mongodb.js)
* **ฐานข้อมูล:** `sample_mflix` | **คอลเลกชัน:** `movies`
* **คำอธิบาย:** ค้นหาภาพยนตร์ตั้งแต่ปี 2000 ขึ้นไป ที่อยู่ในประเภท `"Sci-Fi"` **หรือ** มีคะแนน IMDb เรตติ้งมากกว่าหรือเท่ากับ `8.1` โดยเลือกแสดงผลเฉพาะข้อมูลที่สำคัญและจำกัดเพียง 10 รายการ

### [query19.mongodb.js](file:///C:/Users/HP/Desktop/coding/jsd13/week-02/first-meet-dbs/query19.mongodb.js) & [query20.mongodb.js](file:///C:/Users/HP/Desktop/coding/jsd13/week-02/first-meet-dbs/query20.mongodb.js)
* **ฐานข้อมูล:** `sample_mflix` | **คอลเลกชัน:** `movies`
* **คำอธิบาย:** ดึงข้อมูลภาพยนตร์ประเภท Action ที่ฉายในปี 2010 (ใช้การเขียนเงื่อนไขร่วมแบบ implicit AND) และคัดเลือกฟิลด์เฉพาะที่ต้องการแสดงผล

---

## 4. ไดอะแกรมสรุป TCP (TCP Overview Diagram - Excalidraw)

ในโปรเจคนี้ ได้รับการออกแบบเพิ่มเติมไฟล์ไดอะแกรมสรุป **TCP Connection Lifecycle** ไว้ในชื่อไฟล์ `tcp-overview.excalidraw` ในรูปแบบที่เข้าใจง่าย ครบถ้วนทุกสถานะ

### 🧩 เนื้อหาภายในไดอะแกรม:
1. **Phase 1: Connection Establishment (3-Way Handshake)**
   - ขั้นตอนการจับมือ 3 ครั้งเมื่อสร้างการเชื่อมต่อ
   - การเปลี่ยนแปลงสถานะฝั่ง Client (`CLOSED` ➡️ `SYN_SENT` ➡️ `ESTABLISHED`)
   - การเปลี่ยนแปลงสถานะฝั่ง Server (`LISTEN` ➡️ `SYN_RCVD` ➡️ `ESTABLISHED`)
   - หมายเลขระบุลำดับข้อมูลและการรับทราบ (`seq` และ `ack`)
2. **Phase 2: Data Transfer Phase**
   - ขั้นตอนการส่งแพ็กเกจข้อมูล (DATA) และส่งกลับการรับทราบ (ACK) เพื่อยืนยันความถูกต้องแบบสองทิศทาง
3. **Phase 3: Connection Termination (4-Way Handshake)**
   - ขั้นตอนยกเลิกการเชื่อมต่อ 4 ครั้ง
   - การเปลี่ยนผ่านสถานะฝั่ง Client เพื่อป้องกันปัญหาการสูญเสียแพ็กเกจล่าช้า (`ESTABLISHED` ➡️ `FIN_WAIT_1` ➡️ `FIN_WAIT_2` ➡️ `TIME_WAIT` ➡️ `CLOSED`)
   - การเปลี่ยนผ่านสถานะฝั่ง Server (`ESTABLISHED` ➡️ `CLOSE_WAIT` ➡️ `LAST_ACK` ➡️ `CLOSED`)

### 🛠️ วิธีการเปิดใช้งานไฟล์ .excalidraw:
1. เข้าเว็บไซต์ [Excalidraw](https://excalidraw.com/)
2. กดปุ่มเมนู (สัญลักษณ์ขีดสามขีดมุมซ้ายบน) เลือก **Open** (หรือเปิดไฟล์)
3. เลือกไฟล์ [tcp-overview.excalidraw](file:///C:/Users/HP/Desktop/coding/jsd13/week-02/first-meet-dbs/tcp-overview.excalidraw) ที่อยู่ในโฟลเดอร์นี้
4. คุณจะเห็นบอร์ดไดอะแกรมที่แสดงลำดับเหตุการณ์ ลำดับเวลา (Timeline) และสถานะฝั่ง Client/Server ทั้งหมดได้อย่างชัดเจน สวยงาม
