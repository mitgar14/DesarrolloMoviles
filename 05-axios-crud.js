import axios from 'axios';

const api = async () => {
  try {
    // GET
    const getRes = await axios.get('https://jsonplaceholder.typicode.com/posts');
    console.log('GET:', getRes.data);

    // POST
    const postRes = await axios.post('https://jsonplaceholder.typicode.com/posts', {
      title: 'Nuevo',
      body: 'Contenido',
      userId: 1
    });
    console.log('POST:', postRes.data);

    // PUT
    const putRes = await axios.put('https://jsonplaceholder.typicode.com/posts/1', {
      id: 1,
      title: 'Actualizado',
      body: 'Nuevo contenido',
      userId: 1
    });
    console.log('PUT:', putRes.data);

    // DELETE
    await axios.delete('https://jsonplaceholder.typicode.com/posts/1');
    console.log('DELETE: eliminado');

  } catch (error) {
    console.error(error);
  }
};

api();
