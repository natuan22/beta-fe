import { searchService } from "./services/searchService"
import { searchType } from "./utils/constant"

export const handleDebounceSearch = (key_search) => async dispatch => {
    try {
        const res = await searchService.handleDebounceSearch(key_search)
        dispatch({
            type: searchType.DEBOUNCE_SEARCH,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}