# Menggunakan base image Node.js
FROM node:latest

# Mengatur direktori kerja di dalam container
WORKDIR /app

# Menyalin package.json dan package-lock.json ke direktori kerja
COPY package*.json ./

# Menginstal dependensi proyek
RUN npm install



# Menyalin kode aplikasi ke direktori kerja
COPY . .

# Menjalankan perintah db:migrate saat container dijalankan
CMD ["npm", "run", "db:migrate"]