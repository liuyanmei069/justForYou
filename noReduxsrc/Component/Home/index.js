// import React from "react";
import { Link } from "react-router-dom";
import { UserModel, ArticleModel,MovieModel } from "../dataModel";
import "../../static/css/style.css";
import Me from "../Me";
// import Swiper from "react-swiper";
// import ReactSwipe from 'react-swipe';

// import $ from "jquery";
// import "./js/swiper.jquery.min.js"
// import {SwiperContainer,SwiperSlide} from "react-swiper";



import { dateDiff } from "../../Tools";
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import querystring from 'querystring';
import ReactSwipe from 'react-swipe';
import  './index.css';
const query = querystring.parse(window.location.search.slice(1));

// generate slide panes
const numberOfSlides = parseInt(query.slidesNum, 10) || 20;
const paneNodes = Array.apply(null, Array(numberOfSlides)).map((_, i) => {
  return (
    <div key={i} style={{display:"inline"}}>
      <div className="item" style={{display:"inline"}}>{i}</div>
      <div className="item"style={{display:"inline"}}>{i}</div>
      <div className="item"style={{display:"inline"}}>{i}</div>
    </div>
  //   <div id='slider' class='swipe'>
  //   <div class='swipe-wrap'>
  //     <div>1</div>
  //     <div>2</div>
  //     <div>3</div>
  //   </div>
  // </div>
  
  );
});

// change Swipe.js options by query params
const startSlide = parseInt(query.startSlide, 10) || 0;
const swipeOptions = {
  startSlide: startSlide < paneNodes.length && startSlide >= 0 ? startSlide : 0,
  auto: parseInt(query.auto, 10) || 0,
  speed: parseInt(query.speed, 10) || 300,
  disableScroll: query.disableScroll === 'true',
  continuous: query.continuous === 'true',
  slidesPerView : query.slidesPerView === '3',
  // callback() {
  //   console.log('slide changed');
  // },
  // transitionEnd() {
  //   console.log('ended transition');
  // }
};
let Styles = {
  indexList: {
    paddingRight: "0.75rem",
    marginBottom: "0.2rem",
    borderTop: "1px solid #dfdfdf",
    borderBottom: "1px solid #dfdfdf",
    // background: "#fff",
    paddingLeft: "0.75rem",
    paddingBottom: "0.3rem",
    display: "inline-block",
    // display:"vertical-align:top",
    verticalAlign:"top",
   marginTop: "30px",
 
    
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
let header = () => {
  return (
    <header className="bar bar-nav" style={{backgroundColor:"#0099FF",color:"#FFFFFF"}}>
      <a
      className="tab-item open-panel pull-left"
      data-panel="#panel-left-demo"
      >
        <span className="icon icon-me" />
    </a>
      <h1 className="title" style={{color:"#FFFFFF"}}>首页</h1>
    </header>
    )
  }
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
    <div className="bar bar-header-secondary" style={{marginTop:'50px'}}>
      <div className="searchbar">
        <a className="searchbar-cancel">取消</a>
        <div className="search-input">
        <Link to={'searchMovie'} >
          <label className="icon icon-search" htmlFor="search"></label>
          <input className="open-about" value={this.props.filterText} onChange={this.handleFilterTextInputChange} type="search" id='search' placeholder='输入关键字...'/>
          </Link>
        </div>
      </div>
    </div>
    </div>
    );
  }
}
// export default SearchBar;

