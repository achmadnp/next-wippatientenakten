const { default: axios } = require("axios");

export const withHeader = async (url) => {
  axios
    .get(url, {
      headers: {
        "Ocp-Apim-Subscription-Key": "3591a8d3b11f4916a8a631f0936e4726",
      },
    })
    .then((response) => response.data);
};

export const fetcher = async (...args) => {
  const res = await fetch(...args, {
    headers: {
      "Ocp-Apim-Subscription-Key": "3591a8d3b11f4916a8a631f0936e4726",
    },
  });
  let payload;
  try {
    if (res.status === 204) return null; // 204 does not have body
    payload = await res.json();
  } catch (error) {
    throw new Error(error.message || "api call failed");
  }
  if (res.ok) {
    return payload;
  } else {
    return Promise.reject(payload.error || new Error("Fetch went wrong"));
  }
};

export const docUpload = async ({ url, body }) => {
  console.log(url, body);
  const formData = new FormData();
  formData.append("file", body.File);
  console.log(formData);
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Ocp-Apim-Subscription-Key": "3591a8d3b11f4916a8a631f0936e4726",
    },
    body: formData,
  });

  let data;

  try {
    data = await res.json();
  } catch (error) {
    throw new Error(error.message || "api post call failed");
  }

  if (res.ok) {
    return await data;
  }
};

export const postReq = async ({ url, body }) => {
  console.log(url, body);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Ocp-Apim-Subscription-Key": "3591a8d3b11f4916a8a631f0936e4726",
    },
    body: JSON.stringify(body),
  });

  let data;

  try {
    data = await res.json();
  } catch (error) {
    throw new Error(error.message || "api post call failed");
  }

  if (res.ok) {
    return await data;
  }
};

export const deleteReq = async ({ url, body }) => {
  console.log(url, body);

  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      "Ocp-Apim-Subscription-Key": "3591a8d3b11f4916a8a631f0936e4726",
    },
    body: body && JSON.stringify(body),
  });

  let data;

  if (res.ok) {
    return { success: true };
  }
};
