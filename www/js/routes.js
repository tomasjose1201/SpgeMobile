routes = [
    {
        path: '/',
        url: './index.html'
    },
    {
        path: '/eventos/',
        componentUrl: './pages/eventos.html'
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
        path: '/qrcode/:id/',
        url: './pages/qrcode.html'
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
