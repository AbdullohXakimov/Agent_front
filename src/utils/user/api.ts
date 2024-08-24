const API_BASE_URL = 'http://localhost:3000';

export async function fetchProducts() {
  const response = await fetch(`${API_BASE_URL}/products`);
  return response.json();
}

export async function fetchProduct(id: number) {
  const response = await fetch(`${API_BASE_URL}/products/${id}`);
  return response.json();
}

// Additional API functions...
