import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Plus, Package, BarChart3, Users } from "lucide-react";
import AdminNavbar from "./AdminNavbar";
import ProductForm from "./ProdectForm";
import ProductList from "./ProductList";
import { Toaster, toast } from "sonner";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [stats, setStats] = useState({
    totalProducts: 0,
    inStock: 0,
    outOfStock: 0,
    totalValue: 0,
  });

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    const AllProducts = async () => {
      try {
        const res = await api.get("/api/admin/allProduct");
        console.log(res.data, "all products");
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    AllProducts();
  }, [isAuthenticated]);

  useEffect(() => {
    calculateStats();
  }, [products]);

  const checkAuth = () => {
    const token = localStorage.getItem("admin");
    if (!token) {
      return;
    }
    setIsAuthenticated(true);
  };

  const calculateStats = () => {
    const totalProducts = products.length;
    const inStock = products.filter((p) => p.inStock).length;
    const outOfStock = totalProducts - inStock;
    const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);

    setStats({ totalProducts, inStock, outOfStock, totalValue });
  };

  const handleAddProduct = async (productData) => {
    try {
      const res = await api.post("/api/admin/productAdd", productData);
      if (res.status === 200) {
        setProducts([...products, res.data.newProduct]);
        setShowAddForm(false);
        toast.success("Product added successfully");
      } else {
        toast.error("Error");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleEditProduct = async (productData) => {
    try {
      const response = await api.put(
        `/api/admin/edit/${productData._id}`,
        productData
      );

      if (response.status === 200) {
        const updatedProduct = response.data.product;
        setProducts(
          products.map((p) =>
            p._id === updatedProduct._id ? updatedProduct : p
          )
        );
        setEditingProduct(null);
        toast.success("Product update success");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

const handleDeleteProduct = async (productId) => {
  try {
    const response = await api.delete(`/api/admin/delete/${productId}`);

    if (response.status === 200) {
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
      toast.success("successfully Deleted");
    }
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};


  return (
    <div className="min-h-screen bg-[#f8f5f2]">
      <AdminNavbar />
      <Toaster />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Product Management Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your eco-friendly product inventory
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Products</p>
                <p className="text-2xl font-bold">{stats.totalProducts}</p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">In Stock</p>
                <p className="text-2xl font-bold text-green-600">
                  {stats.inStock}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Out of Stock</p>
                <p className="text-2xl font-bold text-red-600">
                  {stats.outOfStock}
                </p>
              </div>
              <Users className="h-8 w-8 text-red-500" />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Value</p>
                <p className="text-2xl font-bold">
                  ${stats.totalValue.toFixed(2)}
                </p>
              </div>
              <Package className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Add Product Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add New Product
          </button>
        </div>

        {/* Add/Edit Product Form */}
        {(showAddForm || editingProduct) && (
          <div className="mb-8">
            <ProductForm
              product={editingProduct}
              onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
              onCancel={() => {
                setShowAddForm(false);
                setEditingProduct(null);
              }}
            />
          </div>
        )}

        {/* Products List */}
        <ProductList
          products={products}
          onEdit={setEditingProduct}
          onDelete={handleDeleteProduct}
        />
      </div>
    </div>
  );
}
