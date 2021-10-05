<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use MongoDB\Client;
use App\Models\Server;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


/* Publicar servidor */

Route::post('/upload', function (Request $request) {
    $server = new Server();
    
    $server->image = $request->get('image');
    $server->description = $request->get('description');
    $server->HOST = $request->get('HOST');
    $server->IP = $request->get('IP');
    $server->Position = $request->get('Position');

    $server->save();

    return(response(''))->withHeaders(['Access-Control-Allow-Origin' => '*']);
});

/* Eliminar servidor */

Route::delete('/delServer', function (Request $request) {

    Server::find($request->get('id'))->delete();

    return(response(''))->withHeaders(['Access-Control-Allow-Origin' => '*']);
});

/* Consulta servidor SNMP (Simple Network Management Protocol) */

Route::get('/consulta/{id}', function ($id) {

    $server = Server::find($id);

    $session = new SNMP(SNMP::VERSION_1, $server->IP, "public");
    $session->valueretrieval = SNMP_VALUE_PLAIN; 
    $sessionCount = $session->walk("iso.3.6.1.2.1.1.7.0", TRUE);
    $processCount = $session->walk("iso.3.6.1.2.1.2.1.0", TRUE);
    /* Guarda la hora y la respuesta para generar la gráfica tanto de las sessiones como de los procesos */
    $server->push('historySession',[
            'time' => time(),
            'response' => $sessionCount
        ]);
    $server->push('historyProcess',[
            'time' => time(),
            'response' => $processCount
        ]);

    $server->save();

    return(response([
        'historyProcess' => $server->historyProcess,
        'historySession' => $server->historySession
        ]))->withHeaders(['Access-Control-Allow-Origin' => '*']);
});

/* Update de un servidor ya cargado */

Route::patch('/updServer', function (Request $request) {

    $server = Server::find($request->get('id'));

    $server->image = $request->get('image');
    $server->description = $request->get('description');
    $server->HOST = $request->get('HOST');
    $server->IP = $request->get('IP');

    $server->save();
    return(response(''))->withHeaders(['Access-Control-Allow-Origin' => '*']);
});

/* Update de la posición de un servidor en el drag and drop */

Route::patch('/position', function(Request $request){

    $origen = $request->get('Origen');
    $destino = $request->get('Destino');

    $serverA = Server::where("Position", $origen)->first();
    $serverA->Position = $destino;

    $serverB = Server::where("Position", $destino)->first();
    $serverB->Position = $origen;
    
    $serverA->save();
    $serverB->save();

    return(response(''))->withHeaders(['Access-Control-Allow-Origin' => '*']);

});

/* Trae los servidores ordenados por posición */

Route::get('/servers', function (Request $request) {
    

    return(response(Server::orderBy('Position')->get()))->withHeaders(['Access-Control-Allow-Origin' => '*']);
});
