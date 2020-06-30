set-staging-environment:
	heroku config:set API_URL=https://pure-temple-78419.herokuapp.com/ && \
	heroku config:set REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_51GxGm9BLR3Udnav95RYeK8EZJQRh868kS7hSrxCAHMJ6yoyXe3VyImHbEyGO9rGkxhzk6xjABBNTcLGzZ7n4Rnbj00mEndhfLk && \
	heroku config:set REACT_APP_AUTH0_AUDIENCE=https://api.barsnap.com && \
	heroku config:set REACT_APP_AUTH0_DOMAIN=dev-f4i21swa.us.auth0.com && \
	heroku config:set REACT_APP_AUTH0_CLIENT_ID=8EzW1FcKZve91Rj30h4dGgfjTizz2GFl && \
	heroku config:set REACT_APP_GOOGLE_PLACE_API_KEY=AIzaSyBTTjWmcEQzb9xWo02nbND_-CiAJf-0-E0

deploy-staging:
	git push staging master

staging: set-staging-environment deploy-staging
