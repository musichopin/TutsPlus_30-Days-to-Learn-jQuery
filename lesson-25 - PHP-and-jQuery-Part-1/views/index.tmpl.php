<?php include '_partials/header.php'; ?>

<h1>Search Actors By Last Name</h1>
<form id="actor-selection" action="index.php" method="post"> 
<!-- **get metodu tercih edilebilirdi** --> 
	<select name="q" id="q"> <!-- select element makes a drop-down -->
		<?php
		// str_split() converts into array:
		$alphabet = str_split('abcdefghijklmnopqrstuvwxyz');
		foreach( $alphabet as $letter ) {
			echo "<option value='$letter'>$letter</option>";
		}
		?>
	</select>
	<!-- ***form için get metodu kullanılsaydı kutucuklardan misal d seçeneği seçildikten sonra url, http://localhost:81/my-site/lesson-25%20-%20PHP-and-jQuery-Part-1/index.php?q=d olarak gözükecekti*** -->
	<button type="submit">Go!</button>
</form>

<!-- ***aşağıdaki kısım sayfada gözüktüğü için view'e ait*** -->
<?php if (isset($actors)) : ?>
<ul class="actors_list">
	<!-- *filter through the results, ie actors object on index.php* -->
	<?php foreach( $actors as $a ) { //**$a is object, $actors is array of objects**
		// print_r($a);
		// ***we send actor id through query string via " ?actor_id={$a->actor_id} "
		// ($a->actor_id becomes property for each object) ***
		// " data-actor_id='{$a->actor_id}' " custom attribute added for convenience
		echo "<li data-actor_id='{$a->actor_id}'><a href='actor.php?actor_id={$a->actor_id}'>{$a->first_name} {$a->last_name}</a></li>"; // **curly brackets for readability**
		// // basic versions:
		// <li>{$a->first_name} {$a->last_name}</li>;
		// <li> <a href='actor.php?actor_id={$a->actor_id}'> {$a->first_name} {$a->last_name} </a> </li>;
	}
	?>		
</ul>
<?php endif; ?>

<?php include '_partials/footer.php'; ?>