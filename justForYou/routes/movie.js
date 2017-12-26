var express = require('express');
var express = require('express');
var formidable = require('formidable');
var router = express.Router();
var path = require('path');
var fs = require('fs');
 var ObjectId = require('mongodb').ObjectId;

var router = express.Router();
var API = 'http://localhost:4545';

router.post("/movieList", function(req, res) {
    var searchtip = req.body;
    var style="";
    var country="";
    var years="";
    // if(searchtip.style&&searchtip.country){
    // style = searchtip.style;
    // country = searchtip.country;
    // }
    if(searchtip.style)
    style = searchtip.style;
    if(searchtip.country)
    country = searchtip.country;
    if(searchtip.years)
    years = searchtip.years;
    console.log("searchtip", searchtip);
    var orderBy = searchtip.orderBy;
    var order = -1;
    var orderObj = {};
    orderObj[orderBy] = order;
    Model("Movie").find({$and : [{style : {$regex : style}},{country : {$regex : country}},{years : {$regex : years}}]}, null, null).sort(orderObj).exec(function (err,docs) {
              var movieList=[];
              if(docs&&docs.length>0)
              docs.forEach(function (item) {
                  movieList.push({
                      title:item.title,
                      years:item.years,
                      director:item.director,
                      actor:item.actor,
                      style:item.style,
                      country:item.country,
                      showtime:item.showtime,
                      movietime:item.movietime,
                      imglink:item.imglink,
                      imdb:item.imdb,
                      imdbLink:item.imdbLink,
                      score:item.score,
                      description:item.description,
                      _id:item._id,
                      star:item.star,
                      commentNum:item.comments.length,
                  })
              })
              console.log("doc1111",docs);
              res.send(movieList)
          })
  
  });

  router.post("/searchMovie", function(req, res) {
    var searchall = req.body;
    var info="";
    // if(searchtip.style&&searchtip.country){
    // style = searchtip.style;
    // country = searchtip.country;
    // }
    if(searchall.info)
    info = searchall.info;
    console.log("searchall", searchall);
    var orderBy = searchall.orderBy;
    var order = -1;
    var orderObj = {};
    orderObj[orderBy] = order;
    Model("Movie").find({title : {$regex : info}}, null, null).exec(function (err,docs) {
              var searchMovie=[];
              if(docs&&docs.length>0)
              docs.forEach(function (item) {
                  searchMovie.push({
                      title:item.title,
                      years:item.years,
                      director:item.director,
                      actor:item.actor,
                      style:item.style,
                      country:item.country,
                      showtime:item.showtime,
                      movietime:item.movietime,
                      imglink:item.imglink,
                      imdb:item.imdb,
                      imdbLink:item.imdbLink,
                      score:item.score,
                      description:item.descript,
                      _id:item._id,
                      star:item.star,
                      commentNum:item.comments.length,
                  })
              })
              console.log(searchMovie)
              console.log("doc1111",docs);
              res.send(searchMovie)
          })
  
  });
//   router.post('/movieList',function (req,res) {
//             var movie = req.body;
//             var orderBy = 'showtime';
//             var order = -1;
//             var orderObj = {};
//             orderObj[orderBy] = order;
//             movie.style="";
//             movie.countr="";
//             // var movie = req.body;
//             Model('Movie').find({"$and":[{style:movie.style},{country:movie.country}]},function (err,docs) {
//                 // Model("Movie").find({$and : [{style : {$regex : movie.style}},{country : {$regex : movie.country}}]}, null, { skip: 1, limit: 5 },function (err,docs) {
//                     var movieList=[];
//                     docs.forEach(function (item) {
//                         movieList.push({
//                             title:item.title,
//                             years:item.years,
//                             director:item.director,
//                             actor:item.actor,
//                             style:item.style,
//                             country:item.country,
//                             showtime:item.showtime,
//                             movietime:item.movietime,
//                             imglink:item.imglink,
//                             imdb:item.imdb,
//                             imdbLink:item.imdbLink,
//                             score:item.score,
//                             descript:item.descript,
//                             _id:item._id,
//                             star:item.star,
//                             commentNum:item.comments.length,
//                         })
//                     })
//                     console.log(movieList);
//                     res.send(movieList)
//                 })
//             });

