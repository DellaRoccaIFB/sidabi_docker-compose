
<?php
header('Content-Type: application/json; charset=utf-8');
include_once '../../../_classes/start.php';
$json = new JSON();

$page = $_GET['page'];
$limit = $_GET['rows'];
$sidx = $_GET['sidx'];
$sord = $_GET['sord'];

$_search = $_GET['_search'];
$filtro = array();

$filtro["id"] 				= isset($_GET["id"]) ? $_GET["id"] : null;
$filtro["sigla"] 			= isset($_GET["sigla"]) ? $_GET["sigla"] : null;
$filtro["titulo"] 			= isset($_GET["titulo"]) ? $_GET["titulo"] : null;
$filtro["status"] 			= isset($_GET["status"]) ? $_GET["status"] : null;
$filtro["caminho_imagem"] 	= isset($_GET["caminho_imagem"]) ? $_GET["caminho_imagem"] : null;
$filtro["caminho_modulo"] 	= isset($_GET["caminho_modulo"]) ? $_GET["caminho_modulo"] : null;

try
{
	if (!$sidx) $sidx = 1;
	
	$result = SidabiModulo::contarTodosRegistros();
	$qtdRegistros = $result[0]['count'];
	
	if ($qtdRegistros > 0 && $limit > 0) {
		$total_pages = ceil($qtdRegistros / $limit);
	} else {
		$total_pages = 0;
	}
	
	if ($page > $total_pages) $page = $total_pages;
	
	$start = $limit*$page - $limit;
	if ($start < 0) $start = 0;
	
	$result = null;
	$saida = null;
	if ($_search) {
		$result = SidabiModulo::consultarTodosRegistros($sidx, $sord, $start, $limit, $filtro);
	}else{
		$result = SidabiModulo::consultarTodosRegistros($sidx, $sord, $start, $limit);
	}
	
	$saida["rows"] = $result;
	$saida["totalrecords"] = "$qtdRegistros";
	$saida["currpage"] = "$page";
	$saida["totalpages"] = "$total_pages";
	
	$json->setStatus("ok");
	$json->setObjeto( $saida );
}
catch (Exception $ex)
{
	$json->setStatus("erro");
	$json->setMensagem($ex->getMessage());
}

$json->imprimirJSON();