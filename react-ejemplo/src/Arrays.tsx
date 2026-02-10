import { useState } from 'react';

function Arreglos() {
  const [arreglo, setArreglo] = useState<number[]>([]);

  const addToArray = () => {
    const nuevo = Date.now();
    setArreglo((prev) => [...prev, nuevo]);
  };

  return (
    <>
      <button onClick={addToArray}>Agregar</button>
      <ul>
        {arreglo.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </>
  );
}

export default Arreglos;


// const myArray = ['First App', 'Second App', 'Third App'];

// function Arrays() {
//  return (<>
//  <ol>
//  {
//  myArray.map((item, index) => (
//  <li key={index}> { item } </li>
//  ))
//  }
//  </ol>
//  </>);
// }
// export default Arrays;