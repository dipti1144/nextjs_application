/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images:{
        unoptimized:true,
        remotePatterns:[
          {
            protocol:"https",
            hostname:"fakestoreapi.com",
            port:"",
            pathname:"**",
          }
        ]
      }
}

module.exports = nextConfig
