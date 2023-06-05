import React, { Fragment, useEffect } from 'react';
import Tarea from './Tarea';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { obtenerTareasAction } from '../actions/tareaActions';

const Tareas = () => {

    const dispatch = useDispatch();

    useEffect( ()=> {

        // Consultar la api
        const cargarTareas = () => dispatch( obtenerTareasAction() );
        cargarTareas();
        // eslint-disable-next-line
    }, []);

    // obtener el state
    const tareas = useSelector( state => state.tareas.tareas );
    const error = useSelector(state => state.tareas.error);
    const cargando = useSelector(state => state.tareas.loading);

    return ( 
       <Fragment>
           <h2 className="text-center my-5">Listado de Tareas</h2>

           { error ? <p className="font-weight-bold alert alert-danger text-center mt-4">Hubo un error</p> : null }
           
           { cargando ? <p className="text-center">Cargando....</p> : null }

           <table className="table table-striped">
               <thead className="bg-primary table-dark">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Fecha Creación</th>
                        <th scope="col">Vigente</th>
                        <th scope="col">Acciones</th>
                    </tr>
               </thead>
               <tbody>
                   { tareas.length === 0 ? 'No hay tareas' : (
                       tareas.map(tarea => (
                           <Tarea
                                key={tarea.identificador}
                                tarea={tarea}
                           />
                       ))
                   ) }
               </tbody>
           </table>
       </Fragment>
     );
}
 
export default Tareas;