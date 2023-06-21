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