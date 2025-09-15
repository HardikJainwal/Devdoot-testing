'use client'

import { useState, useEffect } from 'react'

export default function EquipmentCatalog() {
  const [equipment, setEquipment] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState('all')


  const sampleData = {
    "success": true,
    "message": "Equipment fetched successfully",
    "data": {
      "data": [
        {
          "equipment_id": "68ba9daf96a3d6428ffd4d17",
          "brand_name": "Oxygen",
          "model": "lxbd2",
          "description": "this is an human with for development uses ai for the task",
          "image": '/images/devdoot-round.png',
          "starting_price": null,
          "currency": "INR",
          "category": "Testing",
          "availability_status": "available"
        },
        {
          "equipment_id": "68ba9ce5725bd156614934c6",
          "brand_name": "ECG Machine",
          "model": "lxbd2",
          "description": "this is an human with for development uses ai for the task",
          "image": '/images/devdoot-round.png',
          "starting_price": null,
          "currency": "INR",
          "category": "Testing",
          "availability_status": "available"
        },
        {
          "equipment_id": "68ba9ccf06551aca921ac1c0",
          "brand_name": "Ventilator",
          "model": "lxbd2",
          "description": "this is an human with for development uses ai for the task",
          "image": '/images/devdoot-round.png',
          "starting_price": null,
          "currency": "INR",
          "category": "Testing",
          "availability_status": "available"
        },
        {
          "equipment_id": "68ba9ccb06551aca921ac1bd",
          "brand_name": "WheelChair",
          "model": "lxbd2",
          "description": "this is an human with for development uses ai for the task",
          "image": '/images/devdoot-round.png',
          "starting_price": null,
          "currency": "INR",
          "category": "Testing",
          "availability_status": "available"
        },
        {
          "equipment_id": "68ba9cc906551aca921ac1ae",
          "brand_name": "Dhruv_v2222",
          "model": "lxbd2",
          "description": "this is an human with for development uses ai for the task",
          "image": '/images/devdoot-round.png',
          "starting_price": null,
          "currency": "INR",
          "category": "Testing",
          "availability_status": "available"
        },
        {
          "equipment_id": "68ba9cb35f0e0002ee2d702d",
          "brand_name": "Dhruv_v2222",
          "model": "lxbd2",
          "description": "this is an human with for development uses ai for the task",
          "image": '/images/devdoot-round.png',
          "starting_price": null,
          "currency": "INR",
          "category": "Testing",
          "availability_status": "available"
        },
        {
          "equipment_id": "68ba9ba8e81b7ba266570271",
          "brand_name": "Dhruv_v222",
          "model": "lxbd2",
          "description": "this is an human with for development uses ai for the task",
          "image": '/images/devdoot-round.png',
          "starting_price": null,
          "currency": "INR",
          "category": "Testing",
          "availability_status": "available"
        },
        {
          "equipment_id": "68ba9b922bab325602984d14",
          "brand_name": "Dhruv_v22",
          "model": "lxbd2",
          "description": "this is an human with for development uses ai for the task",
          "image": '/images/devdoot-round.png',
          "starting_price": null,
          "currency": "INR",
         "category": "Testing",
          "availability_status": "available"
        },
        {
          "equipment_id": "68ba9b22672eeb2a3bef39c5",
          "brand_name": "Dhruv_v2",
          "model": "lxbd2",
          "description": "this is an human with for development uses ai for the task",
          "image": '/images/devdoot-round.png',
          "starting_price": null,
          "currency": "INR",
          "category": "Testing",
          "availability_status": "available"
        },
        {
          "equipment_id": "68ba9a9cfd368776e183064d",
          "brand_name": "Dhruv_v1",
          "model": "lxbd2",
          "description": "this is an human with for development uses ai for the task",
          "image": '/images/devdoot-round.png',
          "starting_price": null,
          "currency": "INR",
          "category": "Testing",
          "availability_status": "available"
        }
      ],
      "pagination": {
        "page": 1,
        "limit": 10,
        "total": 14,
        "totalPages": 2
      }
    }
  }

  useEffect(() => {
    // Simulate API call
    const fetchEquipment = async () => {
      setLoading(true)
      // Replace this with your actual API call
      // const response = await fetch('/api/equipment')
      // const data = await response.json()
      const data = sampleData
      
      if (data.success) {
        setEquipment(data.data.data)
        setCurrentPage(data.data.pagination.page)
        setTotalPages(data.data.pagination.totalPages)
      }
      setLoading(false)
    }

    fetchEquipment()
  }, [])

  const handleRent = (equipmentId) => {
    alert(`Rent request for equipment ID: ${equipmentId}`)

  }

  const handleEnquiry = (equipmentId) => {
    alert(`Enquiry for equipment ID: ${equipmentId}`)
  }

  const getUniqueCategories = () => {
    const categories = equipment.map(item => item.category)
    return [...new Set(categories)]
  }

  const filteredEquipment = selectedCategory === 'all' 
    ? equipment 
    : equipment.filter(item => item.category === selectedCategory)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading equipment...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="mb-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter by Category</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Categories
            </button>
            {getUniqueCategories().map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {filteredEquipment.map((item) => (
            <div
              key={item.equipment_id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
 
              <div className="h-48  flex items-center justify-center">
                {item.image ? (
                  <img src={item.image} alt={item.brand_name} className="w-50 h-full object-fit" />
                ) : (
                  <div className="text-white text-center">
                    <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm">No Image Available</p>
                  </div>
                )}
              </div>

        
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{item.brand_name}</h3>
                    <p className="text-sm text-gray-600">Model: {item.model}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.availability_status === 'available'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {item.availability_status}
                  </span>
                </div>

                <p className="text-gray-700 text-sm mb-4 line-clamp-2">{item.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full capitalize">
                    {item.category}
                  </span>
                  {item.starting_price && (
                    <span className="text-lg font-bold text-green-600">
                      ₹{item.starting_price}
                    </span>
                  )}
                </div>

              
                <div className="flex gap-2">
                  <button
                    onClick={() => handleRent(item.equipment_id)}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={item.availability_status !== 'available'}
                  >
                    Rent Now
                  </button>
                  <button
                    onClick={() => handleEnquiry(item.equipment_id)}
                    className="flex-1 border border-blue-600 text-blue-600 py-2 px-4 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                  >
                    Enquiry
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>


        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-4 bg-white rounded-lg shadow-md p-4">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}

     
        {filteredEquipment.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Equipment Found</h3>
            <p className="text-gray-600">Try adjusting your filters or check back later.</p>
          </div>
        )}
      </div>
    </div>
  )
}