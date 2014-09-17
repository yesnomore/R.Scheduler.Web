import cherrypy

class Root(object):
    @cherrypy.expose
    def index(self):
        index  = open(r"html/index.htm","r")
        return index
    index.exposed = True