export default class NewApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
     }

    fetchArticles() {
        console.log(this)

        const KEY = '24082194-32c1b396cbebb1b9a26199ae3'
        const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${KEY}`

        return fetch(url).then(r => r.json())
            .then(data => {
                console.log(data)
                this.page += 1;
                return data.hits
            })
    }
    
    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
    

    resetPage() {
    this.page = 1
    }

}
 
