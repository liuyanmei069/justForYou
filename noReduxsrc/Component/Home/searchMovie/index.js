// import React from "react";
import { Link } from "react-router-dom";
import { UserModel, ArticleModel,MovieModel } from "../../dataModel";
import "../../../static/css/style.css";
import Me from "../../Me";
// import SearchBar from "../";
import React, { Component } from 'react';

import { dateDiff } from "../../../Tools";
let Styles = {
  indexList: {
    paddingRight: "0.75rem",
    marginBottom: "0.2rem",
    borderTop: "1px solid #dfdfdf",
    borderBottom: "1px solid #dfdfdf",
    background: "#fff",
    paddingLeft: "0.75rem",
    paddingBottom: "0.3rem",
    // display: "inline",
    // verticalAlign:"top",
    
    
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
  }
};
class SearchBar extends React.Component {
    constructor(props) {
      super(props);
      this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
    }
    
    handleFilterTextInputChange(e) {
      //this.props.onFilterTextInput(e.target.value);
      this.props.onFilterTextInput(e.target.value);
      console.log(e.target.value);
    } 
    render() {
      const info = this.props.info;
      console.log(info)
      return (
        // <form style={{marginTop:'50px'}}>
        //   <input
        //     type="text"
        //     placeholder="Search..."
        //     value={this.props.filterText}
        //     onChange={this.handleFilterTextInputChange}
        //   />
        // </form>
      
        <div>
<div className="searchbar row">
    <div className="search-input col-80">
      {/* <div className="bar bar-header-secondary" >
        <div className="searchbar"> */}

          {/* <div className="search-input"> */}
            {/* <label  className="icon icon-search" htmlFor="search"></label> */}
            <label  className="icon icon-search" htmlFor="search"></label>
            <input  ref="info"  onChange={(e)=>{this.handleFilterTextInputChange(e)}}  type="search" id='search' placeholder='输入关键字...'/>
            
          </div>
{/*       
        </div>
        
        </div> */}
        {/* <a className="button button-fill button-primary col-20">搜索</a> */}
        {/* <button onClick={(e)=>{this.handleFilterTextInputChange(e)}} className="col-20">搜索</button> */}
        <Link to={'/home'} className="col-20">取消</Link>
        </div>
      </div>
    //   </div>
      );
    }
  }
// class SearchBar extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
//   }
  
