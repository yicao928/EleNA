from django.http import JsonResponse
from .map_reader import get_nearest_node, get_sub_area, a_star, dijkstra, node_id_to_latlon
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
# this api is for debug purpose
def api_find_customized_path(request):
    start_lat = float(request.GET['start_lat'])
    start_lon = float(request.GET['start_lon'])
    end_lat = float(request.GET['end_lat'])
    end_lon = float(request.GET['end_lon'])
    min_or_max = request.GET['min_or_max']
    length_limit = float(request.GET['length_limit'])

    start_node = get_nearest_node(start_lat, start_lon)
    end_node = get_nearest_node(end_lat, end_lon)

    node_id_list = get_sub_area(start_lat, start_lon, end_lat, end_lon, length_limit / 100)
    path, distance = dijkstra(start_node, end_node, node_id_list)

    if min_or_max == 'max':
        x = -1
    else:
        x = 1

    node_id_list = get_sub_area(start_lat, start_lon, end_lat, end_lon, length_limit / 100)
    path, distance, elevation = a_star(start_node, end_node, node_id_list, distance, x, length_limit / 100)
    coordinate_path = node_id_to_latlon(path)

    response = JsonResponse({
        'path': coordinate_path,
        'elevation': elevation,
        'distance': distance
    })
    response['Access-Control-Allow-Origin'] = '*';
    return response
