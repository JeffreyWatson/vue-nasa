import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

const api_key = 'uxaAZaaUuTvTmH8VpfcJZN8bGspXwgoBlKA1ScfL'


class ApodService {
  async getApod() {
    const res = await api.get(`?api_key=${api_key}`)
    // logger.log('Apod', res.data)
    AppState.apod = res.data
  }


  async getApodByDate(date) {
    try {
      const res = await api.get(`?api_key=${api_key}&date=${date}`);
      AppState.apod = res.data
      logger.log('date', res.data)
    } catch (error) {
      logger.error(error)
      Pop.toast(error.message, 'error')
    }
  }
}

export const apodService = new ApodService()