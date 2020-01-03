
var vm = new Vue({
  // 
  el: '#app',
  data:{
    newpaper: ''
  },
  methods:{
    find:function(){
      if (this.newpaper == '')
      {
        alert('试题名不能为空！');
        return;
      }
      // send the name of new paper
      postdata = {
        subject: this.newpaper,
        action: 'create'
      };
      this.$http.post(backend_server + 'search-result/', postdata, {credentials: true})
      .then(function(res){
        console.log(res.bodyText);
        var dataret = JSON.parse(res.bodyText);
        if (dataret.code == 200)
        {
          alert('搜索完成' );
          window.location = "question-choose.html?paperid=" +this.paperid;
        }
        else
        {
          alert('抱歉，目前没有该题库（1）');
          //location.reload();
        }
      },function(res){
        console.log(res.status);
        alert('搜索失败（2）');
        //location.reload();
      });
    }
  },
   created:function(){
    this.paperid = getQueryString('paperid');
  }
});