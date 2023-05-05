import esy.osm.pbf
import requests
from pyrosm import OSM
import sqlite3

# load map data
map_file_path = 'data/amherst_and_near_area.osm.pbf'
osm = esy.osm.pbf.File(map_file_path)

map = OSM(map_file_path)
nodes, edges = map.get_network(nodes=True, network_type="walking")

# connect to database
connection = sqlite3.connect('data/geo_data')


def search_node_by_tag(search_tag: str, search_value: str):
    search_res = []

    for entry in osm:
        if len(entry.tags) != 0:
            if search_tag in entry.tags.keys():
                if search_value in entry.tags.get(search_tag).lower() and hasattr(entry, 'lonlat'):
                    search_res.append({
                        'name': entry.tags.get('name'),
                        'latitude': entry.lonlat[1],
                        'longitude': entry.lonlat[0],
                    })

    return search_res


# get altitude from given latitude and longitude
def get_altitude(latitude: str, longitude: str) -> str:
    # try to get data from database
    cursor = connection.cursor()
    get_altitude_sql = 'SELECT elevation FROM elevation_data WHERE latitude=? AND longitude=?'
    cursor.execute(get_altitude_sql, (latitude, longitude))
    sql_result = cursor.fetchall()
    if len(sql_result) == 1:
        cursor.close()
        return sql_result[0][0]

    # no altitude data in database -> get altitude from online api
    # https://open-meteo.com/en/docs/elevation-api
    url = f'https://api.open-meteo.com/v1/elevation?latitude={latitude}&longitude={longitude}'
    params = {'locations': f'{latitude},{longitude}'}
    response = requests.get(url=url, params=params)
    data = response.json()
    altitude = data['elevation'][0]

    save_altitude_sql = 'INSERT INTO elevation_data (latitude, longitude, elevation) VALUES (?, ?, ?)'
    cursor.execute(save_altitude_sql, (latitude, longitude, altitude))
    connection.commit()

    cursor.close()
    return altitude


get_altitude('42.395495999999476', '-72.53249400000105')