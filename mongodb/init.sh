#!/bin/bash

# Start mongod in the background
mongod --bind_ip_all --fork --logpath /var/log/mongodb.log

# รอให้ MongoDB start เสร็จ (ประมาณ 5-10 วิ)
sleep 5

# Restore database จาก backup
mongorestore --db db_mixRobot /docker-entrypoint-initdb.d/backup

# หยุด mongod ที่ background ก่อน
mongod --shutdown

# แล้วค่อย start mongod แบบ foreground เพื่อให้ container ไม่หยุด
mongod --bind_ip_all
