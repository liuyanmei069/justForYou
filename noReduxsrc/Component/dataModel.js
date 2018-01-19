const USER_TOKEN = 'userToken';
 const API = 'http://localhost:4545/'
//const API = 'http://114.215.80.72:4545/'
/**
 * fetch请求数据Model
 * @param _method
 * @param _api
 * @param _params
 * @param _onSuccess
 * @param _onError
 * @private
 */
function _request(_method, _api, _params, _onSuccess, _onError) {
  // console.log(_method)
  let _options = {
    method: _method,
    mode: "cors",
    headers: {
      // 'Accept':'application/json',
      'Content-Type': 'application/json',
    },
    body: (_method == 'GET') ? null : JSON.stringify(_params)
    // body: (_method == 'GET') ? null : _params
  };
  console.log(_options,'123456');
  if (_method.toLowerCase() == 'get') {
    _api += Tools._getSearchFromObject(_params)
  }
  fetch(_api, _options)
    .then(Tools.checkStates)
    .then(Tools.parseJSON)
    .then((data) => {
      _onSuccess(data)
    })
    .catch((err) => {
      console.log(err);
      if (err.state == 401) {
        alert("登录过期,重新登录")
        location.hash = "login";
        return
      }
      if (err.response) {
        err.response.json().then((data) => {
          console.log(data)
          if (data.message)
            alert(data.message)
        })
      }
    })
}

// Upload Image
function _upload(_api, _formdata, _onSuccess, _onError) {

  // Manual XHR & FormData
  let oReq = new XMLHttpRequest();
  console.log("33333333",oReq);
  oReq.open("POST", _api);
  oReq.onload = (e) => {
    let ret = JSON.parse(oReq.responseText)
    if (oReq.status == 200) {
      _onSuccess(ret);
    } else {
      let err = ret;
      if (err.message) alert(err.message)
      //_onError(err);
    }
  };
  // oReq.upload.onprogress = updateProgress;
  oReq.send(_formdata);
  console.log(_formdata)
}


let Tools = {
  checkStates: function (response) {
    if (response.ok) {
      return response
    } else {
      let error = new Error(response.statusText);
      error.state = response.status;
      error.response = response;
      throw error;
    }
  },
  parseJSON: function (response) {
    return response.json();
  },
  _getSearchFromObject: function (param, key) {

    if (param == null) return '';
    let _search = '?';
    for (let key in param) {
      _search += `${key}=${encodeURIComponent(param[key])}&`
    }
    return _search.slice(0, -1);
  },
}


let UserModel = {
  storeToken: (token) => {
    localStorage.setItem(USER_TOKEN, token);
  },
  fetchToken: () => {
    return localStorage.getItem(USER_TOKEN);
  },
  register: (_params, _success, _error) => {
    _request('POST', `${API}user/register`, _params, _success, _error)
  },
  login: (_params, _success, _error) => {
    _request('POST', `${API}user/login`, _params, _success, _error)
  },
  getUserInfo: (_params, _success, _error) => {
    _request('GET', `${API}user/getUserInfo`, _params, _success, _error);
  },
  uploadAvatar: (_params, _success, _error) => {
    _upload(`${API}user/uploadAvatar`, _params, _success, _error)
  },
  fetchArticle: (_params, _success, _error) => {
    _request('GET', `${API}user/fetchArticle`, _params, _success, _error)
  }
}
let ArticleModel = {
  pulish: (_params, _success, _error) => {
    _request('POST', `${API}article/pulish`, _params, _success, _error)
  },
  fetchList: (_params, _success, _error) => {
    _request('GET', `${API}article/fetchList`, _params, _success, _error)
  },
  fetchArticle: (_id, _success, _error) => {
    _request('GET', `${API}article/fetchArticle/${_id}`, null, _success, _error)
  },
  giveStar: (_params, _success, _error) => {
    _request('POST', `${API}article/giveStar`, _params, _success, _error)
  },
  comment: (_params, _success, _error) => {
    _request('POST', `${API}article/comment`, _params, _success, _error)
  }
}
let MovieModel = {
  movieList: (_params, _success, _error) => {
    _request('POST', `${API}movie/movieList`, _params, _success, _error)
  },
  goingmovie: (_params, _success, _error) => {
    _request('GET', `${API}movie/goingmovie`, _params, _success, _error)
  },
  willmovie: (_params, _success, _error) => {
    _request('GET', `${API}movie/willmovie`, _params, _success, _error)
  },
  hotmovie: (_params, _success, _error) => {
    _request('GET', `${API}movie/hotmovie`, _params, _success, _error)
  },
  fetchMovie: (_id, _success, _error) => {
    _request('GET', `${API}movie/fetchMovie/${_id}`, null, _success, _error)
  },
  searchMovie:(_params, _success, _error) => {
    _request('POST', `${API}movie/searchMovie`, _params, _success, _error)
  },
  comment: (_params, _success, _error) => {
    _request('POST', `${API}movie/comment`, _params, _success, _error)
  },
  discussion: (_params, _success, _error) => {
    _request('POST', `${API}movie/discussion`, _params, _success, _error)
  },
  giveStar: (_params, _success, _error) => {
    _request('POST', `${API}movie/giveStar`, _params, _success, _error)
  },
  fetchDiscuss: (_id1,_id2, _success, _error) => {
    _request('GET', `${API}movie/fetchDiscuss/${_id1}/${_id2}`, null, _success, _error)
  },
  hotDiscuss: (_params, _success, _error) => {
    _request('GET', `${API}movie/hotDiscuss`,_params, _success, _error)
  },
  dcomment: (_params, _success, _error) => {
    _request('POST', `${API}movie/dcomment`, _params, _success, _error)
  },
}

export {UserModel, ArticleModel,MovieModel}
