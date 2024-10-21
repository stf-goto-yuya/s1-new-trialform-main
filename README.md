# S1トライアル申し込みフォーム

site: 1711467885116175974
role: 796942796483806260
user: 1711467915818481899

```
var axios = require('axios');

var config = {
  method: 'get',
  url: 'https://apne1-1001.sentinelone.net/web/api/v2.0/rbac/roles?ApiToken=rqrJPzfiPP3n32aRsf0IdpyAs9b5LKVpnyKHF8fIytUXSBYatMl1qw1Nq6FBMlQN0O40oMJTjFucxvmP&name=Admin',
  headers: { }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

```

```
var axios = require('axios');
var data = JSON.stringify({
  "scope": "site",
  "scopeRoles": [
    {
      "id": "1711467885116175974",
      "roleId": "796942796483806260"
    }
  ],
  "siteRoles": [
    {
      "id": "1711467885116175974",
      "roleId": "796942796483806260"
    }
  ]
});

var config = {
  method: 'put',
  url: 'http://localhost:3000/users/s1/1711467915818481899',
  headers: { 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODcyNTU4MjYsImV4cCI6MTY4NzI4NDYyNn0.3l6p5nOmYz8LjoQ8mHuwTUX438-7Mge5d2R9Yt0a7Vo', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});


```
