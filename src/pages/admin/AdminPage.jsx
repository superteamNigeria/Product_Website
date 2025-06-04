"use client"

import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Home,
  Info,
  Phone,
  ChevronDown,
  Download,
  Plus,
} from "lucide-react"
import { logo, whiteLogo } from "../../constants/images";



const ENV = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || "",
  ADMIN_PASSWORDS: JSON.parse(import.meta.env.VITE_ADMIN_PASSWORDS || '{}'),
};


const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [showAdminSwitcher, setShowAdminSwitcher] = useState(false)
  const [switchingAdmin, setSwitchingAdmin] = useState(false)
  const [activeTab, setActiveTab] = useState("Dashboard")
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("All")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const [showActionModal, setShowActionModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [bulkActionLoading, setBulkActionLoading] = useState(false)
  const [showBulkActions, setShowBulkActions] = useState(false)

  // Bulk Actions Functions
  const handleBulkApprove = async () => {
    if (selectedProducts.length === 0) return

    setBulkActionLoading(true)
    try {
      await bulkUpdateProducts(selectedProducts, "Approved")
      await fetchProducts() // Refresh data
      setSelectedProducts([])
      setSelectAll(false)
      alert(`Successfully approved ${selectedProducts.length} products`)
    } catch (err) {
      alert("Failed to approve products. Please try again.")
    } finally {
      setBulkActionLoading(false)
    }
  }

  const handleBulkReject = async () => {
    if (selectedProducts.length === 0) return

    if (!window.confirm(`Are you sure you want to reject ${selectedProducts.length} products?`)) {
      return
    }

    setBulkActionLoading(true)
    try {
      await bulkUpdateProducts(selectedProducts, "Rejected")
      await fetchProducts() // Refresh data
      setSelectedProducts([])
      setSelectAll(false)
      alert(`Successfully rejected ${selectedProducts.length} products`)
    } catch (err) {
      alert("Failed to reject products. Please try again.")
    } finally {
      setBulkActionLoading(false)
    }
  }

  const handleBulkDelete = async () => {
    if (selectedProducts.length === 0) return

    if (
      !window.confirm(
        `Are you sure you want to delete ${selectedProducts.length} products? This action cannot be undone.`,
      )
    ) {
      return
    }

    setBulkActionLoading(true)
    try {
      const deletePromises = selectedProducts.map((id) => deleteProduct(id))
      await Promise.all(deletePromises)
      await fetchProducts() // Refresh data
      setSelectedProducts([])
      setSelectAll(false)
      alert(`Successfully deleted ${selectedProducts.length} products`)
    } catch (err) {
      alert("Failed to delete products. Please try again.")
    } finally {
      setBulkActionLoading(false)
    }
  }

  // Export Functions
  const exportToJSON = (data, filename = "products-export") => {
    const jsonData = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonData], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${filename}-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const exportSelectedProducts = () => {
    const selectedData = products.filter((product) => selectedProducts.includes(product.id))
    exportToJSON(selectedData, "selected-products")
  }

  const exportAllProducts = () => {
    exportToJSON(filteredProducts, "all-products")
  }

  const exportFilteredProducts = () => {
    exportToJSON(filteredProducts, "filtered-products")
  }

  // Sleek Passcode Component
  const PasscodeScreen = ({ isSwitch = false }) => {
    const [inputPasscode, setInputPasscode] = useState("")
    const [shakeAnimation, setShakeAnimation] = useState(false)

    const handleNumberPress = (num) => {
      if (inputPasscode.length < 4) {
        setInputPasscode((prev) => prev + num)
      }
    }

    const handleDelete = () => {
      setInputPasscode((prev) => prev.slice(0, -1))
    }

    const handleClear = () => {
      setInputPasscode("")
    }

    const handleSubmit = () => {
      const password = Number.parseInt(inputPasscode)
      if (ENV.ADMIN_PASSWORDS[password]) {
        setIsAuthenticated(true)
        setCurrentUser(ENV.ADMIN_PASSWORDS[password])
        setSwitchingAdmin(false)
        setShowAdminSwitcher(false)
      } else {
        setShakeAnimation(true)
        setInputPasscode("")
        setTimeout(() => setShakeAnimation(false), 600)
      }
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#00ad44] to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 w-full max-w-sm shadow-2xl border border-white/20">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                {/* <span className="text-white font-bold text-2xl">ST</span> */}
                <img src={whiteLogo} alt="logo" className="h-8 w-auto dark:hidden" />

              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{isSwitch ? "Switch Admin" : "Admin Dashboard"}</h1>
            <p className="text-gray-600">Enter your passcode to continue</p>
          </div>

          <div className="mb-8">
            <div className={`flex justify-center space-x-4 mb-8 ${shakeAnimation ? "animate-bounce" : ""}`}>
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                    i < inputPasscode.length
                      ? "bg-gradient-to-r from-green-400 to-green-600 border-green-500 shadow-lg"
                      : "border-gray-300 bg-gray-50"
                  }`}
                />
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  onClick={() => handleNumberPress(num)}
                  className="w-18 h-18 rounded-2xl bg-gray-50 hover:bg-gray-100 active:bg-gray-200 text-xl font-semibold text-gray-800 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  {num}
                </button>
              ))}
              <button
                onClick={handleClear}
                className="w-18 h-18 rounded-2xl bg-gray-50 hover:bg-gray-100 active:bg-gray-200 text-sm font-semibold text-gray-600 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Clear
              </button>
              <button
                onClick={() => handleNumberPress(0)}
                className="w-18 h-18 rounded-2xl bg-gray-50 hover:bg-gray-100 active:bg-gray-200 text-xl font-semibold text-gray-800 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                0
              </button>
              <button
                onClick={handleDelete}
                className="w-18 h-18 rounded-2xl bg-gray-50 hover:bg-gray-100 active:bg-gray-200 text-lg font-semibold text-gray-600 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                ⌫
              </button>
            </div>

            {inputPasscode.length === 4 && (
              <button
                onClick={handleSubmit}
                className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {isSwitch ? "Switch Admin" : "Enter Dashboard"}
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Admin Switcher Component
  const AdminSwitcher = () => (
    <div className="relative">
      <button
        onClick={() => setShowAdminSwitcher(!showAdminSwitcher)}
        className="flex items-center space-x-3 bg-[#02834e]  text-white px-4 py-2 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        <ChevronDown className="w-4 h-4" />
        <span className="font-medium">{currentUser}</span>
        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
          <span className="text-sm font-bold">{currentUser?.[0]}</span>
        </div>
      </button>

      {showAdminSwitcher && (
        <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 py-2 min-w-48 z-50">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm text-gray-500">Switch to another admin</p>
          </div>
          {Object.entries(ENV.ADMIN_PASSWORDS).map(([pin, username]) => (
            <button
              key={pin}
              onClick={() => {
                setSwitchingAdmin(true)
                setShowAdminSwitcher(false)
              }}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 transition-colors"
            >
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-medium text-sm">{username[0]}</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">{username}</p>
                <p className="text-xs text-gray-500">PIN: {pin}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )

  // Action Modal Component
  const ActionModal = ({ product, onClose }) => {
    const [newStatus, setNewStatus] = useState(
      product?.isApproved ? "Approved" : "Unapproved",
    )
    const [updating, setUpdating] = useState(false)

    const handleStatusChange = async () => {
      setUpdating(true)
      try {
        await updateProductStatus(product.id, newStatus)
        await fetchProducts() // Refresh data
        alert("Product status updated successfully!")
        onClose()
      } catch (err) {
        alert("Failed to update product status. Please try again.")
      } finally {
        setUpdating(false)
      }
    }

    const handleViewProduct = () => {
      window.open(`/product/${product.id}`, "_blank")
    }

    const handleDeleteProduct = async () => {
      if (window.confirm("Are you sure you want to delete this product?")) {
        setUpdating(true)
        try {
          await deleteProduct(product.id)
          await fetchProducts() // Refresh data
          alert("Product deleted successfully!")
          onClose()
        } catch (err) {
          alert("Failed to delete product. Please try again.")
        } finally {
          setUpdating(false)
        }
      }
    }

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Product Actions</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <XCircle className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Approval Status</label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                disabled={updating}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
              >
                <option value="Approved">Approved</option>
                <option value="Unapproved">Unapproved</option>
              </select>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleStatusChange}
                disabled={updating}
                className="flex-1 bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white py-2 px-4 rounded-lg transition-colors"
              >
                {updating ? "Updating..." : "Update Status"}
              </button>
              <button
                onClick={handleViewProduct}
                disabled={updating}
                className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Eye className="w-4 h-4" />
                <span>View</span>
              </button>
            </div>

            <button
              onClick={handleDeleteProduct}
              disabled={updating}
              className="w-full bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>{updating ? "Deleting..." : "Delete Product"}</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  // API Functions
  const fetchProducts = async (endpoint = "/api/products/admin/all") => {
    setLoading(true)
    setError("")
    try {
      const response = await fetch(`${ENV.API_BASE_URL}${endpoint}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      const productList = data.products || data || []
      setProducts(productList)
      setFilteredProducts(productList)
    } catch (err) {
      setError(`Failed to fetch products: ${err.message}`)
      console.error("API Error:", err)
      // Fallback to mock data for demo purposes
      const mockProducts = generateMockProducts()
      setProducts(mockProducts)
      setFilteredProducts(mockProducts)
    } finally {
      setLoading(false)
    }
  }

  const updateProductStatus = async (productId, status) => {
    try {
      const response = await fetch(`${ENV.API_BASE_URL}/api/products/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isApproved: status === "Approved",
        }),
      })

      if (!response.ok) {
        throw new Error(`Failed to update product status: ${response.status}`)
      }

      return await response.json()
    } catch (err) {
      console.error("Update Error:", err)
      throw err
    }
  }

  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`${ENV.API_BASE_URL}/api/products/${productId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error(`Failed to delete product: ${response.status}`)
      }

      return true
    } catch (err) {
      console.error("Delete Error:", err)
      throw err
    }
  }

  const bulkUpdateProducts = async (productIds, status) => {
    try {
      const updatePromises = productIds.map((id) => updateProductStatus(id, status))
      await Promise.all(updatePromises)
      return true
    } catch (err) {
      console.error("Bulk Update Error:", err)
      throw err
    }
  }

  const generateMockProducts = () => {
    const categories = ["DeFi", "NFT", "Gaming", "Tools", "Infrastructure", "Social", "Education"]
    const statuses = ["Live", "Beta", "Development", "Deprecated"]
    const approvalStatuses = ["Approved", "Unapproved"]

    return Array.from({ length: 50 }, (_, i) => ({
      id: `prod-${i + 1}`,
      name: `Chatter`,
      description: `This is a description for product ${i + 1}`,
      alias: `prod${i + 1}`,
      category: [categories[i % categories.length]],
      verified: Math.random() > 0.5,
      openSource: Math.random() > 0.5,
      isApproved: Math.random() > 0.3,
      status: statuses[i % statuses.length],
      approvalStatus: approvalStatuses[i % approvalStatuses.length],
      teamMembers: [`info@usechatter.app`],
      website: `https://product${i + 1}.com`,
      userCount: Math.floor(Math.random() * 10000).toString(),
      launchDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
      founder: "@starlingvibe",
    }))
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts()
    }
  }, [isAuthenticated])

  useEffect(() => {
    let filtered = products

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.some((cat) => cat.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (filterStatus !== "All") {
      filtered = filtered.filter((product) => {
        if (filterStatus === "Approved") return product.isApproved
        if (filterStatus === "Unapproved") return !product.isApproved
        return true
      })
    }

    setFilteredProducts(filtered)
  }, [searchTerm, filterStatus, products])

  // Header Component
  const Header = () => (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a href="/" className="flex-shrink-0">
            <img src={logo} alt="logo" className="h-8 w-auto dark:hidden" />
            <img
              src={whiteLogo}
              alt="logo"
              className="h-8 w-auto hidden dark:block"
            />
          </a>
          <div className="flex items-center bg-neutral-200 dark:bg-[#20232D] px-4 py-2.5 rounded-[17px]">
            <ul className="flex space-x-6">
              <a href='/'>
              <li className="text-black dark:text-white hover:text-green-darker dark:hover:text-green-darker font-semibold cursor-pointer text-sm whitespace-nowrap">
                Home
              </li>
              </a>
              <a href='/'>
              <li className="text-black dark:text-white font-semibold hover:text-green-darker dark:hover:text-green-darker cursor-pointer text-sm whitespace-nowrap">
                About
              </li>
              </a>
              <a href='/'>
              <li className="text-black dark:text-white font-semibold hover:text-green-darker dark:hover:text-green-darker cursor-pointer text-sm whitespace-nowrap">
                Contact Us
              </li>
              </a>
            </ul>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <a
            href="/create-product"
            className="flex items-center space-x-2 bg-[#02834e] text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create Product</span>
          </a>
          <div className="flex items-center space-x-3">
            {/* <span className="text-sm text-gray-600">Welcome</span> */}
            <AdminSwitcher />
          </div>
        </div>
      </div>
    </header>
  )

  // Navigation Tabs
  const NavigationTabs = () => (
    <nav className="bg-white border-b border-gray-200 px-6">
      <div className="flex space-x-8">
        {["Dashboard", "Product Submissions", "Edit Requests", "JSON Exports", "Team Settings"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
              activeTab === tab
                ? "border-green-500 text-green-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </nav>
  )

  // Enhanced Data Table Component with Bulk Actions and Export
  const ProductTable = ({ title, data, showSearch = true }) => {
    const handleSelectAll = () => {
      if (selectAll) {
        setSelectedProducts([])
      } else {
        setSelectedProducts(data.map((p) => p.id))
      }
      setSelectAll(!selectAll)
    }

    const handleSelectProduct = (productId) => {
      if (selectedProducts.includes(productId)) {
        setSelectedProducts(selectedProducts.filter((id) => id !== productId))
      } else {
        setSelectedProducts([...selectedProducts, productId])
      }
    }

    useEffect(() => {
      setShowBulkActions(selectedProducts.length > 0)
    }, [selectedProducts])

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <div className="flex items-center space-x-3">
              {showSearch && (
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-64"
                  />
                </div>
              )}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-4 h-4 text-gray-500" />
              </button>

              {/* Export Dropdown */}
              <div className="relative">
                <button
                  onClick={exportAllProducts}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bulk Actions Bar */}
          {showBulkActions && (
            <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-900">
                  {selectedProducts.length} product{selectedProducts.length !== 1 ? "s" : ""} selected
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleBulkApprove}
                    disabled={bulkActionLoading}
                    className="px-3 py-1 bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white text-sm rounded-lg transition-colors"
                  >
                    {bulkActionLoading ? "Processing..." : "Approve"}
                  </button>
                  <button
                    onClick={handleBulkReject}
                    disabled={bulkActionLoading}
                    className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 text-white text-sm rounded-lg transition-colors"
                  >
                    {bulkActionLoading ? "Processing..." : "Reject"}
                  </button>
                  <button
                    onClick={handleBulkDelete}
                    disabled={bulkActionLoading}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white text-sm rounded-lg transition-colors"
                  >
                    {bulkActionLoading ? "Processing..." : "Delete"}
                  </button>
                  <button
                    onClick={exportSelectedProducts}
                    disabled={bulkActionLoading}
                    className="px-3 py-1 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white text-sm rounded-lg transition-colors flex items-center space-x-1"
                  >
                    <Download className="w-3 h-3" />
                    <span>Export Selected</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {showFilters && (
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="selectAll"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <label htmlFor="selectAll" className="text-sm font-medium text-gray-700">
                  Select All
                </label>
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="All">All Status</option>
                <option value="Approved">Approved</option>
                <option value="Unapproved">Unapproved</option>
              </select>
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">All</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Founder
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Access
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.slice(0, 10).map((product, index) => (
                <tr key={product.id || index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => handleSelectProduct(product.id)}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">{product.name}</span>
                      <span className="text-gray-400">🔗</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-900">{product.teamMembers?.[0] || "N/A"}</span>
                      <span className="text-gray-400">🔗</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{product.founder || "N/A"}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                        product.isApproved
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.isApproved ? "Approved" : "Unapproved"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">5 minutes ago</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => {
                        setSelectedProduct(product)
                        setShowActionModal(true)
                      }}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  // Dashboard Stats Cards
  const StatsCards = () => {
    const totalProducts = products.length
    const approvedProducts = products.filter((p) => p.isApproved).length
    const unApprovedProducts = products.filter((p) => !p.isApproved).length

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Products</p>
              <p className="text-3xl font-bold text-blue-600">{totalProducts}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Approved</p>
              <p className="text-3xl font-bold text-green-600">{approvedProducts}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Unapproved</p>
              <p className="text-3xl font-bold text-red-600">{unApprovedProducts}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

      </div>
    )
  }

  // Charts Component
  const ChartsSection = () => {
    const getChartData = () => {
      const categoryData = products.reduce((acc, product) => {
        product.category.forEach((cat) => {
          acc[cat] = (acc[cat] || 0) + 1
        })
        return acc
      }, {})

      const statusData = products.reduce((acc, product) => {
        const status = product.isApproved ? "Approved" : "Unapproved"
        acc[status] = (acc[status] || 0) + 1
        return acc
      }, {})

      return {
        categories: Object.entries(categoryData).map(([name, value]) => ({ name, value })),
        statuses: Object.entries(statusData).map(([name, value]) => ({ name, value })),
      }
    }

    const chartData = getChartData()
    const COLORS = ["#10B981", "#3B82F6", "#8B5CF6", "#F59E0B", "#EF4444", "#06B6D4", "#84CC16"]

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Products by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData.categories}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Approval Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData.statuses}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.statuses.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    )
  }

  // Main Content Renderer
  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
      )
    }

    if (error) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => fetchProducts()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      )
    }

    switch (activeTab) {
      case "Dashboard":
        return (
          <div>
            <div className="mb-6">
              <h1 className="text-2xl text-center font-bold text-gray-900">
                Welcome <span className="text-green-600">{currentUser}</span>
              </h1>
            </div>
            <StatsCards />
            <ChartsSection />
            <ProductTable title="Recent Products" data={filteredProducts} />
          </div>
        )
      case "Product Submissions":
        return (
          <div>
            <div className="mb-6">
              <h1 className="text-2xl text-center font-bold text-gray-900">
                <span className="text-green-600">{currentUser}</span>, check if you've got pending task!
              </h1>
            </div>
            <ProductTable title="Product Submissions" data={filteredProducts} />
          </div>
        )
      case "Edit Requests":
        return (
          <div>
            <div className="mb-6">
              <h1 className="text-2xl text-center font-bold text-gray-900">Edit Requests</h1>
            </div>
            <ProductTable title="Edit Requests" data={filteredProducts} />
          </div>
        )
      case "JSON Exports":
        return (
          <div>
            <div className="mb-6">
              <h1 className="text-2xl text-center font-bold text-gray-900">JSON Exports</h1>
            </div>
            <ProductTable title="JSON Export Requests" data={filteredProducts} />
          </div>
        )
      case "Team Settings":
        return (
          <div>
            <div className="mb-6">
              <h1 className="text-2xl text-center font-bold text-gray-900">Team Settings</h1>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Members</h3>
              <div className="space-y-4">
                {Object.entries(ENV.ADMIN_PASSWORDS).map(([pin, username]) => (
                  <div key={pin} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">{username[0]}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{username}</p>
                        <p className="text-sm text-gray-500">PIN: {pin}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      default:
        return <div>Tab content not found</div>
    }
  }

  // Footer Component
  const Footer = () => (
    <footer className="bg-white border-t border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-xl">superteam</span>
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
          <div className="flex space-x-4">
            <button className="text-gray-700 hover:text-green-600 font-medium transition-colors">GitHub Repo</button>
            <button className="text-gray-700 hover:text-green-600 font-medium transition-colors">Contact Us</button>
          </div>
        </div>
      </div>
    </footer>
  )

  // Main App Return
  if (!isAuthenticated || switchingAdmin) {
    return <PasscodeScreen isSwitch={switchingAdmin} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <NavigationTabs />
      <main className="max-w-7xl mx-auto px-6 py-8">{renderContent()}</main>
      <Footer />

      {/* Action Modal */}
      {showActionModal && selectedProduct && (
        <ActionModal
          product={selectedProduct}
          onClose={() => {
            setShowActionModal(false)
            setSelectedProduct(null)
          }}
        />
      )}
    </div>
  )
}

export default AdminDashboard
