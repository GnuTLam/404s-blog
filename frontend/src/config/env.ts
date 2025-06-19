// Environment configuration
export const config = {
  // API Configuration
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  
  // Application Configuration
  env: process.env.REACT_APP_ENV || 'development',
  version: process.env.REACT_APP_VERSION || '1.0.0',
  appName: process.env.REACT_APP_APP_NAME || "404's Blog",
  
  // Feature Flags
  enableMockData: process.env.REACT_APP_ENABLE_MOCK_DATA === 'true' || false,
  enableAnalytics: process.env.REACT_APP_ENABLE_ANALYTICS === 'true' || false,
  enablePWA: process.env.REACT_APP_ENABLE_PWA === 'true' || false,
  
  // Performance Configuration
  postsPerPage: parseInt(process.env.REACT_APP_POSTS_PER_PAGE || '10'),
  apiTimeout: parseInt(process.env.REACT_APP_API_TIMEOUT || '10000'),
  
  // Debug Configuration
  debugMode: process.env.REACT_APP_DEBUG_MODE === 'true' || false,
  logLevel: process.env.REACT_APP_LOG_LEVEL || 'info',
  
  // Development helpers
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTesting: process.env.NODE_ENV === 'test',
} as const;

// Type for config object
export type Config = typeof config;

// Helper functions
export const getApiUrl = (endpoint: string) => `${config.apiUrl}${endpoint}`;

export const isFeatureEnabled = (feature: keyof Pick<Config, 'enableMockData' | 'enableAnalytics' | 'enablePWA'>) => {
  return config[feature];
};

export default config; 