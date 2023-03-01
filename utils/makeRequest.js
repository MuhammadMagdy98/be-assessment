const axios = require("axios");
const updateReport = require("./updateReport");

const makeRequest = (check) => {
  const instance = axios.create();

  instance.interceptors.request.use(
    (config) => {
      config.metadata = { startTime: new Date() };
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      const responseTime = new Date() - response.config.metadata.startTime;

      response.responseTime = responseTime;

      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return setInterval(async () => {
    let response;
    try {
      // we need to use var to access the variable in the catch
      response = await instance({ url: check.url, method: "get", timeout: check.timeout });
      console.log("fetching ", check.url);

      if (response.status >= 200 && response.status < 300) {
        updateReport({
          status: "up",
          responseTime: response.responseTime,
          check,
        });
      } else {
        console.log("down");
        console.log("down else");
        updateReport({
          status: "down",
          responseTime: 0,
          check,
        });
      }
    } catch (err) {
      console.log("down");
      updateReport({
        status: "down",
        responseTime: 0,
        check,
      });
    }
  }, check.interval);
};

module.exports = makeRequest;
