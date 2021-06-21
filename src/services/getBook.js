export default class GetBooks{
 constructor(){

this._apiSearch=`http://openlibrary.org/search.json?q=` 
this._baseApi=`https://openlibrary.org/`

 }
async getResource(url) {
  const res = await fetch(`${this._apiSearch}${url}`);
  if (!res.ok) {
   throw new Error(`Could not fetch ${url}, recieved ${res.status}`)
  }
  return await res.json()
 }

 async getSingleBook(url){
   const res = await fetch(`${this._baseApi}${url}`)
   if (!res.ok) {
   throw new Error(`Could not fetch data, recieved ${res.status}`)
 }
 return await res.json()
 }

 async getSearchRes(url){
   const res = await fetch(`${this._apiSearch}${url}`)
   if (!res.ok) {
     throw new Error(`Could not fetch data, recieved ${res.status}`)
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



}