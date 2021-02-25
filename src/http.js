/**
 * EasyHTTP Library
 * Library for making HTTP Requests
 *
 * @version 3.0.0
 * @author Brad Traversy ft. Felipe Falco
 * @license S&P
 *
 **/

class EasyHTTP {
  // GET request
  async get(url) {
    const response = await fetch(url);

    // Handles the errors and passes it on to resData instead of passing response straight (to be able to handle errors if they were possible)
    const resHandled = await EasyHTTP.handleErrors(response);
    const resData = await resHandled.json();

    return resData;
  }

  // POST request
  async post(url, data) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const resHandled = await EasyHTTP.handleErrors(response);
    const resData = await resHandled.json();
    return resData;
  }

  // PUT request
  async put(url, data) {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const resHandled = await EasyHTTP.handleErrors(response);
    const resData = await resHandled.json();
    return resData;
  }

  // DELETE request
  async delete(url) {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    });

    const resHandled = await EasyHTTP.handleErrors(response);
    const resMsg = 'Resource Deleted';
    return resMsg;
  }

  // HANDLE ERRORS static function
  static handleErrors(response) {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response;
  }
}

export const http = new EasyHTTP();
