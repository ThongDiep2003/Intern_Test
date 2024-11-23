# Sử dụng Node.js làm base image
FROM node:16

# Đặt thư mục làm việc trong container
WORKDIR /app

# Copy file package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ mã nguồn backend vào container
COPY . .

# Mở cổng 8080 cho backend
EXPOSE 8080

# Chạy server backend
CMD ["node", "server.js"]