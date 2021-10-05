import { Card, CardImg, Col, Collapse, Table } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import Apicalls from "../ApiCalls";
import "./style.css";
import Button from "@restart/ui/esm/Button";
import img from "../../assets/descarga.jpg";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Grafica from "./grafica";


const ServerList = () => {
  const [formValues, handleInputChange] = useForm({
    image: "",
    description: "",
    HOST: "",
    IP: "",
  });
  const [servers, setServers] = useState([]);
  const { image, description, HOST, IP } = formValues;
  const [editServer, setEditServer] = useState(false);
  const [serverData, setServerData] = useState(null)
  useEffect(() => {}, [image]);  // Actualiza el dato del form
  useEffect(() => {}, [description]); // Actualiza el dato del form
  useEffect(() => {}, [HOST]); // Actualiza el dato del form
  useEffect(() => {}, [IP]); // Actualiza el dato del form
  
  const getServers = () => {
    Apicalls.getServers().then(res => {
      if(res.data!=servers){
        setServers(res.data);
      }
      console.log(res);
    })
  }

  useEffect(() => {
    getServers();
  }, [])

  const handleSubmit = (e, item) => {
      e.preventDefault();
      let reader = new FileReader(); // se crea un FileReader para guardar la imagen en la DB
      let position = 0; // Establece en 0 la posicion para contemplar un caso base en el que no haya servidores
      if(servers.length>0){
        position = servers[servers.length - 1].Position + 1; // Determina la posición del servidor
      }
      // Si editServer esta vacio el formulario carga servidores si editServer no esta vacio el formulario esta en modo edición
    if(editServer==false){ 
      reader.readAsDataURL(document.getElementById("image").files[0]);
      reader.onload = function () {
        Apicalls.serverData(reader.result, description, HOST, IP, position).then((res) => {
          console.log(res);
          getServers();

        });
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    }else{
      reader.readAsDataURL(document.getElementById("image").files[0]);
      reader.onload = function () {
        Apicalls.editServer(editServer, reader.result, description, HOST, IP).then((res) => {
          console.log(res);
          getServers();
        });
      };
    }
    setEditServer(false); // Vuelve a setear el formulario una vez q termina en modo de carga de servidores

  };
  //Función encargada de actualizar la posición en el front y llamar a la apicall para que actualice la posición de los servidores en la DB
  const handleDragEnd = (result) => {
    console.log(result);
    if (!result.destination) return;
	Apicalls.registerPosition(result.destination.index, result.source.index).then((res)=>{
		getServers();
	})
	}

// Elimina servidor
  const deleteServer = (id) => {
    Apicalls.delServer(id).then((res)=>{
      getServers();

    })
  }

// Permite editar datos del servidor y se autocompletan los campos para 
// saber a que servidor hace referencia, a modo autocritica no se autocompleta el campo de la imagen.
  const updateServer = (server) => {
    setEditServer(server._id);
    document.getElementById('description').value=server.description;
    document.getElementById('HOST').value=server.HOST;
    document.getElementById('IP').value=server.IP;
  }

  // Hace el llamado de las consultas SNMP y le da valor a serverData lo que habilita mostrar las gráficas

  const consultaSNMP = (id) => {

	  Apicalls.consultaSNMP(id).then((res)=>{
		setServerData(res.data);
    })
  }
  
  return (
    <div>
      <form
        className="server-form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="form-group">
          <input
            id="image"
            type="file"
            name="image"
            className="form-control"
            placeholder="Imagen"
            autoComplete="off"
            accept="image/*"
            value={image}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            id="description"
            type="text"
            name="description"
            className="form-control"
            placeholder="Descripción"
            autoComplete="off"
            value={description}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            id="HOST"
            type="text"
            name="HOST"
            className="form-control"
            placeholder="HOST"
            autoComplete="off"
            value={HOST}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            id="IP"
            type="text"
            name="IP"
            className="form-control"
            placeholder="IP"
            autoComplete="off"
            value={IP}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Cargar Servidor
        </button>
      </form>
    <hr/>
    <div className="servidores">
      <div>
        <h1 className="text-white">Servidores: {servers.length}</h1>
      </div>
      <hr/>
    <DragDropContext onDragEnd={handleDragEnd} className="col-12">
      <Droppable droppableId="serv" className="col-12">
        {(provided) => (
          <div className="serv" {...provided.droppableProps} ref={provided.innerRef}>
            <Table>
              <thead>
                <th>Imagen</th>
                <th>Descripción</th>
                <th>HOST</th>
                <th>IP</th>
                <th>POSICIÓN</th>
                <th>Eliminar</th>
                <th>Editar</th>
                <th>Consultar</th>
              </thead>
              <tbody>
              {servers.map((data, index)=> {
                return(
                  <Draggable key={data._id} draggableId={data._id} index={index}>
                    {(provided) => (
                      	<tr className="table-row" key={data._id}  {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                              <td>
                              <img className="card-img-top card-img-size" src={data.image} alt="Card image cap"/>
                              </td>
                              <td><h1>{data.description}</h1></td>
                              <td><h1>{data.HOST}</h1></td>
                              <td><h1>{data.IP}</h1></td>
                              <td><h1>{data.Position}</h1></td>
                              <td><Button className="btn btn-danger w-100" onClick={() => deleteServer(data._id)}>Eliminar</Button></td>
                              <td><Button className="btn btn-warning w-100" onClick={() => updateServer(data)}>Editar</Button></td>
                              <td><Button className="btn btn-consulta w-100" onClick={() => consultaSNMP(data._id)}>Consultar</Button></td>
                        </tr>
                    )}
                  </Draggable>
                )}
              )
              }
              </tbody>
              </Table>
            {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      </div>
	  {serverData==null?'':
			<div className="div-graficas">

        <h1 className="text-white txt">Procesos activos en el servidor:</h1>
				<Grafica history={serverData.historyProcess}/>

        <h1 className="text-white txt">Sesiones activas en el servidor:</h1>
				<Grafica history={serverData.historySession}/>

			</div>
	  }
    </div>
  );
};
export default ServerList;