// router.post("/movieList", function(req, res) {
//     var searchtip = req.body;
//     var style = searchtip.style;
//     var country = searchtip.country;
//     console.log("searchtip", searchtip);
//     var orderBy = "showtime";
//     var order = -1;
//     var orderObj = {};
//     orderObj[orderBy] = order;
//     Model("Movie").find({$and : [{style : {$regex : searchtip.style}},{country : {$regex : searchtip.country}}]}, null, { skip: 1, limit: 5 },function (err,docs) {
//               var movieList=[];
//               if(docs&&docs.length>0)
//               docs.forEach(function (item) {
//                   movieList.push({
//                       title:item.title,
//                       years:item.years,
//                       director:item.director,
//                       actor:item.actor,
//                       style:item.style,
//                       country:item.country,
//                       showtime:item.showtime,
//                       movietime:item.movietime,
//                       imglink:item.imglink,
//                       imdb:item.imdb,
//                       imdbLink:item.imdbLink,
//                       score:item.score,
//                       descript:item.descript,
//                       _id:item._id,
//                       star:item.star,
//                       commentNum:item.comments.length,
//                   })
//               })
//               console.log("doc1111",docs);
//               res.send(movieList)
//           })
  
//   });

// router.post('/movieList',function (req,res) {
//         var movie = req.body;
//         var orderBy = 'showtime';
//         var order = -1;
//         var orderObj = {};
//         orderObj[orderBy] = order;
//         // var movie = req.body;
//         // Model('Movie').find({"$and":[{'style':/动作/},{'country':/大陆/},{'years':/(2017)/}]},function (err,docs) {
//         Model('Movie').find({"$and":[{style:movie.style},{country:movie.country}]},function (err,docs) {
//         // Model('Movie').find({style:movie.style},function (err,docs) {
//         //  Model('Movie').find(function (err,docs) {

