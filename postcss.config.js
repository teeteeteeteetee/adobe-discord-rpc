const tailwindcss = require('tailwindcss');

module.exports = {
    plugins: [
        'postcss-preset-env',
        tailwindcss,
    ],
};

// module.exports = {
//     plugins: [
//       require('postcss-import'),
//       require('tailwindcss'),
//       require('autoprefixer'),
//     ],
//   }