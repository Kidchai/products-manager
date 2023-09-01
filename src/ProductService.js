import http from "./http-common";

class ProductDataService {
    getProducts() {
    return http.get('http://localhost:4000/getProducts');
  }

  createProduct(product) {
    return http.post('http://localhost:4000/addProduct', product);
  }

  getProductById(id){
    return http.delete(`http://localhost:4000/getProducts/${id}`);
  }

  deleteProduct(id) {
    return http.delete(`http://localhost:4000/getProducts/${id}`);
  }

}

export default new ProductDataService();
