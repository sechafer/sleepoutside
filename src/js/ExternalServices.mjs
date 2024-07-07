const baseURL = import.meta.env.VITE_SERVER_URL;


async function convertToJson(res) {
  const jsonResponse = await res.json()
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: "servicesError", message: jsonResponse};
  }
}

export default class ExternalServices {
  constructor(category) {
    // this.category = category;
    // this.path = `../json/${this.category}.json`;
  }
  async getData(category) {
    const res = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(res);
    return data.Result;
  }
  async findProductById(id) {
    const res = await fetch(baseURL + `product/${id}`);
    const data = await convertToJson(res);
    return data.Result;
  }
  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(baseURL + "checkout/", options).then(convertToJson);
  }
}