import { macroServices } from "./services/macroService";
import { macroType } from "./utils/constant";

export const fetchDataGDPByIndustry = async (dispatch) => {
  try {
    const res = await macroServices.fetchDataGDPByIndustry();
    dispatch({
      type: macroType.FETCH_DATA_GDP_BY_INDUSTRY,
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataGDPByPrice = async (dispatch) => {
  try {
    const res = await macroServices.fetchDataGDPByPrice();
    dispatch({
      type: macroType.FETCH_DATA_GDP_BY_PRICE,
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataGDPContributionRatio = async (dispatch) => {
  try {
    const res = await macroServices.fetchDataGDPContributionRatio();
    dispatch({
      type: macroType.FETCH_DATA_GDP_CONTRIBUTION_RATIO,
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataGDPGrowth = (order) => async (dispatch) => {
  try {
    const res = await macroServices.fetchDataGDPGrowth(order);
    dispatch({
      type: macroType.FETCH_DATA_GDP_GROWTH,
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataPerGDPGrowth = async (dispatch) => {
  try {
    const res = await macroServices.fetchDataPerGDPGrowth();
    dispatch({
      type: macroType.FETCH_DATA_PER_GDP_GROWTH,
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataPerCPIBySectors = async (dispatch) => {
  try {
    const res = await macroServices.fetchDataPerCPIBySectors();
    dispatch({
      type: macroType.FETCH_DATA_PER_CPI_BY_SECTORS,
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataTablePerCPIBySectors = async (dispatch) => {
  try {
    const res = await macroServices.fetchDataTablePerCPIBySectors();
    dispatch({
      type: macroType.FETCH_DATA_TABLE_PER_CPI_BY_SECTORS,
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataChangeCPISectors = (order) => async (dispatch) => {
  try {
    const res = await macroServices.fetchDataChangeCPISectors(order);
    dispatch({
      type: macroType.FETCH_DATA_CHANGE_CPI_SECTORS,
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataPerCPIMonth = async (dispatch) => {
  try {
    const res = await macroServices.fetchDataPerCPIMonth();
    dispatch({
      type: macroType.FETCH_DATA_PER_CPI_MONTH,
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataWeightedCPICommodityBasket = async (dispatch) => {
  try {
    const res = await macroServices.fetchDataWeightedCPICommodityBasket();
    dispatch({
      type: macroType.FETCH_DATA_WEIGHTED_CPI_COMMODITY_BASKET,
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataIndexIndustrialProduction =
  (industry) => async (dispatch) => {
    try {
      const res =
        await macroServices.fetchDataIndexIndustrialProduction(industry);
      dispatch({
        type: macroType.FETCH_DATA_INDEX_INDUSTRIAL_PRODUCTION,
        payload: res.data.data,
      });
    } catch (err) {
      console.error(err);
    }
  };

export const fetchDataTableIndexIndustrialProduction = async (dispatch) => {
  try {
    const res = await macroServices.fetchDataTableIndexIndustrialProduction();
    dispatch({
      type: macroType.FETCH_DATA_TABLE_INDEX_INDUSTRIAL_PRODUCTION,
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataIndexConsumptionStorage =
  (industry) => async (dispatch) => {
    try {
      const res =
        await macroServices.fetchDataIndexConsumptionStorage(industry);
      dispatch({
        type: macroType.FETCH_DATA_INDEX_CONSUMPTION_STORAGE,
        payload: res.data.data,
      });
    } catch (err) {
      console.error(err);
    }
  };

export const fetchDataIndexIndustrialProductionByIndustry =
  (industry) => async (dispatch) => {
    try {
      const res =
        await macroServices.fetchDataIndexIndustrialProductionByIndustry(
          industry,
        );
      dispatch({
        type: macroType.FETCH_DATA_INDEX_INDUSTRIAL_PRODUCTION_BY_INDUSTRY,
        payload: res.data.data,
      });
    } catch (err) {
      console.error(err);
    }
  };

export const fetchDataIndustrialProductionPrimarily =
  (industry) => async (dispatch) => {
    try {
      const res =
        await macroServices.fetchDataIndustrialProductionPrimarily(industry);
      dispatch({
        type: macroType.FETCH_DATA_INDUSTRIAL_PRODUCTION_PRIMARILY,
        payload: res.data.data,
      });
    } catch (err) {
      console.error(err);
    }
  };

export const fetchDataRetailValue = (order) => async (dispatch) => {
  try {
    const res = await macroServices.fetchDataRetailValue(order);
    dispatch({
      type: macroType.FETCH_DATA_RETAIL_VALUE,
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataRetailSalesGrowth = (order) => async (dispatch) => {
  try {
    const res = await macroServices.fetchDataRetailSalesGrowth(order);
    dispatch({
      type: macroType.FETCH_DATA_RETAIL_SALES_GROWTH,
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataTableTotalRetail = async (dispatch) => {
  try {
    const res = await macroServices.fetchDataTableTotalRetail();
    dispatch({
      type: macroType.FETCH_DATA_TABLE_TOTAL_RETAIL,
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataTotalImportExport = (order) => async (dispatch) => {
  try {
    const res = await macroServices.fetchDataTotalImportExport(order);
    dispatch({
      type: macroType.FETCH_DATA_TOTAL_IMPORT_EXPORT,
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataTableImportExportMarket = async (dispatch) => {
  try {
    const res = await macroServices.fetchDataTableImportExportMarket();
    dispatch({
      type: macroType.FETCH_DATA_TABLE_IMPORT_EXPORT_MARKET,
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataExportValue = (order) => async (dispatch) => {
  try {
    const res = await macroServices.fetchDataExportValue(order);
    dispatch({
      type: macroType.FETCH_DATA_EXPORT_VALUE,
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataImportValue = (order) => async (dispatch) => {
  try {
    const res = await macroServices.fetchDataImportValue(order);
    dispatch({
      type: macroType.FETCH_DATA_IMPORT_VALUE,
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataLaborForce = async (dispatch) => {
  try {
    const res = await macroServices.fetchDataLaborForce();
    dispatch({
      type: macroType.FETCH_DATA_LABOR_FORCE,
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataUnemploymentRate = async (dispatch) => {
  try {
    const res = await macroServices.fetchDataUnemploymentRate();
    dispatch({
      type: macroType.FETCH_DATA_UNEMPLOYMENT_RATE,
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataAverageSalary = async (dispatch) => {
  try {
    const res = await macroServices.fetchDataAverageSalary();
    dispatch({
      type: macroType.FETCH_DATA_AVERAGE_SALARY,
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataLaborRateBySector = async (dispatch) => {
  try {
    const res = await macroServices.fetchDataLaborRateBySector();
    dispatch({
      type: macroType.FETCH_DATA_LABOR_RATE_BY_SECTOR,
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataRateOfInformalEmployment = async (dispatch) => {
  try {
    const res = await macroServices.fetchDataRateOfInformalEmployment();
    dispatch({
      type: macroType.FETCH_DATA_RATE_OF_INFORMAL_EMPLOYMENT,
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataJobFluctuations = async (dispatch) => {
  try {
    const res = await macroServices.fetchDataJobFluctuations();
    dispatch({
      type: macroType.FETCH_DATA_JOB_FLUCTUATIONS,
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataChartTotalMeansOfPayment = async (dispatch) => {
  try {
    const res = await macroServices.fetchDataChartTotalMeansOfPayment();
    dispatch({
      type: macroType.FETCH_DATA_CHART_TOTAL_MEANS_OF_PAYMENT,
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataTableTotalMeansOfPayment = async (dispatch) => {
  try {
    const res = await macroServices.fetchDataTableTotalMeansOfPayment();
    dispatch({
      type: macroType.FETCH_DATA_TABLE_TOTAL_MEANS_OF_PAYMENT,
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataInternationalBalanceOfPayments = async (dispatch) => {
  try {
    const res = await macroServices.fetchDataInternationalBalanceOfPayments();
    dispatch({
      type: macroType.FETCH_DATA_INTERNATIONAL_BALANCE_OF_PAYMENTS,
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataCreditBalance = async (dispatch) => {
  try {
    const res = await macroServices.fetchDataCreditBalance();
    dispatch({
      type: macroType.FETCH_DATA_CREDIT_BALANCE,
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataCreditBalanceGrowth = async (dispatch) => {
  try {
    const res = await macroServices.fetchDataCreditBalanceGrowth();
    dispatch({
      type: macroType.FETCH_DATA_CREDIT_BALANCE_GROWTH,
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataStatisticsCreditInstitution = async (dispatch) => {
  try {
    const res = await macroServices.fetchDataStatisticsCreditInstitution();
    dispatch({
      type: macroType.FETCH_DATA_STATISTICS_CREDIT_INSTITUTION,
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataTotalInvestProjects = (order) => async (dispatch) => {
  try {
    const res = await macroServices.fetchDataTotalInvestProjects(order);
    dispatch({
      type: macroType.FETCH_DATA_TOTAL_INVEST_PROJECTS,
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataForeignInvestIndex =
  (order, type) => async (dispatch) => {
    try {
      const res = await macroServices.fetchDataForeignInvestIndex(order, type);
      dispatch({
        type: macroType.FETCH_DATA_FOREIGN_INVEST_INDEX,
        payload: res.data.data,
      });
    } catch (err) {
      console.error(err);
    }
  };

export const fetchDataTotalRegisteredAndDisbursedCapital =
  (order) => async (dispatch) => {
    try {
      const res =
        await macroServices.fetchDataTotalRegisteredAndDisbursedCapital(order);
      dispatch({
        type: macroType.FETCH_DATA_TOTAL_REGISTERED_AND_DISBURSED_CAPITAL,
        payload: res.data.data,
      });
    } catch (err) {
      console.error(err);
    }
  };

export const fetchDataAccumulatedAndTotalInvestment =
  (order) => async (dispatch) => {
    try {
      const res =
        await macroServices.fetchDataAccumulatedAndTotalInvestment(order);
      dispatch({
        type: macroType.FETCH_DATA_ACCUMULATED_AND_TOTAL_INVESTMENT,
        payload: res.data.data,
      });
    } catch (err) {
      console.error(err);
    }
  };

export const fetchDataMapImportAndExport =
  (order, type) => async (dispatch) => {
    try {
      const res = await macroServices.fetchDataMapImportAndExport(order, type);
      dispatch({
        type: macroType.FETCH_DATA_MAP_IMPORT_AND_EXPORT,

        payload: res.data.data,
      });
    } catch (err) {
      console.error(err);
    }
  };

export const fetchDataBondsIssued = async (dispatch) => {
  try {
    const res = await macroServices.fetchDataBondsIssued();
    dispatch({
      type: macroType.FETCH_DATA_BONDS_ISSUED,
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataBondInterestRate = async (dispatch) => {
  try {
    const res = await macroServices.fetchDataBondInterestRate();
    dispatch({
      type: macroType.FETCH_DATA_BONDS_INTEREST_RATE,
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataTotalOutstandingDebtAndBondInterest = async (
  dispatch,
) => {
  try {
    const res =
      await macroServices.fetchDataTotalOutstandingDebtAndBondInterest();
    dispatch({
      type: macroType.FETCH_DATA_TOTAL_OUTSTANDING_DEBT_AND_BOND_INTEREST,
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataEstimatedValueBondsDueDate = async (dispatch) => {
  try {
    const res = await macroServices.fetchDataEstimatedValueBondsDueDate();
    dispatch({
      type: macroType.FETCH_DATA_ESTIMATED_VALUE_BONDS_DUE_DATE,
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataListMaturityBonds = async (dispatch) => {
  try {
    const res = await macroServices.fetchDataListMaturityBonds();
    dispatch({
      type: macroType.FETCH_DATA_LIST_MATURITY_BONDS,
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataListOverdueBondObligation = async (dispatch) => {
  try {
    const res = await macroServices.fetchDataListOverdueBondObligation();
    dispatch({
      type: macroType.FETCH_DATA_LIST_OVERDUE_BOND_OBLIGATION,
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataDebtBalanceStructure = async (dispatch) => {
  try {
    const res = await macroServices.fetchDataDebtBalanceStructure();
    dispatch({
      type: macroType.FETCH_DATA_DEBT_BALANCE_STRUCTURE,
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataProportionOutstandingLoans = async (dispatch) => {
  try {
    const res = await macroServices.fetchDataProportionOutstandingLoans();
    dispatch({
      type: macroType.FETCH_DATA_PROPORTION_OUTSTANDING_LOANS,
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataCentralRate = async (dispatch) => {
  try {
    const res = await macroServices.fetchDataCentralRate();
    dispatch({
      type: macroType.FETCH_DATA_CENTRAL_RATE,
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataExchangeRateIndex = async (dispatch) => {
  try {
    const res = await macroServices.fetchDataExchangeRateIndex();
    dispatch({
      type: macroType.FETCH_DATA_EXCHANGE_RATE_INDEX,
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataInterestRate = async (dispatch) => {
  try {
    const res = await macroServices.fetchDataInterestRate();
    dispatch({
      type: macroType.FETCH_DATA_INTEREST_RATE,
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataExchangeRateFluctuations = (type) => async (dispatch) => {
  try {
    const res = await macroServices.fetchDataExchangeRateFluctuations(type);
    dispatch({
      type: macroType.FETCH_DATA_EXCHANGE_RATE_FLUCTUATIONS,
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataInterestRateVolatility = (type) => async (dispatch) => {
  try {
    const res = await macroServices.fetchDataInterestRateVolatility(type);
    dispatch({
      type: macroType.FETCH_DATA_INTEREST_RATE_VOLATILITY,
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};
