# express-simplestyle-spec

This project is intended to provide a map icons API for [simplestyle-spec](https://github.com/mapbox/simplestyle-spec) (a simple styling convention for GeoJSON data)

It's only a minimal library to integrate in any Express project or use in a minimal standalone Express project.

The intent is to have a standalone server for map markers. In fact, the `simplestyle` spec is open but the server to load icons isn't. You need a [Mapbox](mapbox.com) account to consume these icons like illustrated in [this example](https://www.mapbox.com/mapbox.js/example/v1.0.0/l-mapbox-marker/). To be fair, Mapbox does provide the library [makiwich](https://github.com/mapbox/makiwich/) to generate images from parameters matching the spec.

We borrowed 90% of the code from the project [@kartotherian/maki](https://github.com/kartotherian/maki) intended for use with Karthotherian, the vector tiles server project by [Wikimedia Foundation](https://wikimediafoundation.org), used within [Wikipedia](https://fr.wikipedia.org/wiki/Centre_de_la_France#/maplink/1).
For markers, their code relies on *makizushi*, the predecessor of *makiwich*. We made some adaptation to use *makiwich*, a more recent Mapbox library that works with latest Maki icons.

If you goal is to support together vector tiles, static maps and markers, you may consider using [Kartotherian](https://github.com/kartotherian/kartotherian/) instead.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need [Node.js](https://nodejs.org/en/) installed. As some dependencies are related to Mapnik Node bindings, we use [nvm](https://github.com/creationix/nvm) to set Node version to latest 6.x series (aka LTS version)

### Installing

#### To try the demo

Install dependencies

```
npm install
```

And to run demo

```
npm start
```

Then, open your browser to <http://localhost:3000/v4/marker/pin-m-bus+ff0000@2x.png>

The URL schema is matched to the one used by the [mapbox.js](https://github.com/mapbox/mapbox.js).

```
http://.../v4/marker/pin-l-cafe+de00ff@2x.png
http://.../v4/marker/ {base} - {size:s|m|l} [-{letter-or-digit-or-icon-name}] + {color} [@2x] .png
```

At this point, only "pin" is supported for the base. The color is a 3 digit or 6 digit hex number. Optional scaling can only be 2x. Beyond the pre-defined maki icons, you may give a number (0-99), a single letter (a-z), or nothing.

#### To use in your own Express project

```
npm install @webgeodatavore/express-simplestyle-spec
```

To get the logic, you just have to replace in [the demo](demo/app.js) code the following:

```
var markers = require('./../index');
```

with

```
var markers = require('@webgeodatavore/express-simplestyle-spec');
```

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue,
email, or any other method with the owners of this repository before making a change.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/webgeodatavore/express-simplestyle-spec/tags).

## Authors

* **Thomas Gratier** - *Integration work*

See also the list of [contributors](https://github.com/webgeodatavore/express-simplestyle-spec/contributors) who participated in this project.

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE.md](LICENSE.md) file for details

## Aknowledgements

* Mapbox for the spec itself and for the `makizushi` library that do most of the job for this library
* Wikimedia Foundation and Yuri Astrakhan as the author of the markers server related code from Kartotherian
