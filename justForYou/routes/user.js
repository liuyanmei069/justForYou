var express = require('express');
var formidable = require('formidable');
var router = express.Router();
var path = require('path');
var fs = require('fs');
//online-API
// var API = 'http://114.215.80.72:4545';
//dev-API
var API = 'http://localhost:4545';

router.post('/register', function (req, res) {
  var user = req.body;
  // user.token = utils.md5(user.password + 'justForYou');
  Model('User').findOne({username: user.username,}, function (err, doc) {
    if (err) {
      res.send('注册失败');
    } else if (doc) {
      res.send({id: 2, type: 2, content: '用户名已存在'});
    } else {
      Model('User').findOne({email: user.email}, function (err, doc) {
        if (err) {
          res.send('注册失败');
        } else if (doc) {
          res.send({id: 3, type: 2, content: '邮箱已被使用'});
        } else {
          Model('User').create(user, function (err, doc) {
            if (err) {
              res.send('注册失败')
            } else {
              var data = {id: 1, type: 2, content: doc._id}
              res.send(data);
            }
          })
        }
      })
    }
  })
})

router.post('/login', function (req, res) {
  var user = req.body;
  Model('User').findOne(user, function (err, doc) {
    if (err) {
      res.send({id: 0, type: 1, content: err});
    } else {
      if (doc) {
        res.send({id: 1, type: 1, content: doc._id})
      } else {
        res.send({id: 0, type: 1, content: '用户不存在'})
      }
    }
  })
})

router.post('/uploadAvatar', function (req, res) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    console.log(files)
    // var avatarPath = './upload/' + fields.token + files.avatar.name
    var avatarPath = './upload/' + files.avatar.name
    console.log("llllllllllllll",avatarPath);
    console.log("oooooooooo",fields.token);
    console.log("nnnnnnn",files.avatar.name);

    console.log("mmmmmmmmm",files.avatar.path)
    fs.createReadStream(files.avatar.path).pipe(fs.createWriteStream(avatarPath));
    avatarPath = avatarPath.substring(1);
    Model('User').update({_id: fields.token}, {$set: {avatar: API + avatarPath}}, function (err, doc) {
      if (err) {
        res.send(err)
      } else {
        if (doc) {
          res.send({title: 1, content: '修改成功'})
        }
        console.log()
      }
    })

  })
  // form.on('end',function(){
  //     // res.send({aa:'aa'})
  // })
})

router.get('/getUserInfo', function (req, res) {
  var info = {};
  Model('User').findOne({_id: req.query.token}, function (err, doc) {
    if (err) {
      res.send({title: err, content: '服务器出错了'})
    } else {
      if (doc) {
        info = {
          username: doc.username,
          avatar: doc.avatar,
        }
        res.send(info);
      }
    }

  })
})
// router.get('/fetchArticle', function (req, res) {
//   var orderBy = 'createAt';
//   var order = -1;
//   var orderObj = {};
//   orderObj[orderBy] = order;
//   var userId = req.query.userId;
//   Model('Article').find({user: userId}).sort(orderObj).exec(function (err, docs) {
//     if (err) {
//       res.send(err)
//     } else {
//       var json = [];
//       docs.forEach(function (item) {
//         json.push({
//           articleId: item._id,
//           title: item.title,
//           content: item.content
//         })
//       })
//       res.send({title: 1, content: json})
//     }

//   })
// })
router.get('/fetchArticle', function (req, res) {
  var orderBy = 'createAt';
  var order = -1;
  var orderObj = {};
  orderObj[orderBy] = order;
  var userId = req.query.userId;
  var json = []; 
  Model('Movie').find({'discussion.user':userId}).sort(orderObj).populate('discussion.user').exec(function (err, docs) {
    if (err) {
      res.send(err)
    } else {
      docs.forEach(function (items) {
      var discussion = items.discussion
      var imglink = items.imglink
      var mtitle = items.title
      var m_id = items._id
      discussion.forEach(function (item) {
        json.push({
          m_id:m_id,
          mtitle:mtitle,
          imglink:imglink,
          articleId: item._id,
          title: item.title,
          content: item.dcontent,
          createAt:item.createAt,
          author:{_id:item.user._id,avatar:item.user.avatar,username:item.user.username},

        })
      })
    })
    var articlesort = function(a,b){
      return a.createAt - b.createAt

 };
 var article =json.sort(articlesort)
    var article = json.reverse()
      res.send({title: 1, content: article})
    }

  })
})

module.exports = router;