async function getData() {
  const response = await fetch('http://localhost:3000/api/clients');
  const data = await response.json();
  return data;
}

async function deleteData(id) {
  const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
    method: 'DELETE',
  });
}

async function updateData(id, body) {
  const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

async function searchData(value) {
  const response = await fetch(`http://localhost:3000/api/clients?search=${value}`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
}

async function createData(body) {
  const response = await fetch(`http://localhost:3000/api/clients`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

export { getData, deleteData, updateData, searchData, createData };
