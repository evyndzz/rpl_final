import type { HttpContext } from '@adonisjs/core/http'
import Transaction from '#models/transaction'
import Product from '#models/produk'

export default class TransactionsController {
  /**
   * Display a list of transactions with product relationships
   */
  async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const type = request.input('type') // 'masuk' or 'keluar'
    
    let query = Transaction.query().preload('product')
    
    if (type && ['masuk', 'keluar'].includes(type)) {
      query = query.where('tipe', type)
    }
    
    return await query.paginate(page, limit)
  }

  /**
   * Store a new transaction
   */
  async store({ request }: HttpContext) {
    const data = request.only(['produk_id', 'tipe', 'jumlah', 'catatan'])
    
    // Validate required fields
    if (!data.produk_id || !data.tipe || !data.jumlah) {
      return { error: 'Produk ID, tipe, dan jumlah harus diisi' }
    }

    if (!['masuk', 'keluar'].includes(data.tipe)) {
      return { error: 'Tipe harus berupa "masuk" atau "keluar"' }
    }

    // Check if product exists
    const product = await Product.findOrFail(data.produk_id)
    
    // For 'keluar' transactions, check if stock is sufficient
    if (data.tipe === 'keluar' && product.stok < data.jumlah) {
      return { error: 'Stok tidak mencukupi' }
    }

    const transaction = await Transaction.create(data)
    await transaction.load('product')
    
    // Update product stock
    if (data.tipe === 'masuk') {
      product.stok += data.jumlah
    } else {
      product.stok -= data.jumlah
    }
    await product.save()
    
    return transaction
  }

  /**
   * Show individual transaction with product relationship
   */
  async show({ params }: HttpContext) {
    const transaction = await Transaction.query()
      .where('id', params.id)
      .preload('product')
      .firstOrFail()
    
    return transaction
  }

  /**
   * Update existing transaction
   */
  async update({ params, request }: HttpContext) {
    try {
      console.log('Update transaction request:', request.all())
      
      const transaction = await Transaction.findOrFail(params.id)
      console.log('Found transaction:', transaction.toJSON())
      
      const data = request.only(['produk_id', 'tipe', 'jumlah', 'catatan'])
      console.log('Update data:', data)
      
      // Validate required fields
      if (!data.produk_id || !data.tipe || !data.jumlah) {
        return { error: 'Produk ID, tipe, dan jumlah harus diisi' }
      }

      if (!['masuk', 'keluar'].includes(data.tipe)) {
        return { error: 'Tipe harus berupa "masuk" atau "keluar"' }
      }

      // Check if product exists
      const product = await Product.findOrFail(data.produk_id)
      
      // For 'keluar' transactions, check if stock is sufficient
      if (data.tipe === 'keluar' && product.stok < data.jumlah) {
        return { error: 'Stok tidak mencukupi' }
      }

      // Update transaction
      transaction.merge(data)
      await transaction.save()
      await transaction.load('product')
      
      console.log('Transaction updated successfully:', transaction.toJSON())
      return transaction
    } catch (error) {
      console.error('Update transaction error:', error)
      return { error: 'Terjadi kesalahan saat mengupdate transaksi' }
    }
  }

  /**
   * Delete transaction
   */
  async destroy({ params }: HttpContext) {
    const transaction = await Transaction.findOrFail(params.id)
    const product = await transaction.related('product').query().firstOrFail()
    
    // Revert stock changes
    if (transaction.tipe === 'masuk') {
      product.stok -= transaction.jumlah
    } else {
      product.stok += transaction.jumlah
    }
    await product.save()
    
    await transaction.delete()
    return { message: 'Transaksi berhasil dihapus' }
  }

  /**
   * Get transactions by product
   */
  async getByProduct({ params }: HttpContext) {
    const transactions = await Transaction.query()
      .where('produk_id', params.productId)
      .preload('product')
      .orderBy('created_at', 'desc')
    
    return transactions
  }

  /**
   * Get transaction statistics
   */
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

  /**
   * Search transactions
   */
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
