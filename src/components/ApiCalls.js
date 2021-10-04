import axios from "axios";

let Apicalls = {
  serverData(image, description, host, ip, position) {
    return new Promise((resolve) => {
      const options = {
        url: "http://localhost/backend/public/api/upload",
        method: "POST",
        data: {
          image: image,
          description: description,
          HOST: host,
          IP: ip,
          Position: position,
        },
      };

      axios(options).then((response) => {
        resolve(response);
      });
    }).catch((error) => {
      console.log("Error en la carga ");
      console.log(error);
    });
  },
  getServers() {
    return new Promise((resolve) => {
      const options = {
        url: "http://localhost/backend/public/api/servers",
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      };
      
      axios(options).then((response) => {
        resolve(response);
      });
    })
  },
  editServer(id, image, description, host, ip) {
    return new Promise((resolve) => {
      const options = {
        url: "http://localhost/backend/public/api/updServer",
        method: "PATCH",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        data:{
          id: id,
          image: image,
          description: description,
          HOST: host,
          IP: ip,
        },
      };
      
      axios(options).then((response) => {
        resolve(response);
      });
    })
  },
  delServer(id) {
    return new Promise((resolve) => {
      const options = {
        url: "http://localhost/backend/public/api/delServer",
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        data:{
          id: id,
        },
      };
      
      axios(options).then((response) => {
        resolve(response);
      });
    })
  },
  consultaSNMP(id) {
    return new Promise((resolve) => {
      const options = {
        url: "http://localhost/backend/public/api/consulta/"+id,
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      };
      
      axios(options).then((response) => {
        resolve(response);
      });
    })
  },
  registerPosition(destino, origen) {
    return new Promise((resolve) => {
      const options = {
        url: "http://localhost/backend/public/api/position",
        method: "PATCH",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        data:{
          Destino: destino,
          Origen: origen,
        }
      };
      
      axios(options).then((response) => {
        resolve(response);
      });
    })
  },
  renderIf: function(condition, content) {
	 if (condition) {
		 return content;
	 } else {
		 return null;
	 }
   },
};

export default Apicalls;
