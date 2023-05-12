from django.http import JsonResponse
from .map_reader import search_node_by_tag
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def api_search_node_by_tag(request):
    search_tag = request.GET['search_tag']
    search_value = request.GET['search_value']
    search_res = search_node_by_tag(search_tag, search_value)
    response =  JsonResponse({
        'search_result': search_res
    })
    response['Access-Control-Allow-Origin'] = '*';
    return response
