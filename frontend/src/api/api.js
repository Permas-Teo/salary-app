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
