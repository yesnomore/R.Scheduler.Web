import cherrypy
import os

# if you have a config, import it here
# from myproj import config

from controllers import Root

HERE = os.path.dirname(os.path.abspath(__file__))

def get_app_config():
    return {
        '/static': {
            'tools.staticdir.on': True,
            'tools.staticdir.debug' : True,
            'tools.staticdir.dir': os.path.join(HERE, 'static'),
        },
        '/': {
          'tools.sessions.on': True,
          'tools.staticdir.root': os.path.abspath(os.getcwd())
        },
    }

def get_app(config=None):
    config = config or get_app_config()
    cherrypy.tree.mount(Root(), '/', config = config)
    return cherrypy.tree

def start():
    get_app()
    cherrypy.engine.signals.subscribe()
    cherrypy.engine.start()
    cherrypy.engine.block()

if __name__ == '__main__':
    start()