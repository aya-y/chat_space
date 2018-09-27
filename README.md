# README


## groups table

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|


### Association
- has_many :messages
- has_many :members
- has_many :users, through: :members



## members table

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user



## users table
|Column|Type|Options|
|------|----|-------|
|email|string|null: false, unique: true|
|name|string|null: false, unique: true, index: true|

### Association
- has_many :messages
- has_many :members
- has_many :groups, through: :members



## messages table
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|body|text|
|image|text|


### Association
- belongs_to :group
- belongs_to :user

