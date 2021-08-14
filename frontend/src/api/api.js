import { API_URL, ITEMS_PER_PAGE } from '../utils/constants';

export const fetchUsers = async (
  sortToggle = '',
  minSalary = '',
  maxSalary = '',
  page = ''
) => {
  let params = new URLSearchParams();
  if (sortToggle) {
    params.append('sort', sortToggle);
  }
  if (minSalary) {
    params.append('minSalary', minSalary);
  }
  if (maxSalary) {
    params.append('maxSalary', maxSalary);
  }
  if (page) {
    params.append('offset', ITEMS_PER_PAGE * page);
  }
  let res = await fetch(API_URL + '/users?' + params.toString());
  window.scrollTo(0, 0);
  return res.json();
};

export const deleteUser = async (userId = '') => {
  let res = await fetch(API_URL + '/users/' + userId, {
    method: 'DELETE',
  });
  return res.json();
};

export const patchUser = async (
  userId = '',
  login = '',
  name = '',
  salary = ''
) => {
  let updateUserBase = {};
  if (login) {
    updateUserBase['login'] = login;
  }
  if (name) {
    updateUserBase['name'] = name;
  }
  if (salary) {
    updateUserBase['salary'] = salary;
  }

  let res = await fetch(API_URL + '/users/' + userId, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updateUserBase),
  });
  return res.json();
};

export const uploadFile = async fileToSend => {
  const formData = new FormData();
  formData.append(`file`, fileToSend);
  let res = await fetch(API_URL + '/users/upload', {
    method: 'POST',
    body: formData,
  });
  return res.json();
};
