import { https } from "../../../services/config";

export const stockService = {
  fetchDataInfoHeader: (stock, type) => {
    return https.get("api/v1/shares/header", {
      params: {
        stock,
        type,
      },
    });
  },
  fetchDataTableTransactionStatistics: (stock) => {
    return https.get("api/v1/shares/thong-ke-giao-dich", {
      params: {
        stock,
      },
    });
  },
  fetchDataBusinessResults: (stock, order, type) => {
    return https.get("api/v1/shares/ket-qua-kinh-doanh", {
      params: {
        stock,
        order,
        type,
      },
    });
  },
  fetchDataBalanceSheet: (stock, order, type) => {
    return https.get("api/v1/shares/can-doi-ke-toan", {
      params: {
        stock,
        order,
        type,
      },
    });
  },
  fetchDataCashFlow: (stock, order, type) => {
    return https.get("api/v1/shares/luu-chuyen-tien-te", {
      params: {
        stock,
        order,
        type,
      },
    });
  },
  fetchDataSameIndustry: (stock, exchange) => {
    return https.get("api/v1/shares/doanh-nghiep-cung-nganh", {
      params: {
        stock,
        exchange,
      },
    });
  },
  fetchDataEvents: (stock) => {
    return https.get("api/v1/shares/lich-su-kien", {
      params: {
        stock,
      },
    });
  },
  fetchDataFinancialIndicators: (stock, order, type) => {
    return https.get("api/v1/shares/chi-so-tai-chinh", {
      params: {
        stock,
        order,
        type,
      },
    });
  },
  fetchDataTransactionData: (stock, from, to) => {
    return https.get("api/v1/shares/du-lieu-giao-dich", {
      params: {
        stock,
        from,
        to,
      },
    });
  },
  fetchDataTradingPriceFluctuations: (stock) => {
    return https.get("api/v1/shares/bien-dong-gia-giao-dich", {
      params: {
        stock,
      },
    });
  },
  fetchDataAverageTradingVolume: (stock) => {
    return https.get("api/v1/shares/khoi-luong-giao-dich-binh-quan-ngay", {
      params: {
        stock,
      },
    });
  },
  fetchDataStatisticsByMonth: (stock) => {
    return https.get("api/v1/shares/thong-ke-theo-cac-thang-quy-nam", {
      params: {
        stock,
        order: 2,
      },
    });
  },
  fetchDataStatisticsByQuarter: (stock) => {
    return https.get("api/v1/shares/thong-ke-theo-cac-thang-quy-nam", {
      params: {
        stock,
        order: 0,
      },
    });
  },
  fetchDataStatisticsByYear: (stock) => {
    return https.get("api/v1/shares/thong-ke-theo-cac-thang-quy-nam", {
      params: {
        stock,
        order: 1,
      },
    });
  },
  fetchDataTradingInvestors: (stock) => {
    return https.get("api/v1/shares/giao-dich-cac-nhom-nha-dau-tu", {
      params: {
        stock,
      },
    });
  },
  fetchDataNewsAndEvents: (stock, type) => {
    return https.get("api/v1/shares/chi-tiet-lich-su-kien", {
      params: {
        stock,
        type,
      },
    });
  },
  fetchDataNews: (stock, type) => {
    return https.get("api/v1/shares/tin-tuc", {
      params: {
        stock,
        type,
      },
    });
  },
  fetchDataTableStatementsCashFlows: (stock, order) => {
    return https.get("api/v1/shares/chi-tiet-luu-chuyen-tien-te", {
      params: {
        stock,
        order,
        is_chart: 0,
      },
    });
  },
  fetchDataChartStatementsCashFlows: (stock, order) => {
    return https.get("api/v1/shares/chi-tiet-luu-chuyen-tien-te", {
      params: {
        stock,
        order,
        is_chart: 1,
      },
    });
  },
  fetchDataCandleChart: (stock) => {
    return https.get("api/v1/shares/chart-nen", {
      params: {
        stock,
      },
    });
  },
  fetchDataTableBusinessReport: (stock, order) => {
    return https.get("api/v1/shares/chi-tiet-ket-qua-kinh-doanh", {
      params: {
        stock,
        order,
        is_chart: 0,
      },
    });
  },
  fetchDataChartBusinessReport: (stock, order) => {
    return https.get("api/v1/shares/chi-tiet-ket-qua-kinh-doanh", {
      params: {
        stock,
        order,
        is_chart: 1,
      },
    });
  },
  fetchDataTableBalanceSheet: (stock, order) => {
    return https.get("api/v1/shares/chi-tiet-can-doi-ke-toan", {
      params: {
        stock,
        order,
        is_chart: 0,
      },
    });
  },
  fetchDataChartBalanceSheet: (stock, order) => {
    return https.get("api/v1/shares/chi-tiet-can-doi-ke-toan", {
      params: {
        stock,
        order,
        is_chart: 1,
      },
    });
  },
  fetchDataChartPieBalanceSheet: (stock, order) => {
    return https.get("api/v1/shares/chi-tiet-can-doi-ke-toan-chart-tron", {
      params: {
        stock,
        order,
      },
    });
  },
  fetchDataTableFinancialIndicators: (stock, order) => {
    return https.get("api/v1/shares/chi-tiet-chi-so-tai-chinh", {
      params: {
        stock,
        order,
        is_chart: 0,
      },
    });
  },
  fetchDataChartFinancialIndicators: (stock, order) => {
    return https.get("api/v1/shares/chi-tiet-chi-so-tai-chinh", {
      params: {
        stock,
        order,
        is_chart: 1,
      },
    });
  },
  fetchDataFinancialHealthAnalysis: (stock) => {
    return https.get("api/v1/shares/rating-suc-khoe-tai-chinh", {
      params: {
        stock,
      },
    });
  },
  fetchDataBussinessAnalysis: (stock) => {
    return https.get("api/v1/shares/rating-nganh-nghe-kinh-doanh", {
      params: {
        stock,
      },
    });
  },
  fetchDataBusinessPosition: (stock) => {
    return https.get("api/v1/shares/rating-vi-the-doanh-nghiep", {
      params: {
        stock,
      },
    });
  },
  fetchDataBasicPrice: (stock) => {
    return https.get("api/v1/shares/rating-dinh-gia", {
      params: {
        stock,
      },
    });
  },
  fetchDataTechnicalAnalysis: (stock) => {
    return https.get("api/v1/shares/rating-ky-thuat", {
      params: {
        stock,
      },
    });
  },
  fetchDataIndividualInvestorBenefits: (stock) => {
    return https.get("api/v1/shares/rating-quyen-loi-ndt-ca-nhan", {
      params: {
        stock,
      },
    });
  },
  fetchDataRatingHeader: (stock) => {
    return https.get("api/v1/shares/rating-header", {
      params: {
        stock,
      },
    });
  },
  fetchDataFilterCanslim: (stock) => {
    return https.get("api/v1/shares/chuan-loc-canslim", {
      params: {
        stock,
      },
    });
  },
};
