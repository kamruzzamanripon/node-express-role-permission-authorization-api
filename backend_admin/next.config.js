/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains:['images.unsplash.com', 'via.placeholder.com', 'randomuser.me'],
  },
  env: {
    ImagebaseUrl:'http://127.0.0.1:8000/',
    apiBaseUrl:'http://localhost:5000/api/v1'
  },
}

module.exports = nextConfig
