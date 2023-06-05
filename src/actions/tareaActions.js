import Swal from 'sweetalert2';
import clienteAxios from '../config/axios';
import {
    AGREGAR_TAREA,
    AGREGAR_TAREA_ERROR,
    AGREGAR_TAREA_EXITO,
    COMENZAR_DESCARGA_TAREAS,
    COMENZAR_EDICION_TAREA,
    DESCARGA_TAREAS_ERROR,
    DESCARGA_TAREAS_EXITO,
    OBTENER_TAREA_EDITAR,
    OBTENER_TAREA_ELIMINAR,
    TAREA_EDITADO_ERROR,
    TAREA_EDITADO_EXITO,
    TAREA_ELIMINADO_ERROR,
    TAREA_ELIMINADO_EXITO
} from '../types';

// Crear  tareas
export function crearNuevaTareaAction(tarea) {
    return async (dispatch) => {
        dispatch( agregarTarea() );

        try {
            await clienteAxios.post('/tareas', tarea);

           dispatch( agregarTareaExito(tarea) );

            Swal.fire(
                'Correcto', 
                'La tarea se agregó correctamente',
                'success'
            );

        } catch (error) {
            console.log(error);
            // si hay un error cambiar el state
            dispatch( agregarTareaError(true) );

            // alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            })
        }
    }
}

const agregarTarea = () => ({
    type: AGREGAR_TAREA,
    payload: true
});

// si el tarea se guarda en la base de datos
const agregarTareaExito = tarea => ({
    type: AGREGAR_TAREA_EXITO,
    payload: tarea
})

// si hubo un error
const agregarTareaError = estado => ({
    type: AGREGAR_TAREA_ERROR,
    payload: estado
});


// Función que descarga las tareas de la base de datos
export function obtenerTareasAction() {
    return async (dispatch) => {
        dispatch( descargarTareas() );

        try {
            const respuesta = await clienteAxios.get('/tareas');
            dispatch( descargaTareasExitosa(respuesta.data) )
        } catch (error) {
            console.log(error);
            dispatch( descargaTareasError() )
        }
    }
}

const descargarTareas = () => ({
    type: COMENZAR_DESCARGA_TAREAS,
    payload: true
});

const descargaTareasExitosa = tareas => ({
    type: DESCARGA_TAREAS_EXITO,
    payload: tareas
})
const descargaTareasError = () => ({
    type: DESCARGA_TAREAS_ERROR, 
    payload: true
});

// Selecciona y elimina  tarea
export function borrarTareaAction(identificador) {
    return async (dispatch) => {
        dispatch(obtenerTareaEliminar(identificador) );

        try {
            await clienteAxios.delete(`/tareas/${identificador}`);
            dispatch( eliminarTareaExito() );

            // Si se elimina, mostrar alerta
            Swal.fire(
                'Eliminado',
                'El tarea se eliminó correctamente',
                'success'
            )
        } catch (error) {
            console.log(error);
            dispatch( eliminarTareaError() );
        }
    }
}

const obtenerTareaEliminar = id => ({
    type: OBTENER_TAREA_ELIMINAR,
    payload: id
});
const eliminarTareaExito = () => ({
    type: TAREA_ELIMINADO_EXITO
})
const eliminarTareaError = () => ({
    type: TAREA_ELIMINADO_ERROR,
    payload: true
});

// Colocar tarea en edición
export function obtenerTareaEditar(tarea) {
    return (dispatch) => {
        dispatch( obtenerTareaEditarAction(tarea) )
    }
}

const obtenerTareaEditarAction = tarea => ({
    type: OBTENER_TAREA_EDITAR,
    payload: tarea
})

// Edita un registro en la api y state
export function editarTareaAction(tarea) {
    return async (dispatch) => {
        dispatch( editarTarea() );

        try {
            await clienteAxios.put(`/tareas/${tarea.identificador}`, tarea);    
            dispatch( editarTareaExito(tarea) );
        } catch (error) {
            console.log(error);
            dispatch( editarTareaError() );
        }
    }
}
const editarTarea = () => ({
    type: COMENZAR_EDICION_TAREA
});

const editarTareaExito = tarea => ({
    type: TAREA_EDITADO_EXITO,
    payload: tarea
});

const editarTareaError = () => ({
    type: TAREA_EDITADO_ERROR,
    payload: true
})