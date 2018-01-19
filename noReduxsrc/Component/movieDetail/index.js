import React from 'react';
import '../../static/css/style.css'
import {ArticleModel, UserModel,MovieModel} from '../dataModel';
import {Link, HashRouter, BrowserRouter, withRouter, Route, NavLink, Switch} from 'react-router-dom';
import {dateDiff} from '../../Tools';
import Popup from 'react-popup';
import Me from "../Me";


let Styles = {
    index:{
    paddingRight: "0.75rem",
    marginBottom: "0.2rem",
    borderTop: "1px solid #dfdfdf",
    borderBottom: "1px solid #dfdfdf",
    background: "#fff",
    paddingLeft: "0.75rem",
    paddingBottom: "0.3rem",
    marginTop: "90px",
    marginBottom:"50px",


    imgBack:{
        backgroundColor:"#663300",

    }
    
  
  },
  indexList: {
    paddingRight: "0.75rem",
    marginBottom: "0.2rem",
    borderTop: "1px solid #dfdfdf",
    borderBottom: "1px solid #dfdfdf",
    background: "#fff",
    paddingLeft: "0.75rem",
    paddingBottom: "0.3rem",
    
  },
  h4Style: {
    margin: "0.3rem 0",
    color: "#259",
    fontSize: "16px"
  },
  pStyle: {
    margin: "0.3rem 0",
    fontSize: "15px"
  },
  listBlock: {
    margin: 0
  },
  userTitle: {
    dispaly: "inline-blcok"
  },
  unclickStyle:{
    paddingRight: "0.5rem",
    // paddingLeft: "0.5rem",
    margin: "0.3rem 0",
    color: "#0066FF",
    fontSize: "16px"
  },
  clickStyle:{
    display:"none"
  },
  showRest:{
    display:"inline",
    fontSize:"15px"
  },
  unshowRest:{
    display:"none"
  },
}


let header = () => {
  return (
    <header className="bar bar-nav" style={{backgroundColor:"#0099FF",color:"#FFFFFF"}}>
      {/* <a
      className="tab-item open-panel pull-left"
      data-panel="#panel-left-demo"
      > */}
      <a className="button button-link button-nav pull-left back" style={{color:"#FFFFFF"}} href="javascript:history.go(-1)">
      <span className="icon icon-left" style={{color:"#FFFFFF"}}></span>
      返回
  </a>
    {/* </a> */}
      <h1 className="title" style={{color:"#FFFFFF"}}>电影</h1>
    </header>
    )
  }



class MovieDetail extends React.Component {
  constructor(props) {
    super(props);
    var token = UserModel.fetchToken()
    if (!token) {
      location.hash = "/login";
    }
    $.showIndicator();
    this.state = {
      commentList: [],
      movie:'',
      author: '',
      comment: [],
      show:false,
      token: token,
      title: '',
      dcontent: '',
      pageTitle: '发表文章',
      discussion:[],

      // articleId: null
      valuec:'',
      valuet:'',
      valued:'',

    }
  }

  componentDidMount() {
    this.showData();
    let movie_id = this.props.match.params.id;
    // let articleId = this.props.match.params.id;
    // if (articleId) {
    //   this.discussData(articleId);
    //   this.setState({pageTitle: '修改文章', articleId: articleId})
    // }
    
   MovieModel.fetchMovie(movie_id, (data) => {
      this.setState({
          movie:data.content,
        // title:data.title,
        // years:data.years,
        // director:data.director,
        // actor:data.actor,
        // style:data.style,
        // country:data.country,
        // showtime:data.showtime,
        // movietime:data.movietime,
        // imglink:data.imglink,
        // imdb:data.imdb,
        // imdbLink:data.imdbLink,
        // score:data.score,
        // descript:data.descript,

        author: data.content.author,
        comment: data.content.comments,
        discussion: data.content.discussion,
        
      })
      $.hideIndicator();
    }, (err) => {
      console.log(err)
    })
   
  }

