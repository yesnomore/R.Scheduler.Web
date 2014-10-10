import cherrypy
import json
import requests

class TestPlugin():
    def __init__(self):
        pass

# not in use...
class PluginController(object):

    exposed = True

    @cherrypy.tools.accept(media='application/json')
    def GET(self, id=None):
        print("in PluginController GET, id=", id)
        r = requests.get("http://.../api/plugins/" + id)
        print(r.json())
        return r

    @cherrypy.tools.accept(media='application/json')
    def POST(self):
        payload = cherrypy.request.body.read()
        print("in PluginController POST, payload=", payload)

        r = requests.post("http://.../api/plugins/", data=payload, headers={'content-type': 'application/json'})
        print(r.json())
        return r

    @cherrypy.tools.accept(media='application/json')
    def PUT(self, id):
        payload = cherrypy.request.body.read()
        print("in PluginController PUT, payload=", payload, "id=", id)

        r = requests.put("http://.../api/plugins/" + id, data=payload, headers={'content-type': 'application/json'})
        print(r.json())
        return r