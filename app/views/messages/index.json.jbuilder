json.array! @messages.each do |message|
  json.content message.content
  json.user_name message.user.name
  json.image message.image
  json.created_at message.created_at.strftime("%Y/%m/%d %H:%M")
  json.id message.id
end