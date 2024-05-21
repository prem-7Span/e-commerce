import { defineStore } from "pinia";
import axios from "axios";

const baseURL = "https://api.8orbit.shop/api"; // Replace with your actual base URL

export const useProductStore = defineStore("product", {
  state: () => ({
    productData: [],
    parentCategory: [],
    categoryName: [],
    minPrice: 0,
    maxPrice: 1500,
    color: [],
    size: [],
    wishlist: [], // Add wishlist state
  }),
  actions: {
    async fetchProductList() {
      try {
        if (this.productData && this.productData.length > 0) {
          return this.productData;
        }
        const response = await axios.get(`${baseURL}/v1/product`);
        this.productData = response.data.product;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    async applyFiltersAndFetch() {
      try {
        const response = await axios.get(`${baseURL}/v1/product`, {
          params: {
            categoryName: this.categoryName,
            parentCategory: this.parentCategory,
            color: this.color,
            size: this.size,
            minPrice: this.minPrice,
            maxPrice: this.maxPrice,
          },
        });
        console.log({ response });
        this.productData = response.data;
        return response.data;
      } catch (error) {
        console.error("Error applying filters and fetching products:", error);
      }
    },
    clearFilters() {
      this.categoryName = [];
      this.parentCategory = [];
      this.color = [];
      this.size = [];
      this.minPrice = 0;
      this.maxPrice = 1500;
      this.fetchProductList();
    },
    async addToWishlist(product) {
      try {
        const response = await axios.post(`${baseURL}/v1/wishlist`, {
          productId: product.id,
        });
        if (response.status === 200) {
          this.wishlist.push(product);
        } else {
          console.error("Failed to add product to wishlist");
        }
      } catch (error) {
        console.error("Error adding product to wishlist:", error);
      }
    },
    removeFromWishlist(productId) {
      this.wishlist = this.wishlist.filter(
        (product) => product.id !== productId
      );
    },
  },
  getters: {
    getProductData() {
      return this.productData;
    },
    getWishlist() {
      return this.wishlist;
    },
  },
  persist: true,
});

// In case you want to use this store in a setup function, you can provide a function to create a reactive reference
export function useProductStoreComposition() {
  const productStore = useProductStore();

  // Expose reactive references
  const productData = ref(productStore.productData);
  const selectedCategories = ref(productStore.selectedCategories);
  const selectedGender = ref(productStore.selectedGender);
  const selectedPrice = ref(productStore.selectedPrice);
  const selectedColor = ref(productStore.selectedColor);
  const selectedSize = ref(productStore.selectedSize);
  const selectedSort = ref(productStore.selectedSort);
  const wishlist = ref(productStore.wishlist);

  return {
    productData,
    selectedCategories,
    selectedGender,
    selectedPrice,
    selectedColor,
    selectedSize,
    selectedSort,
    wishlist,
    fetchProductList: productStore.fetchProductList,
    applyFiltersAndFetch: productStore.applyFiltersAndFetch,
    filterProducts: productStore.filterProducts,
    addToWishlist: productStore.addToWishlist,
    removeFromWishlist: productStore.removeFromWishlist,
  };
}