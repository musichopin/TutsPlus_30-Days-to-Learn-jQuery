<?php

// *open a file, write to a file and close the file*
$f = fopen('data.txt', 'w'); // w is a flag that says we want to be able to write to this file
fwrite( $f, $_POST['content']); // *write textarea value from index.html
fclose($f);

echo 'Comment has been saved';