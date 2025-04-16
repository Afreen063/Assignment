import { getRequest } from "@/services/api/fakeApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getProductlist = createAsyncThunk(
  "/ProductList",
  async ({ endPoint, data }: { endPoint: string; data?: any }) => {
    let response: any;
    try {
      response = await getRequest(endPoint, data);
    } catch (error: any) {
      return error?.response?.data;
    }

    return response?.data;
  }
);

export const getCategoryOption = createAsyncThunk(
  "/categoryOptions",
  async ({ endPoint, data }: { endPoint: string; data?: any }) => {
    let response: any;
    try {
      response = await getRequest(endPoint, data);
    } catch (error: any) {
      return error?.response?.data;
    }

    return response?.data;
  }
);

export const getCategoryFilterProduct = createAsyncThunk(
  "/categoryFilterProduct",
  async ({ endPoint, data }: { endPoint: string; data?: any }) => {
    let response: any;
    try {
      response = await getRequest(endPoint, data);
    } catch (error: any) {
      return error?.response?.data;
    }

    return response?.data;
  }
);

type productType = {
  productListResponse: Record<string, any>[];
  categoryOptions: Record<string, any>[];

  //LOADERS
  productListLoading: boolean;
};
const initialState: productType = {
  productListResponse: [],
  categoryOptions: [],

  //LOADERS
  productListLoading: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSelectetProduct: (state: any, action: any) => {
      state.selectedProduct = action.payload;
    },
  },
  extraReducers: (builder: any) => {
    //Add products
    builder.addCase(getProductlist.pending, (state: any) => {
      state.productlistLoading = true;
    });
    builder.addCase(getProductlist.fulfilled, (state: any, action: any) => {
      const data: any = action.payload;

      state.productListLoading = false;

      state.productListResponse = data;
    });
    builder.addCase(getProductlist.rejected, (state: any) => {
      state.purchaseProductLoading = false;
    });

    //category options
    builder.addCase(getCategoryOption.fulfilled, (state: any, action: any) => {
      const data: any = action.payload;

      state.categoryOptions = data;
    });

    //categoryFilterProduct
    builder.addCase(getCategoryFilterProduct.pending, (state: any) => {
      state.productlistLoading = true;
    });
    builder.addCase(
      getCategoryFilterProduct.fulfilled,
      (state: any, action: any) => {
        const data: any = action.payload;

        state.productListLoading = false;

        state.productListResponse = data;
      }
    );
    builder.addCase(getCategoryFilterProduct.rejected, (state: any) => {
      state.purchaseProductLoading = false;
    });
  },
});

export const productActions = productSlice.actions;
export default productSlice;
