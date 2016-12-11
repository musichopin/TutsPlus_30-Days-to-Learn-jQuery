<?php

require 'functions.php';
connect();

// ***for AJAX***
if ( isXHR() ) { // ***checks if theres ajax request***
	// ***for ajax when getting actor names through ajax and jquery***
	if ( isset($_POST['q']) ) {
		echo json_encode( get_actors_by_last_name( $_POST['q'] ) );
		// ***passes php arrays to json and js with json_encode (ekrana print etmez).
		// with json_encode we echo array of objects.
		// if we didnt use json_encode it would just print "Array"***
	}

	// ***for ajax when getting actor info on animated page through ajax and jquery***
	if ( isset( $_POST['actor_id'] ) ) {
		$info = get_actor_info( $_POST['actor_id'] );
		echo $info->film_info; 
		// **returns film_info column from the database to ajax**
	}

	return; // ***returns to ajax request (?)***
}


// ***for js disabled browsers***
if ( isset($_POST['q']) ) {
	$actors = get_actors_by_last_name( $_POST['q'] );
	// ***$actors is array of objects; ancak değeri null olabilir***
}


include 'views/index.tmpl.php';