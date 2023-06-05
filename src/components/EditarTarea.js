import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { editarTareaAction } from '../actions/tareaActions';

const EditarTarea = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    // nuevo state de tarea
    const [ tarea, guardarTarea] = useState({
        identificador: '',
        descripcion: '' ,
        fechaCreacion: '' ,
        vigente: '' 
    })

    // tarea a editar
    const tareaeditar = useSelector(state => state.tareas.tareaeditar);
  
    // llenar el state automaticamente
    useEffect( () => {
        guardarTarea(tareaeditar);
    }, [tareaeditar]);

    // Leer los datos del formulario
    const onChangeFormulario = e => {
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }


    const { identificador, descripcion, fechaCreacion, vigente} = tarea;

    const submitEditarTarea = e => {
        e.preventDefault();

        dispatch( editarTareaAction(tarea) );
    
        history.push('/');
    }
    
    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Editar Tarea
                        </h2>

                        <form
                            onSubmit={submitEditarTarea}
                        >
                            <div className="form-group">
                                <label>Identificador</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Identificador Tarea"
                                    name="identificador"
                                    value={identificador}
                                    onChange={onChangeFormulario}
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
                                    onChange={onChangeFormulario}
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
                                    onChange={onChangeFormulario}
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
                                    onChange={onChangeFormulario}
                                />
                            </div>

                            <button 
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >Guardar Cambios</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default EditarTarea;