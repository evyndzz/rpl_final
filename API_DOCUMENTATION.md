# 📚 Dokumentasi API - Inventory Management System

## 🌐 Base URL
```
http://localhost:3333
```

## 🔐 Authentication

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "password": "admin123"
}
```

**Response:**
```json
{
  "user": {
    "id": 1,
    "fullName": "Administrator",
    "email": "admin@inventaris.com"
  },
  "token": "auth_token_here"
}
```

### Logout
```http
POST /logout
```

---

## 📦 Products API

### Get All Products
```http
GET /api/products?page=1&limit=10
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "nama": "MacBook Pro M2",
      "merk": "Apple",
      "stok": 15,
      "harga": "25000000.00",
      "kategori_id": 1,
      "supplier_id": 1,
      "category": {
        "id": 1,
        "nama": "Electronics"
      }
    }
  ],
  "meta": {
    "total": 7,
    "per_page": 10,
    "current_page": 1,
    "last_page": 1
  }
}
```

### Create Product
```http
POST /api/products
Content-Type: application/json

{
  "nama": "iPhone 15 Pro",
  "merk": "Apple",
  "stok": 25,
  "harga": 18000000,
  "kategori_id": 1,
  "supplier_id": 1
}
```

**Required Fields:**
- `nama` (string): Nama produk
- `harga` (number): Harga produk
- `kategori_id` (number): ID kategori

**Optional Fields:**
- `merk` (string): Merek produk
- `stok` (number): Jumlah stok (default: 0)
- `supplier_id` (number): ID supplier

### Update Product
```http
PUT /api/products/{id}
Content-Type: application/json

{
  "nama": "iPhone 15 Pro Max",
  "merk": "Apple",
  "stok": 30,
  "harga": 20000000,
  "kategori_id": 1
}
```

### Delete Product
```http
DELETE /api/products/{id}
```

### Get Product by Category
```http
GET /api/products/category/{categoryId}
```

### Search Products
```http
GET /api/products/search?search=iPhone&page=1&limit=10
```

---

## 📂 Categories API

### Get All Categories
```http
GET /api/categories?page=1&limit=10
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "nama": "Electronics",
      "products": [
        {
          "id": 1,
          "nama": "MacBook Pro M2",
          "merk": "Apple",
          "stok": 15,
          "harga": "25000000.00"
        }
      ]
    }
  ]
}
```

### Create Category
```http
POST /api/categories
Content-Type: application/json

{
  "nama": "Electronics"
}
```

**Required Fields:**
- `nama` (string): Nama kategori

### Update Category
```http
PUT /api/categories/{id}
Content-Type: application/json

{
  "nama": "Electronics & Gadgets"
}
```

### Delete Category
```http
DELETE /api/categories/{id}
```

### Get Category Stats
```http
GET /api/categories/{id}/stats
```

### Search Categories
```http
GET /api/categories/search?search=Electronics&page=1&limit=10
```

---

## 📋 Transactions API

### Get All Transactions
```http
GET /api/transactions?page=1&limit=10&type=masuk
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "produk_id": 1,
      "tipe": "masuk",
      "jumlah": 5,
      "catatan": "Stock masuk dari supplier",
      "created_at": "2024-01-20T10:00:00.000Z",
      "updated_at": "2024-01-20T10:00:00.000Z",
      "product": {
        "id": 1,
        "nama": "MacBook Pro M2",
        "merk": "Apple",
        "stok": 15,
        "harga": "25000000.00"
      }
    }
  ]
}
```

### Create Transaction
```http
POST /api/transactions
Content-Type: application/json

{
  "produk_id": 1,
  "tipe": "masuk",
  "jumlah": 10,
  "catatan": "Restock dari supplier"
}
```

**Required Fields:**
- `produk_id` (number): ID produk
- `tipe` (string): "masuk" atau "keluar"
- `jumlah` (number): Jumlah transaksi

**Optional Fields:**
- `catatan` (string): Catatan transaksi

**Validation Rules:**
- `tipe` harus berupa "masuk" atau "keluar"
- Untuk transaksi "keluar", stok produk harus mencukupi

### Update Transaction
```http
PUT /api/transactions/{id}
Content-Type: application/json

{
  "produk_id": 1,
  "tipe": "keluar",
  "jumlah": 2,
  "catatan": "Penjualan ke customer"
}
```

### Delete Transaction
```http
DELETE /api/transactions/{id}
```

### Get Transactions by Product
```http
GET /api/transactions/product/{productId}
```

### Get Transaction Stats
```http
GET /api/transactions/stats?dateFrom=2024-01-01&dateTo=2024-01-31
```

**Response:**
```json
{
  "totalTransactions": 15,
  "masukCount": 8,
  "keluarCount": 7,
  "totalMasuk": 50,
  "totalKeluar": 25,
  "netChange": 25
}
```

### Search Transactions
```http
GET /api/transactions/search?search=MacBook&page=1&limit=10
```

---

## 🏢 Suppliers API

### Get All Suppliers
```http
GET /api/suppliers?page=1&limit=10
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "nama": "PT. Tech Solutions Indonesia",
      "alamat": "Jl. Sudirman No. 123, Jakarta Selatan",
      "telepon": "021-12345678",
      "email": "info@techsolutions.co.id",
      "products": [
        {
          "id": 1,
          "nama": "MacBook Pro M2"
        }
      ]
    }
  ]
}
```

### Create Supplier
```http
POST /api/suppliers
Content-Type: application/json

