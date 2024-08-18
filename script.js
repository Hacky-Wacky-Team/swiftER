document.addEventListener('DOMContentLoaded', () => {
  const fetchData = () => {
    fetch('/points.json')
      .then(response => response.json())
      .then(points => {
        console.log(points);

        //THIS DIDN'T WORK :(
        //const mySecret = process.env['MAPS_API_KEY']
        //DONE STELA THIS GUYS PLEASE (i will die)
        mapboxgl.accessToken = 'pk.eyJ1Ijoiam9ubnlvIiwiYSI6ImNsenlmamY2bjExZzgybHE0MzRkb21rNTMifQ.66c7t6FBoih2z_rz26SECA';

        //create geojson with data from points 
        const geojson = {
          type: 'FeatureCollection',
          features: points 
        };

        //creating the map
        const map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/standard',
          center: [-79.435, 43.698],
          zoom: 11
        });

        //making the pins and sidebar item for each hospital
        geojson.features.forEach((feature, index) => {
          const el = document.createElement('div');
          el.className = 'marker';

          const textEl = document.createElement('div');
          textEl.className = 'marker-text';
          textEl.textContent = feature.properties.description;

          el.appendChild(textEl);
          
          new mapboxgl.Marker(el)
            .setLngLat(feature.geometry.coordinates[0]) 
            .addTo(map);
          
          const listItem = document.createElement('li');
          listItem.className = 'sidebar-item';
          listItem.id = `item-${index}`;
          listItem.dataset.index = index; 
          listItem.innerHTML = `
            <div class="sidebar-content">
              <h3>
                <span>${feature.properties.title}</span>
                <span class="wait-time">${feature.properties.description}</span>
              </h3>
              <p>${feature.properties.address}</p>
              <div class="button-container">
                <button class="button action-button" data-action="questions">PRE-SCREEN</button>
                <button class="button action-button" data-action="call">CALL</button>
                <button class="button action-button" data-action="directions">DIRECTIONS</button>
              </div>
            </div>
          `;

          listItem.addEventListener('click', () => {
            scrollToAndHighlight(listItem.dataset.index);
          });

          listItem.querySelectorAll('.action-button').forEach(button => {
            button.addEventListener('click', (e) => {
              e.stopPropagation();
              const action = e.target.dataset.action;
              switch(action) {
                case 'questions':
                  window.location.href = 'questions.html';
                  break;
                case 'call':
                  alert('Calling hospital: ' + feature.properties.title);
                  break;
                case 'directions':
                  alert('Getting directions to: ' + feature.properties.title);
                  break;
              }
            });
          });

          document.getElementById('pinList').appendChild(listItem);
        });

        //the sidebar items effects
        function scrollToAndHighlight(index) {
          const sidebar = document.getElementById('sidebar');
          const item = document.getElementById(`item-${index}`);

          if (item) {
            document.querySelectorAll('.sidebar-item').forEach(el => el.classList.remove('highlight'));

            item.classList.add('highlight');

            item.scrollIntoView({ behavior: 'smooth', block: 'center' });

            const coordinates = geojson.features[index].geometry.coordinates[0]; 
            map.flyTo({ center: coordinates, zoom: 14 });
          }
        }

        document.querySelectorAll('.sidebar-item').forEach(item => {
          item.addEventListener('click', function() {
            scrollToAndHighlight(this.dataset.index);
          });
        });

        document.querySelectorAll('.marker').forEach((marker, index) => {
          marker.addEventListener('click', () => {
            scrollToAndHighlight(index);
          });
        });

        
      })
      .catch(error => console.error('Something went wrong while getting data:', error));
  };

  //first data fetch (happens when site loads)
  fetchData();

  //delay to update data every 10 min
  setInterval(fetchData, 600000);
  
});

