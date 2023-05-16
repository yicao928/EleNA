from django.urls import path
from .search_node_by_tag import api_search_node_by_tag
from .find_shortest_path import api_find_shortest_path
from .find_customized_path import api_find_customized_path

urlpatterns = [
    path('search_node_by_tag', api_search_node_by_tag, name='search_node_by_tag'),
    path('find_shortest_path', api_find_shortest_path, name='find_shortest_path'),
    path('find_customized_path', api_find_customized_path, name='find_customized_path'),
]
