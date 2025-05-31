export default function Footer() {
  return (
    <footer className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Naturo</h3>
            <p className="text-gray-600 mb-4">
              Eco-friendly products for a sustainable lifestyle.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/products"
                  className="text-gray-600 hover:text-gray-900"
                >
                  All Products
                </a>
              </li>
              <li>
                <a
                  href="/new-arrivals"
                  className="text-gray-600 hover:text-gray-900"
                >
                  New Arrivals
                </a>
              </li>
              <li>
                <a
                  href="/bestsellers"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Bestsellers
                </a>
              </li>
              <li>
                <a href="/sale" className="text-gray-600 hover:text-gray-900">
                  Sale
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-gray-600 hover:text-gray-900">
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/sustainability"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Sustainability
                </a>
              </li>
              <li>
                <a href="/blog" className="text-gray-600 hover:text-gray-900">
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Newsletter</h4>
            <p className="text-gray-600 mb-4">
              Subscribe to get special offers and updates.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-gray-100 rounded-l-full py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 flex-grow"
              />
              <button className="bg-black text-white rounded-r-full px-4 py-2 text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-600">
          <p>&copy; 2024 Naturo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
