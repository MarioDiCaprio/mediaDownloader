import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import Window from './components/window';
import "core-js/stable";
import "regenerator-runtime/runtime";


// load additional CDNs
$('head').append(
    // Bootstrap 5
    '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">',
    '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>',
    // Bootstrap Icons
    '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.1/font/bootstrap-icons.css">',
    // Google Fonts API
    '<link rel="preconnect" href="https://fonts.googleapis.com">',
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    // Custom fonts (from google API)
    '<link href="https://fonts.googleapis.com/css2?family=Arima+Madurai:wght@300&display=swap" rel="stylesheet">',
    '<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300&display=swap" rel="stylesheet">',
    '<link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400&display=swap" rel="stylesheet">',
);

ReactDOM.render(<Window />, document.getElementById('app'));
