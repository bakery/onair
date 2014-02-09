[![Build Status](https://travis-ci.org/thebakeryio/onair.png?branch=master)](https://travis-ci.org/thebakeryio/onair)

# Play good music with Soundcloud 

Note: Work in progress

![ONAIR](https://dl.dropboxusercontent.com/u/9224326/www/onair/screen.png)

ONAIR let's you play good music and share it with friends through realtime playlists

## Setup

Grab meteor

```
$ curl https://install.meteor.com/ | sh
``` 

Grab Meteorite

```
npm install -g meteorite
```

Get yourself laika

```
npm install -g laika
```

Create settings folder with .json settings file (i keep one for dev and one for production)

```
{
	"authentication" : {
		"soundcloud" : {
			"clientId" : "soundcloud-app-id",
			"secret" : "soundcloud-app-secret"
		},

		"facebook" : {
			"appId" : "facebook-app-id",
			"secret" : "facebook-app-id"
		}
	}
}
```

## Testing the app

Make sure test.json excludes authentication section. Laika will need a mongo instance running

```
mongod --smallfiles --noprealloc --nojournal
```

```
laika --settings settings/test.json -u bdd
```

## Running the app

```
mrt --settings settings/dev.json
```

## Deploying the app

```
mrt deploy app-url.meteor.com --settings settings/production.json
```

## Attributions

-Air Balloon icon [Matteo Manenti](http://thenounproject.com/term/hot-air-balloon/1835/)
-Casette icon [Pele Chaengsavang](http://thenounproject.com/term/cassette/21740/)
-Social media icon font [Rondo](http://www.tajfa.com/projects/rondo/)