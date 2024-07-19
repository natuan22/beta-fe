import https from "../../../services/config";

export const analysisCenterService = {
  fetchDataAnalysisCenter: (type) => {
    return https.get("api/v1/analysis/analysis-report", {
      params: {
        type,
      },
    });
  },
};
