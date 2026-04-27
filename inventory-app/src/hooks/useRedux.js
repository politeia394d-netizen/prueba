import { useSelector } from 'react-redux';

export const useAuth = () => {
  return useSelector((state) => state.auth);
};

export const useInventory = () => {
  return useSelector((state) => state.inventory);
};
