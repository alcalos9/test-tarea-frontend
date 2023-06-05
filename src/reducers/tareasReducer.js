import {
    AGREGAR_TAREA,
    AGREGAR_TAREA_ERROR,
    AGREGAR_TAREA_EXITO,
    COMENZAR_DESCARGA_TAREAS,
    DESCARGA_TAREAS_ERROR,
    DESCARGA_TAREAS_EXITO,
    OBTENER_TAREA_EDITAR,
    OBTENER_TAREA_ELIMINAR,
    TAREA_EDITADO_ERROR,
    TAREA_EDITADO_EXITO,
    TAREA_ELIMINADO_ERROR,
    TAREA_ELIMINADO_EXITO
} from '../types';

// cada reducer tiene su propio state
const initialState = {
    tareas: [],
    error: null,
    loading: false, 
    tareaeliminar: null,
    tareaeditar: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case COMENZAR_DESCARGA_TAREAS:
        case AGREGAR_TAREA: 
            return {
                ...state,
                loading: action.payload
            }
        case AGREGAR_TAREA_EXITO:
            return {
                ...state,
                loading: false,
                tareas: [...state.tareas, action.payload]
            }
        case AGREGAR_TAREA_ERROR:
        case DESCARGA_TAREAS_ERROR:
        case TAREA_ELIMINADO_ERROR:
        case TAREA_EDITADO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case DESCARGA_TAREAS_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                tareas: action.payload
            }
        case OBTENER_TAREA_ELIMINAR:
            return {
                ...state,
                tareaeliminar: action.payload
            }
        case TAREA_ELIMINADO_EXITO:
            return {
                ...state,
                tareas: state.tareas.filter( tarea => tarea.identificador !== state.tareaeliminar ),
                tareaeliminar: null
            }
        case  OBTENER_TAREA_EDITAR:
            return {
                ...state,
                tareaeditar: action.payload
            }
        case TAREA_EDITADO_EXITO:
            return {
                ...state,
                tareaeditar: null,
                tareas: state.tareas.map( tarea => 
                    tarea.identificador === action.payload.id ? tarea = action.payload : tarea
                )
            }
        default:
            return state;
    }
}