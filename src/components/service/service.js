import ApiService from './apiService';

export default class ArticleService {

  apiService = new ApiService ();

  baseUrl = `https://conduit.productionready.io/api/`;

  token = localStorage.getItem('token')

    async getArticleList(page) {

      return this.apiService.fetch(`${this.baseUrl}articles?offset=${page}`)

    }

    async getArticle(slug) {
     
      return this.apiService.fetch(`${this.baseUrl}articles/${slug}`)

    }

    async registration(username, email, password){
        const data = { "user":{
            "username": username,
            "email": email,
            "password": password
            }  
        }
        const method = 'POST'
        await fetch(`${this.baseUrl}users`, this.apiService.postData(method, data));    

    }

    async authentication(email, password){
        const data = { "user":{
            "email": email,
            "password": password
            }  
        }
        const method = 'POST'
        await fetch(`${this.baseUrl}users/login`, this.apiService.postData(method,data));    

    }

    async getCurrentUser() {
        const res = await fetch('https://conduit.productionready.io/api/user',
        {
          "headers": {
            "Authorization": `Token ${this.token}`
          }
        });
        const result = await res.json();
        return result
    }

    async editProfile(username,email,password,image) {
      const data = { 
        "user":
                {
                  "email": email,
                  "password": password,
                  "image": image,
                  "username": username
                }
      }

      const method = 'PUT'

      await fetch(`${this.baseUrl}user`, this.apiService.postData(method,data,this.token));    

    }

    async postArticle(title, description, body,tags) {
      const data = { "article": 
        {
          "title": title,
          "description": description,
          "body": body,
          "tagList": tags
        }
      }

      const method = 'POST'

      await fetch(`${this.baseUrl}articles`, this.apiService.postData(method,data,this.token));    
     
      }

    async editArticle(slug,title,description,body,tags) {
      const data = { "article": 
        {
          "title": title,
          "description": description,
          "body": body,
          "tagList": tags
        }
      }

      const method = 'PUT'

      await fetch(`${this.baseUrl}articles/${slug}`, this.apiService.postData(method,data,this.token));    

    }

    async deleteArticle(slug) {
      
      const method = 'DELETE'

      await fetch(`${this.baseUrl}articles/${slug}`, this.apiService.postData(method, null, this.token));    
   
    }

    async postLike(slug) {

      const method = 'POST'

      await fetch(`${this.baseUrl}articles/${slug}/favorite`, this.apiService.postData(method,null,this.token));    

      }  
      
    async deleteLike(slug) {
      const method = 'DELETE'

      await fetch(`${this.baseUrl}articles/${slug}/favorite`, this.apiService.postData(method,null,this.token));    
    }   

}