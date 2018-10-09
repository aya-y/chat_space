$(document).on('turbolinks:load', function(){
  function buildHTML(message){
    var image = '';
    if (message.image.url){
      image = ` <img src = "message.image.url">`
    }
    var html = `<div class = "message">
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
                      ${ image }
                  </div>
                 <div>`
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
    });
    });
});
