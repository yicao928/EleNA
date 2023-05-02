from django.urls import path
from .search_node_by_tag import api_search_node_by_tag

urlpatterns = [
    path('search_node_by_tag', api_search_node_by_tag, name='search_node_by_tag'),
]