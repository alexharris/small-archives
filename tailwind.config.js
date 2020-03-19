/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '900px',
      xl: '1000px',
    },
  },    
  variants: {
    borderWidth: ['responsive', 'last', 'hover', 'focus'],
  },
  plugins: []
}