//             var movieList=[];
//             docs.forEach(function (item) {
//                 movieList.push({
//                     title:item.title,
//                     years:item.years,
//                     director:item.director,
//                     actor:item.actor,
//                     style:item.style,
//                     country:item.country,
//                     showtime:item.showtime,
//                     movietime:item.movietime,
//                     imglink:item.imglink,
//                     imdb:item.imdb,
//                     imdbLink:item.imdbLink,
//                     score:item.score,
//                     descript:item.descript,
//                     _id:item._id,
//                     pv:item.pv,
//                     star:item.star,
//                     commentNum:item.comments.length,
//                 })
//             })
//             res.send(movieList)
//         })
//     })
    router.get('/goingmovie',function (req,res) {
        
                var orderBy = 'showtime';
                var order = -1;
                var orderObj = {};
                orderObj[orderBy] = order;
                // var movie = req.body;
                // Model('Movie').find({"$and":[{'style':/动作/},{'country':/大陆/},{'years':/(2017)/}]},function (err,docs) {
                Model('Movie').find({'showtime':/(2016)/},null, null,function (err,docs) {
                //  Model('Movie').find(function (err,docs) {
                    var goingmovie=[];
                    docs.forEach(function (item) {
                        goingmovie.push({
                            title:item.title,
                            years:item.years,
                            director:item.director,
                            actor:item.actor,
                            style:item.style,
                            country:item.country,
                            showtime:item.showtime,
                            movietime:item.movietime,
                            imglink:item.imglink,
                            imdb:item.imdb,
                            imdbLink:item.imdbLink,
                            score:item.score,
                            description:item.description,
                            _id:item._id,
                            pv:item.pv,
                            star:item.star,
                            commentNum:item.comments.length,
                        })
                    })
                    res.send(goingmovie)
                })
            })

            router.get('/willmovie',function (req,res) {
                
                        var orderBy = 'showtime';
                        var order = -1;
                        var orderObj = {};
                        orderObj[orderBy] = order;
                        // var movie = req.body;
                        // Model('Movie').find({"$and":[{'style':/动作/},{'country':/大陆/},{'years':/(2017)/}]},function (err,docs) {
                        Model('Movie').find({'years':/(2017)/},null, null,function (err,docs) {
                        //  Model('Movie').find(function (err,docs) {
                            var willmovie=[];
                            docs.forEach(function (item) {
                                willmovie.push({
                                    title:item.title,
                                    years:item.years,
                                    director:item.director,
                                    actor:item.actor,
                                    style:item.style,
                                    country:item.country,
                                    showtime:item.showtime,
                                    movietime:item.movietime,
                                    imglink:item.imglink,
                                    imdb:item.imdb,
                                    imdbLink:item.imdbLink,
                                    score:item.score,
                                    description:item.description,
                                    _id:item._id,
                                    pv:item.pv,
                                    star:item.star,
                                    commentNum:item.comments.length,
                                })
                            })
                            res.send(willmovie)
                        })
                    })

    router.get('/hotmovie',function (req,res) {

        var orderBy = 'showtime';
        var order = -1;
        var orderObj = {};
        orderObj[orderBy] = order;
        // var movie = req.body;
        // Model('Movie').find({"$and":[{'style':/动作/},{'country':/大陆/},{'years':/(2017)/}]},function (err,docs) {
        Model('Movie').find({'score':/9/},null,function (err,docs) {
        //  Model('Movie').find(function (err,docs) {
            var hotmovie=[];
            docs.forEach(function (item) {
                hotmovie.push({
                    title:item.title,
                    years:item.years,
                    director:item.director,
                    actor:item.actor,
                    style:item.style,
                    country:item.country,
                    showtime:item.showtime,
                    movietime:item.movietime,
                    imglink:item.imglink,
                    imdb:item.imdb,
                    imdbLink:item.imdbLink,
                    score:item.score,
                    description:item.description,
                    _id:item._id,
                    pv:item.pv,
                    star:item.star,
                    commentNum:item.comments.length,
                })
            })
            res.send(hotmovie)
        })
    })

    router.get('/fetchMovie/:id',function (req,res) {
        var movie_id=req.params.id;
        var movie = [];
        var orderBy = 'comments.createAt';
        var order = -1;
        var orderObj = {};
        orderObj[orderBy] = order;
        Model('Movie').findById(movie_id).populate('user').populate('discussion.user').populate('comments.user').exec(function (err,doc) {
            if(err){
                res.send(err)
            }else{
                if(doc){
                    var comments = doc.comments;
                    console.log("#######",comments);
                    var commentsList = [];
                  
                    var discussion =doc.discussion;
                    console.log("66666666",discussion);
                    // var discussionhh = doc.discussion.id(ObjectId('5a2fa020c1400f206083f546'));
                    // console.log("ddddd",discussionhh);
               
                    var discussList = [];
                    comments.forEach(function (item) {
                        console.log()
                        // console.log('jjjjjjjjjj',item)
                        commentsList.push({
                            username:item.user.username,
                            userId:item.user._id,
                            avatar:item.user.avatar,
                            createAt:item.createAt,
                            comment:item.content,
                            createAt:item.createAt,
                        })
                    })
                    var sortComments = commentsList.reverse()
                    console.log("asdasfdsv",sortComments)
                    discussion.forEach(function (item) {
                        // console.log('ggggggggggg',item);
                        discussList.push({
                            title:item.title,
                            dcontent:item.dcontent,
                            createAt:item.createAt,
                            author:{_id:item.user._id,avatar:item.user.avatar,username:item.user.username},
                            pv:item.pv,
                            star:item.star,
                            _id:item._id,
                            dcommentNum:item.dcomments.length,
                            createAt:item.createAt,
                        })
                    })
                    var sortDiscuss = discussList.reverse()
                        movie = ({
                            title:doc.title,
                            years:doc.years,
                            director:doc.director,
                            actor:doc.actor,
                            style:doc.style,
                            country:doc.country,
                            showtime:doc.showtime,
                            movietime:doc.movietime,
                            imglink:doc.imglink,
                            imdb:doc.imdb,
                            imdbLink:doc.imdbLink,
                            score:doc.score,
                            description:doc.description,
                            comments:sortComments,
                            _id:doc._id,
                            discussion:sortDiscuss,
                        })
                        
                        // console.log("33333",doc)
                        // console.log("33333",movie)
                        // var disscussion1 = doc.discussion.id(discussion_id)
                        // console.log("hhhh",disscussion1)
                    res.send({id:1,content:movie})
                    console.log("33333",movie.comments)
                }
            }
        })
    })
   
    router.get('/fetchDiscuss/:id1/:id2',function (req,res) {
        var movie_id = req.params.id1;
        var discussion_id=req.params.id2;
        console.log('ooooooooooo',discussion_id);
        console.log(movie_id);
        console.log('hhhhhhhhhhhhhhhhhhhhh',req.params.id1);
        // var sid = mongoose.Types.ObjectId(discussion_id)
        // var ObjectId = require('mongodb').ObjectId;
        var discussMovie = [];
        var orderBy = 'createAt';
        var order = -1;
        var orderObj = {};
        orderObj[orderBy] = order;
        // Model('Movie').find({'discussion._id':ObjectId(discussion_id)}).populate('user').populate('discussion.dcoments.user').exec(function (err,doc) {
            Model('Movie').findById(movie_id).sort(orderObj).populate('user').populate('discussion.user').populate('discussion.dcomments.user').exec(function (err,doc) {
            
            if(err){
                res.send(err)
            }else{
                if(doc){
                    var discussion = doc.discussion;
                    console.log("55555",discussion);
                    var listDiscuss = [];
                    discussion.forEach(function (item) {
                        listDiscuss.push({
                            title:item.title,
                            dcontent:item.dcontent,
                            createAt:item.createAt,
                            author:{_id:item.user._id,avatar:item.user.avatar,username:item.user.username},
                            pv:item.pv,
                            star:item.star,
                            _id:item._id,
                            dcomments:item.dcomments,
                            dcommentNum:item.dcomments.length,
                        })
                    })
                    console.log("ssssssssssss",listDiscuss)
                    movie = ({
                        title:doc.title,
                        years:doc.years,
                        director:doc.director,
                        actor:doc.actor,
                        style:doc.style,
                        country:doc.country,
                        showtime:doc.showtime,
                        movietime:doc.movietime,
                        imglink:doc.imglink,
                        imdb:doc.imdb,
                        imdbLink:doc.imdbLink,
                        score:doc.score,
                        description:doc.description,
                        _id:doc._id,
                        discussion:listDiscuss,
                    })
                    // var dcomments = discussion.dcomments;
                    // console.log('6969696969',dcomments)
                    // var dcommentsList = [];
                    // dcomments.forEach(function (item) {
                    //     dcommentsList.push({
                    //         username:item.user.username,
                    //         userId:item.user._id,
                    //         avatar:item.user.avatar,
                    //         createAt:item.createAt,
                    //         comment:item.content,
                    //     })
                    // })

                    // discussion.forEach(function (item) {
                    //     discussList.push({
                    //         title:item.title,
                    //         dcontent:item.dcontent,
                    //         createAt:item.createAt,
                    //         author:{_id:item.user._id,avatar:item.user.avatar,username:item.user.username},
                    //         pv:item.pv,
                    //         star:item.star,
                    //         _id:item._id,
                    //         dcommentNum:item.dcomments.length,
                    //     })
                    // })
                    var discussion = doc.discussion.id(discussion_id);
                    // console.log("ddddd",discussion);
                    var dcomments = discussion.dcomments;
                    // console.log('6969696969',dcomments)
                    var dcommentsList = [];
                    dcomments.forEach(function (item) {
                        // console.log(".............",item)
                        dcommentsList.push({
                            username:item.user.username,
                            userId:item.user._id,
                            avatar:item.user.avatar,
                            createAt:item.createAt,
                            comment:item.ddcontent,
                        })
                    })
                    
                    // console.log("!!!!!!!!!!!!",dcommentsList);
                        discussMovie = ({
                            
                            title:discussion.title,
                            dcontent:discussion.dcontent,
                            createAt:discussion.createAt,
                            pv:discussion.pv,
                            star:discussion.star,
                            _id:discussion._id,
                            // dcommentNum:doc.discussion.dcomments.length,
                            author:{_id:discussion.user._id,avatar:discussion.user.avatar,username:discussion.user.username},
                            dcomments:dcommentsList,
                            dcommentNum:dcomments.length,
                        })
                    console.log('11111',doc);
                    console.log('2222',discussMovie)
                    res.send({id:1,content:discussMovie})
                  
                }
            }
        })
// console.log('11111',doc);

    })


    router.post('/giveStar',function (req,res) {
        var info  = req.body;
        var userid = info.userId;
        var movieId = info.movieId;
        var discussionId = info.discussionId;
        console.log("%%%%%%%%%%%",movieId);
        console.log("$$$$$$$$$$",discussionId);
        // var discussion = info.discussion;
        Model('Movie').findById(movieId).populate('discussion.user').exec(function (err,doc) {
            var discussion = doc.discussion.id(discussionId);
            console.log("0123456",discussion);
            if(err){
                res.send(err)
            }else{
                var star = discussion.star;
                console.log(star)
                for(var i=0;i<star.length;i++){
                    if(star[i]==userid){
                        star.splice(i,1);
                        Model('Movie').update({_id:movieId,'discussion._id':discussionId},{$set:{'discussion.$.star':star}},function (err,result) {
                        if(err){
                            res.send(err)
                        }else{
                            res.send({title:0,content:'取消点赞'});
                        }
                    })
                        return;
                    }
                }
                star.push(userid);
                Model('Movie').update({_id:movieId,'discussion._id':discussionId},{$set:{'discussion.$.star':star}},function (err,result) {
                    if(err){
                        res.send(err)
                    }else{
                        res.send({title:1,content:'点赞成功'})
                    }
                })
            }
        })
    })


    router.post('/comment',function (req,res) {
        var info = req.body;
        var movieId=info.movieId;
        var userId = info.userId;
        
        console.log('fffffffffffff',userId);
        var comment = info.comment;
        var createAt = Date.now();
        Model('Movie').update({_id:movieId},{
            $push:{comments:{user:userId,content:comment,createAt:createAt}}},function(err,newDoc){
            if(err){
                res.send(err);
            }else{
                res.send({title:1,content:'评论成功'})
            }
        })
    });

    
    router.post('/dcomment',function (req,res) {
        var info = req.body;
        var movieId=info.movie_id;
        var discussionId=info.discussion_id;
        var userId = info.userId;
        var dcomment = info.dcomment;
        var createAt = Date.now();
        // console.log("kkkkkkkkk",movieId)
        // console.log("ccccccccccccccc",dcomment)
            Model('Movie').update({_id:movieId,'discussion._id':discussionId},{
            $push:{'discussion.$.dcomments':{user:userId,ddcontent:dcomment,createAt:createAt}}},function(err,newDoc){
            if(err){
                res.send(err);
            }else{
                res.send({title:1,content:'发表成功'})
            };
        
        });
    //     return;
    // };
// };
//         };
        // });
    });
    router.post('/discussion',function (req,res) {
        var info = req.body;
        var movieId=info.movieId;
        var userId = info.userId;
        console.log("iiiiiiii",userId)
        var dcomment = info.dcomment;
        var discussion = info.discussion;
        var title=info.title;
        var dcontent=info.dcontent;
        var createAt=Date.now();
        var pv=info.pv;
        // var article_id=info._id;
        // var author={_id:info.user._id,avatar:info.user.avatar,username:info.user.username};
        // var comments=info.commentsList;
        // var createAt = Date.now();
        info.user = info.token;
        delete info.token;
        // Model('User').findById(info.user,function (err,doc) {
        //     if(err){
        //         res.send(err);
        //         return;
        //     }else{
        //         info.username = doc.username;
        //     }
        Model('Movie').update({_id:movieId},{
            $push:{discussion:{user:userId,title:title,dcontent:dcontent,createAt:createAt,pv:pv}}},function(err,newDoc){
            if(err){
                res.send(err);
            }else{
                res.send({title:1,content:'发表成功'})
            }
        })
        // })
        // Model('Movie').save(callback)
        
    });
    // router.get('/discussion',function (req,res) {
    //     var movie_id=req.params.id;
    //     var discussion={};
    // Model('Movie').findById(movie_id).populate('user').populate('discussion.user').populate('discussion.dcomments.user').exec(function (err,doc) {
    //     if(err){
    //         res.send(err)
    //     }else{
    //         if(doc){
    //             var dcomments = doc.dcomments;
    //             var dcommentsList = [];
    //             dcomments.forEach(function (item) {
    //                 dcommentsList.push({
    //                     username:item.user.username,
    //                     userId:item.user._id,
    //                     avatar:item.user.avatar,
    //                     createAt:item.createAt,
    //                     dcomment:item.content,
    //                 })
    //             })
    //                 discussion = {
    //                     title:doc.title,
    //                     content:doc.content,
    //                     createAt:doc.createAt,
    //                     pv : doc.pv,
    //                     article_id:doc._id,
    //                     author:{_id:doc.user._id,avatar:doc.user.avatar,username:doc.user.username},
    //                     dcomments:commentsList
    //                 }
    //             res.send({id:1,content:discussion})
    //         }
    //     }
    // })
