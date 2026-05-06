const getProducts = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

getProducts()
  .then(data => console.log(data));
