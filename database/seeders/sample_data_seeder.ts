import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Category from '#models/kategori'
import Product from '#models/produk'
import Transaction from '#models/transaction'
import Supplier from '#models/supplier'

export default class extends BaseSeeder {
  async run() {
    // Create sample categories - elektronik
    const laptopCategory = await Category.firstOrCreate(
      { nama: 'Laptop & Komputer' },
      { nama: 'Laptop & Komputer' }
    )
    
    const smartphoneCategory = await Category.firstOrCreate(
      { nama: 'Smartphone & Tablet' },
      { nama: 'Smartphone & Tablet' }
    )
    
    const audioCategory = await Category.firstOrCreate(
      { nama: 'Audio & Headphone' },
      { nama: 'Audio & Headphone' }
    )
    
    // Create sample supplier
    const supplier = await Supplier.firstOrCreate(
      { email: 'info@techsolutions.co.id' },
      {
        nama: 'PT. Tech Solutions Indonesia',
        alamat: 'Jl. Sudirman No. 123, Jakarta Selatan',
        telepon: '021-12345678',
        email: 'info@techsolutions.co.id'
      }
    )
    
    // Create sample products - elektronik
    const laptop = await Product.firstOrCreate(
      { nama: 'MacBook Pro M3' },
      {
        nama: 'MacBook Pro M3 14"',
        merk: 'Apple',
        stok: 10,
        harga: 28000000,
        kategori_id: laptopCategory.id,
        supplier_id: supplier.id
      }
    )
    
    const phone = await Product.firstOrCreate(
      { nama: 'iPhone 15 Pro' },
      {
        nama: 'iPhone 15 Pro',
        merk: 'Apple',
        stok: 20,
        harga: 18000000,
        kategori_id: smartphoneCategory.id,
        supplier_id: supplier.id
      }
    )
    
    const airpods = await Product.firstOrCreate(
      { nama: 'AirPods Pro 2' },
      {
        nama: 'AirPods Pro 2',
        merk: 'Apple',
        stok: 30,
        harga: 4500000,
        kategori_id: audioCategory.id,
        supplier_id: supplier.id
      }
    )
    
    // Create sample transactions
    await Transaction.firstOrCreate(
      { 
        produk_id: laptop.id,
        tipe: 'masuk',
        jumlah: 10,
        catatan: 'Initial stock'
      },
      {
        produk_id: laptop.id,
        tipe: 'masuk',
        jumlah: 10,
        catatan: 'Initial stock',
        supplier_id: supplier.id
      }
    )
    
    await Transaction.firstOrCreate(
      { 
        produk_id: phone.id,
        tipe: 'masuk',
        jumlah: 20,
        catatan: 'New shipment'
      },
      {
        produk_id: phone.id,
        tipe: 'masuk',
        jumlah: 20,
        catatan: 'New shipment',
        supplier_id: supplier.id
      }
    )
    
    await Transaction.firstOrCreate(
      { 
        produk_id: airpods.id,
        tipe: 'keluar',
        jumlah: 5,
        catatan: 'Customer purchase'
      },
      {
        produk_id: airpods.id,
        tipe: 'keluar',
        jumlah: 5,
        catatan: 'Customer purchase'
      }
    )
    
    console.log('✅ Sample electronic data created successfully!')
    console.log('📦 Categories: Laptop & Komputer, Smartphone & Tablet, Audio & Headphone')
    console.log('🛍️  Products: MacBook Pro M3, iPhone 15 Pro, AirPods Pro 2')
    console.log('📋 Transactions: 3 sample transactions')
  }
}