class GongiMovie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      defaultTop: null,
      isToggleOn: true
    };
      // 这个绑定是必要的，使`this`在回调中起作用
      this.next = this.next.bind(this);
      this.prev = this.prev.bind(this);
  }
  componentDidMount() {
    console.log("0-0-");
      this.goingData();
    console.log("0909");
  }
  goingData() {
    console.log("goingData");
    MovieModel.goingmovie(
      "",
      data => {
        this.setState({
          list: data
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
  //列表
  goingMovie() {
    let _this = this;
    let list = this.state.list;
    console.log(list.length)
      {/* <div className="content">

  <div className="swiper-container">
    <div className="swiper-wrapper">
      <div className="swiper-slide"><img src="//gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i1/TB1n3rZHFXXXXX9XFXXXXXXXXXX_!!0-item_pic.jpg_320x320q60.jpg" alt=""/></div>
      <div className="swiper-slide"><img src="//gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i4/TB10rkPGVXXXXXGapXXXXXXXXXX_!!0-item_pic.jpg_320x320q60.jpg" alt=""/></div>
      <div className="swiper-slide"><img src="//gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i1/TB1kQI3HpXXXXbSXFXXXXXXXXXX_!!0-item_pic.jpg_320x320q60.jpg" alt=""/></div>
    </div>
    <div className="swiper-pagination"></div>
  </div>
</div> */}

    return list.map(function(item, index) {
        return (
          <div className=""  style={Styles.indexList} key={item._id}  >
            <Link to={"/Movie/" + item._id} style={{ width:"8rem",height: "15rem" }}>
              <div className="list">
                <div className="" style={{ paddingTop: "0.4rem" }} >
                  <div
                    style={{
                      width:"6rem",
                      height: "12rem",
                    }}
                  >
                    <img
                      src={item.imglink}
                      style={{
                        width:"6rem",
                        height: "9rem"
                      }}
                      alt=""
                    />
                    <span
                    style={{
                      height: "0.5rem",
                      fontSize: "16px"
                    }}
                  >{item.title}

                  </span>
                  <span style={{ 
                      height: "0.4rem",
                      fontSize: "14px",
                      color: "#FF9933",
                      }}
                      >
                      {item.score}
                    </span> 
                    <span style={{ 
                      height: "0.4rem",
                      fontSize: "14px",
                      color: "#FF9933",
                      }}
                      >分</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        );
      });
    }
    next() {
      
        this.reactSwipe.next();
      }
    
      prev() {
       
        this.reactSwipe.prev();
      }
  render() {
    let list = this.state.list;
    console.log(list.length)
    return (
     
      <div className="" style={{background: "#fff"}}>
            <div style={{float:"left"}}>
             正在热映:
            </div>
            <div style={{float:"right",color:"#888888"}}>
              全部{list.length}>
              </div>
                {/* <div className="content">

  <div className="swiper-container">
    <div className="swiper-wrapper">
      <div className="swiper-slide"><img src="//gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i1/TB1n3rZHFXXXXX9XFXXXXXXXXXX_!!0-item_pic.jpg_320x320q60.jpg" alt=""/></div>
      <div className="swiper-slide"><img src="//gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i4/TB10rkPGVXXXXXGapXXXXXXXXXX_!!0-item_pic.jpg_320x320q60.jpg" alt=""/></div>
      <div className="swiper-slide"><img src="//gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i1/TB1kQI3HpXXXXbSXFXXXXXXXXXX_!!0-item_pic.jpg_320x320q60.jpg" alt=""/></div>
    </div>
    <div className="swiper-pagination"></div>
  </div>
</div> */}
{/* <div className="content" > */}





{/* <Swiper className="swiper-container"  >
    <div className="swiper-wrapper" >
    {this.goingMovie()}
    </div>
    <div className="swiper-pagination"></div>
  </Swiper>
</div> */}
{/* 
  <Swiper className="swipe-container" onSwipeLeft={this.handleLeftSwipe}>
  Hello world!
</Swiper>

 <ReactSwipe className="carousel" swipeOptions={{continuous: false}}>
 <div>PANE 1</div>
 <div>PANE 2</div>
 <div>PANE 3</div>
</ReactSwipe> */}
{/* <SwiperContainer  options={{ direction: 'horizontal',
  loop: false,
  pagination: '.swiper-pagination',
  slidesPerView : 3,
  spaceBetween : 5,}} >
  <SwiperSlide>
    <div>
    {this.goingMovie()}
    </div>
    </SwiperSlide>
    <div className="swiper-pagination"></div>
  </SwiperContainer> */}
  {/* <ReactSwipe className="carousel" swipeOptions={{continuous: false}}>
                <div>PANE 1</div>
                <div>PANE 2</div>
                <div>PANE 3</div>
            </ReactSwipe> */}
            {/* <div className="swiper-container" style={{clear:"both"}} >
    <div className="swiper-wrapper" >
    {this.goingMovie()}
    </div>
    <div className="swiper-pagination"></div>
  </div>
</div> */}

        <ReactSwipe ref={reactSwipe => this.reactSwipe = reactSwipe} className="mySwipe" swipeOptions={swipeOptions}>
            {/* {paneNodes} */}
            {this.goingMovie.bind(this)}
        </ReactSwipe>
        

        <div>
        <button type="button" onClick={this.prev}>Prev</button>
        <button type="button" onClick={this.next}>Next</button>
        </div>

        </div>
    );
  }
}
class WillMovie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      defaultTop: null,
    };
  }
  componentDidMount() {
    console.log("0-0-");
      this.willData();
    console.log("0909");
  }
   //获取数据
   willData() {
    console.log("willData");
    MovieModel.hotmovie(
      "",
      data => {
        this.setState({
          list: data
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
  //列表
  willMovie() {
    let _this = this;
    let list = this.state.list;
    console.log(list)
    return list.map(function(item, index) {
        return (
          // <div className="external">
          <div className="swiper-slide"  style={Styles.indexList} key={item._id}  >
            <Link to={"/Movie/" + item._id} style={{ width:"8rem",height: "15rem" }}>
              <div className="list">
                <div className="" style={{ paddingTop: "0.4rem" }}>
                  <div
                    style={{
                      width:"6rem",
                      height: "12rem",
                    }}
                  >
                    <img
                      src={item.imglink}
                      style={{
                        width:"6rem",
                        height: "9rem"
                      }}
                      alt=""
                    />
                    <span
                    style={{
                      height: "0.5rem",
                      fontSize: "16px"
                    }}
                  >{item.title}

                  </span>
                    <span style={{ 
                        height: "0.4rem",
                        fontSize: "14px",
                        color: "#FF9933",
                        }}
                        >
                        {item.score}
                      </span> 
                      <span style={{ 
                        height: "0.4rem",
                        fontSize: "14px",
                        color: "#FF9933",
                        }}
                        >分</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
       
        );
      });
    }
  render() {
    let list = this.state.list;
    return (
      <div className="" style={{background: "#fff"}}>
            <div style={{float:"left"}}>
             即将上映:
            </div>
            <div style={{float:"right",color:"#888888"}}>
              全部{list.length}>
              </div>
                         {/* <div className="content">

  <div className="swiper-container">
    <div className="swiper-wrapper">
      <div className="swiper-slide"><img src="//gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i1/TB1n3rZHFXXXXX9XFXXXXXXXXXX_!!0-item_pic.jpg_320x320q60.jpg" alt=""/></div>
      <div className="swiper-slide"><img src="//gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i4/TB10rkPGVXXXXXGapXXXXXXXXXX_!!0-item_pic.jpg_320x320q60.jpg" alt=""/></div>
      <div className="swiper-slide"><img src="//gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i1/TB1kQI3HpXXXXbSXFXXXXXXXXXX_!!0-item_pic.jpg_320x320q60.jpg" alt=""/></div>
    </div>
    <div className="swiper-pagination"></div>
  </div>
</div> */}
{/* <div className="content" > */}

  <div className="swiper-container" style={{clear:"both"}} >
    <div className="swiper-wrapper" >
    {/* <div className="external"> */}
    {this.willMovie()}
    </div> 
    {/* </div>  */}
    <div className="swiper-pagination"></div>
  </div>
</div>
  
        
    );
  }
}
class HotMovie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      defaultTop: null,
    };
  }
  componentDidMount() {
    console.log("0-0-");
      this.hotData();
    console.log("0909");
  }
  
  //获取数据
  hotData() {
    console.log("hotData");
    MovieModel.hotmovie(
      "",
      data => {
        this.setState({
          list: data
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
  //列表
  
 
  hotMovie() {
    let _this = this;
    let list = this.state.list;
    console.log(list)
    return list.map(function(item, index) {
        return (
          <div className="swiper-slide" style={Styles.indexList} key={item._id} >
            <Link to={"/Movie/" + item._id} style={{ width:"8rem",height: "15rem" }}>
              <div className="list">
                <div className="" style={{ paddingTop: "0.4rem" }}>
                  <div
                    style={{
                      width:"6rem",
                      height: "12rem",
                    }}
                  >
                    <img
                      src={item.imglink}
                      style={{
                        width:"6rem",
                        height: "9rem"
                      }}
                      alt=""
                    />
                    <span
                    style={{
                      height: "0.5rem",
                      fontSize: "16px"
                    }}
                  >{item.title}

                  </span>
                    <span style={{ 
                        height: "0.4rem",
                        fontSize: "14px",
                        color: "#FF9933",
                        }}
                        >
                        {item.score}
                      </span> 
                      <span style={{ 
                        height: "0.4rem",
                        fontSize: "14px",
                        color: "#FF9933",
                        }}
                        >分</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        );
      });
    }
  render() {
    let list = this.state.list;
    return (
      <div className="" style={{background: "#fff"}}>
            <div style={{float:"left"}}>
             热门电影:
            </div>
            <div style={{float:"right",color:"#888888"}}>
              <a>全部{list.length}></a>
              </div>
           
      {/* <div className="content" > */}
      <div className="swiper-container" style={{clear:"both"}} >
        <div className="swiper-wrapper" >
        {this.hotMovie()}
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </div>
            // </div> 
    );
  }
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      defaultTop: null,
    };
  }
  componentDidMount() {
    console.log("0-0-");
    //   this.newFunction();
      // this.goingData();
      // this.hotData();
      // this.willData();
      this.reseat();
    // this.fetchData();
    console.log("0909");
  }
  // componentWillMount(){
  //   this.goingData();
  //   this.hotData();
  //   this.willData();
  // }
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
        _this.hotData();
        _this.willData();
        _this.goingData();
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
    return (
      <div data-log="log">
        <div 
            style={{position: "absolute", height: "50px", width: "100%", top: "0px", zIndex: '2001'}}>{header()}</div>
        {/* <main className="page page-current"> */}

        
          <div className="outerScroller" id="outerScroller" ref="outerScroller" >
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
            <SearchBar 
            filterText={this.state.filterText}
            />
   

            {/* <span>
             正在热映:
            </span>
  
            <ul
              style={{ background: "#eee" }}
              className="scroll"
              ref="scrollList"
            >
              {this.hotMovie()}
            </ul> */}
            
  
            {/* <div
              style={{ background: "#eee" }}
              className="scroll"
              ref="scrollList"
            >
                    {this.goingMovie()}
            </div> */}

            
  
            <div
              style={{ background: "#eee",marginTop:"130px" }}
              className="scroll"
              ref="scrollList"
            >
            <GongiMovie />
            <WillMovie/>
            <HotMovie/>
           </div>
           {/* <div className="swiper-container" style={{marginTop: "80px"}}>
       <div className="swiper-wrapper">
        <div className="swiper-slide">Slide 1</div>
        <div className="swiper-slide">Slide 2</div>
        <div className="swiper-slide">Slide 3</div>
    </div>
    </div> */}
    {/* <div className="content">

  <div className="swiper-container">
    <div className="swiper-wrapper">
      <div className="swiper-slide"><img src="//gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i1/TB1n3rZHFXXXXX9XFXXXXXXXXXX_!!0-item_pic.jpg_320x320q60.jpg" alt=""/></div>
      <div className="swiper-slide"><img src="//gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i4/TB10rkPGVXXXXXGapXXXXXXXXXX_!!0-item_pic.jpg_320x320q60.jpg" alt=""/></div>
      <div className="swiper-slide"><img src="//gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i1/TB1kQI3HpXXXXbSXFXXXXXXXXXX_!!0-item_pic.jpg_320x320q60.jpg" alt=""/></div>
    </div>
    <div className="swiper-pagination"></div>
  </div>
</div> */}
          </div>
        {/* </main> */}
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
// class Home extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       list: [],

//       defaultTop: null,
//     };
//   }
//   componentDidMount() {
//     console.log("0-0-");
//     //   this.newFunction();
//       this.goingData();
//       this.hotData();
//       this.willData();
//       this.reseat();
//     // this.fetchData();
//     console.log("0909");
//   }
//   // componentWillMount(){
//   //   this.goingData();
//   //   this.hotData();
//   //   this.willData();
//   // }
//   reseat() {
//     let defaultTop = this.refs.outerScroller.offsetTop;
//     this.setState({
//       defaultTop: defaultTop
//     });
//     this.pullToRefresh(
//       this.refs.outerScroller,
//       this.refs.pullToRefreshBox,
//       this.refs.scrollList,
//       this.refs.preloader,
//       this.refs.pullToRefreshArrow
//     );
//   }
//   //获取数据
//   hotData(e) {
//     console.log("hotData");
//     MovieModel.hotmovie(
//       "",
//       data => {
//         this.setState({
//           list: data
//         });
//         this.loadingFinish(
//           this.refs.outerScroller,
//           this.refs.preloader,
//           this.refs.scrollList
//         );
//       },
//       err => {
//         console.log(err);
//       }
//     );
//   }
//    //获取数据
//    goingData(e) {
//     console.log("goingData");
//     MovieModel.goingmovie(
//       "",
//       data => {
//         this.setState({
//           list: data
//         });
//         this.loadingFinish(
//           this.refs.outerScroller,
//           this.refs.preloader,
//           this.refs.scrollList
//         );
//       },
//       err => {
//         console.log(err);
//       }
//     );
//   }
//    //获取数据
//    willData(e) {
//     console.log("willData");
//     MovieModel.hotmovie(
//       "",
//       data => {
//         this.setState({
//           list: data
//         });
//         this.loadingFinish(
//           this.refs.outerScroller,
//           this.refs.preloader,
//           this.refs.scrollList
//         );
//       },
//       err => {
//         console.log(err);
//       }
//     );
//   }
//   //点赞
//   giveStar(e) {
//     var _this = this;
//     let userToken = UserModel.fetchToken();
//     if (!userToken) {
//       $.toast("您还没有登录");
//       return;
//     }
//     let thisSpan = e.nativeEvent.target;
//     let articleId = thisSpan.getAttribute("data-articleid");
//     let params = {
//       userId: userToken,
//       articleId: articleId
//     };
//     ArticleModel.giveStar(
//       params,
//       data => {
//         if (data.title) {
//           thisSpan.style.color = "red";
//           $.toast(data.content);
//           this.componentDidMount();
//         } else {
//           thisSpan.style.color = "none";
//           $.toast(data.content);
//           this.componentDidMount();
//         }
//       },
//       err => {
//         console.log(err);
//       }
//     );
//   }
//   //设置点赞星样式
//   starStyle(starlist) {
//     let userToken = UserModel.fetchToken();
//     for (let i = 0; i < starlist.length; i++) {
//       let cur = starlist[i];
//       if (cur == userToken) {
//         return { marginRight: "0.5rem", paddingLeft: "0.3rem", color: "red" };
//       }
//     }
//     return { marginRight: "0.5rem", paddingLeft: "0.3rem" };
//   }
//   //限制字数
//   wordControl(word) {
//     if (word.length > 65) {
//       word = word.substring(0, 65) + " ...";
//     }
//     return word;
//   }
//   //下拉刷新
//   pullToRefresh(
//     outerScroller,
//     pullToRefreshBox,
//     scrollList,
//     preloader,
//     pullToRefreshArrow
//   ) {
//     let _this = this;
//     //设置初始touchstart时的Y轴坐标
//     var touchStart;
//     //初始总盒子的top值
//     var defaultTopVal = outerScroller.offsetTop;
//     // console.log(defaultTopVal);
//     //根据需求设置一下内容list的长度
//     scrollList.style.height = document.body.clientHeight + "px";
//     //检查是否满足下拉状态
//     checkState(outerScroller.offsetTop);
//     scrollList.onscroll = function() {
//       var scrollListST = scrollList.scrollTop;
//       if (parseInt(scrollListST) == 0) {
//         console.log("dhjsfhjsd");
//         checkState(outerScroller.offsetTop);
//       }
//     };
//     //检查是否满足下拉刷新的条件
//     function checkState(point) {
//       console.log("dhjsfhjsd1", point, defaultTopVal, scrollList.scrollTop);
//       if (point == defaultTopVal) {
//         if (scrollList.scrollTop == 0) {
//           console.log("dhjsfhjsd2");
//           outerScroller.addEventListener("touchstart", startPageY, false);
//         }
//       }
//     }
//     //监听touchmove事件
//     function startPageY(e) {
//       console.log("dhjsfhjsd3");
//       //保存touchstart时的Y轴坐标
//       touchStart = e.targetTouches[0].pageY;
//       outerScroller.addEventListener("touchmove", checkDirection, false);
//     }
//     //检查手指滑动的方向
//     function checkDirection(e) {
//       /**如果显示内容不是scrollList最顶端,则不满足下拉刷新条件
//          * 这个也是检查是否满足下拉的条件,但是不能和上面的写在一起,因为我们已经开始监听touchmove事件了,
//          * 因为不满足,所以把touchmove事件的监听remove掉
//          */
//       if (scrollList.scrollTop > 0) {
//         outerScroller.removeEventListener("touchmove", checkDirection, false);
//         return;
//       }
//       //touchmove时,手机划过的Y坐标
//       var judegP = e.targetTouches[0].pageY;
//       //大于标示是向下滑动,开始下拉刷新,这是要监听touchmove事件来触发下拉刷新方法(pullRefresh)
//       //如果是向上滑就remove掉checkDiretion方法
//       if (judegP > touchStart) {
//         outerScroller.addEventListener("touchmove", pullRefresh, false);
//         outerScroller.removeEventListener("touchmove", checkDirection, false);
//       } else {
//         outerScroller.removeEventListener("touchmove", checkDirection, false);
//       }
//     }
//     //此方法为会又touchmove调用多次,所以用来显示下拉加载盒子
//     function pullRefresh(e) {
//       // console.log(_this,this);
//       //滑动期间手指在屏幕上的位置
//       var pageY = e.targetTouches[0].pageY;
//       var temp = pageY - touchStart;
//       //设置top值(多次)
//       outerScroller.style.top = defaultTopVal + temp + "px";
//       //下箭头变成上箭头,提醒用户松手
//       if (temp >= Math.abs(defaultTopVal)) {
//         addClass(pullToRefreshBox, "up");
//       } else if (temp < Math.abs(defaultTopVal)) {
//         //上变下
//         _this.removeClass(pullToRefreshBox, "up");
//       } else {
//         outerScroller.style.top = defaultTopVal + "px";
//       }
//       //如果超出默认的top值,就强制设置为默认值
//       if (parseInt(outerScroller.style.top) < defaultTopVal) {
//         outerScroller.style.top = defaultTopVal + "px";
//       }
//       //touchmove过程中禁止列表的操作,可以阻止默认事件,我这里就直接hidden就没有了滚动条
//       scrollList.style.overflow = "hidden";
//       //同时监听touchend方法
//       outerScroller.addEventListener("touchend", touchMoveEnd, false);
//     }
//     //touchend 方法,
//     function touchMoveEnd(e) {
//       // 首先remove掉touchmove事件的监听
//       outerScroller.removeEventListener("touchmove", pullRefresh, false);
//       //如果下拉程度没有到达设定的需要下拉加载的数值,就无视,但是需要将页面还原
//       if (parseInt(outerScroller.style.top) < 0) {
//         //未到达指定数值
//         var outTime = setInterval(function() {
//           outerScroller.style.top =
//             parseInt(outerScroller.style.top) - 3 + "px";
//           if (parseInt(outerScroller.style.top) <= defaultTopVal) {
//             clearInterval(outTime);
//             //因为这里设置的是每10毫秒减3px,所以设定界限,如果超出就直接变为默认值
//             if (outerScroller.offsetTop < defaultTopVal) {
//               outerScroller.style.top = defaultTopVal + "px";
//               //进行新一轮的监听
//               checkState(outerScroller.offsetTop);
//             }
//           }
//         }, 10);
//         //将内容列表设置为可操作状态
//         scrollList.style.overflow = "auto";
//         return;
//       }
//       //达到了指定的下拉加载数值
//       if (outerScroller.offsetTop >= 0) {
//         //用于切换加载gif
//         pullToRefreshArrow.style.display = "none";
//         preloader.style.display = "block";
//         var time = setInterval(function() {
//           outerScroller.style.top = outerScroller.offsetTop - 3 + "px";
//           if (outerScroller.offsetTop <= 0) {
//             if (outerScroller.offsetTop < defaultTopVal) {
//               outerScroller.style.top = defaultTopVal + "px";
//             }
//             outerScroller.style.top = 0;
//             clearInterval(time);
//             outerScroller.removeEventListener("touchmove", pullRefresh, false);
//             outerScroller.removeEventListener("touchend", touchMoveEnd, false);
//           }
//         }, 10);
//         _this.hotData();
//         _this.willData();
//         _this.fetchData();
//       }
//     }

//     //辅助方法
//     //增加class
//     function addClass(curEle, strClass) {
//       //strClass 是一串字符串，可能含有多个class ，所以用正则区分开，然后放到数组中进行循环遍历。
//       var aryClass = strClass.replace(/(^\s+)|(\s+$)/g, "").split(/\s+/g);
//       for (var i = 0; i < aryClass.length; i++) {
//         var curClass = aryClass[i];
//         if (!_this.hasClass(curEle, curClass)) {
//           curEle.className += " " + curClass;
//         }
//       }
//     }
//     //removeClass:移除掉当前元素上的class名

//     //判断是否含有Class
//   }
//   //刷新完成
//   loadingFinish(outerScroller, preloader, scrollList) {
//     let _this = this;
//     scrollList.style ? (scrollList.style.overflow = "auto") : null;
//     preloader.style ? (preloader.style.display = "none") : null;
//     //将页面还原
//     // return;
//     var LFT = setInterval(function() {
//       outerScroller.style.top = parseInt(outerScroller.style.top) - 3 + "px";
//       if (!outerScroller.style.top) {
//         clearInterval(LFT);
//         return;
//       }
//       if (parseInt(outerScroller.style.top) <= _this.state.defaultTop) {
//         clearInterval(LFT);
//         if (outerScroller.offsetTop < _this.state.defaultTop) {
//           outerScroller.style.top = _this.state.defaultTop + "px";
//         }
//         //进行新的一轮监听
//         //
//         _this.pullToRefresh(
//           _this.refs.outerScroller,
//           _this.refs.pullToRefreshBox,
//           _this.refs.scrollList,
//           _this.refs.preloader,
//           _this.refs.pullToRefreshArrow
//         );
//         // checkState(outerScroller.offsetTop)
//         _this.refs.pullToRefreshArrow.style.display = "block";
//         _this.removeClass(_this.refs.pullToRefreshBox, "up");
//       }
//     }, 10);
//   }
//   removeClass(curEle, strClass) {
//     var aryClass = strClass.replace(/(^\s+)|(\s+$)/g, "").split(/\s+/g);
//     for (var i = 0; i < aryClass.length; i++) {
//       var curClass = aryClass[i];
//       if (this.hasClass(curEle, curClass)) {
//         var reg = new RegExp("(^| +)" + curClass + "( +|$)");
//         curEle.className = curEle.className.replace(reg, " ");
//       }
//     }
//   }
//   hasClass(curEle, strClass) {
//     var reg = new RegExp("(\\b)" + strClass + "(\\b)");
//     return reg.test(curEle.className);
//   }
  
//   //列表
//   goingMovie() {
//     let _this = this;
//     let list = this.state.list;
//     return list.map(function(item, index) {
//         return (
//           <div className="" style={Styles.indexList} key={item._id} value={this.state.list} >
//             <Link to={"/Movie/" + item._id} style={{ width:"8rem",height: "15rem" }}>
//               <div className="list">
//                 <div className="" style={{ paddingTop: "0.4rem" }}>
//                   <div
//                     style={{
//                       width:"6rem",
//                       height: "12rem",
//                     }}
//                   >
//                     <img
//                       src={item.imglink}
//                       style={{
//                         width:"6rem",
//                         height: "9rem"
//                       }}
//                       alt=""
//                     />
//                     <span
//                     style={{
//                       height: "0.5rem",
//                       fontSize: "16px"
//                     }}
//                   >{item.title}
  
//                   </span>
//                   <span style={{ 
//                       height: "0.4rem",
//                       fontSize: "14px",
//                       color: "#FF9933",
//                       }}
//                       >
//                       {item.score}
//                     </span> 
//                     <span style={{ 
//                       height: "0.4rem",
//                       fontSize: "14px",
//                       color: "#FF9933",
//                       }}
//                       >分</span>
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           </div>
//         );
//       });
//     }
//     hotMovie() {
//         let _this = this;
//         let list = this.state.list;
//         return list.map(function(item, index) {
//             return (
//               <div className="" style={Styles.indexList} key={item._id} value={this.state.list} >
//                 <Link to={"/Movie/" + item._id} style={{ width:"8rem",height: "15rem" }}>
//                   <div className="list">
//                     <div className="" style={{ paddingTop: "0.4rem" }}>
//                       <div
//                         style={{
//                           width:"6rem",
//                           height: "12rem",
//                         }}
//                       >
//                         <img
//                           src={item.imglink}
//                           style={{
//                             width:"6rem",
//                             height: "9rem"
//                           }}
//                           alt=""
//                         />
//                         <span style={{ 
//                             height: "0.4rem",
//                             fontSize: "14px",
//                             color: "#FF9933",
//                             }}
//                             >
//                             {item.score}
//                           </span> 
//                           <span style={{ 
//                             height: "0.4rem",
//                             fontSize: "14px",
//                             color: "#FF9933",
//                             }}
//                             >分</span>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               </div>
//             );
//           });
//         }
//         willMovie() {
//             let _this = this;
//             let list = this.state.list;
//             console.log(list)
//             return list.map(function(item, index) {
//                 return (
//                   <div className="" style={Styles.indexList} key={item._id} value={this.state.list} 
//                  >
//                     <Link to={"/Movie/" + item._id} style={{ width:"8rem",height: "15rem" }}>
//                       <div className="list">
//                         <div className="" style={{ paddingTop: "0.4rem" }}>
//                           <div
//                             style={{
//                               width:"6rem",
//                               height: "12rem",
//                             }}
//                           >
//                             <img
//                               src={item.imglink}
//                               style={{
//                                 width:"6rem",
//                                 height: "9rem"
//                               }}
//                               alt=""
//                             />
//                             <span style={{ 
//                                 height: "0.4rem",
//                                 fontSize: "14px",
//                                 color: "#FF9933",
//                                 }}
//                                 >
//                                 {item.score}
//                               </span> 
//                               <span style={{ 
//                                 height: "0.4rem",
//                                 fontSize: "14px",
//                                 color: "#FF9933",
//                                 }}
//                                 >分</span>
//                           </div>
//                         </div>
//                       </div>
//                     </Link>
//                   </div>
//                 );
//               });
//             }
//   goLogin() {
//     $.closePanel();
//     setTimeout(() => {
//       window.location.hash = "login";
//     }, 1000);
//   }
//   checkLogin() {
//     if (UserModel.fetchToken()) {
//       return <Me />;
//     } else {
//       return (
//         <div>
//           <p>
//             <a
//               onClick={this.goLogin}
//               className="button button-big button-fill button-success"
//             >
//               登录{" "}
//             </a>
//           </p>
//         </div>
//       );
//     }
//   }
//   render() {
//     return (
//       <div data-log="log">
//         {/* <main className="page page-current"> */}
//           <div className="outerScroller" id="outerScroller" ref="outerScroller">
//             <div
//               className="pullToRefreshBox"
//               id="pullToRefreshBox"
//               ref="pullToRefreshBox"
//             >
//               <div className="preloader" id="" ref="preloader" />
//               <div
//                 className="pullToRefreshArrow"
//                 id=""
//                 ref="pullToRefreshArrow"
//               />
//             </div>
//             <a
//               className="tab-item open-panel pull-left"
//               data-panel="#panel-left-demo"
//             >
//               <span className="icon icon-me" />
//             </a>
//             <SearchBar 
//             filterText={this.state.filterText}
//             />
//             {/* <span>
//              正在热映:
//             </span>
  
//             <ul
//               style={{ background: "#eee" }}
//               className="scroll"
//               ref="scrollList"
//             >
//               {this.hotMovie()}
//             </ul> */}
            
  
//             {/* <div
//               style={{ background: "#eee" }}
//               className="scroll"
//               ref="scrollList"
//             >
//                     {this.goingMovie()}
//             </div> */}

            
  
//             <div
//               style={{ background: "#eee" }}
//               className="scroll"
//               ref="scrollList"
//             >
//             <li>
//              正在热映:
//             </li>
//             <div onClick={
//             this.goingData.bind(this,'')
//           }>
//             {this.goingMovie()}
//             </div>
//             <li>
//              即将上映:
//             </li>
//              <div   onClick={ this.willData.bind(this,'')
//                   }>
//               {this.willMovie()}
//               </div>
//               <li>
               
//              热门电影:
//             </li>
//             <div  onClick={ this.hotData.bind(this,'')}>
//             {this.hotMovie()}
// </div>
  
//             </div>
  
//             {/* <div
//               style={{ background: "#eee" }}
//               className="scroll"
//               ref="scrollList"
//             > */}
        

//               {/* <goingMovie/> */}
//               {/* {this.hotMovie()} */}

//             {/* </div> */}
//           </div>
//         {/* </main> */}
//         <div className="panel-overlay" />
//         <div
//           className="panel panel-left panel-reveal theme-dark"
//           id="panel-left-demo"
//         >
//           {this.checkLogin()}
//           {/*<Me />*/}
//         </div> 
      
//       </div>
        
//     );
//   }


//     newFunction() {
//         // var outerScroller = document.getElementById('outerScroller');
//         this.fetchData();
//     }
//     newFunction() {
//         // var outerScroller = document.getElementById('outerScroller');
//         this.fetchData();
//     }
// }

$(document).on("pageInit", "#page-help", function(e, id, page) {
  doSearch();
  }); 
export default Home;
