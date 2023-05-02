import esy.osm.pbf

# load map data
osm = esy.osm.pbf.File('data/amherst_and_near_area.osm.pbf')


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
