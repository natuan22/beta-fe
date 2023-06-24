import { macroServices } from "./services/macroService";
import { macroType } from "./utils/constant";

export const fetchDataGDPByIndustry = async (dispatch) => {
    try {
        const res = await macroServices.fetchDataGDPByIndustry()
        dispatch({
            type: macroType.FETCH_DATA_GDP_BY_INDUSTRY,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}

export const fetchDataGDPByPrice = async (dispatch) => {
    try {
        const res = await macroServices.fetchDataGDPByPrice()
        dispatch({
            type: macroType.FETCH_DATA_GDP_BY_PRICE,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}

export const fetchDataGDPContributionRatio = async (dispatch) => {
    try {
        const res = await macroServices.fetchDataGDPContributionRatio()
        dispatch({
            type: macroType.FETCH_DATA_GDP_CONTRIBUTION_RATIO,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}

export const fetchDataGDPGrowth = (order) => async (dispatch) => {
    try {
        const res = await macroServices.fetchDataGDPGrowth(order)
        dispatch({
            type: macroType.FETCH_DATA_GDP_GROWTH,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}

export const fetchDataPerGDPGrowth = async (dispatch) => {
    try {
        const res = await macroServices.fetchDataPerGDPGrowth()
        dispatch({
            type: macroType.FETCH_DATA_PER_GDP_GROWTH,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}

export const fetchDataPerCPIBySectors = async (dispatch) => {
    try {
        const res = await macroServices.fetchDataPerCPIBySectors()
        dispatch({
            type: macroType.FETCH_DATA_PER_CPI_BY_SECTORS,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}

export const fetchDataTablePerCPIBySectors = async (dispatch) => {
    try {
        const res = await macroServices.fetchDataTablePerCPIBySectors()
        dispatch({
            type: macroType.FETCH_DATA_TABLE_PER_CPI_BY_SECTORS,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}

export const fetchDataChangeCPISectors = (order) => async (dispatch) => {
    try {
        const res = await macroServices.fetchDataChangeCPISectors(order)
        dispatch({
            type: macroType.FETCH_DATA_CHANGE_CPI_SECTORS,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}

export const fetchDataPerCPIMonth = async (dispatch) => {
    try {
        const res = await macroServices.fetchDataPerCPIMonth()
        dispatch({
            type: macroType.FETCH_DATA_PER_CPI_MONTH,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}

export const fetchDataWeightedCPICommodityBasket = async (dispatch) => {
    try {
        const res = await macroServices.fetchDataWeightedCPICommodityBasket()
        dispatch({
            type: macroType.FETCH_DATA_WEIGHTED_CPI_COMMODITY_BASKET,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}

export const fetchDataIndexIndustrialProduction = async (dispatch) => {
    try {
        const res = await macroServices.fetchDataIndexIndustrialProduction()
        dispatch({
            type: macroType.FETCH_DATA_INDEX_INDUSTRIAL_PRODUCTION,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}

export const fetchDataTableIndexIndustrialProduction = async (dispatch) => {
    try {
        const res = await macroServices.fetchDataTableIndexIndustrialProduction()
        dispatch({
            type: macroType.FETCH_DATA_TABLE_INDEX_INDUSTRIAL_PRODUCTION,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}

export const fetchDataIndexConsumptionStorage = (industry) => async (dispatch) => {
    try {
        const res = await macroServices.fetchDataIndexConsumptionStorage(industry)
        dispatch({
            type: macroType.FETCH_DATA_INDEX_CONSUMPTION_STORAGE,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}

export const fetchDataIndexIndustrialProductionByIndustry = (industry) => async (dispatch) => {
    try {
        const res = await macroServices.fetchDataIndexIndustrialProductionByIndustry(industry)
        dispatch({
            type: macroType.FETCH_DATA_INDEX_INDUSTRIAL_PRODUCTION_BY_INDUSTRY,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}

export const fetchDataIndustrialProductionPrimarily = (industry) => async (dispatch) => {
    try {
        const res = await macroServices.fetchDataIndustrialProductionPrimarily(industry)
        dispatch({
            type: macroType.FETCH_DATA_INDUSTRIAL_PRODUCTION_PRIMARILY,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}