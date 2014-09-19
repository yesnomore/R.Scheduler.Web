import cherrypy
import json

class TestPlugin():
    def __init__(self):
        pass

class PluginsController(object):

    exposed = True
    
    @cherrypy.tools.accept(media='application/json')
    def GET(self, currentPage, pageSize):
        print("in PluginControllers GET ", currentPage)

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
        return retval