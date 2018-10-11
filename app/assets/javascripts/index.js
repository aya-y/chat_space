$(document).on('turbolinks:load', function() {
var search_result= $("#user-search-result");

function appendUser(user) {
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">
                  ${user.name }
                </p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}" }">追加
                </a>
              </div>`
  search_result.append(html);
}

function addGroup(user_name, user_id) {
  var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                <p class='chat-group-user__name'>
                  ${user_name}
                </p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
              </div>`
  $("#chat-group-users").append(html);
}
  $("#user-search-field").on("keyup", function() {
    var input = $(this).val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
      })

     .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
    })
     .fail(function(){
      alert('ユーザー検索に失敗しました');
    })
});

   $("#user-search-result").on("click", '.user-search-add', function() {
    // #データを取得
      var user_name = $(this).data('user-name');
      var user_id = $(this).data('user-id');
      // ＃ユーザーをグループに追加
      addGroup(user_name, user_id);
      // ＃検索欄からユーザーを消す
      $(this).parent().remove();
   });

    $("#chat-group-users").on("click", '.user-search-remove', function()
    {
      $(this).parent().remove();
    });
});
