import esy.osm.pbf
import requests
from pyrosm import OSM
import sqlite3
import heapq
import numpy as np
import json

# load map data
map_file_path = 'data/amherst_and_near_area.osm.pbf'
osm = esy.osm.pbf.File(map_file_path)

map = OSM(map_file_path)
nodes, edges = map.get_network(nodes=True, network_type="walking")

try:
    with open('data/altitude_dict.json', 'r') as f:
        altitude_json = json.load(f)
    node_altitude = dict()
    for key, value in altitude_json.items():
        node_altitude[int(key)] = value

except:
    node_altitude = dict()

with open('data/graph.json', 'r') as f:
    whole_graph = json.load(f)


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


# dijkstra algorithm to find shortest path
def dijkstra(start: int, end: int, node_id_list: dict):
    # Initialize distance to each node as infinity
    distance = {node: float('inf') for node in node_id_list}
    # The distance to the starting node is 0
    distance[start] = 0

    # Use a priority queue to keep track of the next closest node to visit
    queue = [(0, start)]

    # Keep track of the shortest path to each node
    previous = {}

    while queue:
        # Get the next closest node to visit
        current_distance, current_node = heapq.heappop(queue)

        # If we've already found a shorter path to this node, skip it
        if current_distance > distance[current_node]:
            continue

        # Check the distance to all neighboring nodes
        for neighbor, weight in whole_graph[str(current_node)].items():
            if int(neighbor) not in node_id_list:
                continue
            # Calculate the distance to this neighbor through the current node
            new_distance = distance[current_node] + weight

            # If we've found a shorter path to this neighbor, update our records
            if new_distance < distance[int(neighbor)]:
                distance[int(neighbor)] = new_distance
                previous[int(neighbor)] = current_node
                heapq.heappush(queue, (new_distance, int(neighbor)))

    # If we've reached the end node, construct the shortest path
    path = [end]
    shortest_distance = distance[end]
    while end != start:
        path.append(previous[end])
        end = previous[end]
    path.reverse()

    return path, shortest_distance


# dijkstra algorithm to find shortest path
def dijkstra_edited(start: int, end: int, node_id_list: dict, distance_limit: float, x: int):
    # Initialize distance to each node as infinity
    distance = {node: float('inf') for node in node_id_list}
    # The distance to the starting node is 0
    distance[start] = 0

    # item in queue: (elevation, (path, distance))
    queue = [(0, ([start], 0))]

    while queue:
        # Get the next closest node to visit
        current_elevation, (current_path, current_distance) = heapq.heappop(queue)
        current_elevation = current_elevation * x
        current_node = current_path[-1]

        # If we've already found a shorter path to this node, skip it
        if current_distance > distance[current_node]:
            continue

        # Check the distance to all neighboring nodes
        for neighbor, weight in whole_graph[str(current_node)].items():
            if int(neighbor) == end:
                current_path.append(end)
                current_elevation += get_elevation(current_node, int(end))
                current_distance += weight
                with open('data/altitude_dict.json', 'w') as convert_file:
                    convert_file.write(json.dumps(node_altitude))
                return current_path, current_elevation, current_distance

            if int(neighbor) not in node_id_list or int(neighbor) in current_path:
                continue
            # Calculate the distance to this neighbor through the current node
            new_distance = distance[current_node] + weight

            # If we've found a shorter path to this neighbor, update our records
            if new_distance < distance[int(neighbor)] and new_distance < distance_limit:
                if new_distance < distance[int(neighbor)]:
                    distance[int(neighbor)] = new_distance
                new_elevation = current_elevation + get_elevation(current_node, int(neighbor))
                new_path = [i for i in current_path]
                new_path.append(int(neighbor))
                heapq.heappush(queue, (new_elevation * x, (new_path, new_distance)))

    with open('altitude_dict.json', 'w') as convert_file:
        convert_file.write(json.dumps(node_altitude))
    return None, None, None


def get_elevation(node1: int, node2: int) -> float:
    latlon = node_id_to_latlon([node1, node2])
    lat1 = latlon[0][0]
    lon1 = latlon[0][1]
    lat2 = latlon[1][0]
    lon2 = latlon[1][1]

    if node1 in node_altitude.keys():
        altitude1 = float(node_altitude[node1])
    else:
        altitude1 = float(get_altitude(lat1, lon1))
        node_altitude[node1] = altitude1
    if node2 in node_altitude.keys():
        altitude2 = float(node_altitude[node2])
    else:
        altitude2 = float(get_altitude(lat2, lon2))
        node_altitude[node2] = altitude2

    if altitude2 - altitude1 <= 0.0:
        return 0.0
    return altitude2 - altitude1


# get altitude from given latitude and longitude
def get_altitude(latitude: str, longitude: str) -> str:
    # try to get data from database
    connection = sqlite3.connect('data/geo_data')
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
    connection.close()
    return altitude


# find the nearest node in graph to target location
def get_nearest_node(lat: float, lon: float) -> str:
    node_to_search = nodes[
        (nodes.lat >= lat - 0.01) & (nodes.lat <= lat + 0.01) & (nodes.lon >= lon - 0.01) & (nodes.lon <= lat + 0.01)]

    search_res = None
    curr_min = 1000
    for index, row in node_to_search.iterrows():
        row_lat = row['lat']
        row_lon = row['lon']
        if ((lat - row_lat) * 100) ** 2 + ((lon - row_lon) * 100) ** 2 < curr_min:
            curr_min = ((lat - row_lat) * 100) ** 2 + ((lon - row_lon) * 100) ** 2
            search_res = row['id']

    return search_res


# find a smaller area to calculate the shortest path
def get_sub_area(start_lat: float, start_lon: float, end_lat: float, end_lon: float, coefficient: float) -> list:
    d_lat = np.abs(start_lat - end_lat) * np.sqrt(coefficient)
    d_lon = np.abs(start_lon - end_lon) * np.sqrt(coefficient)
    max_lat = np.max([start_lat + d_lat, end_lat + d_lat])
    min_lat = np.min([start_lat - d_lat, end_lat - d_lat])
    max_lon = np.max([start_lon + d_lat, end_lat + d_lon])
    min_lon = np.min([start_lon - d_lat, end_lat - d_lon])
    node_in_graph = nodes[(nodes.lat > min_lat) & (nodes.lat < max_lat) & (nodes.lon > min_lon) & (nodes.lon < max_lon)]
    node_id_list = node_in_graph['id'].values.tolist()
    return node_id_list


# output is list of tuples, [(lat1, lon1), (lat2, lon2), ...]
def node_id_to_latlon(node_id_list: list) -> list:
    res = []
    for node_id in node_id_list:
        lat = nodes[nodes.id == node_id]['lat'].values[0]
        lon = nodes[nodes.id == node_id]['lon'].values[0]
        res.append([lat, lon])
    return res
