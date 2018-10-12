json.content @message.content
json.user_name @message.user.name
json.image @message.image
json.created_at @message.created_at.to_s(:datetime)
json.id @message.id
