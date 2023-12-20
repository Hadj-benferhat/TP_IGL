from django.db import models


class Utilisateur(models.Model):

    email = models.CharField(max_length=255)
    password = models.CharField(max_length=63)
    userName = models.CharField(max_length=63)
    role = models.CharField(max_length=255,default="user")
    # def __str__(self):
    #     return self.fullname
    


class Article(models.Model):
    title = models.CharField
    samary = models.CharField
    authors = models.CharField(max_length=255)
    institutions = models.CharField(max_length=255)
    integralText = models.CharField
    pdfUrl = models.CharField
    reference = models.CharField


class Favoris(models.Model):
    idUtilisateur=models.ForeignKey(Utilisateur,on_delete=models.CASCADE)
    idArticle=models.ForeignKey(Article,on_delete=models.CASCADE)



