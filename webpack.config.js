const path = require('path');

module.exports = (options, webpack) => {
  const lazyImports = [
    '@nestjs/microservices/microservices-module',
    '@nestjs/websockets/socket-module',
    '@nestjs/platform-express',
    '@fastify/view',
    '@nestjs/graphql',
    'apollo-server-express',
    'apollo-server-fastify',
  ];

  return {
    ...options,
    externals: {
      'bcrypt': 'commonjs bcrypt',
      'argon2': 'commonjs argon2',
      'sqlite3': 'commonjs sqlite3',
      'mysql2': 'commonjs mysql2',
      'pg': 'commonjs pg',
      'pg-native': 'commonjs pg-native',
      'oracledb': 'commonjs oracledb',
      'mssql': 'commonjs mssql',
      'mongodb': 'commonjs mongodb',
      'redis': 'commonjs redis',
    },
    plugins: [
      ...options.plugins,
      new webpack.IgnorePlugin({
        checkResource(resource) {
          if (lazyImports.includes(resource)) {
            try {
              require.resolve(resource);
            } catch (err) {
              return true;
            }
          }
          return false;
        },
      }),
    ],
    resolve: {
      ...options.resolve,
      alias: {
        ...options.resolve.alias,
        '@libs/shared': path.resolve(__dirname, 'dist/libs/shared'),
        '@libs/nestjs': path.resolve(__dirname, 'dist/libs/nestjs'),
      },
    },
  };
};