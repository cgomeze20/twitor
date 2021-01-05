


function actualizaCacheDinamico(dynamiccache, req,res){


    if(res.ok){


        return caches.open(dynamiccache).then( cache =>{
            cache.put( req, res.clone())
            return res.clone();
        })
    } else {
        return res;
    }

}