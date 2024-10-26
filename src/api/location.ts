import {AxiosResponse} from "axios";
import {apiAxios} from "@/api/callApi";

export const requestGetRegions = async (): Promise<AxiosResponse> => {
    return apiAxios({
        method: 'get',
        url: 'location/regions'
    })
}

export const requestGetWards = async (area: string): Promise<AxiosResponse> => {
    return apiAxios({
        method: 'get',
        url: `location/wards?area=${area}`
    })
}