  commentList() {
    console.log(this.state.comment)
    let commentList = this.state.comment.map(function (item, index) {
      var reactId = 0;
      return (
        <li className="row" key={index}>
          <div className="col-15" style={{padding: '0.3rem 0'}}>
            <img className="commentAvatar" src={item.avatar} alt=""/>
          </div>
          <div className="col-85 commentList">
            <div style={{fontWeight: 'bold', fontSize: '15px'}}>{item.username}</div>
            <p style={{margin: '0.2rem 0', fontSize: '14px'}}>{item.comment}</p>
            <div style={{fontSize: '12px'}}><span className="icon icon-clock"> </span> {dateDiff(item.createAt)}</div>
          </div>
        </li>
      )
    })

    return (
      <ul>
        {commentList}

      </ul>
    )
  }
  //点赞
  giveStar(e) {
    var _this = this;
    let userToken = UserModel.fetchToken();
    if (!userToken) {
      $.toast("您还没有登录");
      return;
    }
    let thisSpan = e.nativeEvent.target;
    let movieId = this.props.match.params.id;
    let discussionId = thisSpan.getAttribute("data-discussionid");
    let params = {
      userId: userToken,
      movieId: movieId,
      discussionId,
    };
    MovieModel.giveStar(
      params,
      data => {
        if (data.title) {
          thisSpan.style.color = "red";
          $.toast(data.content);
          this.componentDidMount();
        } else {
          thisSpan.style.color = "none";
          $.toast(data.content);
          this.componentDidMount();
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  //设置点赞星样式
  starStyle(starlist) {
    let userToken = UserModel.fetchToken();
    for (let i = 0; i < starlist.length; i++) {
      let cur = starlist[i];
      if (cur == userToken) {
        return { marginRight: "0.5rem", paddingLeft: "0.3rem", color: "red" };
      }
    }
    return { marginRight: "0.5rem", paddingLeft: "0.3rem" };
  }

   //限制字数
   wordControl(word) {
    var t = typeof word;
    var l = word.length;
    console.log(l);
    console.log(t);
    console.log(word)
    if (word.length > 65) {
      word = word.substring(0, 65) + " ...";
    }
    return word;
  }
// discussList() {
//   console.log(this.state.discussion)
//     let discussList = this.state.discussion.map(function (item, index) {
//       var reactId = 0;
//       return (
//         <li className="row" key={index}>
//           <div className="col-15" style={{padding: '0.3rem 0'}}>
//             <img className="commentAvatar" src={item.avatar} alt=""/>
//           </div>
//           <div className="col-85 discussList">
//             <div style={{fontWeight: 'bold', fontSize: '15px'}}>{item.username}</div>
//             <p style={{margin: '0.2rem 0', fontSize: '14px'}}>{item.comment}</p>
//             <div style={{fontSize: '12px'}}><span className="icon icon-clock"> </span> {dateDiff(item.createAt)}</div>
//           </div>
//         </li>
//       )
//     })

//     return (
//       <ul>
//         {discussList}

//       </ul>
//     )
//   }
  discussList() {
    let _this = this;
    let movieId = this.props.match.params.id;
    console.log(this.state.discussion[0])
    let discussList = this.state.discussion.map(function (item, index) {
    // let discussList = this.state.discussList;
    // return discussList.map(function(item, index) {
      var reactId = 0;
      // console.log(item.discussion._id);
      // console.log(item._id);
      return (
        <li className="" style={Styles.indexList} key={item._id}>
          <Link to={"/movie/" + movieId +'/'+ item._id} style={{ display: "block" }}>
            <div className="list">
              <div className="" style={{ paddingTop: "0.4rem" }}>
                <div
                  style={{
                    display: "inline-block",
                    verticalAlign: "top",
                    height: "2rem"
                  }}
                >
                  <img
                    src={item.author.avatar}
                    style={{
                      marginRight: "0.3rem",
                      height: "1.7rem",
                      display: "inline-block"
                    }}
                    alt=""
                  />
                </div>
                <div
                  style={{
                    display: "inline-block",
                    verticalAlign: "top",
                    height: "2rem"
                  }}
                >
                  <div style={{ fontSize: "14px", fontWeight: 600 }}>
                    {/* {item.user.username} */}
                  </div>
                  <div style={{ fontSize: "12px" }}>
                    <span className="icon icon-clock"> </span>{" "}
                    {dateDiff(item.createAt)}
                  </div>
                </div>
              </div>
              <div className="">
                <h4 style={Styles.h4Style}>{item.title}</h4>
              </div>
              <div className="">
                <p style={Styles.pStyle}>{_this.wordControl(item.dcontent)}</p>
              </div>
            </div>
          </Link>
          <div style={{ display: "block", width: "100%", fontSize: "14px" }}>
            <span
              className="icon icon-star"
              style={_this.starStyle(item.star)}
              onClick={e => {
                _this.giveStar(e);
              }}
    
              data-discussionId={item._id}
            >
              {" "}
              {item.star.length}
            </span>
            <span className="icon icon-message"> {item.dcommentNum}</span>
          </div>
        </li>
      );
    });
    return (
            <ul>
              {discussList}
      
            </ul>
          )
  }


  // discussData(key) {
  //   MovieModel.discussion(key, (data)=> {
  //     this.setState({
  //       title: data.content.title,
  //       content: data.content.content,
  //       article: data.content.article_id
  //     })
  //   }, (err)=> {
  //     console.log(err)
  //   })
  // }

  // handlePublish(e) {
  //   let title = this.refs.title.value;
  //   let content = this.refs.content.value;
  //   if (title == '') {
  //     $.alert('标题不能为空')
  //     return;
  //   }
  //   if (content == '') {
  //     $.alert('内容不能为空')
  //     return;
  //   }
  //   let info = {
  //     title: title,
  //     content: content,
  //     token: this.state.token,
  //     article: this.state.articleId ? this.state.articleId : ''
  //   }
  //   MovieModel.pulish(info, (data)=> {
  //     $.toast(data.content);
  //     location.hash = '/movieDetail'
  //   }, (err)=> {
  //     $.alert(err)
  //   })
  // }
 checkLogin(e) {
    let comment = this.refs.commentText.value;
    console.log(comment)
    var usertoken = UserModel.fetchToken()
    if (!usertoken) {
      $.alert('您还没有登录')
    }else if(comment == ''){
      this.setState({valuec: ''});
    }
    if(comment!==''){
      this.setState({valuec:comment});
    }
    return;
  }
  // handleChangeVal(e, key) {
  //   let val = e.target.value;
  //   if (key == 'title') {
  //     this.setState({title: val})
  //   } else {
  //     this.setState({dcontent: val})
  //   }
  // }
  // handleChangeVal(e, key) {
  //   let val = e.target.value;
  //   if (key == 'title') {
  //     if(title == '') {
  //       this.setState({title:val ,valuet: ''});
  //     }
  //    else{this.setState
  //     ({
  //       title:val,
  //       valuet:val,
  //   });}
  //   } else {
  //     if (dcontent == '') {
  //       this.setState({dcontent:val,valued: ''});
  //     }
  //    else{this.setState
  //     ({
  //       dcontent:val,
  //       valued:val,
  //   });}
  //   }
  // }

  handleChangeValt() {
    let title = this.refs.title.value;
    console.log(title)
    var usertoken = UserModel.fetchToken()
    if (!usertoken) {
      $.alert('您还没有登录')
    }else
    if(title == '') {
      this.setState({title:title ,valuet: ''});
    }
   else{this.setState
    ({
      valuet:title,
  });}
  }
  handleChangeVald() {
    let dcontent = this.refs.dcontent.value;
    console.log(dcontent)
    var usertoken = UserModel.fetchToken()
    if (!usertoken) {
      $.alert('您还没有登录')
    }else
   
  if (dcontent == '') {
      this.setState({dcontent:dcontent,valued: ''});
    }
   else{this.setState
    ({
      valued:dcontent,
  });}
  }

  handleCancel() {
    this.setState({
      title: '',
      dcontent: ''
    })
    location.hash = '/movie/'+this.state.movie._id
  }
dReset(){
  this.setState({title:'',dcontent:'',valuet:'',valued:''})
}

  checkLogin(e) {
    let comment = this.refs.commentText.value;
    console.log(comment)
    var usertoken = UserModel.fetchToken()
    if (!usertoken) {
      $.alert('您还没有登录')
    }else if(comment == ''){
      this.setState({valuec: ''});
    }
    if(comment!==''){
      this.setState({valuec:comment});
    }
    return;
  }
cReset(){
  this.setState({valuec: ''});
}
  handleComment() {
    let comment = this.refs.commentText.value;
    console.log(this.refs.commentText)
    if (comment == '') {
      $.toast('评论不能为空');
      return;
    }
    let movieId = this.props.match.params.id;
    let userId = UserModel.fetchToken();
    if (userId) {
      let params = {
        userId: userId,
        movieId: movieId,
        comment: comment
      }
        MovieModel.comment(params, (data) => {

        console.log(data);
        $.toast(data.content);
        this.refs.commentText.value = '';
        this.componentDidMount();
      }, (err) => {
        console.log(err)
      })
    } else {
      $.alert('您还没有登录')
    }
  }



  handleDiscussion() {
    let title = this.refs.title.value;
    let dcontent = this.refs.dcontent.value;
    if (title == '') {
      $.alert('标题不能为空')
      return;
    }
    if (dcontent == '') {
      $.alert('内容不能为空')
      return;
    }
    let movieId = this.props.match.params.id;
    let userId = UserModel.fetchToken();
    if (userId) {
     
      let params = {
        title:title,
        dcontent:dcontent,
        userId: userId,
        movieId: movieId,
        token: this.state.token,
      }
        MovieModel.discussion(params, (data) => {
  $.toast(data.content);

  location.hash = '/movie/'+this.state.movie._id
  this.refs.title.value = '';
  this.refs.dcontent.value = '';
  this.componentDidMount();
  
}, (err)=> {
  $.alert(err)
})
} else {
      $.alert('您还没有登录')
    }
  }

  //限制字数
  wordControl(word) {
  var t = typeof word;
  // var t = typeof str;
  if(t === "object"){
    var str = word.join("");
    console.log(str) 
    console.log(str.length)
    if(str ===""){
      let word="暂无简介";
      
      return word;
    }else if (str.length > 150) {
            word = str.substring(0, 150);
            return word;
          }else{
            word = str;
            return word;
          }
         
  }
   
  }
  mainActor(actor) {
  var t = typeof actor;
  if(t === "object"){
    if(actor.length > 7){
      actor = actor.slice(0,7);
      return actor;
          }else{
            return actor;
          }
         
  }
}
   //限制字数
   restControl(word) {
    var t = typeof word;
    // var t = typeof str;
    if(t === "object"){
      var str = word.join("");
      console.log(str) 
      console.log(str.length)
      if(str ===""){
        let word="暂无简介"
          return word;
      }else if (str.length > 150) {
              word = str.substring(150, str.length);
              return word;
            }else{
              word = str;
              return word;
            }
          }
  }
  showData(e) {
    if(e)  {
        this.setState({
          show:true,
        });
      }
  }
 

  render() {
    const show = this.state.show;
   console.log(this.refs.title)
   let valuec = this.state.valuec;
   let valuet = this.state.valuet;
   let valued = this.state.valued;
   console.log(valuec)
   console.log(valuet)
   console.log(valued)
  //  const value = this.refs.commentText
  //  console.log(value)
  var compublish = valuec!==''?  "button button-fill button-warning close-popup" : "button button-fill button-warning ";
  var dispublish = valuet!==''?  (valued!==''?"button button-fill button-warning close-popup":"button button-fill button-warning ") : "button button-fill button-warning ";
    // var compublish = this.refs.commentText.value !== ''?  "button button-fill button-warning close-popup" : "button button-fill button-warning";
    var ifClick = show===true?  Styles.clickStyle : Styles.unclickStyle;
    var ifShow = show===true?  Styles.showRest : Styles.unshowRest;
    // var dispublish = dpublish===1?  "button button-fill button-warning close-popup" : "button button-fill button-warning";
    // var compublish = cpublish===1?  "button button-fill button-warning close-popup" : "button button-fill button-warning";
    console.log(show)
    console.log(dispublish)
    console.log(compublish)
    var mm = this.state.movie.actor;
    return (
      <div className="page-group">
      {/* <div data-log="log" id="page-fixed-tab"> */}
      <div className="pagr page-current" id="page-fixed-tab">
          
          <div className="popup popup-about">
  <div className="content-block">
  <div style={{float:"left"}}>
  <p><Link to={"/movie/"+this.state.movie._id}  className="close-popup">取消</Link></p></div>
  <div style={{float:"right"}}>
  <a onClick={() => {
            this.handleComment()
          }} className={compublish}>发表</a></div>
          <div style={{clear:"both"}}>
          <input type="text" style={{border: 'none'}} ref="commentText" className="col-75 commentInput"
          placeholder="说点什么吧" onChange={()=>{this.checkLogin()}}/> </div>

</div>
</div>
<div className="popup popup-discussion">
  <div className="content-block">

  <div style={{float:"left"}}>
  <p><Link to={"/movie/"+this.state.movie._id}  className="close-popup">取消</Link></p></div>
  <div style={{float:"right"}}>
  <a onClick={() => {
            this.handleDiscussion()
          }} className={dispublish}>发表</a></div>
          <div style={{clear:"both"}}>
          {/* <input type="text" style={{border: 'none'}} ref="discussText" className="col-75 commentInput"
                 placeholder="说点什么吧" onChange={this.checkLogin}/> </div> */}
                 <ul>
              <li >
                <div className="item-content">
                  <div className="item-inner" style={{borderBottom: "2px solid #eee"}}>
                    <div className="item-input">
                      <input type="text" ref="title" placeholder="请输入标题"  onChange={
                       () =>{ this.handleChangeValt()}
                      }/>
                    </div>
                  </div>
                </div>
              </li>
              <li className="align-top">
                <div className="item-content">
                  <div className="item-inner">
                    <div className="item-input">
                      <textarea placeholder="请输入内容" ref="dcontent" style={{height: "13rem"}} onChange={
                        () =>{ this.handleChangeVald()}
                      } />
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            </div>

  {/* <div>
        <header className="bar bar-nav">
          <h1 className='title'>{this.state.pageTitle}</h1>
        </header>
        <div className="content">
          <div className="list-block">
            <ul>
              <li >
                <div className="item-content">
                  <div className="item-inner" style={{borderBottom: "2px solid #eee"}}>
                    <div className="item-input">
                      <input type="text" ref="title" placeholder="请输入标题" value={this.state.title} onChange={(e)=> {
                        this.handleChangeVal(e, 'title')
                      }}/>
                    </div>
                  </div>
                </div>
              </li>
              <li className="align-top">
                <div className="item-content">
                  <div className="item-inner">
                    <div className="item-input">
                      <textarea placeholder="请输入内容" ref="content" style={{height: "13rem"}} onChange={(e)=> {
                        this.handleChangeVal(e, 'content')
                      }} value={this.state.content}/>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="content-block">
            <div className="row">
              <div className="col-50"><a className="button button-big button-fill button-danger" onClick={(e)=> {
                this.handleCancel(e)
              }}>取消</a></div>
              <div className="col-50"><a className="button button-big button-fill button-success" onClick={(e)=> {
                this.handlePublish(e)
              }}>发表</a></div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
    </div>


    
      <div 
      style={{position: "absolute", height: "50px", width: "100%", top: "0px", zIndex: '2001'}}>{header()}</div>
      <div className="content native-scroll" style={Styles.index}>
  
        {/* <div className="content" dataType="">        */}
      <div >

        {/* <main className="detailContent"> */}
         
          <div>
          <span className="clearPt"style={{fontSize: "30px"}}>{this.state.movie.title}{this.state.movie.years}</span>
            <div>
              <div style={{
            width:"25%",
            height: "100%",
            float:"left",
          }}>
          <img
          src={this.state.movie.imglink}
          style={{
            width:"6rem",
            height: "9rem",
          }}
          alt=""
        />
        </div >
        <div style={{
            width:"75%",
            height: "100%",
            float:"left",
            fontSize: "18px"
          }}>
        <li>
        <span style={{color:"#888888"}}>导演：</span>
        <span>{this.state.movie.director}</span></li>
        <li>
        <span style={{color:"#888888"}}>主演：</span>
        <span>{this.mainActor(this.state.movie.actor)}</span></li>
        <li>
        <span style={{color:"#888888"}}>类型：</span>
        <span>{this.state.movie.style}</span></li>
        <li>
        <span style={{color:"#888888"}}>制片国家/地区：：</span>
        <span>{this.state.movie.country}</span></li>
        <li>
        <span style={{color:"#888888"}}>上映日期：</span>
        <span>{this.state.movie.showtime}</span></li>
        <li>
        <span style={{color:"#888888"}}>片长：</span>
        <span>{this.state.movie.movietime}</span></li>
        <li>
        <span style={{color:"#888888"}}>IMDb链接：</span>
        <a href={this.state.movie.imdbLink}>{this.state.movie.imdb}</a></li>
        </div>
        </div>
          </div>

          <hr/>
          <div className="movie">
            {this.state.content}
          </div>
          <hr/>
          <div style={{clear:"both",paddingTop:"2rem"}}>
          <div>{this.state.movie.title}的剧情简介</div>
          <span style={{fontSize:"15px"}}>{this.wordControl(this.state.movie.description)}</span>
          <a onClick={(e) => {
                this.showData(e)
              }} style={ifClick}>展开</a>
          <span style={ifShow}>{this.restControl(this.state.movie.description)}</span>
          </div>
          
            <div className="buttons-tab fixed-tab" style={{top:"50px"}}>
      <a href="#tab1" className="tab-link active button">评论</a>
      <a href="#tab2" className="tab-link button">讨论区</a>
    </div>
    


 
    
    
          <div className="tabs" style={{paddingTop:"1rem"}}>
            
      <div id="tab1" className="tab active" style={{paddingTop:"2rem"}}>
        {/* <div className="content-block"> */}
       <div style={{float:"left"}}>
          <h3  className="clearPL">评论:</h3>
          </div>
          <div style={{float:"right"}}>
          <Link to={"/movie/"+this.state.movie._id} className="button open-popup" data-popup=".popup-about" style={{weight:"2rem"}} onClick={()=>{this.cReset()}}>写短评</Link></div>
            <div style={{clear:"both",paddingTop:"1rem"}}>
            {this.commentList()}
            </div>
           
            </div> <div id="tab2" className="tab" style={{paddingTop:"2rem"}}>
            <div style={{float:"left"}}>
          <h3  className="clearPL">讨论:</h3>
          </div>
          <div style={{float:"right"}}>
          <Link to={"/movie/"+this.state.movie._id} className="button open-popup" data-popup=".popup-discussion" style={{weight:"2rem"}} onClick={()=>{this.dReset()}}>发讨论</Link></div>
               <div style={{clear:"both",paddingTop:"1rem"}}>
            {this.discussList()}</div>
              </div></div>
            
            
    

{/* <div id="page-fixed-tab" className="page page-current">
<div className="content native-scroll">
    <p>其他内容区域</p>
    <p>其他内容区域</p>
    <p>其他内容区域</p>
    <p>其他内容区域</p>
    <p>其他内容区域</p>
    <div className="buttons-tab fixed-tab" data-offset="44" style={{top: "0px"}}>
      <a href="#tab1" className="tab-link button active">全部</a>
      <a href="#tab2" className="tab-link button ">待付款</a>
      <a href="#tab3" className="tab-link button">待发货</a>
    </div>

    <div className="tabs">
      <div id="tab1" className="tab">
        <div className="content-block">
          <div className="buttons-row">
            <a href="#tab1-1" className="tab-link active button">Tab 1</a>
            <a href="#tab1-2" className="tab-link button">Tab 2</a>
            <a href="#tab1-3" className="tab-link button">Tab 3</a>
          </div>
          <div className="tabs">
            <p className="tab active" id="tab1-1">This is tab 1-1 content</p>
            <p className="tab" id="tab1-2">This is tab 1-2 content</p>
            <p className="tab" id="tab1-3">13855589778</p>
          </div>
        </div>
      </div>
      <div id="tab2" className="tab active">
        <div className="content-block">
          <p style={{height:"600px"}}>This is tab 2 content start</p>
          <p>This is tab 2 content end</p>
        </div>
      </div>
      <div id="tab3" className="tab">
        <div className="content-block">
          <p style={{height:"600px"}}>This is tab 3 content start</p>
          <p>This is tab 3 content end</p>
        </div>
      </div>
    </div>
  </div>
  </div> */}
         

            {/* </div> */}
            {/* </div> */}
            {/* <div id="tab2" className="tab">
            <div className="content-block">
              <p style={{height:"600px"}}>This is tab 2 content start</p>
              <p >This is tab 2 content end</p>
            </div>
          </div> */}


          {/* <div className="content native-scroll">
    <p>其他内容区域</p>
    <p>其他内容区域</p>
    <p>其他内容区域</p>
    <p>其他内容区域</p>
    <p>其他内容区域</p>
    <div className="buttons-tab fixed-tab" data-offset="44">
      <a href="#tab1" className="tab-link active button">全部</a>
      <a href="#tab2" className="tab-link button">待付款</a>
      <a href="#tab3" className="tab-link button">待发货</a>
    </div>

    <div className="tabs">
      <div id="tab1" className="tab active">
        <div class="content-block">
          <div class="buttons-row">
            <a href="#tab1-1" className="tab-link active button">Tab 1</a>
            <a href="#tab1-2" className="tab-link button">Tab 2</a>
            <a href="#tab1-3" className="tab-link button">Tab 3</a>
          </div>
          <div className="tabs">
            <p className="tab active" id="tab1-1">This is tab 1-1 content</p>
            <p className="tab" id="tab1-2">This is tab 1-2 content</p>
            <p className="tab" id="tab1-3">13855589778</p>
          </div>
        </div>
      </div>
      <div id="tab2" className="tab">
        <div className="content-block">
          <p style={{height:"600px"}}>This is tab 2 content start</p>
          <p>This is tab 2 content end</p>
        </div>
      </div>
      <div id="tab3" className="tab">
        <div className="content-block">
          <p style={{height:"600px"}}>This is tab 3 content start</p>
          <p>This is tab 3 content end</p>
        </div>
      </div>
    </div>
  </div> */}
      
                   {/* <div class="content">
    <p>其他内容区域</p>
    <p>其他内容区域</p>
    <p>其他内容区域</p>
    <p>其他内容区域</p>
    <p>其他内容区域</p>
    <div className="buttons-tab fixed-tab" dataOffSet="44">
      <a href="#tab1" className="tab-link active button">全部</a>
      <a href="#tab2" className="tab-link button">待付款</a>
      <a href="#tab3" className="tab-link button">待发货</a>
    </div>

    <div className="tabs">
      <div id="tab1" className="tab active">
        <div className="content-block">
          <div className="buttons-row">
            <a href="#tab1-1" className="tab-link active button">Tab 1</a>
            <a href="#tab1-2" className="tab-link button">Tab 2</a>
            <a href="#tab1-3" className="tab-link button">Tab 3</a>
          </div>
          <div className="tabs">
            <p className='tab active' id='tab1-1' style={{height:'600px'}}>This is tab 1-1 content</p>
            <p className='tab' id='tab1-2'>This is tab 1-2 content</p>
            <p className='tab' id='tab1-3'>13855589778</p>
          </div>
        </div>
      </div>
      <div id="tab2" className="tab">
        <div className="content-block">
          <p style={{height:"600px"}}>This is tab 2 content start</p>
          <p >This is tab 2 content end</p>
        </div>
      </div>
      <div id="tab3" className="tab">
        <div className="content-block">
          <p style={{height:"600px"}}>This is tab 3 content start</p>
          <p >This is tab 3 content end</p>
        </div>
      </div>
    </div>
  </div> */}
           
              
        {/* </main> */}
        {/* <div className="comment row no-gutter" style={{margin: 'none', zIndex: '2002'}}>
          <input type="text" style={{border: 'none'}} ref="commentText" className="col-75 commentInput"
                 placeholder="说点什么吧" onChange={this.checkLogin}/> */}
                 {/* <a onClick={() => {
            this.handleComment()
          }} className="button" style={{weight:"2rem"}}>写短评</a> */}
        </div>
      {/* </div> */}
      </div>
      </div>
      </div>

    )
  }
}
// $(document).on("pageInit", function() {
//   $('.buttons-tab').fixedTab({offSet:44});
// });
export default MovieDetail;