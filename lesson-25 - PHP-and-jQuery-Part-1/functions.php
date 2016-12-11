<?php
/* ***model olarak düşünülebilir*** */
function connect() {
	global $pdo; // makes the var global
	$pdo = new PDO("mysql:host=localhost;dbname=sakila", "root", "");// db is mysql
	// connect to sakila database
}

function get_actors_by_last_name( $letter ) {
	global $pdo;

	$stmt = $pdo->prepare('
		SELECT actor_id, first_name, last_name 
		FROM actor
		WHERE last_name LIKE :letter
		LIMIT 50');
	// **where kısmı post metodu kullanıldığından url'de gözükmez**

	// **prepared sta için associative array oluşturulmuş**
	$stmt->execute( array( ':letter' => $letter . '%' ) );

	return $stmt->fetchAll( PDO::FETCH_OBJ );
	// **since we wanted to fetch data as an object we passed "PDO::FETCH_OBJ"**
}

function get_actor_info( $actor_id ) {
	global $pdo;

	// **we use actor_info table as opposed to actor_id table in previous function**
	$stmt = $pdo->prepare('
		SELECT film_info, first_name, last_name 
		FROM actor_info
		WHERE actor_id = :actor_id /* = yerine LIKE denebilir*/ 
		LIMIT 1');
	// ***where kısmı get metodu kullanıldığından url'de gözükür:
	// örnek: ...php?actor_id=58***

	$stmt->execute( array( ':actor_id' => $actor_id ) );

	return $stmt->fetch( PDO::FETCH_OBJ );
	// **returns single dimensional array**
}



