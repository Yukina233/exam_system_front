
var vm = new Vue({
  // 
  el: '#app',
  data:{
    newpaper: ''
  },
  methods:{
    find:function() {
      if (this.newpaper == '') {
        alert('题库名不能为空！');
        return;
      }

      // send the name of new paper
      postdata = {
        subject: this.newpaper,
        action: 'search'
      };
      console.log(postdata.subject);
      this.$http.post(backend_server + 'store-manage/', postdata, {credentials: true})
          .then(function (res) {

            console.log(res.bodyText);
            var dataret = JSON.parse(res.bodyText);
            if (dataret.code == 200) {
                console.log(this.storeid);
                this.storeid = dataret.storeid;
                window.location.href = "question-choose.html?paperid=" + this.paperid+ "&storeid=" + this.storeid ;
            }
            else {
              alert('没有此题库');
              // window.location = "paper-problem.html?paperid=" + this.paperid;
              location.reload();
            }
          }, function (res) {
            console.log(res.status);
            alert('创建试题失败（2）');
            //location.reload();
          });
    }
  },
   created:function(){
    this.paperid = getQueryString('paperid');
  }
});