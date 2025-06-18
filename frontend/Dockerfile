FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

# Không cần copy code vào container vì chúng ta sẽ sử dụng volume
# COPY . .

EXPOSE 3000

# Sử dụng nodemon để tự động khởi động lại khi có thay đổi
CMD ["npm", "start"] 