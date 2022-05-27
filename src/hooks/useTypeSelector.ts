import { TypedUseSelectorHook, useSelector } from 'react-redux';
import store from '../admin/store';

const useTypeSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;

export default useTypeSelector;
