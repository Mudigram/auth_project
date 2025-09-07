interface ApiOptions {
  method?: string;
  body?: string;
  headers?: Record<string, string>;
}

export class ApiClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      "Content-Type": "application/json",
    };
  }

  setAuthToken(token: string | null) {
    if (token) {
      this.defaultHeaders["Authorization"] = `Bearer ${token}`;
    } else {
      delete this.defaultHeaders["Authorization"];
    }
  }

  async request<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = { ...this.defaultHeaders, ...options.headers };

    try {
      const response = await fetch(url, {
        method: options.method || "GET",
        headers,
        body: options.body ? JSON.stringify(options.body) : undefined,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API Request failed:", error);
      throw error;
    }
  }
}

export const api = new ApiClient("http://localhost:5000");
