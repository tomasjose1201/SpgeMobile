// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app = new Framework7({
    root: '#app', // App root element
    id: 'io.framework7.spgemobile', // App bundle ID
    name: 'Framework7', // App name
    theme: 'auto', // Automatic theme detection
    // App root data
    data: function () {
        return {
            user: {
                firstName: 'John',
                lastName: 'Doe'
            },
            // Demo products for Catalog section
            eventos: [
                {
                    id: '1'
                },
                {
                    id: '2'
                },
                {
                    id: '3'
                }
            ]
        };
    },
    // App root methods
    methods: {
        helloWorld: function () {
            app.dialog.alert('Hello World!');
        }
    },
    // App routes
    routes: routes
});

// Init/Create views
var loginView = app.views.create('#view-login', {
    url: '/'
});
var eventosView = app.views.create('#view-eventos', {
    url: '/eventos/'
});
var perfilView = app.views.create('#view-perfil', {
    url: '/perfil/'
});

/*$(document).ready(function () {
    $$('#formLogin').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: "http://localhost:8080/spge/webresources/usuario/validar",
            data: formLoginToJSON(),
            success: function (data) { },
            error: function (data) { }
        });
    });
});*/

function formLoginToJSON() {
    return JSON.stringify({
        "email": $('#email').val(),
        "senha": $('#senha').val()
    });
}