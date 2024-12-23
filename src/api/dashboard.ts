import {apiAxios} from "@/api/callApi";

export const requestRevenue = (groupBy: string) => {
    return apiAxios({
        method: 'get',
        url: 'user-dashboard/revenue',
        params: { groupBy } 
    })
}

export const requestExpenses = (groupBy: string) => {
    return apiAxios({
        method: 'get',
        url: 'user-dashboard/expenses',
        params: { groupBy } 
    })
}

export const requestRatings = () => {
    return apiAxios({
        method: 'get',
        url: 'user-dashboard/ratings',
    })
}

export const requestOrdersStatus = () => {
    return apiAxios({
        method: 'get',
        url: 'user-dashboard/orders-status',
    })
}
