import './../styles/app.scss'

import Map from './_geo.js'

// if (process.env.NODE_ENV !== 'production') {
//   let template = require('./../template/index.hbs')
//   console.log(template())
// }

/* global ymaps:true */
ymaps.ready(() => {
  let Ymap

  ymaps.geolocation
    .get()
    .then(
      res => {
        createMap({
          center: res.geoObjects.get(0).geometry.getCoordinates()
        })
      },
      () => {
        createMap({
          center: [55.751574, 37.573856]
        })
      }
    )
    .catch(() => {})

  function createMap (options = {}) {
    options = Object.assign(
      {
        zoom: 14,
        controls: []
      },
      options
    )

    let cOptions = {
      clusterOpenBalloonOnClick: true,
      clusterDisableClickZoom: true,
      clusterIconColor: '#ff8663',
      gridSize: 64,
      clusterBalloonContentLayout: 'cluster#balloonCarousel',
      // clusterBalloonItemContentLayout: customItemContentLayout,
      clusterBalloonContentLayoutWidth: 300,
      clusterBalloonContentLayoutHeight: 200,
      clusterBalloonPagerSize: 5,
      hideIconOnBalloonOpen: false,
      balloonOffset: [0, -20]
    }

    Ymap = new Map('map', options, cOptions)

    Ymap.map.controls.add('geolocationControl')

    let deleteButton = new ymaps.control.Button({
      data: {
        content: 'Очистить',
        title: 'Нажмите для удаления всех меток'
      },
      options: {
        selectOnClick: false
      }
    })

    deleteButton.events.add('click', e => {
      Ymap.clusterer.removeAll()
      localStorage.points = []
      Ymap.points = []
    })
    Ymap.map.controls.add(deleteButton, { float: 'right' })

    Ymap.map.events.add('click', e => {
      e.preventDefault()

      let coords = e.get('coords')
      Ymap.map.balloon.close()
      Ymap.coords = coords

      Ymap.getAddress(coords)
        .then(address => {
          Ymap.showBalloon({ address: address })
        })
        .catch(() => {})
    })
  }
})
