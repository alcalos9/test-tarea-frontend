import { combineReducers } from 'redux';
import alertaReducer from './alertaReducer';
import tareasReducer from './tareasReducer';

export default combineReducers({
    tareas: tareasReducer,
    alerta: alertaReducer
});