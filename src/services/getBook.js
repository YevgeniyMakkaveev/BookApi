export default class GetBooks {
  constructor() {
    this._apiSearch = `http://openlibrary.org/search.json?q=`
    this._baseApi = `https://openlibrary.org`
  }


  async getSingleBook(url) {
     const res = await fetch(`${this._baseApi}${url}.json`)
    if (!res.ok) {
      throw new Error(`Could not fetch data, recieved ${res.status}`)
    }
    return await res.json()
  }


  async getSearchRes(url) {
       const res = await fetch(`${this._apiSearch}${url}&page=1`)
    if (!res.ok) {
      throw new Error(`Could not fetch data, recieved ${res.status}`)
    }
    return await res.json()
  }

}