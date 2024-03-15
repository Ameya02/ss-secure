export interface RequestConfig {
    url: string;
    data?: any;
    includeApiKey?: boolean; // Add a flag to include API key in headers
    customHeaders?: Record<string, string>;
  }
  
  export const createPostRequest = ({ url, data, includeApiKey, customHeaders }: RequestConfig) => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...customHeaders,
    };
  
    if (includeApiKey) {
      const API_KEY = process.env.VIRUS_TOTAL_API_KEY;
      if (API_KEY) {
        headers['X-Apikey'] = API_KEY;
      } else {
        throw new Error('API key is missing.');
      }
    }
  
    return {
      method: 'POST',
      url,
      data,
      headers,
    };
  };
  