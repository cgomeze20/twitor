
importScripts('js/sw-utils.js');

const STATIC_CACHES    = 'static-v8';
const DYNAMIC_CACHES   = 'dynamic-v2';
const INMUTABLE_CACHES = 'inmutable-v1';


const APP_SHELL = [
    // '/',
    'index.html',
    'css/style.css',
    'img/favicon.ico',
    'img/avatars/hulk.jpg',
    'img/avatars/ironman.jpg',
    'img/avatars/spiderman.jpg',
    'img/avatars/thor.jpg',
    'img/avatars/wolverine.jpg',
    'js/app.js'

]

const APP_SHELL_INMUTABLE = [
    'https://fonts.googleapis.com/css?family=Quicksand:300,400',
    'https://fonts.googleapis.com/css?family=Lato:400,300',
    'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
    'css/style.css',
    'css/animate.css',
    'js/libs/jquery.js'
];

self.addEventListener('install',e =>{

    const cacheStatic = caches.open(STATIC_CACHES)
    .then(cache =>cache.addAll( APP_SHELL));

    const cacheInmutable = caches.open(INMUTABLE_CACHES)
    .then(cache =>cache.addAll( APP_SHELL_INMUTABLE));
   


    e.waitUntil( Promise.all([cacheStatic, cacheInmutable]));
});



self.addEventListener('activate', e => {

    const respuesta = caches.keys().then(keys => {
        keys.forEach( key => {
            if( key !== STATIC_CACHES && key.includes('static')){
                return caches.delete(key);
            }

            if( key !== DYNAMIC_CACHES && key.includes('dynamic')){
                return caches.delete(key);
            }

        })
    })
    e. waitUntil(respuesta);

});


self.addEventListener('fetch', e => {

  const respuesta =  caches.match(e.request).then(res => {

        if(res){
            return res;
        }else {

            return fetch(e.request).then (newRes =>{
                return actualizaCacheDinamico(DYNAMIC_CACHES, e.request, newRes);
            })
        }

    });


    e.respondWith( respuesta);
})