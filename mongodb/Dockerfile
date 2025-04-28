# ใช้ base image เป็น mongo
FROM mongo:latest

# กำหนด working directory
WORKDIR /docker-entrypoint-initdb.d

# Copy ไฟล์ backup เข้ามาใน image
COPY ./dump/db_mixRobot /docker-entrypoint-initdb.d/backup

# Copy script สำหรับ start MongoDB และ restore
COPY init.sh /init.sh

# ให้สิทธิ์ executable กับ script
RUN chmod +x /init.sh

# สั่งให้เริ่มด้วย script ของเราแทน
CMD ["/init.sh"]
