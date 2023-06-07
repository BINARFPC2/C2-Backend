# Menggunakan base image Node.js
FROM node:latest

# Mengatur direktori kerja di dalam container
WORKDIR /app

# Menyalin package.json dan package-lock.json ke direktori kerja
COPY package*.json ./

# Menginstal dependensi proyek
RUN npm install

# RUN npm start

RUN db:migrate

RUN db:seed



# Menyalin kode aplikasi ke direktori kerja
COPY . .

