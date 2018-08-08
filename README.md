# project_3-taco_app_api

# User can register/login
# User can search
# User can edit/ leave their own review
# User can navigate to show, edit, and add pages
# User see a leaderboard of tacos, and upvote/downvote
# User can view restaurant location

userSchema:
  username: String,
  password: String

tacoSchema:
  name: String,
  restaurant: String,
  price: String,
  rating: Number,
  comments: [String] 

  