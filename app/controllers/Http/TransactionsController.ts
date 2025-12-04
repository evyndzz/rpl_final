import type { HttpContext } from '@adonisjs/core/http'
import Transaction from '#models/transaction'
import Product from '#models/produk'
<<<<<<< HEAD

export default class TransactionsController {
  /**
   * Display a list of transactions with product relationships
   */
  async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const type = request.input('type') // 'masuk' or 'keluar'
    
    let query = Transaction.query().preload('product')
=======
import Supplier from '#models/supplier'

export default class TransactionsController {
  async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const type = request.input('type')
    
    let query = Transaction.query().preload('product').preload('supplier')
>>>>>>> dfea00d (tambahkan)
    
    if (type && ['masuk', 'keluar'].includes(type)) {
      query = query.where('tipe', type)
    }
    
    return await query.paginate(page, limit)
  }

<<<<<<< HEAD
<<<<<<< HEAD
  /**
   * Store a new transaction
   */
  async store({ request }: HttpContext) {
    const data = request.only(['produk_id', 'tipe', 'jumlah', 'catatan'])
    
    // Validate required fields
=======
  async store({ request }: HttpContext) {
=======
  async store({ request, response, session }: HttpContext) {
>>>>>>> 4125e4a (update pop up)
    const data = request.only(['produk_id', 'tipe', 'jumlah', 'catatan', 'supplier_id'])

>>>>>>> dfea00d (tambahkan)
    if (!data.produk_id || !data.tipe || !data.jumlah) {
      session.flash('error', 'Produk ID, tipe, dan jumlah harus diisi')
      return response.redirect('/transactions')
    }

    if (!['masuk', 'keluar'].includes(data.tipe)) {
      session.flash('error', 'Tipe harus berupa "masuk" atau "keluar"')
      return response.redirect('/transactions')
    }

<<<<<<< HEAD
    // Check if product exists
    const product = await Product.findOrFail(data.produk_id)
    
    // For 'keluar' transactions, check if stock is sufficient
=======
    const product = await Product.findOrFail(data.produk_id)

>>>>>>> dfea00d (tambahkan)
    if (data.tipe === 'keluar' && product.stok < data.jumlah) {
      session.flash('error', 'Stok tidak mencukupi')
      return response.redirect('/transactions')
    }

    const transaction = await Transaction.create(data)
    await transaction.load('product')
<<<<<<< HEAD
    
    // Update product stock
=======
    await transaction.load('supplier')
    
>>>>>>> dfea00d (tambahkan)
    if (data.tipe === 'masuk') {
      product.stok += data.jumlah
    } else {
      product.stok -= data.jumlah
    }
    await product.save()
    
    session.flash('success', 'Transaksi berhasil ditambahkan')
    return response.redirect('/transactions')
  }

<<<<<<< HEAD
  /**
   * Show individual transaction with product relationship
   */
=======
>>>>>>> dfea00d (tambahkan)
  async show({ params }: HttpContext) {
    const transaction = await Transaction.query()
      .where('id', params.id)
      .preload('product')
<<<<<<< HEAD
=======
      .preload('supplier')
>>>>>>> dfea00d (tambahkan)
      .firstOrFail()
    
    return transaction
  }

<<<<<<< HEAD
<<<<<<< HEAD
  /**
   * Update existing transaction
   */
=======
>>>>>>> dfea00d (tambahkan)
  async update({ params, request }: HttpContext) {
=======
  async update({ params, request, response, session }: HttpContext) {
>>>>>>> 4125e4a (update pop up)
    try {
      const transaction = await Transaction.findOrFail(params.id)
<<<<<<< HEAD
      console.log('Found transaction:', transaction.toJSON())
      
<<<<<<< HEAD
      const data = request.only(['produk_id', 'tipe', 'jumlah', 'catatan'])
      console.log('Update data:', data)
      
      // Validate required fields
=======
=======
>>>>>>> 4125e4a (update pop up)
      const data = request.only(['produk_id', 'tipe', 'jumlah', 'catatan', 'supplier_id'])

>>>>>>> dfea00d (tambahkan)
      if (!data.produk_id || !data.tipe || !data.jumlah) {
        session.flash('error', 'Produk ID, tipe, dan jumlah harus diisi')
        return response.redirect('/transactions')
      }

      if (!['masuk', 'keluar'].includes(data.tipe)) {
        session.flash('error', 'Tipe harus berupa "masuk" atau "keluar"')
        return response.redirect('/transactions')
      }

<<<<<<< HEAD
      // Check if product exists
      const product = await Product.findOrFail(data.produk_id)
      
      // For 'keluar' transactions, check if stock is sufficient
=======
      const product = await Product.findOrFail(data.produk_id)

>>>>>>> dfea00d (tambahkan)
      if (data.tipe === 'keluar' && product.stok < data.jumlah) {
        session.flash('error', 'Stok tidak mencukupi')
        return response.redirect('/transactions')
      }

<<<<<<< HEAD
      // Update transaction
=======
>>>>>>> dfea00d (tambahkan)
      transaction.merge(data)
      await transaction.save()
      await transaction.load('product')
      
      session.flash('success', 'Transaksi berhasil diperbarui')
      return response.redirect('/transactions')
    } catch (error) {
      console.error('Update transaction error:', error)
      session.flash('error', 'Terjadi kesalahan saat mengupdate transaksi')
      return response.redirect('/transactions')
    }
  }

<<<<<<< HEAD
<<<<<<< HEAD
  /**
   * Delete transaction
   */
  async destroy({ params }: HttpContext) {
    const transaction = await Transaction.findOrFail(params.id)
    const product = await transaction.related('product').query().firstOrFail()
    
    // Revert stock changes
=======
  async destroy({ params }: HttpContext) {
=======
  async destroy({ params, response, session, request }: HttpContext) {
>>>>>>> 4125e4a (update pop up)
    const transaction = await Transaction.findOrFail(params.id)
    const product = await transaction.related('product').query().firstOrFail()

>>>>>>> dfea00d (tambahkan)
    if (transaction.tipe === 'masuk') {
      product.stok -= transaction.jumlah
    } else {
      product.stok += transaction.jumlah
    }
    await product.save()
    
    await transaction.delete()
    
    // Check if this is an Inertia request
    if (request.header('X-Inertia')) {
      session.flash('success', 'Transaksi berhasil dihapus')
      return response.redirect('/transactions')
    }
    
    return response.json({ message: 'Transaksi berhasil dihapus' })
  }

<<<<<<< HEAD
  /**
   * Get transactions by product
   */
=======
>>>>>>> dfea00d (tambahkan)
  async getByProduct({ params }: HttpContext) {
    const transactions = await Transaction.query()
      .where('produk_id', params.productId)
      .preload('product')
      .orderBy('created_at', 'desc')
    
    return transactions
  }

<<<<<<< HEAD
  /**
   * Get transaction statistics
   */
=======
>>>>>>> dfea00d (tambahkan)
  async stats({ request }: HttpContext) {
    const dateFrom = request.input('dateFrom')
    const dateTo = request.input('dateTo')
    
    let query = Transaction.query()
    
    if (dateFrom) {
      query = query.where('created_at', '>=', dateFrom)
    }
    
    if (dateTo) {
      query = query.where('created_at', '<=', dateTo)
    }
    
    const transactions = await query.preload('product')
    
    const masukCount = transactions.filter(t => t.tipe === 'masuk').length
    const keluarCount = transactions.filter(t => t.tipe === 'keluar').length
    const totalMasuk = transactions
      .filter(t => t.tipe === 'masuk')
      .reduce((sum, t) => sum + t.jumlah, 0)
    const totalKeluar = transactions
      .filter(t => t.tipe === 'keluar')
      .reduce((sum, t) => sum + t.jumlah, 0)
    
    return {
      totalTransactions: transactions.length,
      masukCount,
      keluarCount,
      totalMasuk,
      totalKeluar,
      netChange: totalMasuk - totalKeluar
    }
  }

<<<<<<< HEAD
  /**
   * Search transactions
   */
=======
>>>>>>> dfea00d (tambahkan)
  async search({ request }: HttpContext) {
    const searchTerm = request.input('search', '')
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    return await Transaction.query()
      .whereHas('product', (productQuery) => {
        productQuery.where('nama', 'like', `%${searchTerm}%`)
      })
      .orWhere('catatan', 'like', `%${searchTerm}%`)
      .preload('product')
      .paginate(page, limit)
  }
}