// router.get('/allType',function (req,res) {
//     var movie = req.body;
//     var orderBy = 'showtime';
//     var order = -1;
//     var orderObj = {};
//     orderObj[orderBy] = order;
//     Model('Movie').find(function (err,docs) {
//         var allType=[];
//         docs.forEach(function (item) {
//             allType.push({
//                 title:item.title,
//                 years:item.years,
//                 director:item.director,
//                 actor:item.actor,
//                 style:item.style,
//                 country:item.country,
//                 showtime:item.showtime,
//                 movietime:item.movietime,
//                 imglink:item.imglink,
//                 imdb:item.imdb,
//                 imdbLink:item.imdbLink,
//                 score:item.score,
//                 descript:item.descript,
//                 _id:item._id,
//                 pv:item.pv,
//                 star:item.star,
//                 commentNum:item.comments.length,
//             })
//         })
//         res.send(allType)
//     })
// })
// router.get('/love',function (req,res) {
//     var movie = req.body;
//     var orderBy = 'showtime';
//     var order = -1;
//     var orderObj = {};
//     orderObj[orderBy] = order;
//     Model('Movie').find({'style':/爱情/},function (err,docs) {
//         var love=[]
//         docs.forEach(function (item) {
//             love.push({
//                 title:item.title,
//                 years:item.years,
//                 director:item.director,
//                 actor:item.actor,
//                 style:item.style,
//                 country:item.country,
//                 showtime:item.showtime,
//                 movietime:item.movietime,
//                 imglink:item.imglink,
//                 imdb:item.imdb,
//                 imdbLink:item.imdbLink,
//                 score:item.score,
//                 descript:item.descript,
//                 _id:item._id,
//                 pv:item.pv,
//                 star:item.star,
//                 commentNum:item.comments.length,
//             })
//         })
//         res.send(love)
//     })
// })
// router.get('/comedy',function (req,res) {
//     var movie = req.body;
//     var orderBy = 'showtime';
//     var order = -1;
//     var orderObj = {};
//     orderObj[orderBy] = order;
//     Model('Movie').find({'style':/喜剧/},function (err,docs) {
//         var comedy=[]
//         docs.forEach(function (item) {
//             comedy.push({
//                 title:item.title,
//                 years:item.years,
//                 director:item.director,
//                 actor:item.actor,
//                 style:item.style,
//                 country:item.country,
//                 showtime:item.showtime,
//                 movietime:item.movietime,
//                 imglink:item.imglink,
//                 imdb:item.imdb,
//                 imdbLink:item.imdbLink,
//                 score:item.score,
//                 descript:item.descript,
//                 _id:item._id,
//                 pv:item.pv,
//                 star:item.star,
//                 commentNum:item.comments.length,
//             })
//         })
//         res.send(comedy)
//     })
// })