//   handleFilterTextInputChange(e) {
//     //this.props.onFilterTextInput(e.target.value);
//     console.log(e.target.value);
//   } 
//   render() {
//     return (
//       <form>
//         <input
//           type="text"
//           placeholder="Search..."
//           value={this.props.filterText}
//           onChange={this.handleFilterTextInputChange}
//         />
//       </form>
//     );
//   }
// }
class searchMovie extends React.Component {
  constructor(props) {
    super(props);
    this.searchData = this.searchData.bind(this);
    this.state = {
      list: [],
      info:'',
      defaultTop: null,
    };
  }
  componentDidMount() {
    console.log("0-0-");
      this.searchData();
      this.reseat();
    console.log("0909");
  }
  reseat() {
    let defaultTop = this.refs.outerScroller.offsetTop;
    this.setState({
      defaultTop: defaultTop
    });
    this.pullToRefresh(
      this.refs.outerScroller,
      this.refs.pullToRefreshBox,
      this.refs.scrollList,
      this.refs.preloader,
      this.refs.pullToRefreshArrow
    );
  }
  //获取数据
  searchData(e) {
    // let info = this.refs.info.value;
    let info = e;
    console.log(info);
    let movieInfo = {
        info: info,
      }
      console.log(movieInfo)
    MovieModel.searchMovie(movieInfo, (data) => {
        this.setState({
          list: data,
          info:info,
        });
        this.loadingFinish(
          this.refs.outerScroller,
          this.refs.preloader,
          this.refs.scrollList
        );
      },
      err => {
        console.log(err);
      }
    );
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
    let articleId = thisSpan.getAttribute("data-articleid");
    let params = {
      userId: userToken,
      articleId: articleId
    };
    ArticleModel.giveStar(
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
    if (word.length > 65) {
      word = word.substring(0, 65) + " ...";
    }
    return word;
  }
  //下拉刷新
  pullToRefresh(
    outerScroller,
    pullToRefreshBox,
    scrollList,
    preloader,
    pullToRefreshArrow
  ) {
    let _this = this;
    //设置初始touchstart时的Y轴坐标
    var touchStart;
    //初始总盒子的top值
    var defaultTopVal = outerScroller.offsetTop;
    // console.log(defaultTopVal);
    //根据需求设置一下内容list的长度
    scrollList.style.height = document.body.clientHeight + "px";
    //检查是否满足下拉状态
    checkState(outerScroller.offsetTop);
    scrollList.onscroll = function() {
      var scrollListST = scrollList.scrollTop;
      if (parseInt(scrollListST) == 0) {
        console.log("dhjsfhjsd");
        checkState(outerScroller.offsetTop);
      }
    };
    //检查是否满足下拉刷新的条件
    function checkState(point) {
      console.log("dhjsfhjsd1", point, defaultTopVal, scrollList.scrollTop);
      if (point == defaultTopVal) {
        if (scrollList.scrollTop == 0) {
          console.log("dhjsfhjsd2");
          outerScroller.addEventListener("touchstart", startPageY, false);
        }
      }
    }
    //监听touchmove事件
    function startPageY(e) {
      console.log("dhjsfhjsd3");
      //保存touchstart时的Y轴坐标
      touchStart = e.targetTouches[0].pageY;
      outerScroller.addEventListener("touchmove", checkDirection, false);
    }
    //检查手指滑动的方向
    function checkDirection(e) {
      /**如果显示内容不是scrollList最顶端,则不满足下拉刷新条件
         * 这个也是检查是否满足下拉的条件,但是不能和上面的写在一起,因为我们已经开始监听touchmove事件了,
         * 因为不满足,所以把touchmove事件的监听remove掉
         */
      if (scrollList.scrollTop > 0) {
        outerScroller.removeEventListener("touchmove", checkDirection, false);
        return;
      }
      //touchmove时,手机划过的Y坐标
      var judegP = e.targetTouches[0].pageY;
      //大于标示是向下滑动,开始下拉刷新,这是要监听touchmove事件来触发下拉刷新方法(pullRefresh)
      //如果是向上滑就remove掉checkDiretion方法
      if (judegP > touchStart) {
        outerScroller.addEventListener("touchmove", pullRefresh, false);
        outerScroller.removeEventListener("touchmove", checkDirection, false);
      } else {
        outerScroller.removeEventListener("touchmove", checkDirection, false);
      }
    }
    //此方法为会又touchmove调用多次,所以用来显示下拉加载盒子
    function pullRefresh(e) {
      // console.log(_this,this);
      //滑动期间手指在屏幕上的位置
      var pageY = e.targetTouches[0].pageY;
      var temp = pageY - touchStart;
      //设置top值(多次)
      outerScroller.style.top = defaultTopVal + temp + "px";
      //下箭头变成上箭头,提醒用户松手
      if (temp >= Math.abs(defaultTopVal)) {
        addClass(pullToRefreshBox, "up");
      } else if (temp < Math.abs(defaultTopVal)) {
        //上变下
        _this.removeClass(pullToRefreshBox, "up");
      } else {
        outerScroller.style.top = defaultTopVal + "px";
      }
      //如果超出默认的top值,就强制设置为默认值
      if (parseInt(outerScroller.style.top) < defaultTopVal) {
        outerScroller.style.top = defaultTopVal + "px";
      }
      //touchmove过程中禁止列表的操作,可以阻止默认事件,我这里就直接hidden就没有了滚动条
      scrollList.style.overflow = "hidden";
      //同时监听touchend方法
      outerScroller.addEventListener("touchend", touchMoveEnd, false);
    }
    //touchend 方法,
    function touchMoveEnd(e) {
      // 首先remove掉touchmove事件的监听
      outerScroller.removeEventListener("touchmove", pullRefresh, false);
      //如果下拉程度没有到达设定的需要下拉加载的数值,就无视,但是需要将页面还原
      if (parseInt(outerScroller.style.top) < 0) {
        //未到达指定数值
        var outTime = setInterval(function() {
          outerScroller.style.top =
            parseInt(outerScroller.style.top) - 3 + "px";
          if (parseInt(outerScroller.style.top) <= defaultTopVal) {
            clearInterval(outTime);
            //因为这里设置的是每10毫秒减3px,所以设定界限,如果超出就直接变为默认值
            if (outerScroller.offsetTop < defaultTopVal) {
              outerScroller.style.top = defaultTopVal + "px";
              //进行新一轮的监听
              checkState(outerScroller.offsetTop);
            }
          }
        }, 10);
        //将内容列表设置为可操作状态
        scrollList.style.overflow = "auto";
        return;
      }
      //达到了指定的下拉加载数值
      if (outerScroller.offsetTop >= 0) {
        //用于切换加载gif
        pullToRefreshArrow.style.display = "none";
        preloader.style.display = "block";
        var time = setInterval(function() {
          outerScroller.style.top = outerScroller.offsetTop - 3 + "px";
          if (outerScroller.offsetTop <= 0) {
            if (outerScroller.offsetTop < defaultTopVal) {
              outerScroller.style.top = defaultTopVal + "px";
            }
            outerScroller.style.top = 0;
            clearInterval(time);
            outerScroller.removeEventListener("touchmove", pullRefresh, false);
            outerScroller.removeEventListener("touchend", touchMoveEnd, false);
          }
        }, 10);
        _this.fetchData();
      }
    }

    //辅助方法
    //增加class
    function addClass(curEle, strClass) {
      //strClass 是一串字符串，可能含有多个class ，所以用正则区分开，然后放到数组中进行循环遍历。
      var aryClass = strClass.replace(/(^\s+)|(\s+$)/g, "").split(/\s+/g);
      for (var i = 0; i < aryClass.length; i++) {
        var curClass = aryClass[i];
        if (!_this.hasClass(curEle, curClass)) {
          curEle.className += " " + curClass;
        }
      }
    }
    //removeClass:移除掉当前元素上的class名

    //判断是否含有Class
  }
  //刷新完成
  loadingFinish(outerScroller, preloader, scrollList) {
    let _this = this;
    scrollList.style ? (scrollList.style.overflow = "auto") : null;
    preloader.style ? (preloader.style.display = "none") : null;
    //将页面还原
    // return;
    var LFT = setInterval(function() {
      outerScroller.style.top = parseInt(outerScroller.style.top) - 3 + "px";
      if (!outerScroller.style.top) {
        clearInterval(LFT);
        return;
      }
      if (parseInt(outerScroller.style.top) <= _this.state.defaultTop) {
        clearInterval(LFT);
        if (outerScroller.offsetTop < _this.state.defaultTop) {
          outerScroller.style.top = _this.state.defaultTop + "px";
        }
        //进行新的一轮监听
        //
        _this.pullToRefresh(
          _this.refs.outerScroller,
          _this.refs.pullToRefreshBox,
          _this.refs.scrollList,
          _this.refs.preloader,
          _this.refs.pullToRefreshArrow
        );
        // checkState(outerScroller.offsetTop)
        _this.refs.pullToRefreshArrow.style.display = "block";
        _this.removeClass(_this.refs.pullToRefreshBox, "up");
      }
    }, 10);
  }
  removeClass(curEle, strClass) {
    var aryClass = strClass.replace(/(^\s+)|(\s+$)/g, "").split(/\s+/g);
    for (var i = 0; i < aryClass.length; i++) {
      var curClass = aryClass[i];
      if (this.hasClass(curEle, curClass)) {
        var reg = new RegExp("(^| +)" + curClass + "( +|$)");
        curEle.className = curEle.className.replace(reg, " ");
      }
    }
  }
  hasClass(curEle, strClass) {
    var reg = new RegExp("(\\b)" + strClass + "(\\b)");
    return reg.test(curEle.className);
  }
    //列表
searchResult() {
    let _this = this;
    let list = this.state.list;
    console.log(list)
    return list.map(function(item, index) {
        return (
          <div className="" style={Styles.indexList} key={item._id} >
            <Link to={"/Movie/" + item._id} style={{ width:"8rem",height: "15rem" }}>
              <div className="list" >
                <div className="" style={{ paddingTop: "0.4rem" }}>
                  <div
                    style={{        
                      height: "6rem",
                    }}
                  >
                  <div style={{
            width:"25%",
            height: "100%",
            float:"left",
          }}>
                    <img
                      src={item.imglink}
                      style={{
                        width:"3rem",
                        height: "5rem"
                      }}
                      alt=""
                    />
                    </div>
                    <div style={{
            width:"75%",
            height: "100%",
            float:"left",
          }}>
                    <span
                    style={{
                      height: "0.5rem",
                      fontSize: "16px",
                      fontWeight: "900"
                    }}
                  >{item.title}

                  </span><br/>
                    <span style={{ 
                        height: "0.4rem",
                        fontSize: "14px",
                        }}
                        >
                        {item.score}分/{item.showtime}/{item.country}
                      </span> 
                    
                     </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        );
      });
    }
  goLogin() {
    $.closePanel();
    setTimeout(() => {
      window.location.hash = "login";
    }, 1000);
  }
  checkLogin() {
    if (UserModel.fetchToken()) {
      return <Me />;
    } else {
      return (
        <div>
          <p>
            <a
              onClick={this.goLogin}
              className="button button-big button-fill button-success"
            >
              登录{" "}
            </a>
          </p>
        </div>
      );
    }
  }
  render() {
    const info = this.state.info;
    console.log(info)
    return (
      <div data-log="log">
        <main className="page page-current">
          <div className="outerScroller" id="outerScroller" ref="outerScroller">
            <div
              className="pullToRefreshBox"
              id="pullToRefreshBox"
              ref="pullToRefreshBox"
            >
              <div className="preloader" id="" ref="preloader" />
              <div
                className="pullToRefreshArrow"
                id=""
                ref="pullToRefreshArrow"
              />
            </div>
            <a
              className="tab-item open-panel pull-left"
              data-panel="#panel-left-demo"
            >
              {/* <span className="icon icon-me" /> */}
            </a>
            {/* <SearchBar 
            filterText={this.state.filterText}
            /> */}
            <SearchBar 
            onFilterTextInput={this.searchData.bind(this)} info={info}
            />
            {/* <Style onTypeClick={this.formType.bind(this)} style={style} /> */}
            <ul
              style={{ background: "#eee" }}
              className="scroll"
              ref="scrollList"
            >
            {this.searchResult()}
            </ul>
            <div className="content">
</div>
          </div>
        </main>
        <div className="panel-overlay" />
        <div
          className="panel panel-left panel-reveal theme-dark"
          id="panel-left-demo"
        >
          {this.checkLogin()}
          {/*<Me />*/}
        </div>
 
      </div>
    );
  }

}
export default searchMovie;
