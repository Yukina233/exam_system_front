
var vm = new Vue({
  // 
  el: '#app',
  data:{
    newpaper: ''
  },
  methods:{
    create:function(){
      if (this.newpaper == '')
      {
        alert('试题名不能为空！');
        return;
      }
      // send the name of new paper
      var form_data = new FormData();
      var file_info = $( '#upload_prolist')[0].files[0];
      form_data.append('file', file_info);
      form_data.append('subject',  this.newpaper);
      if(file_info == undefined){
        alert('你没有选择任何文件');
        return;
      }
      $.ajax({
        url: backend_server + 'store-upload/',
        type:'POST',
        data: form_data,
        processData: false,  // tell jquery not to process the data
        contentType: false, // tell jquery not to set contentType
        success: function(callback) {
          alert('上传成功！');
          //location.reload();
        }
      });

    }


  }
});