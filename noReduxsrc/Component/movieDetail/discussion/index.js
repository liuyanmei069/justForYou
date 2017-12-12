import React from 'react';
import '../../../static/css/style.css'
import {ArticleModel, UserModel,MovieModel} from '../../dataModel';
import {Link, HashRouter, BrowserRouter, withRouter, Route, NavLink, Switch} from 'react-router-dom';
import {dateDiff} from '../../../Tools';
import Popup from 'react-popup';
import Me from "../../Me";




class Discussion extends React.Component {
  constructor(props) {
    super(props);
    $.showIndicator();
    this.state = {
      dcommentList: [],
      title: '',
      author: '',
      discussMovie:'',
      dcomment: []
    }
  }

  componentDidMount() {
    // let movie_id = this.props.match.params.id;
    let discussion_id = this.props.match.params.id;
    console.log(discussion_id);
    
    MovieModel.fetchDiscuss(discussion_id, (data) => {
      this.setState({
        discussMovie:data.content,   
        // title: data.content,
        // discussion: data.content.discussion,
        // author: data.content.discussion.author,
        author: data.content.author,
        dcomment: data.content.dcomments,
      
    })

      $.hideIndicator();
    }, (err) => {
      console.log(err)
    })
    
  }

  dcommentList() {
    console.log(this.state.dcomment)
    console.log(this.state.author)

    let dcommentList = this.state.dcomment.map(function (item, index) {
      var reactId = 0;
      return (
        <li className="row" key={index}>
          <div className="col-15" style={{padding: '0.3rem 0'}}>
            <img className="commentAvatar" src={item.avatar} alt=""/>
          </div>
          <div className="col-85 commentList">
            <div style={{fontWeight: 'bold', fontSize: '15px'}}>{item.username}</div>
            <p style={{margin: '0.2rem 0', fontSize: '14px'}}>{item.dcomment}</p>
            <div style={{fontSize: '12px'}}><span className="icon icon-clock"> </span> {dateDiff(item.createAt)}</div>
          </div>
        </li>
      )
    })

    return (
      <ul>
        {dcommentList}
      </ul>
    )
  }

  checkLogin() {
    var usertoken = UserModel.fetchToken()
    if (!usertoken) {
      $.alert('您还没有登录')
    }
    return;
  }

  handleComment() {
    let dcomment = this.refs.dcommentText.value;
    if (dcomment == '') {
      $.toast('评论不能为空');
      return;
    }
    let movieId = this.props.match.params.id;
    let userId = UserModel.fetchToken();
    if (userId) {
      let params = {
        userId: userId,
        movieId: movieId,
        dcomment: dcomment
      }
      MovieModel.dcomment(params, (data) => {
        console.log(data);
        $.toast(data.content);
        this.refs.dcommentText.value = '';
        this.componentDidMount();
      }, (err) => {
        console.log(err)
      })
    } else {
      $.alert('您还没有登录')
    }
  }

  render() {
    console.log(this.state.discussMovie.title)
    return (
      <div>

        <main className="detailContent">
          <h2 className="clearPt">{this.state.discussMovie.title}</h2>
          <div>
            <span className="font12 marR">作者:{this.state.author.username}</span>
            <span className="font12">发表于:{dateDiff(this.state.discussMovie.createAt)}</span>
          </div>
          <hr/>
          <div className="article">
            {this.state.discussMovie.dcontent}
          </div>
          <hr/>
          <div>
            <h3 className="clearPL">评论:</h3>
            {this.dcommentList()}
          </div>
        </main>
        <div className="comment row no-gutter" style={{margin: 'none', zIndex: '2002'}}>
          <input type="text" style={{border: 'none'}} ref="dcommentText" className="col-75 commentInput"
                 placeholder="说点什么吧" onChange={this.checkLogin}/>
          <a onClick={() => {
            this.handleComment()
          }} className="button col-25 button-fill button-big">评论</a>
        </div>
      </div>

    )
  }
}
export default Discussion;