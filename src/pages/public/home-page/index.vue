
<template>
  <div id="main-parent" class="">
    <router-link :to="{ name: 'list' }">
      <div id="banner" class="">
        <!-- <img src="/home-page/homepage-banner.png" alt="banner" /> -->
        <CarousalBanner />
      </div>
    </router-link>
    <div class="container">
      <div class="sm:py-9">
        <div class="py-5 text-3xl">
          <h3>Shop By Category</h3>
        </div>

        <div
          id="category"
          class="flex space-x-1 overflow-hidden md:space-x-3 bg-primary-offBlack rounded-3xl"
        >
          <router-link
            :to="{ name: 'products', query: { Categories: 'Pants' } }"
            @click.prevent="filterByCategory('Pants')"
          >
            <div class="relative items-end bg-overlay">
              <img
                src="/home-page/category-img-1.png"
                alt="card-1"
                class="h-100%"
              />
              <div class="absolute z-20 space-y-3 bottom-10 left-5">
                <h2 class="text-base text-white sm:text-5xl">Pants</h2>
                <p class="text-xs text-white sm:text-2xl">Shop Now</p>
              </div>
            </div>
          </router-link>
          <div class="items-end space-y-1 md:space-y-3">
            <router-link
              :to="{ name: 'products', query: { Categories: 'trousers' } }"
              @click.prevent="filterByCategory('trousers')"
            >
              <div class="relative bg-overlay">
                <img src="/home-page/category-img-2.png" alt="card-2" />
                <div class="absolute z-20 space-y-3 bottom-10 left-5">
                  <h2 class="text-base text-white sm:text-5xl">Trouser</h2>
                  <p class="text-xs text-white sm:text-2xl">Shop Now</p>
                </div>
              </div>
            </router-link>
            <div class="items-end space-y-1 md:space-y-3">
              <router-link
                :to="{ name: 'products', query: { Categories: 't-shirt' } }"
                @click.prevent="filterByCategory('t-shirt')"
              >
                <div class="relative bg-overlay">
                  <img src="/home-page/category-img-3.png" alt="card-3" />
                  <div class="absolute z-20 space-y-3 bottom-10 left-5">
                    <h2 class="text-base text-white sm:text-5xl">T-shirt</h2>
                    <p class="text-xs text-white sm:text-2xl">Shop Now</p>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <div class="sm:pt-9">
        <div class="py-5 text-3xl">
          <h3>Deal of the day</h3>
        </div>

        <div
          id="category"
          class="flex space-x-1 overflow-hidden md:space-x-3 bg-primary-offBlack rounded-3xl"
        >
          <div id="col-1" class="space-y-1 md:space-y-3">
            <router-link
              :to="{ name: 'products', query: { Discount: '20' } }"
              @click.prevent="filterByDiscount('20')"
            >
              <div class="relative bg-overlay">
                <img src="/home-page/deals-img-1.png" alt="card-1" />
                <div class="absolute z-20 space-y-3 bottom-10 left-5">
                  <h2 class="text-base text-white sm:text-5xl">UPTO 20% OFF</h2>
                  <p class="text-xs text-white sm:text-2xl">Explore more</p>
                </div>
              </div>
            </router-link>
            <div>
              <router-link
                :to="{ name: 'products', query: { Discount: '60' } }"
                @click.prevent="filterByDiscount('60')"
              >
                <div class="relative bg-overlay">
                  <img src="/home-page/deals-img-2.png" alt="card-1" />
                  <div class="absolute z-20 space-y-3 bottom-10 left-5">
                    <h2 class="text-base text-white sm:text-5xl">
                      UPTO 60% OFF
                    </h2>
                    <p class="text-xs text-white sm:text-2xl">Explore more</p>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
          <div id="col-2" class="pt-5 space-y-1 md:space-y-3 md:pt-16">
            <router-link
              :to="{ name: 'products', query: { Discount: '40' } }"
              @click.prevent="filterByDiscount('40')"
            >
              <div class="relative bg-overlay">
                <img src="/home-page/deals-img-3.png" alt="card-2" />
                <div class="absolute z-20 space-y-3 bottom-10 left-5">
                  <h2 class="text-base text-white sm:text-5xl">UPTO 40% OFF</h2>
                  <p class="text-xs text-white sm:text-2xl">Explore more</p>
                </div>
              </div>
            </router-link>
            <div>
              <router-link
                :to="{ name: 'products', query: { Discount: '80' } }"
                @click.prevent="filterByDiscount('80')"
              >
                <div class="relative bg-overlay">
                  <img src="/home-page/deals-img-4.png" alt="card-3" />
                  <div class="absolute z-20 space-y-3 bottom-10 left-5">
                    <h2 class="text-base text-white sm:text-5xl">
                      UPTO 80% OFF
                    </h2>
                    <p class="text-xs text-white sm:text-2xl">Explore more</p>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <div class="md:pt-14">
        <div class="py-5 text-3xl">New Arrivals</div>
        <div id="parent-card">
          <div
            class="grid grid-cols-2 grid-rows-2 gap-5 md:gap-8 md:grid-cols-4 md:grid-rows-1"
          >
            <ProductCard
              v-for="(product, index) in productData"
              :key="index"
              :product="product"
            />
          </div>
        </div>
      </div>
      <div class="md:pt-14">
        <div class="py-4 text-3xl">
          <h2 class="text-3xl">Highlights</h2>
        </div>
        <div
          class="flex flex-col items-center justify-between space-x-5 sm:flex-row bg-gray-50"
        >
          <div class="w-full sm:order-2" style="position: relative">
            <a
              href="https://youtu.be/vUIUFhOLwSg?si=MrXp5To4JBHloBap"
              target="_blank"
            >
              <img
                src="https://img.youtube.com/vi/vUIUFhOLwSg/hqdefault.jpg"
                alt="Video Thumbnail"
              />
              <div
                style="
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="72"
                  height="72"
                  fill="white"
                >
                  <path d="M8 5v14l11-7z" />
                  <path d="M0 0h24v24H0z" fill="none" />
                </svg>
              </div>
            </a>
          </div>
          <div class="pt-3 text-xs md:text-lg md:max-w-5xl">
            <p class="px-3">
              Fashion brands cater to various price points, from mass-market
              options at retailers like Walmart and Target to luxury garments at
              high-end stores such as Neiman Marcus and Bloomingdale's. Haute
              couture, meaning "high fashion" in French, exemplifies the
              pinnacle of high-end fashion. It involves the creation of
              custom-fitted clothing made from premium fabrics, crafted with
              meticulous attention to detail by skilled artisans. Haute couture
              represents both the exclusive designs and the prestigious fashion
              houses that produce them.
            </p>
          </div>
        </div>
      </div>

      <div class="md:py-14">
        <div class="py-4 text-xl">
          <h2 class="text-3xl">Check us out on Instagram</h2>
        </div>
        <div class="flex items-center justify-between space-x-3">
          <div><img src="/home-page/instagram-img-1.png" alt="" /></div>
          <div><img src="/home-page/instagram-img-2.png" alt="" /></div>
          <div><img src="/home-page/instagram-img-3.png" alt="" /></div>
          <div><img src="/home-page/instagram-img-4.png" alt="" /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import CarousalBanner from "@/components/home-page/carousal-banner.vue";
import CarousalReview from "@/components/home-page/carousal-review.vue";
import ProductCard from "@/components/card/product-card.vue";
import { useProductStore } from "/src/store/product.js";

const productStore = useProductStore();
const productData = ref([]);

const filterByCategory = async (Categories) => {
  productStore.categoryName = [Categories];
  await productStore.applyFiltersAndFetch();
  window.location.href = `/products?Categories=${Categories}`;
};

const filterByDiscount = async (discount) => {
  productStore.discount = [discount];
  await productStore.applyFiltersAndFetch();
  window.location.href = `/products?discount=${discount}`;
};

// const filterByGender = async (gender) => {
//       productStore.parentCategory = [gender];
//       await productStore.applyFiltersAndFetch();
//       window.location.href = `/products?gender=${gender}`;
//     };

// console.log("sppp",filterByCategory);

onMounted(async () => {
  await productStore.fetchProductList();
  productData.value = productStore.productData.slice(0, 4);
});
onMounted(() => {
  window.scrollTo(0, 0);
});
</script>
