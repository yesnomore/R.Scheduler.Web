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

        r = requests.get("http://localhost:5000/api/plugins")

        print(r.json())

        plugin1 = TestPlugin()
        plugin1.Name = "TestPlugin1"
        plugin1.Id = "1"

        plugin2 = TestPlugin()
        plugin2.Name = "TestPlugin2"
        plugin2.Id = "2"
        col = [plugin1.__dict__, plugin2.__dict__]
        retval = json.dumps([{"Name": "TestPlugin1", "Id": 1 }, { "Name": "TestPlugin2", "Id": 2 }])
        #retval = json.dumps(col)
        print (retval)
        return r

class PluginController(object):

    exposed = True

    @cherrypy.tools.accept(media='application/json')
    def GET(self, id=None):
        print("in PluginController GET, id=", id)

        r = requests.get("http://localhost:5000/api/plugins/" + id)
        print(r.json())

        plugin1 = TestPlugin()
        plugin1.name = "TestPlugin1"
        plugin1.id = "1"
        plugin1.assemblyPath = "TestPlugin1/AssemblyPath"

        retval = json.dumps(plugin1.__dict__)
        #retval = json.dumps(col)
        print (retval)
        return r