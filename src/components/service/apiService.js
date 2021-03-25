export default class ApiService {

    checkFetchResult(result) {
        if (!result) {
            throw new Error(`Could not fetch ` + 
              `, received ${result}`)
          }
    };

    async fetch (url) {
        const res = await fetch(url);
        this.checkFetchResult(res);
        const result = await res.json();
        return result;
      };

    postData (apiMethod, bodyData,token) {
        return {
             "method": apiMethod,
             "headers": {
                'Content-Type': 'application/json;charset=utf-8',
                "Authorization": `Token ${token}`
             },
             "body": JSON.stringify(bodyData)
           };
    };

}