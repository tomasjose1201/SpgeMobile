routes = [
    {
        path: '/',
        url: './index.html'
    },
    {
        path: '/eventos/',
        componentUrl: './pages/eventos.html',
        on: {
            pageInit: function (event, page) {
                $.ajax({
                    url: app.data.BASE_URL + "idConvidado",
                    type: 'GET',
                    data: {
                        idUsuario: app.data.user.idUsuario
                    },
                    contentType: 'application/json',
                    dataType: 'jsonp',
                    success: function (data) {
                        app.data.convidadoLogado = JSON.parse(JSON.stringify(data));
                    },
                    error: function (request, textStatus, errorThrown) {
                        alert(errorThrown + ' Status: ' + textStatus);
                    }
                });
            }
        }
    },
    {
        path: '/perfil/',
        componentUrl: './pages/perfil.html'
    },
    {
        path: '/details/:id/',
        componentUrl: './pages/details.html'
    },
    {
        path: '/avisos/:id/',
        componentUrl: './pages/avisos.html'
    },
    {
        path: '/convidado/:id/',
        componentUrl: './pages/convidado.html'
    },
    {
        path: '/listaConv/:id/',
        componentUrl: './pages/listaConvidados.html'
    },
    {
        path: '/qrcode/:id/',
        componentUrl: './pages/qrcode.html'
    },
    {
        path: "/search/",
        url: "./pages/search.html",
        on: {
            pageInit: function (e) {
                searchbar = app.searchbar.create({
                    el: 'form.searchbar',
                    enabled: true,
                    on: {
                        clear: function (e) {
                            app.$('#searchresults').empty();
                        }
                    }
                });
            },
            pageAfterIn: function (e) {
                app.$('form.searchbar').on('submit', function (e) {
                    e.preventDefault();
                    searchEvento(app.$('input[type="search"]').val());
                });
            }
        }
    },
    // Default route (404 page). MUST BE THE LAST
    {
        path: '(.*)',
        url: './pages/404.html'
    }
];
