import React from 'react';
import {render} from 'react-dom';
import {Link, HashRouter, BrowserRouter, withRouter, Route, NavLink, Switch} from 'react-router-dom';

import AsyncLoadModule from './AsyncComponent';
import 'react-hot-loader/patch';
function create() {
  $.closePanel();
  setTimeout(() => {
    window.location.hash = '/create'
  }, 800)
}

// let header = () => {
// return (
//   <header className="bar bar-nav">
//     <a
//     className="tab-item open-panel pull-left"
//     data-panel="#panel-left-demo"
//     >
//       <span className="icon icon-me" />
//   </a>
//     <h1 className="title">标题</h1>
//   </header>
//   )
// }

let nav = () => {
  return (
    <nav className="bar bar-tab">
      <NavLink className="tab-item" activeClassName="active" to="/home">
        <span className="icon icon-home active"></span>
        <span className="tab-label">主页</span>
      </NavLink>
      <i className="tab-item" onClick={create}>
        <span className="icon icon-edit"></span>
        <span className="tab-label">发表</span>
      </i>
      <NavLink className="tab-item" activeClassName="active" to="/movie">
        <span className="icon icon-computer"></span>
        <span className="tab-label">电影</span>
      </NavLink>
      <NavLink className="tab-item" activeClassName="active" to="/indexList">
        <span className="icon icon-message"></span>
        <span className="tab-label">热评</span>
      </NavLink>
      <i className="tab-item open-panel" data-panel="#panel-left-demo">
        <span className="icon icon-me"></span>
        <span className="tab-label">我</span>
      </i>
    </nav>

  )
}


class RouteConfig extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  WrapIndexList(props) {
    return (
      <AsyncLoadModule moduleId="route.indexlist" load={() => import('../Component/IndexList')}>
        {(Comp) => <Comp {...props} title="Page Title: indexlist"/>}
      </AsyncLoadModule>
    )
  }
  WrapHome(props) {
    return (
      <AsyncLoadModule moduleId="route.home" load={() => import('../Component/Home')}>
        {(Comp) => <Comp {...props} title="Page Title: home"/>}
      </AsyncLoadModule>
    )
  }
  Wrapmovie(props) {
    return (
      <AsyncLoadModule moduleId="route.movie" load={() => import('../Component/Movie')}>
        {(Comp) => <Comp {...props} title="Page Title: movie"/>}
      </AsyncLoadModule>
    )
  }

  WrapArticleDetail(props) {
    return (
      <AsyncLoadModule moduleId="route.articleDetail" load={() => import('../Component/articleDetail')}>
        {(Comp) => <Comp {...props} title="Page Title: articleDetail"/>}
      </AsyncLoadModule>
    )
  }

  WrapMovieDetail(props) {
    return (
      <AsyncLoadModule moduleId="route.movieDetail" load={() => import('../Component/movieDetail')}>
        {(Comp) => <Comp {...props} title="Page Title: movieDetail"/>}
      </AsyncLoadModule>
    )
  }
  WrapDiscussion(props) {
    return (
      <AsyncLoadModule moduleId="route.discussion" load={() => import('../Component/movieDetail/discussion')}>
        {(Comp) => <Comp {...props} title="Page Title: discussion"/>}
      </AsyncLoadModule>
    )
  }

  WrapCreate(props) {
    return (
      <AsyncLoadModule moduleId="route.articleDetail" load={() => import('../Component/Create')}>
        {(Comp) => <Comp {...props} title="Page Title: create"/>}
      </AsyncLoadModule>
    )
  }
  

  WrapMe(props) {
    return (
      <AsyncLoadModule moduleId="route.me" load={() => import('../Component/Me')}>
        {(Comp) => <Comp {...props} title="Page Title: me"/>}
      </AsyncLoadModule>
    )
  }

  WrapLogin(props) {
    return (
      <AsyncLoadModule moduleId="route.login" load={() => import('../Component/Login')}>
        {(Comp) => <Comp {...props} title="Page Title: login"/>}
      </AsyncLoadModule>
    )
  }

  WrapMyArticle(props) {
    return (
      <AsyncLoadModule moduleId="route.myarticle" load={() => import('../Component/Me/myArticle')}>
        {(Comp) => <Comp {...props} title="Page Title: WrapMyArticle"/>}
      </AsyncLoadModule>
    )
  }

  WrapSearchMovie(props){
    return (
      <AsyncLoadModule moduleId="route.searchmovie" load={() => import('../Component/Home/searchMovie')}>
        {(Comp) => <Comp {...props} title="Page Title: WrapSearchMovie"/>}
      </AsyncLoadModule>
    )
  }
  WrapshowDetail(props){
    return (
      <AsyncLoadModule moduleId="route.showdetail" load={() => import('../Component/Home/showDetail')}>
        {(Comp) => <Comp {...props} title="Page Title: WrapShowDetail"/>}
      </AsyncLoadModule>
    )
  }

  render() {
    return (
      <HashRouter>
        <div data-log="one">
          <div data-log="two">
            <div>
              <Switch>
                <Route exact path="/" component={this.WrapHome}/>
                <Route exact name="home" path="/home" component={this.WrapHome}/>
                <Route exact name="indexlist" path="/indexlist" component={this.WrapIndexList}/>
                <Route exact name="movie" path="/movie" component={this.Wrapmovie}/>
                <Route exact name="articleDetail" path="/indexList/:id" component={this.WrapArticleDetail}/>
                <Route exact name="movieDetail" path="/movie/:id" component={this.WrapMovieDetail}/>
                <Route exact name="discussion" path="/movie/:movieid/:discussionid" component={this.WrapDiscussion}/>
                <Route exact path="/create" component={this.WrapCreate}/>
                <Route exact path="/create/:id" component={this.WrapCreate}/>
                <Route exact path="/me" component={this.WrapMe}/>
                <Route exact path="/login" component={this.WrapLogin}/>
                <Route exact path="/myArticle" component={this.WrapMyArticle}/>
                <Route exact name="/searchMovie" path="/searchMovie" component={this.WrapSearchMovie}/>
                <Route exact name="/showDetail" path="/showDetail/:all" component={this.WrapshowDetail}/>
              </Switch>
            </div>
          </div>
          <div
            style={{position: "absolute", height: "50px", width: "100%", bottom: "0px", zIndex: '2001'}}>{nav()}</div>
          {/* <div 
            style={{position: "absolute", height: "50px", width: "100%", top: "0px", zIndex: '2001'}}>{header()}</div> */}
        </div>
      </HashRouter>

    )
  }
}
export default RouteConfig;

