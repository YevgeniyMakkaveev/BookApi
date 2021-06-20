export default class GetBooks{
 constructor(){

this._apiSearch=`http://openlibrary.org/search.json?q=`

 }
async getResource(url) {
  const res = await fetch(`${this._apiBase}${url}`);
  if (!res.ok) {
   throw new Error(`Could not fetch ${url}, recieved ${res.status}`)
  }
  return await res.json()
 }

 
 async getLotrApi() {
 const res = await fetch(`${this._apiSearch}the+lord+of+the+rings`)
 if (!res.ok) {
   throw new Error(`Could not fetch data, recieved ${res.status}`)
 }
 return await res.json()
}
async getPlaceholder() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/albums/1/photos`)
  return await res.json()
}

async getReadble(){
const get = await this.getLotrApi()
return get.products.map(item => this.transformData(item.data))
}

}