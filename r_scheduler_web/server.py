import cherrypy
import os

from home import Root
from controllers.plugins import PluginsController
from controllers.plugins import PluginController
from controllers.plugins import PluginDetailsController

HERE = os.path.dirname(os.path.abspath(__file__))

CONFIG_APP =  {
    '/static': {
        'tools.staticdir.on': True,
        'tools.staticdir.debug' : True,
        'tools.staticdir.dir': os.path.join(HERE, 'static'),
    },
    '/': {
        'tools.sessions.on': True,
        'tools.staticdir.root': os.path.abspath(os.getcwd())
    }
}

CONFIG_REST = {
    '/': {
        'request.dispatch': cherrypy.dispatch.MethodDispatcher(),
        'tools.sessions.on': True,
        'tools.response_headers.on': True,
        'tools.response_headers.headers': [('Content-Type', 'application/json')],
    }
}

def get_app():
    cherrypy.tree.mount(Root(), '/', config = CONFIG_APP)
    cherrypy.tree.mount(PluginsController(), '/controllers/plugins', config = CONFIG_REST)
    cherrypy.tree.mount(PluginController(), '/controllers/plugin', config = CONFIG_REST)
    cherrypy.tree.mount(PluginDetailsController(), '/controllers/pluginDetails', config = CONFIG_REST)
    return cherrypy.tree

def start():
    get_app()
    cherrypy.engine.signals.subscribe()
    cherrypy.engine.start()
    cherrypy.engine.block()

if __name__ == '__main__':
    start()