import React from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';


// Redux
import { useDispatch } from 'react-redux';
import { borrarTareaAction, obtenerTareaEditar } from '../actions/tareaActions';

const Tarea = ({tarea}) => {
    const { identificador, descripcion, fechaCreacion, vigente } = tarea;

    const dispatch = useDispatch();
    const history = useHistory(); // habilitar history para redirección

    // Confirmar si desea eliminarlo
    const confirmarEliminarTarea = identificador => {

        // preguntar al usuario
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Un tarea que se elimina no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                // pasarlo al action
                dispatch( borrarTareaAction(identificador) );
            }
        });
    }

    // función que redirige de forma programada
    const redireccionarEdicion = tarea => {
        dispatch( obtenerTareaEditar(tarea) );
        history.push(`/tareas/editar/${tarea.identificador}`)
    }

    return ( 
        <tr>
            <td>{identificador}</td>
            <td>{descripcion}</td>
            <td>{fechaCreacion}</td>
            <td>{vigente}</td>
            <td className="acciones">
                <button 
                    type="button"
                    onClick={ () => redireccionarEdicion(tarea) }
                    className="btn btn-primary mr-2">
                    Editar
                </button>
                <button 
                    type="button"
                    className="btn btn-danger"
                    onClick={() => confirmarEliminarTarea(identificador)}
                >Eliminar </button>
            </td>
        </tr>
     );
}
 
export default Tarea;