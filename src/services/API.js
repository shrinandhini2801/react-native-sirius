import { AEM_ENDPOINT, TENANT_ENDPOINT } from '@rootConfig/apiConfig';
import { storeData } from '@services/LocalStorage';

import axios from 'axios';
const axiosConfig = {
  baseURL: `${AEM_ENDPOINT}`,
  responseType: 'json'
};
const apiInstance = axios.create(axiosConfig);

export const GetHomeAndSectionData = (path, cache) => {
  // TODO: Check if net connection
  // TODO: if connected then fetch data from web
  // TODO: if not connected then fetch data from cache if available

  if (path) {
    // console.log(`${AEM_ENDPOINT}${path}.jsonp.html`);
    console.log(path);
    return apiInstance
      .get(`${TENANT_ENDPOINT}${path}.jsonp.html`)
      .then(response => {
        if (response.data) {
          // Create or update local cache
          if (cache) {
            storeData(cache.cacheName, response.data);
          }
          return response.data;
        }
        return;
      })
      .catch(err => {
        console.log('err', err);
      });
  }
};

export const GetArticleData = (path, storyuuid) => {
  // TODO: Check net connection
  // TODO: if connected then fetch data from web
  // TODO: if not connected then fetch data from cache if available
  if (path) {
    // console.log(`${AEM_ENDPOINT}${path}.jsonp.html`);
    console.log('storyuuid ', storyuuid);
    return apiInstance
      .get(`${path}.jsonp.html`)
      .then(response => {
        if (response.data) {
          // Create or update local cache
          return response.data;
        }
        return;
      })
      .catch(err => {
        console.log('err', err);
      });
  }
};

export const GetFromURL = fullUrl => {
  if (fullUrl) {
    return axios
      .get(fullUrl)
      .then(response => {
        // TODO: proper error handling
        return response;
      })
      .catch(err => {
        console.log('err', err);
      });
  }
};