// router.get('/action',function (req,res) {
//     var movie = req.body;
//     var orderBy = 'showtime';
//     var order = -1;
//     var orderObj = {};
//     orderObj[orderBy] = order;
//     Model('Movie').find({'style':/动作/},function (err,docs) {
//         var action=[]
//         docs.forEach(function (item) {
//             action.push({
//                 title:item.title,
//                 years:item.years,
//                 director:item.director,
//                 actor:item.actor,
//                 style:item.style,
//                 country:item.country,
//                 showtime:item.showtime,
//                 movietime:item.movietime,
//                 imglink:item.imglink,
//                 imdb:item.imdb,
//                 imdbLink:item.imdbLink,
//                 score:item.score,
//                 descript:item.descript,
//                 _id:item._id,
//                 pv:item.pv,
//                 star:item.star,
//                 commentNum:item.comments.length,
//             })
//         })
//         res.send(action)
//     })
// })

// router.get('/story',function (req,res) {
//     var movie = req.body;
//     var orderBy = 'showtime';
//     var order = -1;
//     var orderObj = {};
//     orderObj[orderBy] = order;
//     Model('Movie').find({'style':/剧情/},function (err,docs) {
//         var story=[]
//         docs.forEach(function (item) {
//             story.push({
//                 title:item.title,
//                 years:item.years,
//                 director:item.director,
//                 actor:item.actor,
//                 style:item.style,
//                 country:item.country,
//                 showtime:item.showtime,
//                 movietime:item.movietime,
//                 imglink:item.imglink,
//                 imdb:item.imdb,
//                 imdbLink:item.imdbLink,
//                 score:item.score,
//                 descript:item.descript,
//                 _id:item._id,
//                 pv:item.pv,
//                 star:item.star,
//                 commentNum:item.comments.length,
//             })
//         })
//         res.send(story)
//     })
// })


