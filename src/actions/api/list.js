import axios from "axios";
const BASE_API_URL =
  process.env.REACT_APP_BASE_API_URL || "https://dev.codeleap.co.uk/careers/";
const perPage = 10;

const listPosts = () => {
  return axios({
    method: "get",
    url: BASE_API_URL,
    params: {
      per_page: perPage,
      page: 1,
    },
  });
};

const loadPage = (page) => {
  return axios({
    method: "get",
    url: page,
  });
};

const listMyPosts = (page, username) => {
  return axios({
    method: "get",
    url: BASE_API_URL,
    params: {
      per_page: 10,
      page: page,
      username: username,
    },
  });
};

export { listPosts, listMyPosts, loadPage };
