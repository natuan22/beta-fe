import { https } from "../../../services/config";

export const investToolService = {
  fetchRangeMinMax: () => {
    return https.get("/api/v1/investment/key-filter");
  },
  fetchDataStockFilter: (formData) => {
    return https.post("/api/v1/investment/filter", formData);
  },
  fetchStockList: (stock) => {
    return https.get("/api/v1/investment/search", {
      params: {
        stock,
      },
    });
  },
  fetchDataInvestSimulation: (formData) => {
    return https.post("/api/v1/investment/emulator", formData);
  },
  fetchDataCateInvestKnowledge: () => {
    return https.get("/api/v1/blogs-user/category");
  },
  fetchDataListPosts: (categories, tags) => {
    const params = {};
    if (categories && categories !== "all") params.categories = categories;
    if (tags) params.tags = tags;

    return https.get("/api/v1/blogs-user/post", { params });
  },
};
