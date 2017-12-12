import React from "react";
import {Link, HashRouter, BrowserRouter, withRouter, Route, NavLink, Switch} from 'react-router-dom';
import { UserModel,MovieModel } from "../dataModel";
import "../../static/css/style.css";
import Me from "../Me";


import { dateDiff } from "../../Tools";
let Styles = {
  index:{
  paddingRight: "0.75rem",
  marginBottom: "0.2rem",
  borderTop: "6px solid #dfdfdf",
  borderBottom: "1px solid #dfdfdf",
  background: "#fff",
  paddingLeft: "0.75rem",
  paddingBottom: "0.3rem",
  marginTop: "50px",

},
titleName:{
  margin: "0.2rem 0",
  color: "#999999",
  fontSize: "16px",

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
listStyle:{
  paddingRight: "0.5rem",
  paddingLeft: "0.5rem",
  margin: "0.3rem 0",
  color: "#0066FF",
  fontSize: "16px"
},
Select:{
  backgroundColor: "#0080FF",
  margin: "0.2rem 0",
  color: "#FFFFFF",
  fontSize: "16px",
  padding: "1px 4px 2px 4px",
  margin: "0px 4px",
  cursor: "pointer",

}
}
let header = () => {
  return (
    <header className="bar bar-nav" style={{backgroundColor:"#0099FF",color:"#FFFFFF"}}>
      <a
      className="tab-item open-panel pull-left"
      data-panel="#panel-left-demo"
      >
        <span className="icon icon-me" />
    </a>
      <h1 className="title" style={{color:"#FFFFFF"}}>选电影</h1>
    </header>
    )
  }

class Style extends React.Component{
  constructor(props) {
    super(props); 
        console.log(props);
        // this.state={
        //   currentIndex:false,
        // };
        this.handleStyle=this.handleStyle.bind(this);
  }
  
  handleStyle(e,key) {
    //this.props.onFilterTextInput(e.target.value);
    this.props.onTypeClick(e,key)
    console.log(key);
  } 

  componentDidMount() {
        console.log("0-0-");
        console.log("0909");
      }

  onClickStyle(e,key){
    this.setState({
      currentIndex:key,
    })
  }
    
 checkStyle(clickStyle){
      const style = this.props.style;
      // if(key===style){
      // return Styles.Select; 
      // }else{
      //   return Styles.listStyle
      // }  
      // console.log(checkStyle)  
      var clickStyle = this.state.currentIndex===style?  Styles.Select : Styles.listStyle;
      return clickStyle
      console.log(clickStyle)
 }

  render() {
    const style = this.props.style;
    console.log(style);

    //var clickStyle = this.state.currentIndex?  Styles.Select : Styles.listStyle;
    var clickStyle1 = style===''?  Styles.Select : Styles.listStyle;
    var clickStyle2 = style==='爱情'?  Styles.Select : Styles.listStyle;
    var clickStyle3 = style==='喜剧'?  Styles.Select : Styles.listStyle;
    var clickStyle4 = style==='动作'?  Styles.Select : Styles.listStyle;
    var clickStyle5 = style==='剧情'?  Styles.Select : Styles.listStyle;
    var clickStyle6 = style==='科幻'?  Styles.Select : Styles.listStyle;
    var clickStyle7 = style==='恐怖'?  Styles.Select : Styles.listStyle;
    var clickStyle8 = style==='动画'?  Styles.Select : Styles.listStyle;
    var clickStyle9 = style==='惊悚'?  Styles.Select : Styles.listStyle;
    var clickStyle10 = style==='犯罪'?  Styles.Select : Styles.listStyle;
    return ( 
      
      <li type="checkbox">
      <span className="" style={Styles.titleName}>类型：</span>
      <a onClick={
        this.handleStyle.bind(this,'','')
      } className="tab-link active" type="radio" name="tag" value="爱情" style={clickStyle1} >全部</a>
      <a  onClick={(e) => {
                this.handleStyle(e,'爱情')
              }}className="tab-link" type="radio" name="tag" value="'爱情" style={clickStyle2}>爱情</a>
      <a onClick={(e) => {
                this.handleStyle(e,'喜剧')
              }} className="tab-link" type="radio" name="tag" value="喜剧" style={clickStyle3}>喜剧</a>
      <a onClick={(e) => {
                this.handleStyle(e,'动作')
              }} className="tab-link" type="radio" name="tag" value="'动作" style={clickStyle4}>动作</a>
      <a onClick={(e) => {
                this.handleStyle(e,'剧情')
              }} type="radio" className="tab-link" name="tag" value="剧情" style={clickStyle5}>剧情</a>
      <a onClick={(e) => {
                this.handleStyle(e,"科幻")
              }} type="radio" className="tab-link" name="tag" value="科幻" style={clickStyle6}>科幻</a>
      <a onClick={(e) => {
                this.handleStyle(e,"恐怖")
              }} type="radio" className="tab-link" name="tag" value="恐怖" style={clickStyle7}>恐怖</a>
      <a onClick={(e) => {
                this.handleStyle(e,"动画")
              }} type="radio" className="tab-link" name="tag" value="/动画/" style={clickStyle8}>动画</a>
      <a onClick={(e) => {
                this.handleStyle(e,"惊悚")
              }} type="radio" className="tab-link" name="tag" value="/惊悚/" style={clickStyle9}>惊悚</a>
      <a onClick={(e) => {
                this.handleStyle(e,"犯罪")
              }} type="radio" className="tab-link" name="tag" value="/犯罪/" style={clickStyle10}>犯罪</a>

      </li>
    );
  }
}
class Country extends React.Component{
  constructor(props) {
    super(props); 
        console.log(props);
        this.handleCountry=this.handleCountry.bind(this);
  }
  
  handleCountry(e,key) {
    //this.props.onFilterTextInput(e.target.value);
    this.props.onCountryClick(e,key)
    console.log(key);
  } 

  componentDidMount() {
        console.log("0-0-");
        console.log("0909");
      }



  render() {
    const country = this.props.country;
    console.log(country);
    var clickCountry1 = country===''?  Styles.Select : Styles.listStyle;
    var clickCountry2 = country==='大陆'?  Styles.Select : Styles.listStyle;
    var clickCountry3 = country==='美国'?  Styles.Select : Styles.listStyle;
    var clickCountry4 = country==='香港'?  Styles.Select : Styles.listStyle;
    var clickCountry5 = country==='台湾'?  Styles.Select : Styles.listStyle;
    var clickCountry6 = country==='日本'?  Styles.Select : Styles.listStyle;
    var clickCountry7 = country==='韩国'?  Styles.Select : Styles.listStyle;
    var clickCountry8 = country==='泰国'?  Styles.Select : Styles.listStyle;
    var clickCountry9 = country==='英国'?  Styles.Select : Styles.listStyle;
    var clickCountry10 = country==='印度'?  Styles.Select : Styles.listStyle;
    return (  
      <li type="checkbox">
      <span className="" style={Styles.titleName}>地区：</span>
      <a onClick={
        this.handleCountry.bind(this,'','')
      } type="radio" name="tag" value="全部" style={clickCountry1}>全部</a>
      <a onClick={(e) => {
                this.handleCountry(e,'大陆')
              }} type="radio" name="tag" value="大陆" style={clickCountry2}>大陆</a>
      <a onClick={(e) => {
                this.handleCountry(e,'美国')
              }} type="radio" name="tag" value="美国" style={clickCountry3}>美国</a>
      <a onClick={(e) => {
                this.handleCountry(e,'香港')
              }} type="radio" name="tag" value="香港" style={clickCountry4}>香港</a>
      <a onClick={(e) => {
                this.handleCountry(e,'台湾')
              }} type="radio" name="tag" value="台湾" style={clickCountry5}>台湾</a>
      <a onClick={(e) => {
                this.handleCountry(e,'日本')
              }} type="radio" name="tag" value="日本" style={clickCountry6}>日本</a>
      <a onClick={(e) => {
                this.handleCountry(e,'韩国')
              }} type="radio" name="tag" value="韩国" style={clickCountry7} >韩国</a>
      <a onClick={(e) => {
                this.handleCountry(e,'泰国')
              }} type="radio" name="tag" value="泰国" style={clickCountry8} >泰国</a>
      <a onClick={(e) => {
                this.handleCountry(e,'英国')
              }} type="radio" name="tag" value="英国" style={clickCountry9} >英国</a>
      <a onClick={(e) => {
                this.handleCountry(e,'印度')
              }} type="radio" name="tag" value="其他" style={clickCountry10} >其他</a>
      </li>
  
    );
  }
}
class Year extends React.Component{
  constructor(props) {
    super(props); 
        console.log(props);
        this.handleYear=this.handleYear.bind(this);
  }
  
  handleYear(e,key) {
    //this.props.onFilterTextInput(e.target.value);
    this.props.onYearClick(e,key)
    console.log(key);
  } 

  componentDidMount() {
        console.log("0-0-");
        console.log("0909");
      }
    

  render() {
    const years = this.props.years;
    console.log(years);
    var clickYear1 = years===''?  Styles.Select : Styles.listStyle;
    var clickYear2 = years==='(2017)'?  Styles.Select : Styles.listStyle;
    var clickYear3 = years==='(2016)'?  Styles.Select : Styles.listStyle;
    var clickYear4 = years==='(2015)'?  Styles.Select : Styles.listStyle;
    var clickYear5 = years==='(2014)'?  Styles.Select : Styles.listStyle;
    var clickYear6 = years==='(2013)'?  Styles.Select : Styles.listStyle;
    var clickYear7 = years==='(2000)'?  Styles.Select : Styles.listStyle;
    var clickYear8 = years==='(1990)'?  Styles.Select : Styles.listStyle;
    var clickYear9 = years==='(1980)'?  Styles.Select : Styles.listStyle;
    return ( 
      
      <li type="checkbox">
      <span className="" style={Styles.titleName}>年代：</span>
      <a onClick={
        this.handleYear.bind(this,'','')
      } type="radio" name="tag" value="全部"  style={clickYear1}>全部</a>
      <a onClick={(e) => {
                this.handleYear(e,'(2017)')
              }} type="radio" name="tag" value="2017" style={clickYear2} >2017</a>
      <a onClick={(e) => {
                this.handleYear(e,'(2016)')
              }} type="radio" name="tag" value="2016" style={clickYear3}>2016</a>
      <a onClick={(e) => {
                this.handleYear(e,'(2015)')
              }} type="radio" name="tag" value="2015" style={clickYear4}>2015</a>
      <a onClick={(e) => {
                this.handleYear(e,'(2014)')
              }} type="radio" name="tag" value="2014" style={clickYear5} >2014</a>
      <a onClick={(e) => {
                this.handleYear(e,'(2013)')
              }} type="radio" name="tag" value="2013" style={clickYear6}>2013</a>
      <a onClick={(e) => {
                this.handleYear(e,'(2000)')
              }} type="radio" name="tag" value="00年代" style={clickYear7}>00年代</a>
      <a onClick={(e) => {
                this.handleYear(e,'(1990)')
              }} type="radio" name="tag" value="90年代" style={clickYear8} >90年代</a>
      <a onClick={(e) => {
                this.handleYear(e,'(1980)')
              }} type="radio" name="tag" value="80年代" style={clickYear9} >80年代</a>
      </li>
    );
  }
}


class Movie extends React.Component {
  constructor(props) {
    
    super(props);
    this.formType = this.formType.bind(this);
    this.formCountry = this.formCountry.bind(this);
    this.formYear = this.formYear.bind(this);
        this.state = {
          list: [],
          defaultTop: null,
          style: '',
          country:'',
          years:'',
          orderBy:'movietime',
        };
        console.log(props);
    this.handleMovie = this.handleMovie.bind(this);
  }
  
  handleMovie(e) {
    //this.props.onFilterTextInput(e.target.value);
    console.log(e.target.value);
  } 

  componentDidMount() {
        console.log("0-0-");
        // var outerScroller = document.getElementById('outerScroller');

        this.formType();
        this.formCountry();
        this.formYear();
        this.allType();
        this.allCountry();
        this.allYear();
        this.orderBy();
        this.firstOrderBy();
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
      // activeStyle(index){
      //   return index === this.state.currentIndex ? "Styles.Select" : "Styles.listStyle"
      // }
      // activeStyle(e,key){
      //   let style = '';
      //   return key === style ? "Styles.Select" : "Styles.listStyle"
      // }
      firstOrderBy(e,key){
        let style = this.state.style;
        let country = this.state.country;
        let years = this.state.yeras;
        let orderBy = 'movietime';
        console.log(orderBy)
        let movieInfo = {
          country:country,
          style:style,
          years:years,
          orderBy:orderBy,
        }

        MovieModel.movieList(movieInfo, (data) => {
            this.setState({
              list: data,
              orderBy:orderBy,
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
      orderBy(e,key){
        let style = this.state.style;
        let country = this.state.country;
        let years = this.state.yeras;
        let orderBy = key;
        console.log(orderBy)
        let movieInfo = {
          country:country,
          style:style,
          years:years,
          orderBy:orderBy,
        }

        MovieModel.movieList(movieInfo, (data) => {
            this.setState({
              list: data,
              orderBy:orderBy,
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
      allType(e) {
        let style = '';
        let country = this.state.country;
        let years = this.state.yeras;
        let orderBy = this.state.orderBy;
        console.log(style)
        let movieInfo = {
          country:country,
          style:style,
          years:years,
          orderBy:orderBy,
        }

        MovieModel.movieList(movieInfo, (data) => {
            this.setState({
              list: data,
              style:style,
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
      allCountry(e) {
        let country = '';
        let style = this.state.style;
        let years = this.state.yeras;
        let orderBy = this.state.orderBy;
        console.log(country)
        let movieInfo = {
          country:country,
          style:style,
          years:years,
          orderBy:orderBy,
        }
        MovieModel.movieList(movieInfo, (data) => {
            this.setState({
              list: data,
              country:country,
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
      allYear(e) {
        let years = '';
        let style = this.state.style;
        let country = this.state.country;
        let orderBy = this.state.orderBy;
        console.log(years)
        let movieInfo = {
          country:country,
          style:style,
          years:years,
          orderBy:orderBy,
        }
        MovieModel.movieList(movieInfo, (data) => {
            this.setState({
              list: data,
              years:years,
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
      formType(e,key) {
        let style = key;
        let country = this.state.country;
        let years = this.state.yeras;
        let orderBy = this.state.orderBy;
        console.log(key)
        console.log(style)
        let movieInfo = {
          country:country,
          style:style,
          years:years,
        }

        MovieModel.movieList(movieInfo, (data) => {
            this.setState({
              list: data,
              style:style,
              orderBy:orderBy,
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
      formCountry(e,key) {
        let country = key;
        let style = this.state.style;
        let years = this.state.yeras;
        let orderBy = this.state.orderBy;
        console.log(key)
        console.log(country)
        let movieInfo = {
          country:country,
          style:style,
          years:years,
          
        }
        MovieModel.movieList(movieInfo, (data) => {
            this.setState({
              list: data,
              country:country,
              orderBy:orderBy,
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
      formYear(e,key) {
        let years = key;
        let style = this.state.style;
        let country = this.state.country;
        let orderBy = this.state.orderBy;
        console.log(years)
        let movieInfo = {
          country:country,
          style:style,
          years:years,
          orderBy:orderBy,
        }
        MovieModel.movieList(movieInfo, (data) => {
            this.setState({
              list: data,
              years:years,
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

      // fetchData() {
      //   MovieModel.movieList(
      //     "",
      //     data => {
      //       // this.setState({
      //       //   list: data
      //       // });
      //       this.loadingFinish(
      //         this.refs.outerScroller,
      //         this.refs.preloader,
      //         this.refs.scrollList
      //       );
      //     },
      //     err => {
      //       console.log(err);
      //     }
      //   );
      // }
      
  // formType(e,key) { 
  //   // let style = this.refs.style;
  //   this.setState({
  //     style:key
  //   })
  //   console.log(key)
  // }


  indexList() {
        let _this = this;
        let list = this.state.list;
          // MovieModel.movieList(
          //         "",
          //         data => {
          //           this.setState({
          //             list: data
          //           });
          //         }
          //       )

    
       return list.map(function(item, index) {
          return (
            <div className="" style={Styles.indexList} key={item._id}>
              <Link to={"/movie/" + item._id} style={{ width:"100%",height: "auto" }}>
                <div className="list">
                  <div className="" style={{ paddingTop: "0.8rem" }}>
                    <div
                      style={{
                        height: "10rem",
                     
                      }}
                    >
                    <div style={{
            width:"40%",
            height: "100%",
            float:"left",
          }}>
                      <img
                        src={item.imglink}
                        style={{
                          width:"6rem",
                          height: "9rem"
                        }}
                        alt=""
                      />
                      </div>
                    <div style={{
            width:"60%",
            height: "100%",
            float:"left",
          }}>
                      <span
                      style={{
                        height: "0.5rem",
                        fontSize: "25px",
                        fontWeight: "900"
                      }}
                    >{item.title}
    
                    </span><br/>
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
                        >分</span><br/>
                        <span style={{ 
                        height: "0.4rem",
                        fontSize: "18px",
                        color: "#888888",
                        }}
                        >导演：{item.director}</span>
                        <br/>
                        <span style={{ 
                        height: "0.4rem",
                        fontSize: "18px",
                        color: "#888888",
                        }}
                        >主演：{item.actor.slice(0,3)}</span>
                        </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        });
      }
       
 
  render() {
    const style = this.state.style;
    const country = this.state.country;
    const years = this.state.years;
    const orderBy = this.state.orderBy;
    console.log(style);
    console.log(country);
    console.log(years);
    var clickOrder1 = this.state.orderBy==='movietime'?  "tab-link active button" : "tab-link button";
    var clickOrder2 = this.state.orderBy==='showtime'?  "tab-link active button" : "tab-link button";
    var clickOrder3 = this.state.orderBy==='score'?  "tab-link active button" : "tab-link button";
    console.log(orderBy);
    return (
      <div data-log="log">
        <div 
            style={{position: "absolute", height: "50px", width: "100%", top: "0px", zIndex: '2001'}}>{header()}</div>
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

           
      
      <div style={Styles.index}>
      {/* oncheckStyle={this.activeStyle()} */}
     <Style onTypeClick={this.formType.bind(this)} style={style} />
      <Country onCountryClick={this.formCountry.bind(this)} country={country}/>
      <Year onYearClick={this.formYear.bind(this)} years={years}/>

     
   <div className="buttons-tab">
    <a onClick={
                this.orderBy.bind(this,'','movietime')
              } className={clickOrder1}>按热度排序</a>
    <a onClick={(e) => {
                this.orderBy(e,'showtime')
              }} className={clickOrder2}>按时间排序</a>
    <a onClick={(e) => {
                this.orderBy(e,'score')
              }} className={clickOrder3}>按评价排序</a>
      </div>
      </div>
    
      <ul
              style={{ background: "#eee" }}
              className="scroll"
              ref="scrollList"
            >
      <div>
        {this.indexList()}
        </div>
      
            </ul>
          </div>
        </main>
        <div className="panel-overlay" />
        <div
          className="panel panel-left panel-reveal theme-dark"
          id="panel-left-demo"
        >
        </div>
      </div>
   
    );
  }
}
// class Movie extends React.Component {
//   constructor(props) {
    
//     super(props);
//         this.state = {
//           list: [],
//           defaultTop: null,
//           style: '',
//           country:'',
//         };
//         console.log(props);
//     this.handleMovie = this.handleMovie.bind(this);
//   }
  
//   handleMovie(e) {
//     //this.props.onFilterTextInput(e.target.value);
//     console.log(e.target.value);
//   } 

//   componentDidMount() {
//         console.log("0-0-");
//         // var outerScroller = document.getElementById('outerScroller');
//         // this.fetchData();
//         this.formType();
//         this.formCountry();
//         this.formYear();
//         this.allType();
//         this.allCountry();
//         this.allYear();
//         this.reseat();
//         console.log("0909");
//       }
//       reseat() {
//         let defaultTop = this.refs.outerScroller.offsetTop;
//         this.setState({
//           defaultTop: defaultTop
//         });
//         this.pullToRefresh(
//           this.refs.outerScroller,
//           this.refs.pullToRefreshBox,
//           this.refs.scrollList,
//           this.refs.preloader,
//           this.refs.pullToRefreshArrow
//         );
//       }
//       allType(e) {
//         let style = '爱情';
//         console.log(style)
//         let movieInfo = {
//           style:style
//         }

//         MovieModel.movieList(movieInfo, (data) => {
//             this.setState({
//               list: data,
//             });
            
//             this.loadingFinish(
//               this.refs.outerScroller,
//               this.refs.preloader,
//               this.refs.scrollList
//             );
//           },
//           err => {
//             console.log(err);
//           }
//         );
//       }
//       allCountry(e) {
//         let country = '大陆';
//         console.log(country)
//         let movieInfo = {
//           country:country
//         }
//         MovieModel.movieList(movieInfo, (data) => {
//             this.setState({
//               list: data,
//             });
            
//             this.loadingFinish(
//               this.refs.outerScroller,
//               this.refs.preloader,
//               this.refs.scrollList
//             );
//           },
//           err => {
//             console.log(err);
//           }
//         );
//       }
//       allYear(e) {
//         let years = '(2017)';
//         console.log(years)
//         let movieInfo = {
//           years:years
//         }
//         MovieModel.movieList(movieInfo, (data) => {
//             this.setState({
//               list: data,
//             });
            
//             this.loadingFinish(
//               this.refs.outerScroller,
//               this.refs.preloader,
//               this.refs.scrollList
//             );
//           },
//           err => {
//             console.log(err);
//           }
//         );
//       }
//       formType(e,key) {
//         let style = key;
//         console.log(key)
//         console.log(style)
//         let movieInfo = {
//           style:style
//         }

//         MovieModel.movieList(movieInfo, (data) => {
//             this.setState({
//               list: data,
//             });
            
//             this.loadingFinish(
//               this.refs.outerScroller,
//               this.refs.preloader,
//               this.refs.scrollList
//             );
//           },
//           err => {
//             console.log(err);
//           }
//         );
//       }
//       formCountry(e,key) {
//         let country = key;
//         console.log(key)
//         console.log(country)
//         let movieInfo = {
//           country:country
//         }
//         MovieModel.movieList(movieInfo, (data) => {
//             this.setState({
//               list: data,
//             });
            
//             this.loadingFinish(
//               this.refs.outerScroller,
//               this.refs.preloader,
//               this.refs.scrollList
//             );
//           },
//           err => {
//             console.log(err);
//           }
//         );
//       }
//       formYear(e,key) {
//         let years = key;
//         console.log(years)
//         let movieInfo = {
//           years:years
//         }
//         MovieModel.movieList(movieInfo, (data) => {
//             this.setState({
//               list: data,
//             });
            
//             this.loadingFinish(
//               this.refs.outerScroller,
//               this.refs.preloader,
//               this.refs.scrollList
//             );
//           },
//           err => {
//             console.log(err);
//           }
//         );
//       }
     
//       //点赞
//       giveStar(e) {
//         var _this = this;
//         let userToken = UserModel.fetchToken();
//         if (!userToken) {
//           $.toast("您还没有登录");
//           return;
//         }
//         let thisSpan = e.nativeEvent.target;
//         let articleId = thisSpan.getAttribute("data-articleid");
//         let params = {
//           userId: userToken,
//           articleId: articleId
//         };
//         ArticleModel.giveStar(
//           params,
//           data => {
//             if (data.title) {
//               thisSpan.style.color = "red";
//               $.toast(data.content);
//               this.componentDidMount();
//             } else {
//               thisSpan.style.color = "none";
//               $.toast(data.content);
//               this.componentDidMount();
//             }
//           },
//           err => {
//             console.log(err);
//           }
//         );
//       }
//       //设置点赞星样式
//       starStyle(starlist) {
//         let userToken = UserModel.fetchToken();
//         for (let i = 0; i < starlist.length; i++) {
//           let cur = starlist[i];
//           if (cur == userToken) {
//             return { marginRight: "0.5rem", paddingLeft: "0.3rem", color: "red" };
//           }
//         }
//         return { marginRight: "0.5rem", paddingLeft: "0.3rem" };
//       }
//       //限制字数
//       wordControl(word) {
//         if (word.length > 65) {
//           word = word.substring(0, 65) + " ...";
//         }
//         return word;
//       }
//       //下拉刷新
//       pullToRefresh(
//         outerScroller,
//         pullToRefreshBox,
//         scrollList,
//         preloader,
//         pullToRefreshArrow
//       ) {
//         let _this = this;
//         //设置初始touchstart时的Y轴坐标
//         var touchStart;
//         //初始总盒子的top值
//         var defaultTopVal = outerScroller.offsetTop;
//         // console.log(defaultTopVal);
//         //根据需求设置一下内容list的长度
//         scrollList.style.height = document.body.clientHeight + "px";
//         //检查是否满足下拉状态
//         checkState(outerScroller.offsetTop);
//         scrollList.onscroll = function() {
//           var scrollListST = scrollList.scrollTop;
//           if (parseInt(scrollListST) == 0) {
//             console.log("dhjsfhjsd");
//             checkState(outerScroller.offsetTop);
//           }
//         };
//         //检查是否满足下拉刷新的条件
//         function checkState(point) {
//           console.log("dhjsfhjsd1", point, defaultTopVal, scrollList.scrollTop);
//           if (point == defaultTopVal) {
//             if (scrollList.scrollTop == 0) {
//               console.log("dhjsfhjsd2");
//               outerScroller.addEventListener("touchstart", startPageY, false);
//             }
//           }
//         }
//         //监听touchmove事件
//         function startPageY(e) {
//           console.log("dhjsfhjsd3");
//           //保存touchstart时的Y轴坐标
//           touchStart = e.targetTouches[0].pageY;
//           outerScroller.addEventListener("touchmove", checkDirection, false);
//         }
//         //检查手指滑动的方向
//         function checkDirection(e) {
//           /**如果显示内容不是scrollList最顶端,则不满足下拉刷新条件
//              * 这个也是检查是否满足下拉的条件,但是不能和上面的写在一起,因为我们已经开始监听touchmove事件了,
//              * 因为不满足,所以把touchmove事件的监听remove掉
//              */
//           if (scrollList.scrollTop > 0) {
//             outerScroller.removeEventListener("touchmove", checkDirection, false);
//             return;
//           }
//           //touchmove时,手机划过的Y坐标
//           var judegP = e.targetTouches[0].pageY;
//           //大于标示是向下滑动,开始下拉刷新,这是要监听touchmove事件来触发下拉刷新方法(pullRefresh)
//           //如果是向上滑就remove掉checkDiretion方法
//           if (judegP > touchStart) {
//             outerScroller.addEventListener("touchmove", pullRefresh, false);
//             outerScroller.removeEventListener("touchmove", checkDirection, false);
//           } else {
//             outerScroller.removeEventListener("touchmove", checkDirection, false);
//           }
//         }
//         //此方法为会又touchmove调用多次,所以用来显示下拉加载盒子
//         function pullRefresh(e) {
//           // console.log(_this,this);
//           //滑动期间手指在屏幕上的位置
//           var pageY = e.targetTouches[0].pageY;
//           var temp = pageY - touchStart;
//           //设置top值(多次)
//           outerScroller.style.top = defaultTopVal + temp + "px";
//           //下箭头变成上箭头,提醒用户松手
//           if (temp >= Math.abs(defaultTopVal)) {
//             addClass(pullToRefreshBox, "up");
//           } else if (temp < Math.abs(defaultTopVal)) {
//             //上变下
//             _this.removeClass(pullToRefreshBox, "up");
//           } else {
//             outerScroller.style.top = defaultTopVal + "px";
//           }
//           //如果超出默认的top值,就强制设置为默认值
//           if (parseInt(outerScroller.style.top) < defaultTopVal) {
//             outerScroller.style.top = defaultTopVal + "px";
//           }
//           //touchmove过程中禁止列表的操作,可以阻止默认事件,我这里就直接hidden就没有了滚动条
//           scrollList.style.overflow = "hidden";
//           //同时监听touchend方法
//           outerScroller.addEventListener("touchend", touchMoveEnd, false);
//         }
//         //touchend 方法,
//         function touchMoveEnd(e) {
//           // 首先remove掉touchmove事件的监听
//           outerScroller.removeEventListener("touchmove", pullRefresh, false);
//           //如果下拉程度没有到达设定的需要下拉加载的数值,就无视,但是需要将页面还原
//           if (parseInt(outerScroller.style.top) < 0) {
//             //未到达指定数值
//             var outTime = setInterval(function() {
//               outerScroller.style.top =
//                 parseInt(outerScroller.style.top) - 3 + "px";
//               if (parseInt(outerScroller.style.top) <= defaultTopVal) {
//                 clearInterval(outTime);
//                 //因为这里设置的是每10毫秒减3px,所以设定界限,如果超出就直接变为默认值
//                 if (outerScroller.offsetTop < defaultTopVal) {
//                   outerScroller.style.top = defaultTopVal + "px";
//                   //进行新一轮的监听
//                   checkState(outerScroller.offsetTop);
//                 }
//               }
//             }, 10);
//             //将内容列表设置为可操作状态
//             scrollList.style.overflow = "auto";
//             return;
//           }
//           //达到了指定的下拉加载数值
//           if (outerScroller.offsetTop >= 0) {
//             //用于切换加载gif
//             pullToRefreshArrow.style.display = "none";
//             preloader.style.display = "block";
//             var time = setInterval(function() {
//               outerScroller.style.top = outerScroller.offsetTop - 3 + "px";
//               if (outerScroller.offsetTop <= 0) {
//                 if (outerScroller.offsetTop < defaultTopVal) {
//                   outerScroller.style.top = defaultTopVal + "px";
//                 }
//                 outerScroller.style.top = 0;
//                 clearInterval(time);
//                 outerScroller.removeEventListener("touchmove", pullRefresh, false);
//                 outerScroller.removeEventListener("touchend", touchMoveEnd, false);
//               }
//             }, 10);
//             _this.fetchData();
//           }
//         }
    
//         //辅助方法
//         //增加class
//         function addClass(curEle, strClass) {
//           //strClass 是一串字符串，可能含有多个class ，所以用正则区分开，然后放到数组中进行循环遍历。
//           var aryClass = strClass.replace(/(^\s+)|(\s+$)/g, "").split(/\s+/g);
//           for (var i = 0; i < aryClass.length; i++) {
//             var curClass = aryClass[i];
//             if (!_this.hasClass(curEle, curClass)) {
//               curEle.className += " " + curClass;
//             }
//           }
//         }
//         //removeClass:移除掉当前元素上的class名
    
//         //判断是否含有Class
//       }
//       //刷新完成
//       loadingFinish(outerScroller, preloader, scrollList) {
//         let _this = this;
//         scrollList.style ? (scrollList.style.overflow = "auto") : null;
//         preloader.style ? (preloader.style.display = "none") : null;
//         //将页面还原
//         // return;
//         var LFT = setInterval(function() {
//           outerScroller.style.top = parseInt(outerScroller.style.top) - 3 + "px";
//           if (!outerScroller.style.top) {
//             clearInterval(LFT);
//             return;
//           }
//           if (parseInt(outerScroller.style.top) <= _this.state.defaultTop) {
//             clearInterval(LFT);
//             if (outerScroller.offsetTop < _this.state.defaultTop) {
//               outerScroller.style.top = _this.state.defaultTop + "px";
//             }
//             //进行新的一轮监听
//             //
//             _this.pullToRefresh(
//               _this.refs.outerScroller,
//               _this.refs.pullToRefreshBox,
//               _this.refs.scrollList,
//               _this.refs.preloader,
//               _this.refs.pullToRefreshArrow
//             );
//             // checkState(outerScroller.offsetTop)
//             _this.refs.pullToRefreshArrow.style.display = "block";
//             _this.removeClass(_this.refs.pullToRefreshBox, "up");
//           }
//         }, 10);
//       }
//       removeClass(curEle, strClass) {
//         var aryClass = strClass.replace(/(^\s+)|(\s+$)/g, "").split(/\s+/g);
//         for (var i = 0; i < aryClass.length; i++) {
//           var curClass = aryClass[i];
//           if (this.hasClass(curEle, curClass)) {
//             var reg = new RegExp("(^| +)" + curClass + "( +|$)");
//             curEle.className = curEle.className.replace(reg, " ");
//           }
//         }
//       }
//       hasClass(curEle, strClass) {
//         var reg = new RegExp("(\\b)" + strClass + "(\\b)");
//         return reg.test(curEle.className);
//       }

//       // fetchData() {
//       //   MovieModel.movieList(
//       //     "",
//       //     data => {
//       //       // this.setState({
//       //       //   list: data
//       //       // });
//       //       this.loadingFinish(
//       //         this.refs.outerScroller,
//       //         this.refs.preloader,
//       //         this.refs.scrollList
//       //       );
//       //     },
//       //     err => {
//       //       console.log(err);
//       //     }
//       //   );
//       // }
      
//   // formType(e,key) { 
//   //   // let style = this.refs.style;
//   //   this.setState({
//   //     style:key
//   //   })
//   //   console.log(key)
//   // }


//   indexList() {
//         let _this = this;
//         let list = this.state.list;
//           // MovieModel.movieList(
//           //         "",
//           //         data => {
//           //           this.setState({
//           //             list: data
//           //           });
//           //         }
//           //       )
//        return list.map(function(item, index) {
//           return (
//             <li className="" style={Styles.indexList} key={item._id}>
//               <Link to={"/movie/" + item._id} style={{ width:"100%",height: "auto" }}>
//                 <div className="list">
//                   <div className="" style={{ paddingTop: "0.4rem" }}>
//                     <div
//                       style={{
//                         width:"6rem",
//                         height: "12rem",
//                       }}
//                     >
//                       <img
//                         src={item.imglink}
//                         style={{
//                           width:"6rem",
//                           height: "9rem"
//                         }}
//                         alt=""
//                       />
//                       <span
//                       style={{
//                         height: "0.5rem",
//                         fontSize: "16px"
//                       }}
//                     >{item.title}
    
//                     </span>
//                     <span style={{ 
//                         height: "0.4rem",
//                         fontSize: "14px",
//                         color: "#FF9933",
//                         }}
//                         >
//                         {item.score}
//                       </span> 
//                       <span style={{ 
//                         height: "0.4rem",
//                         fontSize: "14px",
//                         color: "#FF9933",
//                         }}
//                         >分</span>
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             </li>
//           );
//         });
//       }
       
 
//   render() {
//     return (
//       <div data-log="log">
//         <div 
//             style={{position: "absolute", height: "50px", width: "100%", top: "0px", zIndex: '2001'}}>{header()}</div>
//         <main className="page page-current">
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

           
      
//       <div style={Styles.index}>
//   {/* <div className="content-block">
//     <div className="row"> */}
//       <li type="checkbox">
//       {/* to={{pathname:"", state:{style:{'style':/爱情/}}} */}
//       <span className=""  style={Styles.titleName}>类型：</span>
//       <a onClick={
//                 this.allType.bind(this)
//               } className="tab-link active " type="radio" name="tag" value="爱情" style={Styles.listStyle} style={Styles.Select}>全部</a>
//       <a  onClick={(e) => {
//                 this.formType(e,'爱情')
//               }} className="tab-link" type="radio" name="tag" value="'爱情" style={Styles.listStyle}>爱情</a>
//       <a onClick={(e) => {
//                 this.formType(e,'喜剧')
//               }} className="tab-link" type="radio" name="tag" value="喜剧" style={Styles.listStyle}>喜剧</a>
//       <a onClick={(e) => {
//                 this.formType(e,'动作')
//               }} className="tab-link" type="radio" name="tag" value="'动作" style={Styles.listStyle}>动作</a>
//       <a onClick={(e) => {
//                 this.formType(e,'剧情')
//               }} type="radio" className="tab-link" name="tag" value="剧情" style={Styles.listStyle}>剧情</a>
//       <a onClick={(e) => {
//                 this.formType(e,"科幻")
//               }} type="radio" className="tab-link" name="tag" value="科幻" style={Styles.listStyle}>科幻</a>
//       <a onClick={(e) => {
//                 this.formType(e,"恐怖")
//               }} type="radio" className="tab-link" name="tag" value="恐怖" style={Styles.listStyle}>恐怖</a>
//       <a onClick={(e) => {
//                 this.formType(e,"动画")
//               }} type="radio" className="tab-link" name="tag" value="/动画/" style={Styles.listStyle}>动画</a>
//       <a onClick={(e) => {
//                 this.formType(e,"惊悚")
//               }} type="radio" className="tab-link" name="tag" value="/惊悚/" style={Styles.listStyle}>惊悚</a>
//       <a onClick={(e) => {
//                 this.formType(e,"犯罪")
//               }} type="radio" className="tab-link" name="tag" value="/犯罪/" style={Styles.listStyle}>犯罪</a>
//      </li>
//       <li type="checkbox">
//       <span className="" style={Styles.titleName}>地区：</span>
//       <a onClick={
//                 this.allCountry.bind(this)
//               } type="radio" name="tag" value="全部" style={Styles.listStyle}>全部</a>
//       <a onClick={(e) => {
//                 this.formCountry(e,'大陆')
//               }} type="radio" name="tag" value="大陆" style={Styles.listStyle}>大陆</a>
//       <a onClick={(e) => {
//                 this.formCountry(e,'美国')
//               }} type="radio" name="tag" value="美国" style={Styles.listStyle}>美国</a>
//       <a onClick={(e) => {
//                 this.formCountry(e,'香港')
//               }} type="radio" name="tag" value="香港" style={Styles.listStyle}>香港</a>
//       <a onClick={(e) => {
//                 this.formCountry(e,'台湾')
//               }} type="radio" name="tag" value="台湾" style={Styles.listStyle}>台湾</a>
//       <a onClick={(e) => {
//                 this.formCountry(e,'日本')
//               }} type="radio" name="tag" value="日本" style={Styles.listStyle}>日本</a>
//       <a onClick={(e) => {
//                 this.formCountry(e,'韩国')
//               }} type="radio" name="tag" value="韩国" style={Styles.listStyle} >韩国</a>
//       <a onClick={(e) => {
//                 this.formCountry(e,'泰国')
//               }} type="radio" name="tag" value="泰国" style={Styles.listStyle} >泰国</a>
//       <a onClick={(e) => {
//                 this.formCountry(e,'英国')
//               }} type="radio" name="tag" value="英国" style={Styles.listStyle} >英国</a>
//       <a onClick={(e) => {
//                 this.formCountry(e,'')
//               }} type="radio" name="tag" value="其他" style={Styles.listStyle} >其他</a>
//       </li>
  
//       <li type="checkbox">
//       <span className="" style={Styles.titleName}>年代：</span>
//       <a onClick={
//                 this.allYear.bind(this)
//               } type="radio" name="tag" value="全部"  style={Styles.listStyle}>全部</a>
//       <a onClick={(e) => {
//                 this.formYear(e,'(2017)')
//               }} type="radio" name="tag" value="2017" style={Styles.listStyle} >2017</a>
//       <a onClick={(e) => {
//                 this.formYear(e,'(2016)')
//               }} type="radio" name="tag" value="2016" style={Styles.listStyle}>2016</a>
//       <a onClick={(e) => {
//                 this.formYear(e,'(2015)')
//               }} type="radio" name="tag" value="2015" style={Styles.listStyle}>2015</a>
//       <a onClick={(e) => {
//                 this.formYear(e,'(2014)')
//               }} type="radio" name="tag" value="2014" style={Styles.listStyle} >2014</a>
//       <a onClick={(e) => {
//                 this.formYear(e,'(2013)')
//               }} type="radio" name="tag" value="2013" style={Styles.listStyle}>2013</a>
//       <a onClick={(e) => {
//                 this.formYear(e,'(2000)')
//               }} type="radio" name="tag" value="00年代" style={Styles.listStyle}>00年代</a>
//       <a onClick={(e) => {
//                 this.formYear(e,'(1990)')
//               }} type="radio" name="tag" value="90年代" style={Styles.listStyle} >90年代</a>
//       <a onClick={(e) => {
//                 this.formYear(e,'(1980)')
//               }} type="radio" name="tag" value="80年代" style={Styles.listStyle} >80年代</a>
//       </li>
//    <div className="buttons-tab">
//     <a href="#hot" className="tab-link active button">按热度排序</a>
//     <a href="#time" className="tab-link button">按时间排序</a>
//     <a href="#comment" className="tab-link button">按评价排序</a>
//       </div>
//       </div>
    
//       <ul
//               style={{ background: "#eee" }}
//               className="scroll"
//               ref="scrollList"
//             >
//       <div>
//         {this.indexList()}
//         </div>
      
//             </ul>
//           </div>
//         </main>
//         <div className="panel-overlay" />
//         <div
//           className="panel panel-left panel-reveal theme-dark"
//           id="panel-left-demo"
//         >
//         </div>
//       </div>
   
//     );
//   }
// }

export default Movie;
