import sys
import os
sys.path.insert(0, '')
import agent as ai

from flask import Flask, jsonify, request
from flask_restful import Api, Resource, reqparse
from core.ApiHandler import ApiHandlerFunction
from core.CsvDataHandler import DataHandlerFunction

#Registration libraries
from rdflib import Graph, Literal, RDF, URIRef
# rdflib knows about quite a few popular namespaces, like W3C ontologies, schema.org etc.
from rdflib.namespace import FOAF , XSD
from rdflib.namespace import NamespaceManager
from rdflib import BNode

app = Flask(__name__)
api = Api(app)


class RootApi(Resource):
    '''
    curl -X GET http://localhost:3000/v1/hello --header "Content-Type: application/json"
    curl -X POST http://localhost:3000/v1/hello --header "Content-Type: application/json" --data '{"RequestType":"Hello"}'
    '''

    # Members API Route

    @app.route("/members", methods=['GET', 'POST'])
    def members():
        ai.reset_knowledge()
        ai.output_memery = {}
        ai.servicelist = []
        value1 = ai.OperatingTask('task10', 'heart.csv', ['pipeline'], 'medical', '', 'MLmodel_classification')

        # taskName = str(request.form.get("taskName"))
        # path = request.args.get('path', None)
        # value2=ai.OperatingTask (str(name),str(path),['pipeline'],'medical','','MLmodel_classification')

        return jsonify({"members": [str(value1[0])]})
    
    #New Pipeline Service for Mortality data
    @app.route("/services", methods=['GET', 'POST'])
    def services():
        requirements = ['flask_restful']
        dpend = create_dependencies(requirements)
        output_s = Create_input_spec(['model.csv_json_datahandler'])
        description = 'Service to parse CSV data as json objects to the React frontend'  

        return 1

    
    def get(self):
        return {'resultStatus': 'SUCCESS', 'message': 'Hello from RootApi'}

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('RequestType', type=str)
        args = parser.parse_args()

        message = "RequestType: {}".format(args['RequestType'])
        final_result = {'status': 'SUCCESS', 'message': message}
        return final_result
    
    #Service Registration Functions
    #pipeline = {}
    pipeline=0
    services = []
    parameterslist = []

    def create_services(service):
        services.append(service)
        return services
    
    def create_pipeline(services):
        pipeservices = {}
        i=0
        for ise in services: 
            pipeservices.update({i:ise})
            i=i+1
        return pipeservice
    
    def create_dependencies(requirements):
        dependencies= requirements
        return dependencies
    
    parameterslist = []

    #parameter is also a list contains 1 parameter name and 2 parameter semantic meanings
    def create_parameters(parameter):
        paramenterslist.append(parameter)
        return parameterslist
    
    #parameters = parameterslist
    def Create_input_spec(inputtxt):
        inputlist={}
        i=0
        for ix in inputtxt:
            input_x = ix.split('.')
            inputlist[i] = input_x 
            i=i+1
        return inputlist

    def Create_output_spec(outputtxt):
        outputlist={}
        i=0
        for ox in outputtxt:
            output_x = ox.split('.')
            outputlist[i] = output_x 
            i=i+1
        return outputlist
    

    def greateMSGraph(namespace,ms_name, description, ms_type, dependencies, framework, GPU, pipeline, model_format, input_sp, output_sp, contributor, licence, service_category):
        # need to check names before start but this is future work
        g = Graph()
        g.parse("registry.n3")
        if len(ms_name) > 0 and len(ms_type) > 0 and len(dependencies)> 0: 
            #subject
            MService = URIRef(namespace+'/'+ms_name)
            #object
            _type = URIRef(namespace+'/'+ms_type)
            _contributor = URIRef(contributor)
            _lic = URIRef(licence)
            _sc = URIRef(namespace+'/'+service_category)
            print(_sc)
            #verb
            has_framework = URIRef(namespace+'/framwork')
            has_contributor = URIRef(namespace+'/contributor')
            has_licence = URIRef(namespace+'/licence')
            has_category = URIRef(namespace+'/category')
            has_dep = URIRef(namespace+'/dependency')
            service_uri = URIRef(namespace+'/uri')
            uses = URIRef(namespace+'/uses')
            has_format = URIRef(namespace+'/formate')
            has_pipeline = URIRef(namespace+'/pipe')
            has_input = URIRef(namespace+'/input')
            has_output = URIRef(namespace+'/output')
            has_ioct = URIRef(namespace+'/iocategory')
            has_iodt = URIRef(namespace+'/iodatatype')
            has_ioshape = URIRef(namespace+'/ioshape')
            has_description = URIRef(namespace+'/description')
            has_paramter = URIRef(namespace+'/paramter')
            has_paramter_id = URIRef(namespace+'/pid')
            #triples
            g.add((MService, has_description, Literal(description,lang="en")))
            g.add((MService, RDF.type, _type))
            g.add((MService, has_framework, Literal(framework,lang="en")))
            g.add((MService, has_contributor, _contributor))
            g.add((MService, has_licence, _lic))
            g.add((MService, has_category, _sc))
            g.add((MService, service_uri, URIRef(MService)))
            g.add((MService, has_format, Literal(model_format,lang="en")))
            if GPU==1:
                g.add((MService, uses, Literal('gpu',lang="en")))
            for d in dependencies:
                g.add((MService, has_dep, Literal(d,lang="en")))
            
            if pipeline != 0:
                for x in pipeline:
                    g.add((MService, has_pipeline, Literal(x,lang="en")))
            if bool(input_sp):        
                _input = BNode()
                g.add((MService, has_input, _input))
                i=0
                for x in input_sp: 
                    _inputp = BNode()
                    g.add((_input, has_paramter, _inputp))
                    g.add((_inputp, has_paramter_id, Literal(str(i),lang="en")))
                    i=i+1
                    if len(input_sp[x])>0:
                        g.add((_inputp, has_ioct, URIRef(namespace+'/'+input_sp[x][0])))
                    if len(input_sp[x])>1:
                        g.add((_inputp, has_iodt, URIRef(namespace+'/'+input_sp[x][1])))
                    if len(input_sp[x])>2:
                        g.add((_inputp, has_ioshape, Literal(input_sp[x][2],lang="en")))
            if bool(output_sp):        
                _output = BNode()
                g.add((MService, has_output, _output))
                i=0
                for x in output_sp:
                    _outputp = BNode()
                    g.add((_output, has_paramter, _outputp))
                    g.add((_outputp, has_paramter_id, Literal(str(i),lang="en")))
                    i=i+1
                    if len(output_sp[x])>0:
                        g.add((_outputp, has_ioct, URIRef(namespace+'/'+output_sp[x][0])))
                    if len(output_sp[x])>1:
                        g.add((_outputp, has_iodt, URIRef(namespace+'/'+output_sp[x][1])))
                    if len(output_sp[x])>2:
                        g.add((_outputp, has_ioshape, Literal(output_sp[x][2],lang="en")))
            g.serialize(destination='registry'+".n3")





api.add_resource(ApiHandlerFunction, '/v1/bye')
api.add_resource(DataHandlerFunction, '/v1/datareader')
api.add_resource(RootApi, '/v1/hello')

if __name__ == '__main__':
    app.run(host="localhost", port=3000, debug=True)
