import { showToast } from "../utils/toast";
const httpRequest = async (url, method = "GET", data = null) => {
  const accessToken = localStorage.getItem("token");
  const requestOptions = {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: data ? data : undefined,
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FETCH_URL}${url}`,
      requestOptions
    );
    if (response.ok) {
      const responseData = await response.json();
      if (method !== "GET") {
        showToast("success", responseData.message);
      }
      return responseData;
    } else {
      if (response.status === 401) {
        showToast("error", "Session expired, please login again");
        localStorage.removeItem("token");
        window.location.href = "/sign-in";
      } else {
        const responseData = await response.json();
        showToast("error", responseData.message);
      }
      return null;
    }
  } catch (error) {
    return null;
  }
};

export default httpRequest;
