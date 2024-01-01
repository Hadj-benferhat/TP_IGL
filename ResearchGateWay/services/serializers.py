from rest_framework import serializers
from .models import Utilisateur,Article,Favoris


class UtilisateurSerializer(serializers.ModelSerializer):
    class Meta:
        model=Utilisateur
        fields= "__all__"


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model=Article
        fields= "__all__"


class FavorisSerializer(serializers.ModelSerializer):
    class Meta:
        model=Favoris
        fields= "__all__"

        