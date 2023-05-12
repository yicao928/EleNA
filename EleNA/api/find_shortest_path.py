from django.http import JsonResponse
from .map_reader import get_nearest_node, get_sub_area, dijkstra, node_id_to_latlon
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
# this api is for debug purpose
def api_find_shortest_path(request):
    start_lat = float(request.GET['start_lat'])
    start_lon = float(request.GET['start_lon'])
    end_lat = float(request.GET['end_lat'])
    end_lon = float(request.GET['end_lon'])

    start_node = get_nearest_node(start_lat, start_lon)
    end_node = get_nearest_node(end_lat, end_lon)

    node_id_list = get_sub_area(start_lat, start_lon, end_lat, end_lon)

    path, distance = dijkstra(start_node, end_node, node_id_list)
    coordinate_path = node_id_to_latlon(path)

    response = JsonResponse({
        'path': coordinate_path,
        'distance': distance
    })
    response['Access-Control-Allow-Origin'] = '*';
    return response
