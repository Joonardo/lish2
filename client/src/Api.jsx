import 'whatwg-fetch';

const url = 'http://localhost:3001/'

async function exists(short) {
    var resp = await fetch(url + 'check', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            shortUrl: short
        })
    })

    const json = await resp.json()

    return json.exists
}

async function new_url() {
    const repl = await fetch(url + 'new_url')
    const json = await repl.json()

    return json.shortUrl
}

async function add_new(short, long) {
    const repl = await fetch(url + 'add', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            shortUrl: short,
            longUrl: long
        })
    })

    console.log(repl);
    const json = await repl.json()

    return json.success
}

async function get(short) {
    const repl = await fetch(url + 'url?shortUrl=' + short)
    const json = await repl.json()

    return json
}

const Api = {
    get: get,
    exists: exists,
    placeholder: new_url,
    add: add_new
}

export default Api;
