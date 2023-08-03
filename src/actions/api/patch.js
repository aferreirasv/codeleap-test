import axios from "axios";
const BASE_API_URL =
  process.env.REACT_APP_BASE_API_URL || "https://dev.codeleap.co.uk/careers/";

const patchPost = (id, data) => {
  return axios({
    method: "patch",
    url: BASE_API_URL + `${id}/`,
    data: data,
  });
};

export { patchPost };
