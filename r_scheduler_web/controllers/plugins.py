import cherrypy
import json
import requests

class TestPlugin():
    def __init__(self):
        pass

class PluginsController(object):

    exposed = True
    
    @cherrypy.tools.accept(media='application/json')
    def GET(self, currentPage=1, pageSize=50):
        #print("in PluginsController GET ", currentPage)
        #url = "http://localhost:5000/api/plugins"
        r = requests.get("http://ruffer-sche-uat:5000/api/plugins")
        print(r.json())
        return r

class PluginController(object):

    exposed = True

    @cherrypy.tools.accept(media='application/json')
    def GET(self, id=None):
        print("in PluginController GET, id=", id)
        r = requests.get("http://ruffer-sche-uat:5000/api/plugins/" + id)
        print(r.json())
        return r

    @cherrypy.tools.accept(media='application/json')
    def POST(self):
        payload = cherrypy.request.body.read()
        print("in PluginController POST, payload=", payload)

        #payload = {'key1': 'value1', 'key2': 'value2'}
        r = requests.post("http://ruffer-sche-uat:5000/api/plugins/", data=payload, headers={'content-type': 'application/json'})
        print(r.json())
        return r

class PluginDetailsController(object):

    exposed = True

    @cherrypy.tools.accept(media='application/json')
    def GET(self, id=None):
        print("in PluginDetailsController GET, id=", id)
        r = requests.get("http://ruffer-sche-uat:5000/api/plugins/" + id)
        print(r.json())
        return r