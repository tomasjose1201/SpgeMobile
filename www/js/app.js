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
                nome: 'Tomás'
            },
            eventos: [
                {
                    id: '1',
                    nome: 'Semana Acadêmica TADS',
                    descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam suscipit volutpat velit vitae auctor. In id facilisis lacus. Donec nec quam in dui dapibus feugiat sit amet a elit. Etiam efficitur turpis nec libero ornare, et molestie sem tincidunt. Donec egestas elit sit amet lectus consequat, ut tristique sem euismod.'
                },
                {
                    id: '2',
                    nome: 'Palestra com Dr. Drauzio Varella',
                    descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam suscipit volutpat velit vitae auctor. In id facilisis lacus. Donec nec quam in dui dapibus feugiat sit amet a elit. Etiam efficitur turpis nec libero ornare, et molestie sem tincidunt. Donec egestas elit sit amet lectus consequat, ut tristique sem euismod.'
                },
                {
                    id: '3',
                    nome: 'Workshop de HTML5/CSS',
                    descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam suscipit volutpat velit vitae auctor. In id facilisis lacus. Donec nec quam in dui dapibus feugiat sit amet a elit. Etiam efficitur turpis nec libero ornare, et molestie sem tincidunt. Donec egestas elit sit amet lectus consequat, ut tristique sem euismod.'
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