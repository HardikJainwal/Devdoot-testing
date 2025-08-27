module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust if you're using a different folder structure
    './public/index.html'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2C8C91',
        'primary-light': '#EAF6F6',
        accent: '#C42323',
        'accent-hover': '#A11C1C',
        background: '#F2F2F2',
        dark: '#2B2B2A',
      }
    }
  },
  plugins: []
}

