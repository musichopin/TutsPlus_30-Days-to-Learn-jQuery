var Actors = { // actors object
	init: function( config ) {
		this.config = config;

		this.setupTemplates();
		this.bindEvents();

		// **for common properties inside 2 objects passed into ajax method**
		$.ajaxSetup({
			url: 'index.php',
			type: 'POST'
		});

		$('button').remove(); // **we dont need button when js is active**
	},

	bindEvents: function() {
		// **when the form element changes call fetchActors function 
		// (to fetch actors from db through ajax request and functions.php)**
		this.config.letterSelection.on( 'change', this.fetchActors );

		// ***when list item is clicked call displayauthorinfo method.
		// (if js is active) we dont wanna go to actor.php and we wanna load the data async***
		this.config.actorsList.on( 'click', 'li', this.displayAuthorInfo );
		// theres event delegation with li passed to on method

		// *for close button to work on slider*
		this.config.actorInfo.on( 'click', 'span.close', this.closeOverlay );
	},

	setupTemplates: function() { // *compiles templates and creates helper method*
		this.config.actorListTemplate = Handlebars.compile( this.config.actorListTemplate);
		// **overrides the templates**
		this.config.actorInfoTemplate = Handlebars.compile( this.config.actorInfoTemplate);

		// **fullName helper function yukarıdaki compilation ile beraber (otomatik olarak) 
		// template tarafından trigger ediliyor diye düşün**
		Handlebars.registerHelper( 'fullName', function( actor ) {
			return actor.first_name + ' ' + actor.last_name;
		});
	},

	// **when the form element changes fetchActors function is called and data is fetched async.
	// a template inside index.tmpl.php was created accordingly**
	fetchActors: function() {
		var self = Actors;

		// ***ajax metodu hakkında bilgi almak için comment out edilen aşağıdaki ajax metoduna bak***
		$.ajax({
			data: self.config.form.serialize(),
			dataType: 'json',
			// ***firstly ajax request is sent to index.php and then with data returned from db
			// success method is executed and data is printed based on the template***
			success: function(results) { // **deferred was a better alternative**
				self.config.actorsList.empty(); // **empty the unordered list so that results do 
				// no stack on one another**

				if ( results[0] ) { // if there is item in array
					// ***we want to take the results (array of objects) and (by merging with 
					// template) append it to unordered list with a class of actors_list***
					self.config.actorsList.append( self.config.actorListTemplate( results) );
				} else {
					self.config.actorsList.append('<li>Nothing returned.</li>');
				}

				// console.log(self.config.actorListTemplate( results));
			}
		});


		// // **basic version of ajax(): the letter that the user selects is sent to index.php 
		// // through serlialized form. so now index.php receives an async request. 
		// // at the end we make an async request to a file that will query the database 
		// // and return the results**
		// $.ajax({
		// 	url: 'index.php', // **where ajax request goes to from fetchActors function**
		// 	type: 'POST',
		// 	data: self.config.form.serialize(), // ajax request goes through serialized form
		// 	dataType: 'json', // datatype we expect in response is json. 
		// 	// returned string is converted to object

		// 	// ***firstly ajax request is sent to index.php and then success method is executed 
		// 	// and then methods inside index.php is executed.
		// 	// success callback option is invoked, if the request succeeds. It receives 
		// 	// the returned data returned from the server, formatted according to the 
		// 	// dataType parameter or the dataFilter callback function***
		// 	success: function(results) { //***results is array of objects***
		// 		console.log('finished');
		// 		console.log(results); // **array of objects is printed**

		// 		// results become object with dataType:json 
		// 		// (it was string before writing " dataType: 'json' ")
		// 		console.log(typeof results);

		// 		// **prints first_name property in the 1st object of results array**
		// 		console.log(results[0].first_name); 
		// 	}
		// });

	},

	// **when list item is clicked displayauthorinfo method is called and data is pulled async.
	// a second template inside index.tmpl.php was created accordingly**
	displayAuthorInfo: function( e ) {
		var self = Actors; // **this kw refers to select element because of event handling 
		// and being called by fetchActors function**

		// **bir slide var iken diğerine tıklayınca arasındaki fark anlaşılsın diye eklendi**
		self.config.actorInfo.slideUp( 300 );

		$.ajax({
			// **sends ajax request to index.php through id of the actor**
			data: { actor_id: $(this).data( 'actor_id' ) }
		}).then(function( results ) { // **when ajax request done execute a function**
			self.config.actorInfo.html( self.config.actorInfoTemplate( { info: results }) ).slideDown(300);
		}); // "info" is used in template

		// // alt: **with success callback**
		// $.ajax({
		// 	// **sends ajax request to index.php through id of the actor**
		// 	data: { actor_id: $(this).data( 'actor_id' ) },
		// 	success: function(results) { //***results is array of objects***
		// 		self.config.actorInfo.html( self.config.actorInfoTemplate( { info: results }) ).slideDown(300);
		// 	}
		// });

		e.preventDefault(); // ***linkin yönlenmesini önlemek önemli***
	},

	// **slide is closed with animation towards upward**
	closeOverlay: function() {
		Actors.config.actorInfo.slideUp(300);
	}
};

// ***this file can see index.tmpl.php
// we made variable names js friendly***
Actors.init({
	letterSelection: $('#q'), // element in form whose event we are looking for
	form: $('#actor-selection'), // form id
	actorListTemplate: $('#actor_list_template').html(), // 1st template
	actorInfoTemplate: $('#actor_info_template').html(), // 2nd template
	actorsList: $('ul.actors_list'), // where first template is gonna be placed
	actorInfo: $('div.actor_info') // where second template is gonna be placed
});