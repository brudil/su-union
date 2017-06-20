module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        // fallback: 'style-loader',
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.svg|\.png|\.woff|\.json/,
        use: 'url-loader?limit=10000',
      },
    ],
  },
};
