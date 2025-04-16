import {
  getCategoryFilterProduct,
  getCategoryOption,
  getProductlist,
} from "@/services/redux/slices/productSlice";
import { AppDispatch, RootState } from "@/services/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "./pagination";
import ProductCard from "./productsCard";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

type Category = string;

const ProductList = () => {
  //---------------------useSelectors--------------------------
  const productListResponse = useSelector(
    (state: RootState) => state.Product.productListResponse as Product[]
  );

  const productListLoading = useSelector(
    (state: RootState) => state.Product.productListLoading as boolean
  );

  const categoryOptions = useSelector(
    (state: RootState) => state.Product.categoryOptions as []
  );

  //-------------------------------redux store-------------------------
  const dispatch = useDispatch<AppDispatch>();

  //----------------------useState------------------------------
  //paginatedData
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [limit, setLimit] = useState(10); // Items per page
  const [total, setTotal] = useState(0); // Total number of items
  const [paginatedData, setPaginatedData] = useState<Product[]>(); // Paginated subset of products
  const [products, setProducts] = useState<Product[]>(); // Full list of products (may be filtered)
  const [filterOpen, setFilterOpen] = useState(false); // Controls visibility of category filter
  const [categories, setCategories] = useState<Category[]>();

  //category
  const [selectedCategories, setSelectedCategories] = useState("");

  //------------------------functions---------------------------------

  //fetch all products
  const fetchProduct = () => {
    dispatch(getProductlist({ endPoint: "/products" }));
    dispatch(getCategoryOption({ endPoint: "/products/categories" }));
  };

  // Slice the products list to show only current page data
  const pagination = (productsList: Product[]) => {
    const startIndex = (currentPage - 1) * limit;
    let displayedProducts: Product[];
    if (productsList?.length > 0) {
      displayedProducts = productsList?.slice(startIndex, startIndex + limit);
      setPaginatedData(displayedProducts);
    }
  };

  // Handle sort option changes (price/title ascending/descending)
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(1);
    const sortby = e.target.value;
    const sorted = [...(products || [])];
    switch (sortby) {
      case "priceLowHigh":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "priceHighLow":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "titleAZ":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "titleZA":
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    setProducts(sorted);
    pagination(sorted);
  };
  // Toggle category filter visibility or reset product list
  const handleOpenFilter = () => {
    if (filterOpen) {
      setCurrentPage(1);
      dispatch(getProductlist({ endPoint: "/products" }));
    }
    setFilterOpen(!filterOpen);
  };

  // Filter products by selected category
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setSelectedCategories(selected);
    setCurrentPage(1);

    dispatch(
      getCategoryFilterProduct({ endPoint: `/products/category/${selected}` })
    );
  };

  //----------------------useEffect------------------------------

  // When page or limit changes, re-paginate
  useEffect(() => {
    fetchProduct();
  }, [limit, currentPage]);

  useEffect(() => {
    if (productListResponse) {
      setTotal(productListResponse?.length);
      setProducts(productListResponse);

      pagination(productListResponse);
    }
    if (categoryOptions) {
      setCategories(categoryOptions);
    }
  }, [productListResponse, categoryOptions]);
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 mx-4">
        <select
          onChange={handleSortChange}
          className="appearance-none rounded-full border border-gray-300 bg-white px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500"
        >
          <option value="priceLowHigh" className="h-[20px]">
            Price: Low → High
          </option>
          <option value="priceHighLow">Price: High → Low</option>
          <option value="titleAZ">Title: A–Z</option>
          <option value="titleZA">Title: Z–A</option>
        </select>
        {/* Filter Button */}
        <div className="relative">
          <button
            onClick={handleOpenFilter}
            className="rounded-full bg-blue-600 text-white px-4 py-2 text-sm hover:bg-blue-700"
          >
            {filterOpen ? "Reset Filter" : "Filter by Category"}
          </button>

          {/* Dropdown */}
          {filterOpen && (
            <select
              onChange={handleCategoryChange}
              value={selectedCategories}
              className="appearance-none rounded-full border border-gray-300 bg-white px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              {categories?.map((category: string) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {productListLoading ? (
        <div>Loading</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {paginatedData?.map((item) => {
            return (
              <div key={item.id}>
                <ProductCard item={item} key={item.id} />
              </div>
            );
          })}
        </div>
      )}
      <Pagination
        totalItems={total}
        limit={limit}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setLimit}
      />
    </div>
  );
};
export default ProductList;