// router.get('/science',function (req,res) {
//     var movie = req.body;
//     var orderBy = 'showtime';
//     var order = -1;
//     var orderObj = {};
//     orderObj[orderBy] = order;
//     Model('Movie').find({'style':/科幻/},function (err,docs) {
//         var science=[]
//         docs.forEach(function (item) {
//             science.push({
//                 title:item.title,
//                 years:item.years,
//                 director:item.director,
//                 actor:item.actor,
//                 style:item.style,
//                 country:item.country,
//                 showtime:item.showtime,
//                 movietime:item.movietime,
//                 imglink:item.imglink,
//                 imdb:item.imdb,
//                 imdbLink:item.imdbLink,
//                 score:item.score,
//                 descript:item.descript,
//                 _id:item._id,
//                 pv:item.pv,
//                 star:item.star,
//                 commentNum:item.comments.length,
//             })
//         })
//         res.send(science)
//     })
// })

// router.get('/terror',function (req,res) {
//     var movie = req.body;
//     var orderBy = 'showtime';
//     var order = -1;
//     var orderObj = {};
//     orderObj[orderBy] = order;
//     Model('Movie').find({'style':/恐怖/},function (err,docs) {
//         var terror=[]
//         docs.forEach(function (item) {
//             terror.push({
//                 title:item.title,
//                 years:item.years,
//                 director:item.director,
//                 actor:item.actor,
//                 style:item.style,
//                 country:item.country,
//                 showtime:item.showtime,
//                 movietime:item.movietime,
//                 imglink:item.imglink,
//                 imdb:item.imdb,
//                 imdbLink:item.imdbLink,
//                 score:item.score,
//                 descript:item.descript,
//                 _id:item._id,
//                 pv:item.pv,
//                 star:item.star,
//                 commentNum:item.comments.length,
//             })
//         })
//         res.send(terror)
//     })
// })

