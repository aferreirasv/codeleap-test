import axios from "axios";
const BASE_API_URL =
  process.env.REACT_APP_BASE_API_URL || "https://dev.codeleap.co.uk/careers/";

const createPost = (data) => {
  return axios({
    method: "post",
    url: BASE_API_URL,
    data: data,
  });
};

export { createPost };
