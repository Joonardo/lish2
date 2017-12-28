import DB from './DB.js';

// Get url for shortUrl
function _get(req, res) {
    const short = req.shortUrl;

    DB.get(short, (err, reply) => {
        if(err)
            res.send({success: false})
        else
            res.send({success: true, url: reply.toString()})
    });
}

// Add new url
function _addUrl(req, res) {
    const short = req.body.shortUrl,
        long = req.body.longUrl;
    console.log(short, long)
    DB.exists(short, function(e) {
        if(!e) {
            DB.set(short, long);
        }
	    res.send({success: !e})
    });
}

// Check short url
function _check(req, res) {
    DB.exists(req.body.shortUrl, function(e) {
	res.send({exists: e})
    })
}

// Get unused shortUrl
function _url(req, res) {
    DB.unused(function(url) {
	res.send({shortUrl: url})
    })
}

const Pages = {
    add: _addUrl,
    check: _check,
    new_url: _url,
    get: _get
}

export default Pages;
