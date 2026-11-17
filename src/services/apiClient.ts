/**
 * HyperLocal Simulated API & Network Service Layer
 * Models RESTful responses with strict HTTP status codes (200, 400, 422, 500)
 * and rich error handling payloads.
 */

export interface ApiError {
  status: number;
  message: string;
  code: string;
  fieldErrors?: Record<string, string>;
  timestamp: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
}

class ApiClient {
  private simulateNetworkLatencyMs = 300;
  public simulateServerError = false;
  public simulateNetworkDrop = false;

  private async sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Universal mock fetch handler with realistic network error simulation
   */
  public async request<T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    payload?: unknown,
    validationFn?: () => Record<string, string> | null
  ): Promise<ApiResponse<T>> {
    await this.sleep(this.simulateNetworkLatencyMs);

    // 1. Check for simulated offline / network failure
    if (this.simulateNetworkDrop) {
      const error: ApiError = {
        status: 0,
        message: 'Network connection lost. Please check your internet and retry.',
        code: 'ERR_NETWORK_DISCONNECTED',
        timestamp: new Date().toISOString()
      };
      throw error;
    }

    // 2. Check for simulated 500 Internal Server Error
    if (this.simulateServerError) {
      const error: ApiError = {
        status: 500,
        message: 'Internal Server Error: Database deadlock encountered during transaction commit.',
        code: 'ERR_DATABASE_DEADLOCK',
        timestamp: new Date().toISOString()
      };
      return { success: false, error };
    }

    // 3. Check for 422 Unprocessable Entity (Form Validation Failure)
    if (validationFn) {
      const fieldErrors = validationFn();
      if (fieldErrors && Object.keys(fieldErrors).length > 0) {
        const error: ApiError = {
          status: 422,
          message: 'The submitted payload failed validation checks.',
          code: 'ERR_VALIDATION_FAILED',
          fieldErrors,
          timestamp: new Date().toISOString()
        };
        return { success: false, error };
      }
    }

    return {
      success: true,
      data: payload as T,
      message: `${method} request to ${endpoint} succeeded.`
    };
  }
}

export const apiClient = new ApiClient();
