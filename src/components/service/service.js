/* eslint-disable consistent-return */
/* eslint-disable no-console */
export default class ArticleService {

  token = localStorage.getItem('token')

    async getArticleList(page) {
        const res = await fetch (`https://conduit.productionready.io/api/articles?offset=${page}`)
        if (!res.ok) {
            throw new Error(`Could not fetch ` + 
              `, received ${res.status}`)
          }
        const result = await res.json()
        return result
    }

    async getArticle(slug) {
        const res = await fetch (`https://conduit.productionready.io/api/articles/${slug}`);
        if (!res.ok) {
            throw new Error(`Could not fetch ` + 
              `, received ${res.status}`)
          }
        const result = await res.json()
        return result
    }

    async registration(username, email, password){
        const data = { "user":{
            "username": username,
            "email": email,
            "password": password
            }  
        }

        await fetch(`https://conduit.productionready.io/api/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(data)
        });
    }

    async authentication(email, password){
        const data = { "user":{
            "email": email,
            "password": password
            }  
        }

        const res = await fetch(`https://conduit.productionready.io/api/users/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(data)
        });
        console.log(res)
        const result = await res.json()
        console.log(result)
        return result
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

      const res = await fetch(`https://conduit.productionready.io/api/user`, {
          method: 'PUT',
          "headers": {
            'Content-Type': 'application/json;charset=utf-8',
            "Authorization": `Token ${this.token}`
          },
          body: JSON.stringify(data)
        });
        const result = await res.json()
        console.log(result)
        return result
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

      const res = await fetch(`https://conduit.productionready.io/api/articles`, {
          method: 'POST',
          "headers": {
            'Content-Type': 'application/json;charset=utf-8',
            "Authorization": `Token ${this.token}`
          },
          body: JSON.stringify(data)
        });
        const result = await res.json()
        console.log(result)
        return result
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

      const res = await fetch(`https://conduit.productionready.io/api/articles/${slug}`, {
          method: 'PUT',
          "headers": {
            'Content-Type': 'application/json;charset=utf-8',
            "Authorization": `Token ${this.token}`
          },
          body: JSON.stringify(data)
        });
        const result = await res.json()
        return result
    }

    async deleteArticle(slug) {
      const res = await fetch(`https://conduit.productionready.io/api/articles/${slug}`, {
        method: 'DELETE',
        "headers": {
          'Content-Type': 'application/json;charset=utf-8',
          "Authorization": `Token ${this.token}`
        },
        body: JSON.stringify()
      });      
      if (!res.ok) {
          throw new Error(`Could not fetch ` + 
            `, received ${res.status}`)
        }
      const result = await res.json()
      return result
  }
}