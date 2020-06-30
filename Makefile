set-staging-api:
  heroku config:set API_URL=https://pure-temple-78419.herokuapp.com/

deploy-staging:
  git push staging master

staging: set-staging-api deploy-staging
