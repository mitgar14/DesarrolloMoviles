const createPost = async (data) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return await response.json();
};

createPost(
  {
    title: 'Nuevo post',
    body: 'Contenido del post',
    userId: 1
  }
).then(data => console.log('POST:', data));
