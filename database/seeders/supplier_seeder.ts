import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Supplier from '#models/supplier'

export default class extends BaseSeeder {
  async run() {
    // Sample suppliers data - fokus elektronik
    const suppliersData = [
      {
        nama: 'PT. Tech Solutions Indonesia',
        alamat: 'Jl. Sudirman No. 123, Jakarta Selatan',
        telepon: '021-12345678',
        email: 'info@techsolutions.co.id'
      },
      {
        nama: 'CV. Electronic Store',
        alamat: 'Jl. Kemang Raya No. 456, Jakarta Selatan',
        telepon: '021-87654321',
        email: 'contact@electronicstore.com'
      },
      {
        nama: 'PT. Gadget Distributor',
        alamat: 'Jl. Gatot Subroto No. 789, Jakarta Pusat',
        telepon: '021-11223344',
        email: 'sales@gadgetdist.co.id'
      },
      {
        nama: 'UD. Komputer Mandiri',
        alamat: 'Jl. Thamrin No. 321, Jakarta Pusat',
        telepon: '021-55667788',
        email: 'info@komputermandiri.co.id'
      },
      {
        nama: 'PT. Audio Visual Pro',
        alamat: 'Jl. Senopati No. 654, Jakarta Selatan',
        telepon: '021-99887766',
        email: 'sales@avpro.co.id'
      }
    ]

    // Check if suppliers already exist
    const existingSuppliers = await Supplier.query().count('* as total')
    
    if (existingSuppliers[0].total === 0) {
      await Supplier.createMany(suppliersData)
      console.log('✅ Electronic suppliers created successfully!')
      console.log('🏢 Sample electronic suppliers added to database')
    } else {
      console.log('ℹ️  Suppliers already exist in database')
    }
  }
}
