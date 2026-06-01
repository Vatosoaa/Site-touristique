import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./components/theme-provider"
import Home from "./features/home/Home"
import Details from "./features/details/Details"
import Destinations from "./features/destinations/Destinations"
import Blog from "./features/blog/Blog"
import BlogPost from "./features/blog/BlogPost"
import Contact from "./features/contact/Contact"
import About from "./features/about/About"
import AdminLogin from "./features/admin/AdminLogin"
import AdminDashboard from "./features/admin/AdminDashboard"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/details" element={<Details />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/:tab" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
