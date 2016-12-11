<?php

$data = file( 'data.txt');
echo stripslashes( $data[0] );
// in order to avoid slashes stripslashes method was used