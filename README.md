# 🌸 InRoomDining - Premium E-commerce Platform

![In Room Dining](https://img.shields.io/badge/In%20Room%20Dining-E--commerce-purple?style=for-the-badge&logo=nextdotjs)
![Next.js](https://img.shields.io/badge/Next.js-14.2.23-black?style=for-the-badge&logo=nextdotjs)
![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)
![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC?style=for-the-badge&logo=redux)

## 🚀 Overview

InRoomDining is a modern, full-featured e-commerce platform built with Next.js 14, featuring a sophisticated product management system, shopping cart functionality, and comprehensive admin dashboard. The platform is designed for seamless user experience with advanced features like real-time deal countdown, wishlist management, and automated PDF invoice generation.

## ✨ Key Features

### 🛍️ **E-commerce Core**
- **Product Catalog**: Dynamic product listing with advanced filtering and search
- **Shopping Cart**: Real-time cart management with quantity controls
- **Wishlist**: Save favorite products for later purchase
- **Checkout System**: Streamlined checkout with GST calculation and PDF invoice generation
- **Deal Products**: Time-limited offers with countdown timers

### 📱 **User Experience**
- **Responsive Design**: Mobile-first design that works on all devices
- **Interactive UI**: Smooth animations and transitions using WOW.js
- **Product Search**: Advanced search functionality with query parameters
- **Product Ratings**: Star-based rating system for products
- **Price Range Filtering**: Dynamic price filtering with range sliders

### 🔧 **Admin Dashboard**
- **Product Management**: Full CRUD operations for products
- **Deal Management**: Create and manage time-limited deals
- **Slider Management**: Control homepage slider content
- **Testimonial Management**: Manage customer testimonials
- **Modern Admin UI**: Clean, intuitive admin interface

### 🚀 **Advanced Features**
- **PDF Generation**: Automatic invoice generation with html2pdf.js
- **WhatsApp Integration**: Direct order sharing via WhatsApp
- **Toast Notifications**: Real-time user feedback with react-toastify
- **State Management**: Centralized state management with Redux Toolkit
- **Local Storage**: Persistent cart and wishlist across sessions

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: Next.js 14.2.23 (App Router)
- **UI Library**: React 19.0.0
- **Styling**: Custom CSS with Bootstrap components
- **Icons**: Font Awesome
- **Animations**: WOW.js, Swiper.js

### **State Management**
- **Redux Toolkit**: Modern Redux for state management
- **React Redux**: React bindings for Redux

### **Additional Libraries**
- **PDF Generation**: html2pdf.js
- **Notifications**: react-toastify
- **Range Slider**: react-input-range
- **Video Modal**: react-modal-video
- **CSS Preprocessor**: Sass
- **Communication**: Twilio integration

## 📂 Project Structure

```
Lilac-IRD/
├── app/                          # Next.js App Router
│   ├── admin/                    # Admin dashboard pages
│   │   ├── products/             # Product management
│   │   ├── deal-products/        # Deal management
│   │   ├── slider-products/      # Slider management
│   │   └── testimonials/         # Testimonial management
│   ├── cart/                     # Shopping cart page
│   ├── checkout/                 # Checkout process
│   ├── product/                  # Product listing page
│   ├── wishlist/                 # Wishlist page
│   └── contact/                  # Contact page
│
├── components/                   # Reusable React components
│   ├── admin/                    # Admin-specific components
│   ├── elements/                 # UI elements (Cart, Wishlist, etc.)
│   ├── filter/                   # Product filtering components
│   ├── layout/                   # Layout components (Header, Footer)
│   ├── sections/                 # Homepage sections
│   └── shop/                     # Shop-related components
│
├── data/                         # JSON data files
│   ├── products.json             # Product catalog
│   ├── dealproduct.json          # Deal products
│   ├── sliderproduct.json        # Slider content
│   └── testimonials.json         # Customer testimonials
│
├── features/                     # Redux slices and store
│   ├── filterSlice.js            # Product filtering state
│   ├── productSlice.js           # Product state management
│   ├── shopSlice.js              # Shopping cart state
│   ├── wishlistSlice.js          # Wishlist state
│   └── store.js                  # Redux store configuration
│
└── public/                       # Static assets
    └── assets/
        ├── css/                  # Stylesheets
        ├── img/                  # Images
        └── fonts/                # Font files
```

## 🚀 Getting Started

### **Prerequisites**
- Node.js (16.x or higher)
- npm or yarn package manager

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/karthik558/InRoomDining
   cd InRoomDining
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### **Available Scripts**

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint code
npm run lint

# Compile Sass
npm run sass
```

## 🎨 Features in Detail

### **Shopping Experience**
- **Product Catalog**: Browse through a wide range of food products with detailed information
- **Dynamic Filtering**: Filter products by category, price range, and ratings
- **Search Functionality**: Find products quickly with the integrated search feature
- **Shopping Cart**: Add/remove items with real-time quantity updates
- **Wishlist**: Save products for future purchases

### **Checkout Process**
- **Guest Information**: Collect customer details including room number for delivery
- **Order Summary**: Detailed breakdown with GST calculation
- **PDF Invoice**: Automatic generation of professional invoices
- **WhatsApp Integration**: Share order details directly via WhatsApp

### **Admin Dashboard**
- **Product Management**: Add, edit, and delete products with image support
- **Deal Management**: Create time-limited offers with countdown functionality
- **Content Management**: Update slider content and testimonials
- **Order Tracking**: Monitor and manage customer orders

### **Technical Features**
- **Server-Side Rendering**: Fast page loads with Next.js SSR
- **State Persistence**: Cart and wishlist data persist across browser sessions
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **SEO Optimized**: Built-in SEO features with Next.js metadata API

## 🔧 Configuration

### **Environment Variables**
Create a `.env.local` file in the root directory:

```env
# Application settings
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Twilio configuration (if using SMS features)
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token

# WhatsApp Business API (if applicable)
WHATSAPP_PHONE_NUMBER=8129624036
```

### **Customization**
- **Styling**: Modify CSS files in `/public/assets/css/`
- **Product Data**: Update JSON files in `/data/` directory
- **Components**: Customize React components in `/components/`
- **Layout**: Modify layout components for branding

## 📊 Admin Panel

### **Access**
- Navigate to `/admin` to access the admin dashboard
- Features include:
  - Product management (CRUD operations)
  - Deal product configuration
  - Slider content management
  - Testimonial management

### **Admin Features**
- **Dashboard Overview**: Quick access to all management sections
- **Product Editor**: Add/edit products with image upload
- **Deal Timer**: Configure time-limited offers with countdown
- **Content Management**: Update homepage content dynamically

## 🚀 Deployment

### **Vercel Deployment**
The project is optimized for Vercel deployment:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel --prod
```

### **Build for Production**
```bash
# Create production build
npm run build

# Start production server
npm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎉 Acknowledgments

- **Next.js Team**: For the amazing React framework
- **Redux Team**: For excellent state management
- **Community**: For the open-source libraries used in this project
- **Font Awesome**: For the comprehensive icon library
- **Bootstrap**: For the responsive grid system

## 📈 Performance Features

- **Optimized Images**: Next.js Image optimization for faster loading
- **Code Splitting**: Automatic code splitting for better performance
- **Static Generation**: Pre-rendered pages for lightning-fast loading
- **Lazy Loading**: Components and images load on demand
- **Caching**: Efficient caching strategies for better user experience

## 🔒 Security Features

- **Input Validation**: Form validation on both client and server side
- **XSS Protection**: Built-in protection against cross-site scripting
- **CSRF Protection**: Cross-site request forgery protection
- **Secure Headers**: Security headers configured for production

## 📱 Mobile Optimization

- **Progressive Web App**: PWA-ready with service workers
- **Touch Optimized**: Optimized for touch interactions
- **Mobile Navigation**: Responsive navigation for mobile devices
- **Fast Loading**: Optimized for mobile networks

---

<div align="center">

**Built with ❤️ using Next.js, React, and Redux**

[🏠 Homepage](/) • [🛍️ Shop](/product) • [🛒 Cart](/cart) • [👨‍💼 Admin](/admin)

</div>
