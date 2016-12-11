function Slider( container, nav ) { // Slider object
	// 1. console.log(nav);
	// console.log(container);
	// prints: Object { length: 1, prevObject: Object, context: 
	// HTMLDocument → index.html, selector: "div.slider.children(ul)", 1 more… }

	this.container = container;
	this.nav = nav.show(); // *show yapmamıza dikkat*
	this.imgs = this.container.find('img'); // array olmasına dikkat
	this.imgWidth = this.imgs[0].width; // 600
	this.imgsLen = this.imgs.length;

	this.current = 0; //1st item

	// //1b: 
	// this.events.click.call(this);
	// //1b2: we cud have called click method in index.html as well:
	// slider.events.click.call(slider);

	// //1c
	// this.click();
	// //1c2: we cud have called click method in index.html as well:
	// slider.click();

	// //1d: prototype kullanmadan:
	// this.click = function() {
	// 	var self = this; // ***caching this variable***

	// 	self.nav.find('button').on('click', function() {
	// 		var current = self.setCurrent( $(this).data('dir') );
	// 		self.transition();
	// 	});
	// };

	// // we should have called click method in index.html as well:
	// slider.click();
}

// **if we didnt use prototype, every instance of Slider would 
// have transition and setCurrent methods in memory. by using prototype
// every instance of Slider inherits these methods**
Slider.prototype.transition = function( coords ) {
	this.container.animate({
		'margin-left': coords || -( this.current * this.imgWidth )
		// if coords is given use it, if not calculate absolute pos
		// *this style (abs pos) is easier than relative positioning*
	});
};

// *we update the value of the current property*
// dir is either next or previous
Slider.prototype.setCurrent = function( dir ) {
	var pos = this.current; // 0 | 3
	// alt:
	// (dir === 'next') ? this.current++ : this.current--;
	pos += ( ~~( dir === 'next' ) || -1 ); 
	// **if dir is next it is true and cast to 1, if it is false (ie 0), -1 is taken.
	// ~~true is cast to 1, whereas ~~false is cast to 0**

	// current'ın sınır dışına çıkmasına karşılık aşağıdaki işlemler yapılıyor
	this.current = ( pos < 0 ) ? this.imgsLen - 1 : pos % this.imgsLen;
	// **with modulus we mean if current is other than negative number get the remaining**
	// ***we cannot replace this.current with pos bc pos only stores the value itself and 
	// it is not a pointer to this.current property (?) assignment sonrası dahi pos, 
	// this.current'daki değişimden etkilenmezken; this.current'da pos'daki değişimden etkilenmez***

	return pos; // return bu örnekte bir işe yaramadı, ama sonradan yarar diye return edildi
};


// //1b: more complex to 1c:
// // *we are placing click event handler inside the prototype object.
// // we create events object that stores all of our event handlers.
// // we could also have other events like hoverings etc inside this object, 
// // in this case this method would be more useful in debugging.*
// Slider.prototype.events = {
// 	click: function(){
// 		var self = this; // ***caching this variable***
// 		// ***since this kw refers to events object we called click method as such:
// 		// inside Slider constructor: this.events.click.call(this);
// 		// and this time inside callback func since this kw refers to button 
// 		// element we cached the value to self variable above.
// 		// thus in both cases this refers to instance of Slider***
// 		self.nav.find('button').on('click', function() {
// 			var current = self.setCurrent( $(this).data('dir') );
// 			// **$(this) refers to button clicked, self refers to Slider object**
// 			self.transition();
// 		});
// 	}
// };

//  //1c: easier form of 1b:
// Slider.prototype.click = function() {
// 		var self = this; // ***caching this variable***

// 		self.nav.find('button').on('click', function() {
// 			var current = self.setCurrent( $(this).data('dir') );
// 			self.transition();
// 		});
// };