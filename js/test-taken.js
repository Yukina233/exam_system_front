
var vm = new Vue({
  el:'#app',
  data:{
    takenlist : '',
    stuid_to_show: '',
    answer_to_show: '',
  },
  methods:{
    get_taken_list:function(){
      this.$http.get(backend_server + 'test-history/', {credentials: true})
      .then(function(res){
        console.log(res.bodyText);
        var dataret = JSON.parse(res.bodyText);
        if (dataret.code == 200)
        {
          this.takenlist = dataret.list;
        }
        else
        {
          alert('获取考试记录失败(1)');
        }
      },function(res){
        console.log(res.status);
        alert('获取考试记录失败(2)');
      });
    },
     test_result:function(paperid){
      //window.open("testing.html?paperid=" + paperid);
      window.location.href = "test-result.html?paperid=" + paperid;
    },
    showans:function(stuid, answer_str_array){
      console.log(answer_str_array[0].answers);
      answer_str=answer_str_array[0].answers;
      for(i=0;i<answer_str_array.length;i++)
      {
        console.log(answer_str_array[i].stuid);
        if(answer_str_array[i].stuid==stuid)
        {
          answer_str=answer_str_array[i].answers;
          break;
        }
      }
      console.log(answer_str);
      answer_json = JSON.parse(answer_str);
      console.log(answer_json.answer_list);
      this.stuid_to_show = stuid;
      this.answer_to_show = answer_json.answer_list;
      html = '';
      for (i=0; i<answer_json.answer_list.length; i++) {
        console.log(answer_json.answer_list[i]);
        html += '<tr>';
        html += '<td>' + answer_json.answer_list[i].id + '</td>';
        if (answer_json.answer_list[i].type == "keguan")
        {
          html += '<td>客观题</td>';
        }
        else
        {
          html += '<td>主观题</td>';
        }

        html += '<td>' + answer_json.answer_list[i].point + '</td>';
        html += '<td>' + answer_json.answer_list[i].answer + '</td>';
        html += '</tr>';
      }
      document.getElementById("show_record").innerHTML = html;
      console.log(html);
      show_div();
    },
      get_student_answers:function(pid){
      postdata = {
        action: 'getans',
        paperid: pid
      };
      this.$http.post(backend_server + 'judge-manage/', postdata, {credentials: true})
      .then(function(res){
        console.log(res.bodyText);
        var dataret = JSON.parse(res.bodyText);
        if (dataret.code == 200)
        {
          this.anslist = dataret.anslist;
          this.showans(this.loginuser,dataret.anslist);
        }
        else
        {
          this.prolist = '获取试题列表失败(1)';
        }
      },function(res){
        console.log(res.status);
        this.prolist = '获取试题列表失败(2)';
      });
    }
  },
  created:function(){
    this.get_taken_list();

  }
})
