import { axios } from '@/lib/npm';
import CommonMessage from '@/static/commonMessage';
import NotificationService from '@/services/shared/notification.service';
import BrowserStorageService from '@/services/shared/browserStorage.service';
import keys from '@/config/keys';

const API_URL = keys.app.apiURL;

const axiosInstance = axios.create({
  baseURL: API_URL
});

axiosInstance.interceptors.request.use(
  async (config: any) => {
    try {

      config.headers['Content-Type'] = 'application/json;charset=UTF-8'
      config.headers['Access-Control-Allow-Origin'] = '*';
      config.headers['Cache-Control'] = 'no-cache'
      config.headers.Expires = '0'
      config.headers.Pragma = 'no-cache';

      return config

    } catch (error) {
      console.log("axios client error", error);
    }
  },
  (err) => Promise.reject(err)
)

axiosInstance.interceptors.response.use(
  (response) => {

    if (response?.data) {

      if (response?.data?.notificationFlag) {
        console.log("response", response.data);
        switch (response?.status) {
          case 203: NotificationService.showInfoMessage(response?.data?.message || CommonMessage.InfoOperation)
            break;

          default: NotificationService.showSuccessMessage(response?.data?.message || CommonMessage.SuccessOperation)
            break;
        }
      }

    }

    return response;
  },
  async (error) => {

    let errorMessage = "";
    if (error && error.response && error.response.status) {
      errorMessage = error.response?.data?.message;
      const { status } = error.response;
      switch (status) {
        case 400:
          {
            NotificationService.showErrorMessage(errorMessage || CommonMessage.ModelIsNotValid);
            break
          }
        case 401:
          {
            NotificationService.showErrorMessage(errorMessage || CommonMessage.Cancel);
            break
          }
        case 406:
          {
            const originalRequest = error.config;
            const locale = BrowserStorageService.getLocal('locale') || 'en';
            if (error.config && !error.config._isRetry) {
              originalRequest._isRetry = true;
              const token = await getRefreshToken()
              if (token) {
                originalRequest.headers = {
                  auth: `${token}`,
                  'Content-Type': 'application/json;charset=UTF-8',
                  'Access-Control-Allow-Origin': '*',
                  'Accept-Language': locale
                };
                return axiosInstance.request(originalRequest);
              }
            }
            NotificationService.showErrorMessage(errorMessage || CommonMessage.Cancel);
            BrowserStorageService.removeLocal('accessToken');
            BrowserStorageService.removeLocal('refreshToken');
            break
          }
        case 404:
          NotificationService.showErrorMessage(errorMessage || CommonMessage.AdressNotFound);
          break
        case 500:
          NotificationService.showErrorMessage(errorMessage || CommonMessage.ServerSideErrorHappended);
          break

        default:
          NotificationService.showErrorMessage(CommonMessage.UnknownErrorHappened);
          break
      }
    }
    else {
      if (error?.code === "ERR_CANCELED") {
        return Promise.reject(error);
      }
      NotificationService.showErrorMessage(CommonMessage.UnknownErrorHappened);
    }
    return Promise.reject(error);
  }
)

async function getRefreshToken() {
  const refreshToken = BrowserStorageService.getLocal('refreshToken');
  const jwtToken = BrowserStorageService.getLocal('accessToken');
  if (refreshToken && jwtToken) {
    //   const validateRefreshToken = new ValidateRefreshToken();
    const validateRefreshToken = {
      refreshToken: refreshToken,
      token: jwtToken
    };
    const fetchRes = await fetch(`${API_URL}/auth/getRefreshToken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validateRefreshToken),
    })
    const res = await fetchRes.json();
    if (res.result) {
      BrowserStorageService.setLocal('accessToken', res.result.token);
      BrowserStorageService.setLocal('refreshToken', res.result.refreshToken);
      return res.result.token;
    }
    else {
      BrowserStorageService.removeLocal('accessToken');
      BrowserStorageService.removeLocal('refreshToken');
      return null;
    }
  }
  return refreshToken
}

export default axiosInstance;
