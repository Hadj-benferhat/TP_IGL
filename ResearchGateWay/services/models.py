from django.db import models


class Utilisateur(models.Model):

    email = models.CharField(max_length=255)
    password = models.CharField(max_length=63)
    userName = models.CharField(max_length=63)
    role = models.CharField(max_length=255,default="user")
    # def __str__(self):
    #     return self.fullname
    


class Article(models.Model):
    title = models.CharField(max_length=255,default= "")
    samary = models.CharField(max_length=25555,default= "")
    authors = models.CharField(max_length=255,default= "")
    institutions = models.CharField(max_length=255,default= "")
    integralText = models.CharField(max_length=25555,default= "")
    pdfUrl = models.CharField(max_length=255,default= "")
    reference = models.CharField(max_length=255,default= "")
    keyWords = models.CharField(max_length=255,default= "")


class Favoris(models.Model):
    idUtilisateur=models.ForeignKey(Utilisateur,on_delete=models.CASCADE)
    idArticle=models.ForeignKey(Article,on_delete=models.CASCADE)



