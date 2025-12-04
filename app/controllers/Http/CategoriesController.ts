import type { HttpContext } from '@adonisjs/core/http'
import Category from '#models/kategori'

export default class CategoriesController {
<<<<<<< HEAD
  /**
   * Display a list of categories with their products
   */
=======
>>>>>>> dfea00d (tambahkan)
  async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    
    return await Category.query()
      .preload('products')
      .paginate(page, limit)
  }

<<<<<<< HEAD
<<<<<<< HEAD
  /**
   * Store a new category
   */
  async store({ request }: HttpContext) {
    const data = request.only(['nama'])
    
    // Validate required fields
=======
  async store({ request }: HttpContext) {
=======
  async store({ request, response, session }: HttpContext) {
>>>>>>> 4125e4a (update pop up)
    const data = request.only(['nama'])

>>>>>>> dfea00d (tambahkan)
    if (!data.nama) {
      session.flash('error', 'Nama kategori harus diisi')
      return response.redirect('/categories')
    }

    const category = await Category.create(data)
    session.flash('success', 'Kategori berhasil ditambahkan')
    return response.redirect('/categories')
  }

<<<<<<< HEAD
  /**
   * Show individual category with its products
   */
=======
>>>>>>> dfea00d (tambahkan)
  async show({ params }: HttpContext) {
    const category = await Category.query()
      .where('id', params.id)
      .preload('products')
      .firstOrFail()
    
    return category
  }

<<<<<<< HEAD
<<<<<<< HEAD
  /**
   * Update existing category
   */
=======
>>>>>>> dfea00d (tambahkan)
  async update({ params, request }: HttpContext) {
=======
  async update({ params, request, response, session }: HttpContext) {
>>>>>>> 4125e4a (update pop up)
    const category = await Category.findOrFail(params.id)
    const data = request.only(['nama'])
    
    category.merge(data)
    await category.save()
    
    session.flash('success', 'Kategori berhasil diperbarui')
    return response.redirect('/categories')
  }

<<<<<<< HEAD
<<<<<<< HEAD
  /**
   * Delete category
   */
  async destroy({ params }: HttpContext) {
    const category = await Category.findOrFail(params.id)
    
    // Check if category has products
    const productCount = await category.related('products').query().count('* as total')
    
    if (productCount[0].total > 0) {
      return { error: 'Tidak dapat menghapus kategori yang masih memiliki produk' }
    }
    
    await category.delete()
    return { message: 'Kategori berhasil dihapus' }
  }

  /**
   * Get category statistics
   */
=======
  async destroy({ params }: HttpContext) {
=======
  async destroy({ params, response, session, request }: HttpContext) {
>>>>>>> 4125e4a (update pop up)
    const category = await Category.findOrFail(params.id)
    const productCount = await category.related('products').query().count('* as total')
    if (productCount[0].total > 0) {
      if (request.header('X-Inertia')) {
        session.flash('error', 'Tidak dapat menghapus kategori yang masih memiliki produk')
        return response.redirect('/categories')
      }
      return response.json({ error: 'Tidak dapat menghapus kategori yang masih memiliki produk' })
    }
    await category.delete()
    
    // Check if this is an Inertia request
    if (request.header('X-Inertia')) {
      session.flash('success', 'Kategori berhasil dihapus')
      return response.redirect('/categories')
    }
    
    return response.json({ message: 'Kategori berhasil dihapus' })
  }
>>>>>>> dfea00d (tambahkan)
  async stats({ params }: HttpContext) {
    const category = await Category.findOrFail(params.id)
    const products = await category.related('products').query()
    
    const totalProducts = products.length
    const totalStock = products.reduce((sum, product) => sum + product.stok, 0)
    const averagePrice = products.length > 0 
      ? products.reduce((sum, product) => sum + product.harga, 0) / products.length 
      : 0
    
    return {
      category: category,
      stats: {
        totalProducts,
        totalStock,
        averagePrice: Math.round(averagePrice * 100) / 100
      }
    }
  }

<<<<<<< HEAD
  /**
   * Search categories by name
   */
=======
>>>>>>> dfea00d (tambahkan)
  async search({ request }: HttpContext) {
    const searchTerm = request.input('search', '')
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    return await Category.query()
      .where('nama', 'like', `%${searchTerm}%`)
      .preload('products')
      .paginate(page, limit)
  }
}
