import Footer from "./Footer";
import Product from "./Product";
import { useSelector } from "react-redux";



export default function Home() {

    const { user } = useSelector((state) => state.user);

    console.log(user.id)


  return (
    <div className="min-h-screen bg-[#f8f5f2]">
      <main>
           <section className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Access to high-Quality, 
          <span className="block">Eco-Friendly products</span>
          <span className="block">and services</span>
        </h1>
        <a 
          href="/products" 
          className="inline-block bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
        >
          Shop Now
        </a>
      </div>
    </section>
        <Product />
      </main>
      <Footer />
    </div>
  )
}
