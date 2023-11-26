/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains:['lh3.googleusercontent.com', 'firebasestorage.googleapis.com']
  }
}



const path = require('path') 
module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}


module.exports = nextConfig