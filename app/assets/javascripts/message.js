$(function(){
  console.log("It works on each visit!");
  function buildHTML(message){
    var image = '';
    if (message.image.url){
      image = ` <img src = "message.image.url">`
    }
    var html = `<div class = "message" data-message-id= ${message.id}>
                  <div class = "upper-message">
                    <div class = "upper-message__user-name">
                      ${ message.user_name }
                    </div>
                    <div class = "upper-message__date">
                      ${ message.created_at }
                    </div>
                  </div>
                  <div class = "lower-message">
                    <p class= "lower-message__content">
                      ${ message.content }
                    </p>
                    <div class = "lower-message__image">
                      ${ image }
                    </div>
                  </div>
                </div>`
    console.log(message.user_name);
    console.log(message.created_at);
    console.log(message.content);
    console.log(image);
    console.log(message.id);
    return html;
  }

  $('#new_message').on('submit', function(e){
    // ここでフォームのsubmitイベントを中止
    e.preventDefault();
    // formdataオブジェクトとして、フォームに入力した値を取得
    var formData = new FormData(this);
    var url = $(this).attr('action')
    // ajaxを使って、json形式でリクエストを送る。
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    // ajaxのリクエストが成功したら.doneが読まれる
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      $('.form__message').val('')
      $(".messages").animate({scrollTop: $('.messages')[0].scrollHeight});
      $(".form_submit").prop( 'disabled', false );
    })
    .fail(function(){
      alert('error');
    })
    });

  $(function(){
    setInterval(update, 5000);
    //10000ミリ秒ごとにupdateという関数を実行する
  });

     function update(){
      if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      console.log('ok1');
    $.ajax({
      url: location.href,
      type: 'GET',
      dataType: 'json',
     })
     .done(function(messages){
      console.log('ok2');
      var id = $('.message').data('messageId')
      messages.forEach(function(message) {
        if (message.id > id ) {
          var insertHTML = "";
          console.log(message);
          insertHTML += buildHTML(message);
          console.log('ok3');
          $('.message').append(insertHTML);
        }
      });
      // $('.message').prepend(buildHTML);

      })
     .fail(function(){
      // alert('自動更新に失敗しました');
    })
 }   else{
      clearInterval(interval);
    }
  }
  });

