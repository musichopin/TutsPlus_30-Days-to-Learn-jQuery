<?php include '_partials/header.php'; ?>

<h1>Search Actors By Last Name</h1>
<!-- ***action ve method attr ların etkisi olmadı ajax requestten dolayı(?)*** -->
<form id="actor-selection" action="index.php" method="post">
	<select name="q" id="q">
		<?php
		$alphabet = str_split('abcdefghijklmnopqrstuvwxyz');
		foreach( $alphabet as $letter ) {
			echo "<option value='$letter'>$letter</option>";
		}
		?>
	</select>
	<button type="submit">Go!</button>
</form>

<ul class="actors_list">
<!-- ***this section is only used for js disabled browsers*** -->
	<?php if (isset($actors)) : ?> 
		<?php foreach( $actors as $a ) {
			echo "<li data-actor_id='{$a->actor_id}'><a href='actor.php?actor_id={$a->actor_id}'>{$a->first_name} {$a->last_name}</a></li>";
		}
		?>
	<?php endif; ?>
	
	<!-- ***we set up first template. there are ways to combine php code above and template below but distinction makes it easier.*** -->
	<script id="actor_list_template" type="text/x-handlebars-template">
		{{#each this}} <!-- for each object in array-->
		<li data-actor_id="{{actor_id}}"> <!-- **double curly braces is necessary for template ** -->
			<!-- **we use fullName helper method to pass each of the 
			object(item) with this kw** -->
			<a href="actor.php?actor_id={{actor_id}}">{{fullName this}}</a>
			<!-- **href value doesnt matter for js enabled browsers since
			default action is prevented when we click the link** -->
		</li>
		{{/each}}
	</script>
</ul>

<!-- ***2nd template was created for after clicking list items (which had been made by first template above)
no need for each statement since we only got 1 object in this template***-->
<div class="actor_info"> <!-- **we wrapped the template into div (instead of ul as above)** -->
	<script id="actor_info_template" type="text/x-handlebars-template">
		<p>{{info}}</p>
		<span class="close">X</span>
	</script>		
</div>

<?php include '_partials/footer.php'; ?>