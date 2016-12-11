<?php
// ***controller olarak düşünülebilir***

require 'functions.php';
connect(); // connect to our db

// if ( isXHR() && isset($_POST['q']) ) {
// 	echo json_encode( get_actors_by_last_name( $_POST['q'] ) );
// 	return;
// }

// ***if element with a name/key of q is available/set in POST global array then query the database***
if ( isset($_POST['q']) ) {
	$actors = get_actors_by_last_name( $_POST['q'] ); // null olabilir
	// ***$actors is array of objects
	// POST super global arrayi yerine REQUEST arrayi kullanılabilirdi***
}

// if ( isXHR() && isset( $_POST['actor_id'] ) ) {
// 	$info = get_actor_info( $_POST['actor_id'] );
// 	echo $info->film_info;
// 	return;
// }

include 'views/index.tmpl.php';
// ***index.tmpl.php, index.php'ye bağlı olduğundan en son yazılmış***