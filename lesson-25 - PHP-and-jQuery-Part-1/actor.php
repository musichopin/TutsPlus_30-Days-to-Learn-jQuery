<?php
// ***actor.php controller olarak düşünülebilir ve linke tıklandığında aktif hale gelir***
require 'functions.php';
connect();

$info = get_actor_info( $_GET['actor_id'] );
// ***GET super global arrayi yerine REQUEST arrayi kullanılabilirdi.
// $info becomes a single object.
// 58 nolu actor id seçilince url, "http://localhost:81/my-site/lesson-25%20-%20PHP-and-jQuery-Part-1/actor.php?actor_id=58" şeklinde gözükür***

include 'views/actor.tmpl.php';
// **actor.tmpl.php, actor.php'ye bağlı olduğundan en son yazılmış **