# Sử dụng Node.js làm base image
FROM node:16

# Đặt thư mục làm việc trong container
WORKDIR /app

# Copy file package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ mã nguồn frontend vào container
COPY . .

# Build ứng dụng frontend
RUN npm run build

# Cài đặt một server nhẹ để serve ứng dụng frontend
RUN npm install -g serve

# Mở cổng 3000 cho frontend
EXPOSE 3000

# Serve ứng dụng trên server
CMD ["serve", "-s", "build"]
