import React from 'react';

import {UserModel} from '../../dataModel';
import {Link} from 'react-router-dom';
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

class MyArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: null,

    }
  }

  componentDidMount() {
    this.fetchData();

  }

  fetchData() {
    let userId = UserModel.fetchToken();
    let params = {userId: userId}
    UserModel.fetchArticle(params, (data) => {
      console.log(data)
      this.setState({
        list: data.content,
      })
    }, (err) => {

    })
  }
  //限制字数
  wordControl(word) {
    var t = typeof word;
    if(t === "string"){
    if (word.length > 20) {
    
      word = word.substring(0, 20) + " ...";
      return word;
    }else{
      console.log(word)
      word=word;
      return word;
    }
  }
    
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
  
  render() {
    if (!this.state.list) {
      return (<div/>)
    }
    let _this = this;
    let list = this.state.list.map(function (item, index) {
      return (
        <div className="item-content" key={item.articleId} data-key={item.articleId}>
        <Link to={'/movie/' + item.m_id+'/'+ item.articleId} style={{display: 'block'}}>
          <div style={{height:"8rem"}} >
          <div  style={{
              display: "inline-block",
                    }}>
          <img
                    src={item.author.avatar}
                    style={{
                      marginRight: "0.3rem",
                     height: "1.7rem",
                     verticalAlign: "top",
                    
                   }}
                   alt=""
                  />
                  </div>
                  <div  style={{ verticalAlign: "top",display: "inline-block" }}>
                  <div style={{ fontSize: "14px", fontWeight: 600, verticalAlign: "top",display: "inline-block"}}>
                    {item.author.username}
                    </div>
                 <div style={{ fontSize: "12px",marginLeft:"2rem", verticalAlign: "top" ,display: "inline-block",color:"#AAAAAA"}}>
                    <span className="icon icon-clock" > </span>{" "}
                    {dateDiff(item.createAt)}
                  </div>
            <div style={{ fontSize: "8px",color:"#AAAAAA" }}>发起关于《{item.mtitle}》的讨论</div>
            </div>
          <div style={{background:"#DDDDDD",marginRight:"2rem"  }}>
            <div style={{verticalAlign: "top",display: "inline-block" }}><img
                    src={item.imglink}
                   style={{
                     marginLeft:"0.4rem",
                     marginTop:"0.4rem",
                    width:"2rem",
                    height:"3rem",
                    
                     }}
                  alt=""
             />     <div style={{verticalAlign: "top",display: "inline-block" }}>
            <h4 style={Styles.h4Style}>{item.title}</h4>
              
              <div className="">
               <p style={Styles.pStyle}>{_this.wordControl(item.content)}</p> </div>
              </div>
             </div>
            </div>
          </div>
        </Link>
      </div>
        // <li className="item-content" key={item.articleId} data-key={item.articleId}>
        //   <Link to={'/create/' + item.articleId} style={{display: 'block', width: '100%', height: '100%'}}>
        //     <div className="item-inner">
        //       <div className="item-title">{item.title}</div>
        //     </div>
        //   </Link>
        // </li>
      )
    })

    return (
      <div data-log="log">
      <main className="page page-current" style={{marginBottom:"2.5rem"}}>
      <header className="bar bar-nav" style={{position: 'relative'}}>
      <h1 className="title">我的文章</h1>
    </header>
        <div className="outerScroller" id="outerScroller" ref="outerScroller"  style={{marginTop:"2rem"}} >
          <ul
            style={{ background: "#eee" , marginTop:"2.2rem"}}
            className="scroll"
            ref="scrollList"
          >
          {list}
          </ul>
        </div>
      </main>
    </div>
      // <main>
      //   <header className="bar bar-nav" style={{position: 'relative'}}>
      //     <h1 className="title">我的文章</h1>
      //   </header>
      //   <div className="contetn">
      //       <div>
      //       <ul>
      //         {list}
      //       </ul>
      //     </div>
      //   </div>
      // </main>
    )
  }

}
export default MyArticle;