import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Actions de Redux
import { mostrarAlerta, ocultarAlertaAction } from '../actions/alertaActions';
import { crearNuevaTareaAction } from '../actions/tareaActions';

const NuevaTareas = ({history}) => {

    // state del componente
    const [identificador, gIdentificador] = useState(0);
    const [descripcion, gDescripcion] = useState('');
    const [fechaCreacion, gFechaCreacion] = useState('');
    const [vigente, gVigente] = useState('');

    // utilizar use dispatch y te crea una función
    const dispatch = useDispatch();

    // Acceder al state del store
    const cargando = useSelector( state => state.tareas.loading );
    const error = useSelector(state => state.tareas.error);
    const alerta = useSelector(state => state.alerta.alerta);


    // mandar llamar el action de tareaAction
    const agregarTarea = tarea => dispatch( crearNuevaTareaAction(tarea) );

    // cuando el usuario haga submit
    const submitNuevaTarea = e => {
        e.preventDefault();

        // validar formulario
        if(identificador <= 0  || descripcion.trim() === '' || fechaCreacion.trim() === '' || vigente.trim() === '') {

            const alerta = {
                msg: 'Los campos son obligatorios',
                classes: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch( mostrarAlerta(alerta) );

            return;
        }

        // si no hay errores
        dispatch( ocultarAlertaAction() );

        // crear el nuevo tarea
        agregarTarea({
            identificador,
            descripcion,
            fechaCreacion,
            vigente
        });

        // redireccionar
        history.push('/');
    }


    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar Tarea
                        </h2>

                        {alerta ? <p className={alerta.classes}> {alerta.msg} </p> : null }

                        <form
                            onSubmit={submitNuevaTarea}
                        >

                            <div className="form-group">
                                <label>Identificador</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Identificador Tarea"
                                    name="identificador"
                                    value={identificador}
                                    onChange={e =>  gIdentificador( Number(e.target.value) )}
                                />
                            </div>

                            <div className="form-group">
                                <label>Descripción</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Descripción Tarea"
                                    name="descripcion"
                                    value={descripcion}
                                    onChange={e => gDescripcion(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Fecha Creación</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Fecha creación Tarea"
                                    name="fechaCreacion"
                                    value={fechaCreacion}
                                    onChange={e => gFechaCreacion(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Vigente</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Vigente Tarea"
                                    name="vigente"
                                    value={vigente}
                                    onChange={e => gVigente(e.target.value)}
                                />
                            </div>

                            

                            <button 
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >Agregar</button>
                        </form>

                        { cargando ? <p>Cargando...</p> : null }
                        
                        { error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null }
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default NuevaTareas;