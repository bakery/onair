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

Create settings folder with .json settings file (i keep one for dev and one for production)

```
{
	"soundcloud" : {
		"clientId" : "soundcloud-app-id",
		"secret" : "soundcloud-app-secret"
	},

	"facebook" : {
		"appId" : "facebook-app-id",
		"secret" : "facebook-app-id"
	}
}
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

Air Balloon icon [Matteo Manenti](http://thenounproject.com/term/hot-air-balloon/1835/)
Casette icon [Pele Chaengsavang](http://thenounproject.com/term/cassette/21740/)
Social media icon font [Rondo](http://www.tajfa.com/projects/rondo/)