
async function getBookData(url) {
    const request = await fetch(url)
    const response = await request.json()
    return response

}

async function loadBooks(offset, results = []) {
    const allBooksUrl = 'https://tibia.fandom.com/api/v1/Articles/List?expand=0&format=json&category=Book_Texts&limit=90000' + (offset ? `&offset=${offset}` : '')
    const request = await fetch(allBooksUrl)
    const result = await request.json()
    results = [...results, ...prepareUrls(result.items)]
    if (result.offset) {
        const next = await loadBooks(result.offset, results);
        return next
    }
    return results
}

function prepareUrls(data) {
    const wikia = 'https://tibia.fandom.com/api.php?format=json&prop=text&action=parse&pageid='
    return data.map(item => wikia + item.id)
}

async function init() {
    let books = []
    let bookIndex = 0
    const bookUrls = await loadBooks()
    for (const url of bookUrls) {
        const book = await getBookData(url)
        const regex = RegExp(/(?<=blockquote class="book".)(.*)(?=<.blockquote)/gus)
        const data = book.parse.text["*"]
        books.push({
            title: book.parse.title,
            url: 'http://tibia.fandom.com/wiki/' + book.parse.title.replace(/\s/g, "_"),
            txt: data.match(regex)[0]
        })
        console.log(`${bookIndex++}/${bookUrls.length}`, url, book.parse.title)
    }
    saveAsJSON(books, 'books.json')
    return books
}

function saveAsJSON(data, name = Date.now() + '.json') {
    const a = document.createElement('a')
    a.download = name
    a.href = URL.createObjectURL(new Blob([JSON.stringify(data)], { type: 'application/json' }))
    a.click()
}

//to init
// init()
