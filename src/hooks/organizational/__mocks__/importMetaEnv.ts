Object.defineProperty(global, 'import.meta', {
    value: {
      env: {
        VITE_API_BASE_URL: 'http://localhost:3000',
        VITE_API_CONTRIBUTORS_ENDPOINT: '/api/contributors',
      },
    },
  });
  