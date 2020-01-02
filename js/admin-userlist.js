
var vm = new Vue({
  el:'#usermanage',
  data:{
    user: {
      username: '', password: '', usertype: '',name:''
    },
    userlist: [
      {username: 'user1', password: 'u1', usertype: 'student'},
      {username: 'user2', password: 'u2', usertype: 'teacher'},
    ],
    postdata: {
      username: '',
      password: '',
      usertype: '',
      batch_names: '',
      name:'',
    },
  },
  methods:{
    insert:function(){
      console.log(this.postdata);
      if (this.postdata.username == '' || this.postdata.password == '' || this.postdata.usertype == ''||this.postdata.name == '')
      {
        alert('用户信息不能有缺省');
        return;
      }
      this.$http.post(backend_server + 'user-add/', this.postdata, {emulateJSON: true, credentials: true}).then(function(res){
        console.log(res.bodyText);
        var dataret = JSON.parse(res.bodyText);
        if (dataret.code == 200)
        {
          alert('添加用户成功');
          location.reload();
        }
        else
        {
          alert('添加用户失败(' + dataret.info +')');
        }
      },function(res){
        console.log(res.status);
        alert('添加用户失败(unknown error)');
      });
    },
    remove:function(username){
      console.log(username + ' is to be deleted.');
      this.$http.post(backend_server + 'user-delete/', {"username": username}, {emulateJSON: true, credentials: true}).then(function(res){
        console.log(res.bodyText);
        var dataret = JSON.parse(res.bodyText);
        if (dataret.code == 200)
        {
          alert('删除用户成功');
          location.reload();
        }
        else
        {
          alert('删除用户失败(' + dataret.info +')');
        }
      },function(res){
        console.log(res.status);
        alert('删除用户失败(未知错误)');
      });
    },
    get_userlist:function(){
      this.$http.get(backend_server + 'user-list/', {credentials: true}).then(function(res){
        console.log(res.bodyText);
        var dataret = JSON.parse(res.bodyText);
        if (dataret.code == 200)
        {
          this.userlist = dataret.userlist
        }
        else
        {
          alert('获取用户列表失败(' + dataret.info +')');
        }
      },function(res){
        console.log(res.status);
        alert('获取用户列表失败(未知错误)');
      });
    },
    upload_user:function(){
      var form_data = new FormData();
      var file_info = $( '#upload_userlist')[0].files[0];
      form_data.append('file', file_info);
      //form_data.append('paperid', this.paper.pid);
      if(file_info == undefined){
        alert('你没有选择任何文件');
        return;
      }
      $.ajax({
        url: backend_server + 'user-upload/',
        type:'POST',
        data: form_data,
        processData: false,  // tell jquery not to process the data
        contentType: false, // tell jquery not to set contentType
        success: function(callback) {
          alert('上传成功！');
          location.reload();
        }
      });
    }
  },
  created:function(){
    this.get_userlist();
  }
})