// router.get('/cartoon',function (req,res) {
//     var movie = req.body;
//     var orderBy = 'showtime';
//     var order = -1;
//     var orderObj = {};
//     orderObj[orderBy] = order;
//     Model('Movie').find({'style':/动画/},function (err,docs) {
//         var cartoon=[]
//         docs.forEach(function (item) {
//             cartoon.push({
//                 title:item.title,
//                 years:item.years,
//                 director:item.director,
//                 actor:item.actor,
//                 style:item.style,
//                 country:item.country,
//                 showtime:item.showtime,
//                 movietime:item.movietime,
//                 imglink:item.imglink,
//                 imdb:item.imdb,
//                 imdbLink:item.imdbLink,
//                 score:item.score,
//                 descript:item.descript,
//                 _id:item._id,
//                 pv:item.pv,
//                 star:item.star,
//                 commentNum:item.comments.length,
//             })
//         })
//         res.send(cartoon)
//     })
// })

// router.get('/thriller',function (req,res) {
//     var movie = req.body;
//     var orderBy = 'showtime';
//     var order = -1;
//     var orderObj = {};
//     orderObj[orderBy] = order;
//     Model('Movie').find({'style':/惊悚/},function (err,docs) {
//         var thriller=[]
//         docs.forEach(function (item) {
//             thriller.push({
//                 title:item.title,
//                 years:item.years,
//                 director:item.director,
//                 actor:item.actor,
//                 style:item.style,
//                 country:item.country,
//                 showtime:item.showtime,
//                 movietime:item.movietime,
//                 imglink:item.imglink,
//                 imdb:item.imdb,
//                 imdbLink:item.imdbLink,
//                 score:item.score,
//                 descript:item.descript,
//                 _id:item._id,
//                 pv:item.pv,
//                 star:item.star,
//                 commentNum:item.comments.length,
//             })
//         })
//         res.send(thriller)
//     })
// })

