import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

function AddShoppingListItem() {
  const router = useRouter();
  const [inputs, setInputs] = useState({
    title: '',
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.title]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);

    if (!inputs.title) {
      return;
    } else {
      sendRequest();
      router.refresh();
    }
  };

  const sendRequest = () => {
    fetch('/api/shopping-lists', {
      method: 'POST',
      body: JSON.stringify({
        title: inputs.title,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='title'>Title</label>
        <input
          value={inputs.title}
          onChange={handleChange}
          type='text'
          title='title'
        />
        <button type='submit'>Add</button>
      </form>
    </div>
  );
}

export default AddShoppingListItem;
