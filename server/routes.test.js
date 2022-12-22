const axios = require('axios');

test('get specific product route is working with product 1', () => {
  return axios.get('http://localhost:3000/products/1')
    .then((data) => {
      expect(data.data[0].id).toBe(1);
      expect(data.data[0].name).toBe("Camo Onesie");
      expect(data.data[0].slogan).toBe("Blend in to your crowd");
      expect(data.data[0].description).toBe("The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.");
      expect(data.data[0].category).toBe("Jackets");
      expect(data.data[0].default_price).toBe(140);
      expect(data.data[0].features[0].feature).toBe("Fabric");
      expect(data.data[0].features[0].value).toBe("Canvas");
    })
});

test('get specific product route is working with product 200', () => {
  return axios.get('http://localhost:3000/products/200')
    .then((data) => {
      expect(data.data[0].id).toBe(200);
      expect(data.data[0].name).toBe("Myrtice Tank Top");
      expect(data.data[0].slogan).toBe("Quaerat et hic consectetur ipsa vitae perspiciatis quia incidunt.");
      expect(data.data[0].description).toBe("Quasi incidunt at. Consectetur aut ex ad nihil quis sunt tempora nulla. Culpa est ea nisi sunt totam dolor. Impedit accusantium sed in aut quibusdam provident sed.");
      expect(data.data[0].category).toBe("Tank Top");
      expect(data.data[0].default_price).toBe(972);
      expect(data.data[0].features[0].feature).toBe("Stitching");
      expect(data.data[0].features[0].value).toBe("Cross Stitch");
    })
});

test('get related products route is working with product 1', () => {
  return axios.get('http://localhost:3000/products/1/related')
    .then((data) => {
      expect(JSON.stringify(data.data)).toBe(JSON.stringify([2, 3, 8, 7]));
    })
});

test('get related products route is working with product 44', () => {
  return axios.get('http://localhost:3000/products/44/related')
    .then((data) => {
      expect(JSON.stringify(data.data)).toBe(JSON.stringify([10, 1, 23, 31, 21, 2]));
    })
});

test('get products route is working with no parameters', () => {
  return axios.get('http://localhost:3000/products')
    .then((data) => {
      expect(data.data.length).toBe(5);
      expect(data.data[0].id).toBe(1);
      expect(data.data[4].id).toBe(5);
    })
});

test('get products route is working with parameters', () => {
  return axios.get('http://localhost:3000/products/?page=5&count=5')
    .then((data) => {
      expect(data.data.length).toBe(25);
      expect(data.data[0].id).toBe(1);
      expect(data.data[24].id).toBe(25);
    })
});

test('get product styles route is working for product 1', () => {
  return axios.get('http://localhost:3000/products/1/styles')
    .then((data) => {
      expect(data.data.results.length).toBe(6);
      expect(data.data.results[0].name).toBe("Forest Green & Black");
      expect(data.data.results[0].skus[0].id).toBe(6);
    })
});

test('get product styles route is working for product 32', () => {
  return axios.get('http://localhost:3000/products/32/styles')
    .then((data) => {
      expect(data.data.results.length).toBe(3);
      expect(data.data.results[0].name).toBe("Cyan");
      expect(data.data.results[0].skus[0].id).toBe(697);
    })
});
