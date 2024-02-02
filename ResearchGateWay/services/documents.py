from django_elasticsearch_dsl import Document,Index,fields
from django_elasticsearch_dsl.registries import registry
from .models import Article

@registry.register_document
class articleDocument(Document):
    class Index:
        # Name of the Elasticsearch index
        name = 'articleindex'
        # See Elasticsearch Indices API reference for available settings
        settings = {'number_of_shards': 2,
                    'number_of_replicas': 1}
        
    class Django:
        model = Article # The model associated with this Document

        # The fields of the model you want to be indexed in Elasticsearch
        fields = [
            'title',
            'samary',
            'authors',
            'institutions',
            'integralText',
            'pdfUrl',
            'reference',
            'keyWords'
        ]