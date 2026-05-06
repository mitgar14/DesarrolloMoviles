const deletePost = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
    method: 'DELETE'
  });

  return response;
};

deletePost()
  .then(response => console.log('DELETE:', response.status, response.statusText));
