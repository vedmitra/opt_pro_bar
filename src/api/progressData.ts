import { handleResponse, handleError, baseUrl } from "./apiUtils";

export function getProgressData() {
  const apiUrl = baseUrl + "/progress-stack/";
  return fetch(apiUrl).then(handleResponse).catch(handleError);
}