// router.get('/crime',function (req,res) {
//     var movie = req.body;
//     var orderBy = 'showtime';
//     var order = -1;
//     var orderObj = {};
//     orderObj[orderBy] = order;
//     Model('Movie').find({'style':/犯罪/},function (err,docs) {
//         var crime=[]
//         docs.forEach(function (item) {
//             crime.push({
//                 title:item.title,
//                 years:item.years,
//                 director:item.director,
//                 actor:item.actor,
//                 style:item.style,
//                 country:item.country,
//                 showtime:item.showtime,
//                 movietime:item.movietime,
//                 imglink:item.imglink,
//                 imdb:item.imdb,
//                 imdbLink:item.imdbLink,
//                 score:item.score,
//                 descript:item.descript,
//                 _id:item._id,
//                 pv:item.pv,
//                 star:item.star,
//                 commentNum:item.comments.length,
//             })
//         })
//         res.send(crime)
//     })
// })
// router.get('/mainland',function (req,res) {
//     var movie = req.body;
//     var orderBy = 'showtime';
//     var order = -1;
//     var orderObj = {};
//     orderObj[orderBy] = order;
//     Model('Movie').find({'style':/科幻/},function (err,docs) {
//         var mainland=[]
//         docs.forEach(function (item) {
//             mainland.push({
//                 title:item.title,
//                 years:item.years,
//                 director:item.director,
//                 actor:item.actor,
//                 style:item.style,
//                 country:item.country,
//                 showtime:item.showtime,
//                 movietime:item.movietime,
//                 imglink:item.imglink,
//                 imdb:item.imdb,
//                 imdbLink:item.imdbLink,
//                 score:item.score,
//                 descript:item.descript,
//                 _id:item._id,
//                 pv:item.pv,
//                 star:item.star,
//                 commentNum:item.comments.length,
//             })
//         })
//         res.send(mainland)
//     })
// })


module.exports = router;