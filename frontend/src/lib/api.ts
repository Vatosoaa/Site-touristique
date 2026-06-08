const API_BASE_URL = "http://localhost:5000/api"

class ApiClient {
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    }
    const token = localStorage.getItem("admin_token")
    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }
    return headers
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `Request failed with status ${response.status}`)
    }
    return response.json() as Promise<T>
  }

  // --- Auth API ---
  async login(username: string, password: string): Promise<{ token: string; admin: { username: string } }> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
    const data = await this.handleResponse<{ token: string; admin: { username: string } }>(response)
    localStorage.setItem("admin_token", data.token)
    localStorage.setItem("admin_username", data.admin.username)
    return data
  }

  logout() {
    localStorage.removeItem("admin_token")
    localStorage.removeItem("admin_username")
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem("admin_token")
  }

  async getMe(): Promise<{ id: string; username: string }> {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: this.getHeaders(),
    })
    return this.handleResponse<{ id: string; username: string }>(response)
  }

  // --- Tours API ---
  async getTours(): Promise<any[]> {
    const response = await fetch(`${API_BASE_URL}/tours`)
    return this.handleResponse<any[]>(response)
  }

  async getTour(id: number): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/tours/${id}`)
    return this.handleResponse<any>(response)
  }

  async createTour(tour: any): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/tours`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(tour),
    })
    return this.handleResponse<any>(response)
  }

  async updateTour(id: number, tour: any): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/tours/${id}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify(tour),
    })
    return this.handleResponse<any>(response)
  }

  async deleteTour(id: number): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/tours/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    })
    return this.handleResponse<any>(response)
  }

  // --- Packages API ---
  async getPackages(): Promise<any[]> {
    const response = await fetch(`${API_BASE_URL}/packages`)
    return this.handleResponse<any[]>(response)
  }

  async getPackage(id: number): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/packages/${id}`)
    return this.handleResponse<any>(response)
  }

  async createPackage(pkg: any): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/packages`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(pkg),
    })
    return this.handleResponse<any>(response)
  }

  async updatePackage(id: number, pkg: any): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/packages/${id}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify(pkg),
    })
    return this.handleResponse<any>(response)
  }

  async deletePackage(id: number): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/packages/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    })
    return this.handleResponse<any>(response)
  }

  // --- Blog API ---
  async getBlogPosts(): Promise<any[]> {
    const response = await fetch(`${API_BASE_URL}/blog`)
    return this.handleResponse<any[]>(response)
  }

  async getBlogPost(id: number): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/blog/${id}`)
    return this.handleResponse<any>(response)
  }

  async createBlogPost(post: any): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/blog`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(post),
    })
    return this.handleResponse<any>(response)
  }

  async updateBlogPost(id: number, post: any): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/blog/${id}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify(post),
    })
    return this.handleResponse<any>(response)
  }

  async deleteBlogPost(id: number): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/blog/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    })
    return this.handleResponse<any>(response)
  }

  // --- Messages API ---
  async submitMessage(name: string, email: string, message: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    })
    return this.handleResponse<any>(response)
  }

  async getMessages(): Promise<any[]> {
    const response = await fetch(`${API_BASE_URL}/messages`, {
      headers: this.getHeaders(),
    })
    return this.handleResponse<any[]>(response)
  }

  async deleteMessage(id: number): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/messages/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    })
    return this.handleResponse<any>(response)
  }

  // --- Employees API ---
  async getEmployees(): Promise<any[]> {
    const response = await fetch(`${API_BASE_URL}/employees`, {
      headers: this.getHeaders(),
    })
    return this.handleResponse<any[]>(response)
  }

  async getEmployee(id: number): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
      headers: this.getHeaders(),
    })
    return this.handleResponse<any>(response)
  }

  async createEmployee(employee: any): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/employees`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(employee),
    })
    return this.handleResponse<any>(response)
  }

  async updateEmployee(id: number, employee: any): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify(employee),
    })
    return this.handleResponse<any>(response)
  }

  async deleteEmployee(id: number): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    })
    return this.handleResponse<any>(response)
  }

  // --- Roles API ---
  async getRoles(): Promise<any[]> {
    const response = await fetch(`${API_BASE_URL}/roles`, {
      headers: this.getHeaders(),
    })
    return this.handleResponse<any[]>(response)
  }

  async getRole(id: number): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/roles/${id}`, {
      headers: this.getHeaders(),
    })
    return this.handleResponse<any>(response)
  }

  async createRole(role: any): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/roles`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(role),
    })
    return this.handleResponse<any>(response)
  }

  async updateRole(id: number, role: any): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/roles/${id}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify(role),
    })
    return this.handleResponse<any>(response)
  }

  async deleteRole(id: number): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/roles/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    })
    return this.handleResponse<any>(response)
  }

  // --- Tasks API ---
  async getTasks(): Promise<any[]> {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      headers: this.getHeaders(),
    })
    return this.handleResponse<any[]>(response)
  }

  async createTask(task: any): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(task),
    })
    return this.handleResponse<any>(response)
  }

  async updateTask(id: number, task: any): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify(task),
    })
    return this.handleResponse<any>(response)
  }

  async deleteTask(id: number): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    })
    return this.handleResponse<any>(response)
  }

  // --- Services API ---
  async getServices(): Promise<any[]> {
    const response = await fetch(`${API_BASE_URL}/services`)
    return this.handleResponse<any[]>(response)
  }

  async createService(service: any): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/services`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(service),
    })
    return this.handleResponse<any>(response)
  }

  async updateService(id: number, service: any): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/services/${id}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify(service),
    })
    return this.handleResponse<any>(response)
  }

  async deleteService(id: number): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/services/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    })
    return this.handleResponse<any>(response)
  }

  async uploadServiceImage(fileName: string, dataUrl: string): Promise<{ image: string }> {
    const response = await fetch(`${API_BASE_URL}/uploads/service-image`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ fileName, dataUrl }),
    })
    return this.handleResponse<{ image: string }>(response)
  }

  // --- Testimonials API ---
  async getTemoignages(): Promise<any[]> {
    const response = await fetch(`${API_BASE_URL}/temoignages`)
    return this.handleResponse<any[]>(response)
  }

  async createTemoignage(temoignage: any): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/temoignages`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(temoignage),
    })
    return this.handleResponse<any>(response)
  }

  async updateTemoignage(id: number, temoignage: any): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/temoignages/${id}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify(temoignage),
    })
    return this.handleResponse<any>(response)
  }

  async deleteTemoignage(id: number): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/temoignages/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    })
    return this.handleResponse<any>(response)
  }
}

export const api = new ApiClient()

