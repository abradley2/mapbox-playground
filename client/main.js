const {StyleSheet, css} = require('aphrodite')

const mapboxgl = window.mapboxgl
const apiUrl = window.location.host.toUpperCase().includes('LOCALHOST') ?
    'http://localhost:5000' :
    ''

const styles = StyleSheet.create({
    map: {
        width: '400px',
        height: '300px',
        margin: 'auto'
    }
})

// Add map element to page
const map = document.createElement('div')
map.id = 'map'
map.className = css(styles.map)

document.body.appendChild(map)

fetch(`${apiUrl}/token`)
    .then(res => res.json())
    .then(({token}) => {
        mapboxgl.accessToken = token;
        (function () {
            return new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v9'
            })
        })()
    })

// Set up ui
const ui = document.createElement('div')
document.body.appendChild(ui)

const tpl = require('./template.hbs')

const state = {}

function renderTpl() {
    ui.innerHTML = tpl(state)
}

renderTpl()