{
  "nama": "PT. Tech Solutions Indonesia",
  "alamat": "Jl. Sudirman No. 123, Jakarta Selatan",
  "telepon": "021-12345678",
  "email": "info@techsolutions.co.id"
}
```

**Required Fields:**
- `nama` (string): Nama supplier

**Optional Fields:**
- `alamat` (string): Alamat supplier
- `telepon` (string): Nomor telepon
- `email` (string): Email supplier

### Update Supplier
```http
PUT /api/suppliers/{id}
Content-Type: application/json

{
  "nama": "PT. Tech Solutions Indonesia Updated",
  "alamat": "Jl. Sudirman No. 456, Jakarta Selatan",
  "telepon": "021-87654321",
  "email": "contact@techsolutions.co.id"
}
```

### Delete Supplier
```http
DELETE /api/suppliers/{id}
```

### Search Suppliers
```http
GET /api/suppliers/search?search=Tech&page=1&limit=10
```

---

## 📊 Dashboard API

### Get Dashboard Statistics
```http
GET /dashboard
```

**Response:**
```json
{
  "stats": {
    "totalProducts": 7,
    "totalCategories": 4,
    "todayTransactions": 3,
    "lowStockItems": 3,
    "recentTransactions": [
      {
        "id": 1,
        "tipe": "masuk",
        "jumlah": 5,
        "created_at": "2024-01-20T10:00:00.000Z",
        "product": {
          "nama": "MacBook Pro M2"
        }
      }
    ],
    "productsByCategory": [
      {
        "id": 1,
        "nama": "Electronics",
        "products": [
          {
            "id": 1,
            "nama": "MacBook Pro M2",
            "merk": "Apple",
            "stok": 15,
            "harga": "25000000.00"
          }
        ]
      }
    ]
  }
}
```

---

## 🔒 Authentication Requirements

Semua endpoint API (kecuali `/api/auth/login` dan `/logout`) memerlukan authentication. Gunakan session-based authentication dengan token yang diperoleh dari login.

## 📝 Error Responses

### Validation Error
```json
{
  "error": "Nama, harga, dan kategori_id harus diisi"
}
```

### Not Found Error
```json
{
  "error": "Record not found"
}
```

### Stock Insufficient Error
```json
{
  "error": "Stok tidak mencukupi"
}
```

### Unauthorized Error
```json
{
  "error": "Unauthorized access"
}
```

## 🚀 Common Query Parameters

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `page` | number | Halaman untuk pagination | 1 |
| `limit` | number | Jumlah item per halaman | 10 |
| `search` | string | Kata kunci pencarian | - |
| `type` | string | Filter tipe transaksi ("masuk" atau "keluar") | - |
| `dateFrom` | string | Tanggal mulai untuk filter (YYYY-MM-DD) | - |
| `dateTo` | string | Tanggal akhir untuk filter (YYYY-MM-DD) | - |

## 💡 Notes

1. **Harga Format**: Harga disimpan sebagai decimal dengan 2 digit desimal
2. **Stock Management**: 
   - Transaksi "keluar" akan mengurangi stock
   - Transaksi "masuk" akan menambah stock
   - Sistem akan memvalidasi ketersediaan stock untuk transaksi keluar
3. **Pagination**: Semua list endpoint mendukung pagination
4. **Search**: Endpoint search mendukung pencarian berdasarkan nama
5. **Relationships**: Data diload dengan relasi yang relevan (category, product, supplier)
6. **Session Management**: Menggunakan session-based authentication
7. **Error Handling**: Semua endpoint mengembalikan error response yang konsisten

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+
- MySQL Database
- npm atau yarn

### Installation
```bash
cd api4
npm install
```

### Environment Setup
Copy `.env.example` to `.env` dan konfigurasi:
```env
NODE_ENV=development
PORT=3333
APP_KEY=your-app-key-here
HOST=0.0.0.0
LOG_LEVEL=info
SESSION_DRIVER=cookie
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_DATABASE=inventory_db
```

### Database Setup
```bash
# Run migrations
node ace migration:run

# Seed sample data
node ace db:seed --files=database/seeders/comprehensive_data_seeder.ts
```

### Start Development Server
```bash
npm run dev
```

## 📞 Support

Untuk pertanyaan atau dukungan teknis, silakan hubungi tim development.

---

**Version**: 1.0.0  
**Last Updated**: January 2024  
**Framework**: AdonisJS 6.x  
**Frontend**: React + Inertia.js
