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
};
