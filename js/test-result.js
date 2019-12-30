
var vm = new Vue({
  el:'#show_paper',
  data:{
    paper: '',
    test:{
      test_problem:[],

    },
 anslist:[],
  },
  methods:{

    get_test_res:function(){
      this.$http.get(backend_server + 'result-manage/?paperid=' + this.paperid, {credentials: true})
      .then(function(res){
        console.log(res.bodyText);
        var dataret = JSON.parse(res.bodyText);
        if (dataret.code == 200)
        {
          this.test = dataret.test;
          this.paper = dataret.test_info;
        }
        else
        {
          alert('获取题目失败(1)');
        }
      },function(res){
        console.log(res.status);
        alert('获取题目失败(2)');
      });
    },
  },
  mounted(){
    this.paperid = getQueryString('paperid');
    this.get_test_res();
  },
})

