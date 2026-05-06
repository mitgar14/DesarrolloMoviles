const updatePost = async (data) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return await response.json();
};

updatePost(
  {
    id: 1,
    title: 'Post actualizado',
    body: 'Nuevo contenido',
    userId: 1
  }
).then(data => console.log('PUT:', data));
